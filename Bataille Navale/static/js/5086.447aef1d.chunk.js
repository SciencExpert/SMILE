"use strict";(self.webpackChunk_genially_view_client=self.webpackChunk_genially_view_client||[]).push([[5086],{91720:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(45992),i=n(62772),s=n(17588),o=n(97690);const a=e=>({transform:`${e.preTransforms.join(" ")} scale(${e.scale}) rotateX(${e.rotateX}deg) rotateY(${e.rotateY}deg) ${(0,o.Y)(e.rotateZ)}`,transition:e.transitions.join(", "),filter:e.filters.join(" ")});const l=e=>{const[t,n]=(0,s.useState)(null),[i,o]=(0,s.useState)(void 0),[l,d]=(0,s.useState)(void 0),[c,u]=(0,s.useState)(!1),p=(0,s.useRef)(null),m=(0,s.useCallback)((e=>{p.current=e,n(e)}),[]);(0,s.useEffect)((()=>{e&&(o(void 0),d(void 0),u(!1))}),[e]);const f=(0,s.useCallback)((n=>{if(!t||e)return;u(!0);const r=t.getBoundingClientRect(),i=(n.clientX-r.left)/r.width,s=(n.clientY-r.top)/r.height,a={coords:{x:Math.min(Math.max(i,0),1),y:Math.min(Math.max(s,0),1)}};o(a),c||d(a)}),[t,c,e]),g=(0,s.useCallback)((()=>{o(void 0),u(!1)}),[]),{innerCardStyle:h,specialFxLayerStyles:b}=function(e){let{hoveringState:t}=e;const n={scale:1,rotateX:0,rotateY:0,rotateZ:0,preTransforms:[],transitions:[],filters:[]};n.rotateZ+=0;const r=[],i=e=>{var t;return null!==(t=r[e])&&void 0!==t||(r[e]={scale:1,rotateX:0,rotateY:0,rotateZ:0,preTransforms:[],transitions:[],filters:[]}),r[e]},s="perspective(1500px)",o=i(0),l=i(1),d="cubic-bezier(0.89, -0.3, 0.18, 1.37)";n.transitions.push(`transform 400ms ${d}`),o.transitions.push("transform 100ms linear"),l.transitions.push(`filter 400ms ${d}`);const c=e=>`drop-shadow(rgba(0, 15, 51, ${e}) 0px 1px 8px)`;if(t){n.preTransforms.push(s),o.preTransforms.push(s),l.filters.push(c(.3)),n.scale+=.05;const{coords:e}=t,r=20;o.rotateX+=r*-(e.y-.5),o.rotateY+=r*(e.x-.5)}else l.filters.push(c(0));return{specialFxLayerStyles:r.filter((e=>!!e)).map((e=>Object.assign(Object.assign({},a(e)),{top:0,bottom:0,left:0,right:0,width:"100%",height:"100%"}))),innerCardStyle:Object.assign({},a(n))}}({hoveringState:!i&&c?l:i}),v=(e,t)=>0===t.length?e:(0,r.jsx)("div",{style:t[0],children:v(e,t.slice(1))});return{handleMouseEnterOrMove:f,handleMouseLeave:g,innerCardStyle:h,specialFxLayerStyles:b,setCardRef:m,wrapInsideStyledCard:v}};var d=n(11833);const c=e=>{let{title:t,frontImageSrc:n,coverImageSrc:s,fitImages:o,flipped:a,burned:c,onClick:u}=e;const p=Boolean(c),m=Boolean(a),{handleMouseEnterOrMove:f,handleMouseLeave:g,innerCardStyle:h,setCardRef:b,specialFxLayerStyles:v,wrapInsideStyledCard:y}=l(m);return y((0,r.jsxs)(d.Ox,{onMouseMove:f,onMouseEnter:f,onMouseLeave:g,role:"button",style:m?h:{},$burned:p,$flipped:m,ref:b,onClick:e=>{e.stopPropagation(),u&&u()},"aria-label":`Card showing ${m?"front":"back"} side with title: ${t}`,"aria-disabled":p,tabIndex:p?-1:0,children:[(0,r.jsx)("img",{style:{opacity:m?1:0,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:o?"contain":"cover",transition:`opacity ${d.uD}ms steps(1)`},src:n,alt:"front"}),(0,r.jsx)("img",{style:{opacity:m?0:1,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:o?"contain":"cover",transition:`opacity ${d.uD}ms steps(1)`},src:s,alt:"cover"}),t&&(0,r.jsx)(d.aW,{hidden:!m,children:(0,r.jsx)(i.m_,{text:t,placement:i.m_.Position.TOP,fallbackPlacements:[i.m_.Position.TOP],renderReferencePortalNode:document.querySelector("body"),children:(0,r.jsx)(d.hE,{"data-testid":"card-title",children:t})})})]}),v)}},11833:(e,t,n)=>{n.d(t,{Ox:()=>l,aW:()=>o,hE:()=>a,rl:()=>i,uD:()=>s});var r=n(37577);const i=1e3,s=i/3.4,o=r.Ay.div({display:"flex",justifyContent:"center",alignItems:"center",flexShrink:0,position:"absolute",paddingLeft:"12px",paddingRight:"12px",bottom:0,left:0,userSelect:"none",minHeight:"25%",top:"75%",width:"100%",backgroundColor:"rgba(18,18,18,0.5)"}),a=r.Ay.p({color:"white",fontSize:12,textAlign:"center",fontStyle:"normal",fontWeight:400,lineHeight:"16px",overflow:"hidden",textOverflow:"ellipsis",wordWrap:"break-word",whiteSpace:"nowrap",pointerEvents:"none"}),l=r.Ay.div`
  @keyframes rotate-out {
    0% {
      transform: rotateY(0deg);
    }
    33% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  @keyframes rotate-in {
    0% {
      transform: rotateY(0deg);
    }
    33% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    12% {
      transform: scale(1.05, 1.05);
    }
    40% {
      transform: scale(1.05, 1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  cursor: ${e=>{let{$flipped:t,$burned:n}=e;return t||n?"default":"pointer"}};

  animation-name: ${e=>{let{$flipped:t}=e;return t?"rotate-out":"rotate-in"}}
    ${e=>{let{$burned:t}=e;return t?",pulse":""}};
  animation-duration: ${i}ms;
  animation-delay: 0ms, ${i}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-out, ease-in-out;
  perspective: 1500px;

  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.large}};

  /* HACK: We need to set border as important because .genially-embed is reseting our borders in the View */
  border: 1px solid
    ${e=>{let{theme:t,$flipped:n}=e;return n?t.color.border.primary.disabled():t.color.border.primary.default()}} !important;
  outline: 1px white solid;

  filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(0px 1px 4px rgba(0, 15, 51, 0.2))"}};

  &:hover {
    filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(rgba(0, 15, 51, 0.3) 0px 1px 8px)"}};
    border-color: ${e=>{let{theme:t,$flipped:n}=e;return n?t.color.border.primary.disabled():t.color.border.primary.hover()}} !important;
  }

  ${o} {
    visibility: ${e=>{let{$flipped:t}=e;return t?"initial":"hidden"}};
    transition: visibility ${s}ms steps(1);
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    opacity: ${e=>{let{$burned:t}=e;return t?"0.4":"0"}};
    transition: opacity ${i}ms steps(1);
    transition-delay: ${i}ms;
    background-color: white;
    pointer-events: none;
  }
`},56292:(e,t,n)=>{n.d(t,{x:()=>d});var r=n(45992),i=n(40671),s=n(99049),o=n(76838),a=n(37577);const l=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.numColumns}, minmax(0, 1fr));
  grid-template-rows: repeat(${e=>e.numRows}, 1fr);
  grid-auto-flow: column;
  height: 100%;
  gap: 16px;
  padding: 8px;
  perspective: 1500px;
`,d=(a.Ay.canvas({width:"100%",height:"100%",pointerEvents:"none",position:"absolute",top:0,left:0,zIndex:3}),e=>{let{items:t,renderItem:n,keyExtractor:a,getComputedStyles:d,forcedRows:c}=e;const u=(0,o.f)(t.length,c);return(0,r.jsx)(l,{numColumns:u.numColumns,numRows:u.numRows,children:(0,r.jsx)(i.N,{children:t.map(((e,t)=>(0,r.jsx)(s.P.div,{layout:!0,style:d?d(e,t):void 0,initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},transition:{type:"spring",ease:"linear",stiffness:150,damping:20},"data-testid":`grid-item-${a(e)}`,children:n(e)},a(e))))})})})},76838:(e,t,n)=>{n.d(t,{f:()=>i,v:()=>r});const r=e=>{if("auto"===e)return;const t=Number(e);if(!Number.isNaN(t))return t;console.warn("Cannot parse row distribution. Setting to auto",e)},i=(e,t)=>t?((e,t)=>e<t?{numColumns:1,numRows:e}:{numColumns:Math.ceil(e/t),numRows:t})(e,t):(e=>{if(e<4)return{numColumns:1,numRows:e};let t=4;for(;e%t!==0&&t<7;)t+=1;return{numColumns:t,numRows:Math.ceil(e/t)}})(e)},22705:(e,t,n)=>{n.r(t),n.d(t,{geniallyFindThePairViewScript:()=>w});var r=n(45992),i=n(54072),s=n(41381),o=n(17588),a=n(37577),l=n(91720),d=n(56292);var c;!function(e){e.FACEDOWN="faceDown",e.FACEUP="faceUp",e.BURNED="burned"}(c||(c={}));const u=e=>`${e}-original`,p=e=>`${e}-pair`;var m=n(11833);const f=(e,t)=>{const n=e%2===1,r=t%2===1;return n&&!r?1:!n&&r?-1:e-t},g=e=>{let{theme:t,images:n,coverImageSrc:i,fitImages:s,rowsDitributionFromConfig:g,onSuccess:h,onFailure:b,onGameWon:v}=e;const{shuffledCards:y,isFaceUp:w,isBurned:x,onPick:C}=((e,t,n,r)=>{const i=(0,o.useMemo)((()=>{const t=e.flatMap((e=>[Object.assign(Object.assign({},e),{id:u(e.id),pairId:p(e.id)}),Object.assign(Object.assign({},e),{id:p(e.id),pairId:u(e.id)})]));for(let e=t.length-1;e>0;e-=1){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}),[e]),[s,a]=(0,o.useState)((()=>{const e=new Map;return i.forEach((t=>{e.set(t.id,{id:t.id,status:c.FACEDOWN,pairId:t.pairId})})),e})),l=(0,o.useCallback)((e=>{var t;return(null===(t=s.get(e))||void 0===t?void 0:t.status)===c.FACEUP}),[s]),d=(0,o.useCallback)((e=>{var t;return(null===(t=s.get(e))||void 0===t?void 0:t.status)===c.BURNED}),[s]);return{shuffledCards:i,isFaceUp:l,isBurned:d,onPick:e=>{const i=s.get(e);if(i.status!==c.FACEDOWN)return;const o=[...s.values()].filter((e=>e.status===c.FACEUP));if(0===o.length)s.set(i.id,Object.assign(Object.assign({},i),{status:c.FACEUP}));else if(1===o.length){const e=o[0];e.pairId===i.id?(s.set(e.id,Object.assign(Object.assign({},e),{status:c.BURNED})),s.set(i.id,Object.assign(Object.assign({},i),{status:c.BURNED})),t()):(s.set(i.id,Object.assign(Object.assign({},i),{status:c.FACEUP})),n())}else 2===o.length&&(o.forEach((e=>{s.set(e.id,Object.assign(Object.assign({},e),{status:c.FACEDOWN}))})),s.set(i.id,Object.assign(Object.assign({},i),{status:c.FACEUP})));a(new Map(s)),[...s.values()].every((e=>e.status===c.BURNED))&&r()}}})(n,(()=>{setTimeout((()=>{h()}),m.rl)}),(()=>{setTimeout((()=>{b()}),m.rl)}),(()=>{setTimeout((()=>{v()}),m.rl)})),[$,S]=(0,o.useState)((()=>Array.from({length:y.length},((e,t)=>t))));return(0,o.useEffect)((()=>{const e=setTimeout((()=>{S((e=>[...e].sort(f).reverse()))}),m.rl);return()=>clearTimeout(e)}),[]),(0,r.jsx)(a.NP,{theme:t,children:(0,r.jsx)(d.x,{items:y,forcedRows:g,renderItem:e=>(0,r.jsx)(l.Z,{title:e.title,frontImageSrc:e.src,coverImageSrc:i,fitImages:s,flipped:w(e.id)||x(e.id),burned:x(e.id),onClick:()=>C(e.id)}),keyExtractor:e=>e.id,getComputedStyles:(e,t)=>({order:$[t]})})})};var h=n(76838);const b=e=>null!==e,v="https://audios.genial.ly/59e059d30b9c21060cb4c2ec/de8b3efe-c4df-48ff-8bbb-2b3e940663d3.wav",y="https://audios.genial.ly/59e059d30b9c21060cb4c2ec/23fe908b-44e2-4972-981f-d857c429b126.wav",w=(e,t)=>{const{itemList:n}=e.config,o=n.map((e=>null===e.image.source?null:{src:e.image.source,title:e.title,id:(0,i.Ak)()})).filter(b);(0,s.p)({getTargetNodeItem:()=>e.item,initialState:void 0,renderApp:()=>{const{coverImage:n,fitImages:i,numRows:s,onEndAction:a}=e.config;t.preloadAudio(v),t.preloadAudio(y);const l=()=>{t.playAudio({source:v})},d=()=>{t.playAudio({source:y})},c=()=>{null===a||void 0===a||a.run()};return()=>(0,r.jsx)(g,{theme:t.theme,images:o,coverImageSrc:String(n.source),fitImages:i,rowsDitributionFromConfig:(0,h.v)(s),onSuccess:l,onFailure:d,onGameWon:c})}})(e,t)}},41381:(e,t,n)=>{n.d(t,{p:()=>o});var r=n(70377),i=n(66264),s=n(60708);function o(e){let{getTargetNodeItem:t,renderApp:n,initialState:o}=e,a=!1;const l=[],d=e=>{l.push(e)};return e=>{const c=t(e.config),u=null===c||void 0===c?void 0:c.parentSlide;function p(){if(!c)return;let e=null;if("idOfFreeNode"in c)e=document.getElementById(c.idOfFreeNode);else{const t=document.createElement("div");t.innerHTML=c.source;let n=t.getElementsByClassName("genially-widget-app");n.length||(n=t.getElementsByClassName("genially-widget-gallery"));const{id:r}=n[0];if(!r)return;e=document.getElementById(r)}if(e){const t=i=>{if(a){const s=n({setState:t,onUnmount:d});r.render(s(i),e)}else console.warn('"rerender" was called when the widget was already unmounted. This is a no-op. Did you forget to dispose of an event handler with "onUnmount"?')};a=!0,t(o),l.push((()=>{r.unmountComponentAtNode(e)}))}}function m(){a=!1,l.forEach((e=>{e()})),l.length=0}null===c||void 0===c||c.on(i.q.Mount,(()=>{p()})),null===c||void 0===c||c.on(i.q.Unmount,(()=>{m()})),c&&"isTransversal"in c&&c.isTransversal?p():null===u||void 0===u||u.on(s.m.Entering,(()=>{a||p()})),null===u||void 0===u||u.on(s.m.Exited,(()=>{c&&"isTransversal"in c&&c.isTransversal||a&&m()}))}}}}]);
//# sourceMappingURL=https://s3-static-genially.genially.com/view/static/js/5086.447aef1d.chunk.js.map