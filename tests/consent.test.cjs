const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function load(file, globals = {}, imports = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText
  const exports = {}
  vm.runInNewContext(code, { exports, require: name => imports[name], Date, ...globals })
  return exports
}

function environment() {
  const storage = new Map()
  const cookies = []
  const document = { get cookie() { return '_ga=123; _fbp=456; so-agency-locale=es' }, set cookie(v) { cookies.push(v) } }
  const localStorage = { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v) }
  const location = { hostname: 'www.soagency.dev', reloads: 0, reload() { this.reloads++ } }
  const consent = load('lib/consent.ts', { localStorage, document, location })
  return { consent, storage, localStorage, document, location, cookies }
}

test('stored choices validate schema, expiry, corruption and denied defaults', () => {
  const e = environment(), key = e.consent.CONSENT_KEY
  assert.equal(e.consent.readConsent(), null)
  for (const value of ['broken', JSON.stringify({version: 1, analytics: 'yes'}), JSON.stringify({version: 1, analytics: true, marketing: true, savedAt: 0})]) {
    e.storage.set(key, value)
    assert.equal(e.consent.readConsent(), null)
  }
  e.storage.set(key, JSON.stringify({version: 1, analytics: true, marketing: false, savedAt: Date.now()}))
  assert.equal(e.consent.readConsent().analytics, true)
  assert.equal(e.consent.consentSignals(e.consent.readConsent()).ad_storage, 'denied')
})

test('basic mode gates all vendors; category choices persist and withdrawal reloads', () => {
  const e = environment()
  const window = { location: e.location, addEventListener() {}, removeEventListener() {} }
  const state = [], effects = []
  let cursor = 0, mounted = false
  const react = {
    useState(initial) { const i = cursor++; if (!(i in state)) state[i] = initial; return [state[i], v => { state[i] = v }] },
    useEffect(fn) { if (!mounted) effects.push(fn) },
  }
  const jsx = (type, props) => ({type, props})
  const imports = {
    react, 'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    '@/lib/consent': e.consent,
    '@/lib/i18n/config': {localeFromPathname: () => 'es'},
    '@/lib/i18n/consent': {consentCopy: {es: {}}},
    '@/components/ui/dialog': Object.fromEntries(['Dialog','DialogContent','DialogTitle','DialogDescription'].map(k => [k,k])),
  }
  for (const [path, name] of [['google-analytics','GoogleAnalytics'],['google-tag-manager','GoogleTagManager'],['meta-pixel','MetaPixel'],['microsoft-clarity','MicrosoftClarity']]) imports['./'+path] = {[name]: name}
  const manager = load('components/consent-manager.tsx', {window, localStorage: e.localStorage}, imports)
  function render() { cursor = 0; return manager.ConsentManager({lang: 'es'}) }
  function nodes(tree) { return !tree ? [] : Array.isArray(tree) ? tree.flatMap(nodes) : typeof tree === 'object' ? [tree, ...nodes(tree.props?.children)] : [] }
  let tree = render()
  assert.equal(nodes(tree).some(n => n.type === 'GoogleAnalytics'), false)
  for (const effect of effects) effect()
  mounted = true
  tree = render()
  assert.equal(window.dataLayer[0][0], 'consent')
  assert.equal(window.dataLayer[0][1], 'default')
  assert.equal(window.dataLayer[0][2].analytics_storage, 'denied')
  assert.equal(nodes(tree).some(n => n.type === 'GoogleTagManager'), false)
  // Open preferences; analytics only.
  nodes(tree).find(n => n.type === 'button' && String(n.props.onClick).includes('setAnalytics')).props.onClick()
  tree = render()
  nodes(tree).filter(n => n.type === 'input')[0].props.onChange({target: {checked: true}})
  tree = render()
  nodes(tree).find(n => n.type === 'button' && String(n.props.onClick).includes('analytics, marketing')).props.onClick()
  tree = render()
  assert.equal(nodes(tree).some(n => n.type === 'GoogleAnalytics'), true)
  assert.equal(nodes(tree).some(n => n.type === 'MicrosoftClarity'), true)
  assert.equal(nodes(tree).some(n => n.type === 'MetaPixel'), false)
  assert.equal(nodes(tree).some(n => n.type === 'GoogleTagManager'), false)
  assert.equal(e.consent.readConsent().marketing, false)
  nodes(tree).find(n => n.type === 'button' && String(n.props.onClick).includes('save(denied)')).props.onClick()
  assert.equal(e.location.reloads, 1)
  assert.equal(e.consent.readConsent().analytics, false)
  assert.ok(e.cookies.some(c => c.startsWith('_ga=')))
  assert.ok(e.cookies.every(c => !c.startsWith('so-agency-locale=')))
})

test('hiding the banner does not mount trackers or remove the preferences panel', () => {
  const e = environment()
  const values = [true, null, false, false, false]
  let index = 0
  const jsx = (type, props) => ({ type, props })
  const imports = {
    react: {useState: () => [values[index++], () => {}], useEffect() {}},
    'react/jsx-runtime': {jsx, jsxs: jsx, Fragment: 'fragment'},
    '@/lib/consent': {...e.consent, CONSENT_BANNER_ENABLED: false},
    '@/lib/i18n/config': {localeFromPathname: () => 'es'},
    '@/lib/i18n/consent': {consentCopy: {es: {}}},
    '@/components/ui/dialog': {Dialog: 'Dialog', DialogContent: 'Content'},
    './google-analytics': {GoogleAnalytics: 'GA'}, './meta-pixel': {MetaPixel: 'Meta'},
    './google-tag-manager': {GoogleTagManager: 'GTM'}, './microsoft-clarity': {MicrosoftClarity: 'Clarity'},
  }
  const manager = load('components/consent-manager.tsx', {}, imports)
  const children = manager.ConsentManager({lang: 'es'}).props.children
  assert.equal(children[0], null)
  assert.equal(children[1], null)
  assert.equal(children[2], null)
  assert.equal(children[3], null)
  assert.equal(children[4].type, 'Dialog')
})
