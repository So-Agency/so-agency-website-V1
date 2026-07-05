(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,65773,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(71797);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=a(e,n)),t&&(o.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},79616,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return i},formatWithValidation:function(){return u},urlObjectKeys:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(44066)._(e.r(95991)),l=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",i=e.hash||"",s=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),s&&"object"==typeof s&&(s=String(a.urlQueryToSearchParams(s)));let c=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||l.test(n))&&!1!==u?(u="//"+(u||""),o&&"/"!==o[0]&&(o="/"+o)):u||(u=""),i&&"#"!==i[0]&&(i="#"+i),c&&"?"!==c[0]&&(c="?"+c),o=o.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${n}${u}${o}${c}${i}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return i(e)}},84305,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(98804),o=e.r(14751);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},85078,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},21822,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return g},useLinkStatus:function(){return b}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(44066),l=e.r(41686),i=a._(e.r(71797)),s=e.r(79616),u=e.r(42318),c=e.r(65773),f=e.r(98804),p=e.r(81115);e.r(50214);let d=e.r(83219),h=e.r(52771),y=e.r(84305),m=e.r(69441);function g(t){var r,n;let o,a,g,[b,x]=(0,i.useOptimistic)(h.IDLE_LINK_STATUS),j=(0,i.useRef)(null),{href:_,as:C,children:P,prefetch:k=null,passHref:T,replace:O,shallow:E,scroll:L,onClick:M,onMouseEnter:R,onTouchStart:S,legacyBehavior:w=!1,onNavigate:F,transitionTypes:$,ref:U,unstable_dynamicOnHover:I,...N}=t;o=P,w&&("string"==typeof o||"number"==typeof o)&&(o=(0,l.jsx)("a",{children:o}));let A=i.default.useContext(u.AppRouterContext),B=!1!==k,K=!1!==k?null===(n=k)||"auto"===n?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,Y="string"==typeof(r=C||_)?r:(0,s.formatUrl)(r);if(w){if(o?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=i.default.Children.only(o)}let D=w?a&&"object"==typeof a&&a.ref:U,W=i.default.useCallback(e=>(null!==A&&(j.current=(0,h.mountLinkInstance)(e,Y,A,K,B,x)),()=>{j.current&&((0,h.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,h.unmountPrefetchableInstance)(e)}),[B,Y,A,K,x]),q={ref:(0,c.useMergedRef)(W,D),onClick(t){w||"function"!=typeof M||M(t),w&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!A||t.defaultPrevented||function(t,r,n,o,a,l,s){if("u">typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,y.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(65580);i.default.startTransition(()=>{f(r,o?"replace":"push",!1===a?d.ScrollBehavior.NoScroll:d.ScrollBehavior.Default,n.current,s)})}}(t,Y,j,O,L,F,$)},onMouseEnter(e){w||"function"!=typeof R||R(e),w&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),A&&B&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)},onTouchStart:function(e){w||"function"!=typeof S||S(e),w&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),A&&B&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)}};return(0,f.isAbsoluteUrl)(Y)?q.href=Y:w&&!T&&("a"!==a.type||"href"in a.props)||(q.href=(0,p.addBasePath)(Y)),g=w?i.default.cloneElement(a,q):(0,l.jsx)("a",{...N,...q,children:o}),(0,l.jsx)(v.Provider,{value:b,children:g})}e.r(85078);let v=(0,i.createContext)(h.IDLE_LINK_STATUS),b=()=>(0,i.useContext)(v);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},79947,e=>{"use strict";var t=e.i(41686),r=e.i(71797);e.s(["RocketCrash",0,function(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;let r=setInterval(()=>{for(let e=0;e<12;e++){let e=document.createElement("div"),r=8*Math.random()+4,n=100*Math.random()-50,o=100*Math.random()-50,a=.5*Math.random()+.8;e.style.cssText=`
          position: absolute;
          width: ${r}px;
          height: ${r}px;
          background: #FEC700;
          border-radius: 50%;
          left: 50%;
          top: 60%;
          pointer-events: none;
          animation: particleFloat ${a}s ease-out forwards;
          --x: ${n}px;
          --y: ${o}px;
        `,t.appendChild(e),setTimeout(()=>e.remove(),1e3*a)}},3e3);return()=>clearInterval(r)},[]),(0,t.jsxs)("div",{ref:e,className:"relative h-80 sm:h-96 flex items-center justify-center overflow-hidden",children:[(0,t.jsx)("style",{children:`
        @keyframes particleFloat {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
          }
        }

        @keyframes rocketTilt {
          0% {
            transform: translateY(-20px) rotate(-15deg);
            opacity: 0;
          }
          40% {
            transform: translateY(20px) rotate(-15deg);
            opacity: 1;
          }
          60% {
            transform: translateY(40px) rotate(25deg);
          }
          100% {
            transform: translateY(120px) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes smokePuff {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px) scale(2);
            opacity: 0;
          }
        }

        @keyframes fireFlicker {
          0%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleY(1.1);
          }
        }
      `}),(0,t.jsx)("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:[0,1,2].map(e=>(0,t.jsx)("div",{className:"absolute w-20 h-20 rounded-full bg-gradient-to-t from-gray-400 to-transparent",style:{left:"50%",top:"55%",animation:`smokePuff 2s ease-out ${.3*e}s infinite`,marginLeft:`${-40+20*e}px`,opacity:.4}},`smoke-${e}`))}),(0,t.jsxs)("svg",{className:"w-32 sm:w-40",viewBox:"0 0 100 200",style:{animation:"rocketTilt 3s ease-in infinite",filter:"drop-shadow(0 0 20px rgba(254, 199, 0, 0.3))"},children:[(0,t.jsx)("rect",{x:"35",y:"20",width:"30",height:"80",fill:"#1a1a2e",stroke:"#FEC700",strokeWidth:"2",rx:"4"}),(0,t.jsx)("circle",{cx:"50",cy:"35",r:"6",fill:"#FEC700"}),(0,t.jsx)("path",{d:"M 35 85 L 25 100 L 30 90 Z",fill:"#FEC700"}),(0,t.jsx)("path",{d:"M 65 85 L 75 100 L 70 90 Z",fill:"#FEC700"}),(0,t.jsxs)("g",{style:{animation:"fireFlicker 0.2s infinite"},children:[(0,t.jsx)("polygon",{points:"40,100 45,130 50,125 55,130 60,100",fill:"#FF6B35",opacity:"0.8"}),(0,t.jsx)("polygon",{points:"42,105 48,125 50,120 52,125 58,105",fill:"#FEC700",opacity:"0.9"})]})]}),(0,t.jsx)("div",{className:"absolute bottom-0 left-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full",style:{animation:"pulse 2s ease-out infinite",marginLeft:"-96px"}})]})}])}]);