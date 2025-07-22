"use strict";(self.webpackChunk_genially_view_client=self.webpackChunk_genially_view_client||[]).push([[5086],{89690:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(45992),o=n(62772),r=n(11833);const s=e=>{let{title:t,frontImageSrc:n,coverImageSrc:s,fitImages:a,flipped:l,burned:d,onClick:c}=e;const u=Boolean(d),m=Boolean(l);return(0,i.jsxs)(r.Ox,{role:"button",$burned:u,$flipped:m,onClick:e=>{e.stopPropagation(),c&&c()},"aria-label":`Card showing ${m?"front":"back"} side with title: ${t}`,"aria-disabled":u,tabIndex:u?-1:0,children:[(0,i.jsx)("img",{style:{opacity:m?1:0,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:a?"contain":"cover",transition:`opacity ${r.uD}ms steps(1)`},src:n,alt:"front"}),(0,i.jsx)("img",{style:{opacity:m?0:1,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:a?"contain":"cover",transition:`opacity ${r.uD}ms steps(1)`},src:s,alt:"cover"}),t&&(0,i.jsx)(r.aW,{hidden:!m,children:(0,i.jsx)(o.m_,{text:t,placement:o.m_.Position.TOP,fallbackPlacements:[o.m_.Position.TOP],renderReferencePortalNode:document.querySelector("body"),children:(0,i.jsx)(r.hE,{"data-testid":"card-title",children:t})})})]})}},11833:(e,t,n)=>{n.d(t,{Ox:()=>l,aW:()=>s,hE:()=>a,rl:()=>o,uD:()=>r});var i=n(37577);const o=1e3,r=o/3.4,s=i.Ay.div({display:"flex",justifyContent:"center",alignItems:"center",flexShrink:0,position:"absolute",paddingLeft:"12px",paddingRight:"12px",bottom:0,left:0,userSelect:"none",minHeight:"25%",top:"75%",width:"100%",backgroundColor:"rgba(18,18,18,0.5)"}),a=i.Ay.p({color:"white",fontSize:12,textAlign:"center",fontStyle:"normal",fontWeight:400,lineHeight:"16px",overflow:"hidden",textOverflow:"ellipsis",wordWrap:"break-word",whiteSpace:"nowrap",pointerEvents:"none"}),l=i.Ay.div`
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
  animation-duration: ${o}ms;
  animation-delay: 0ms, ${o}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-out, ease-in-out;
  perspective: 1500px;

  border-radius: 9%;

  /* HACK: We need to set border as important because .genially-embed is reseting our borders in the View */
  border: 1px solid
    ${e=>{let{theme:t,$flipped:n}=e;return n?t.color.border.primary.disabled():t.color.border.primary.default()}} !important;
  outline: 1px white solid;

  filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(0px 1px 4px rgba(0, 15, 51, 0.2))"}};

  &:hover {
    filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(rgba(0, 15, 51, 0.3) 0px 1px 8px)"}};
    border-color: ${e=>{let{theme:t,$flipped:n}=e;return n?t.color.border.primary.disabled():t.color.border.primary.hover()}} !important;
  }

  ${s} {
    visibility: ${e=>{let{$flipped:t}=e;return t?"initial":"hidden"}};
    transition: visibility ${r}ms steps(1);
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
    transition: opacity ${o}ms steps(1);
    transition-delay: ${o}ms;
    background-color: white;
    pointer-events: none;
  }
`},56292:(e,t,n)=>{n.d(t,{x:()=>c});var i=n(45992),o=n(40671),r=n(99049),s=n(76838),a=n(37577);const l=a.Ay.div`
  container-type: size;
  height: 100%;
  padding: 8px;
`,d=a.Ay.div`
  --contained-gap: 16px;

  display: grid;
  grid-template-columns: repeat(${e=>e.numColumns}, minmax(0, 1fr));
  grid-template-rows: repeat(${e=>e.numRows}, 1fr);
  grid-auto-flow: column;
  height: 100%;
  gap: var(--contained-gap);

  @supports (container-type: size) {
    --contained-gap: 4cqmin;
  }
`,c=(a.Ay.canvas({width:"100%",height:"100%",pointerEvents:"none",position:"absolute",top:0,left:0,zIndex:3}),e=>{let{items:t,renderItem:n,keyExtractor:a,getComputedStyles:c,forcedRows:u}=e;const m=(0,s.f)(t.length,u);return(0,i.jsx)(l,{children:(0,i.jsx)(d,{numColumns:m.numColumns,numRows:m.numRows,children:(0,i.jsx)(o.N,{children:t.map(((e,t)=>(0,i.jsx)(r.P.div,{layout:!0,style:c?c(e,t):void 0,initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},transition:{type:"spring",ease:"easeInOut",stiffness:30,damping:10},"data-testid":`grid-item-${a(e)}`,children:n(e)},a(e))))})})})})},76838:(e,t,n)=>{n.d(t,{f:()=>o,v:()=>i});const i=e=>{if("auto"===e)return;const t=Number(e);if(!Number.isNaN(t))return t;console.warn("Cannot parse row distribution. Setting to auto",e)},o=(e,t)=>t?((e,t)=>e<t?{numColumns:1,numRows:e}:{numColumns:Math.ceil(e/t),numRows:t})(e,t):(e=>{if(e<4)return{numColumns:1,numRows:e};let t=4;for(;e%t!==0&&t<7;)t+=1;return{numColumns:t,numRows:Math.ceil(e/t)}})(e)},22705:(e,t,n)=>{n.r(t),n.d(t,{geniallyFindThePairViewScript:()=>w});var i=n(45992),o=n(54072),r=n(41381),s=n(17588),a=n(37577),l=n(89690),d=n(56292);var c;!function(e){e.FACEDOWN="faceDown",e.FACEUP="faceUp",e.BURNED="burned"}(c||(c={}));const u=e=>`${e}-original`,m=e=>`${e}-pair`;var p=n(11833);const g=(e,t)=>{const n=e%2===1,i=t%2===1;return n&&!i?1:!n&&i?-1:e-t},f=e=>{let{theme:t,images:n,coverImageSrc:o,fitImages:r,rowsDitributionFromConfig:f,onSuccess:h,onFailure:b,onGameWon:v}=e;const{shuffledCards:y,isFaceUp:w,isBurned:x,onPick:C}=((e,t,n,i)=>{const o=(0,s.useMemo)((()=>{const t=e.flatMap((e=>[Object.assign(Object.assign({},e),{id:u(e.id),pairId:m(e.id)}),Object.assign(Object.assign({},e),{id:m(e.id),pairId:u(e.id)})]));for(let e=t.length-1;e>0;e-=1){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}),[e]),[r,a]=(0,s.useState)((()=>{const e=new Map;return o.forEach((t=>{e.set(t.id,{id:t.id,status:c.FACEDOWN,pairId:t.pairId})})),e})),l=(0,s.useCallback)((e=>{var t;return(null===(t=r.get(e))||void 0===t?void 0:t.status)===c.FACEUP}),[r]),d=(0,s.useCallback)((e=>{var t;return(null===(t=r.get(e))||void 0===t?void 0:t.status)===c.BURNED}),[r]);return{shuffledCards:o,isFaceUp:l,isBurned:d,onPick:e=>{const o=r.get(e);if(o.status!==c.FACEDOWN)return;const s=[...r.values()].filter((e=>e.status===c.FACEUP));if(0===s.length)r.set(o.id,Object.assign(Object.assign({},o),{status:c.FACEUP}));else if(1===s.length){const e=s[0];e.pairId===o.id?(r.set(e.id,Object.assign(Object.assign({},e),{status:c.BURNED})),r.set(o.id,Object.assign(Object.assign({},o),{status:c.BURNED})),t()):(r.set(o.id,Object.assign(Object.assign({},o),{status:c.FACEUP})),n())}else 2===s.length&&(s.forEach((e=>{r.set(e.id,Object.assign(Object.assign({},e),{status:c.FACEDOWN}))})),r.set(o.id,Object.assign(Object.assign({},o),{status:c.FACEUP})));a(new Map(r)),[...r.values()].every((e=>e.status===c.BURNED))&&i()}}})(n,(()=>{setTimeout((()=>{h()}),p.rl)}),(()=>{setTimeout((()=>{b()}),p.rl)}),(()=>{setTimeout((()=>{v()}),p.rl)})),[$,j]=(0,s.useState)((()=>Array.from({length:y.length},((e,t)=>t))));return(0,s.useEffect)((()=>{j((e=>[...e].sort(g).reverse()))}),[]),(0,i.jsx)(a.NP,{theme:t,children:(0,i.jsx)(d.x,{items:y,forcedRows:f,renderItem:e=>(0,i.jsx)(l.Z,{title:e.title,frontImageSrc:e.src,coverImageSrc:o,fitImages:r,flipped:w(e.id)||x(e.id),burned:x(e.id),onClick:()=>C(e.id)}),keyExtractor:e=>e.id,getComputedStyles:(e,t)=>({order:$[t]})})})};var h=n(76838);const b=e=>null!==e,v="https://audios.genial.ly/59e059d30b9c21060cb4c2ec/de8b3efe-c4df-48ff-8bbb-2b3e940663d3.wav",y="https://audios.genial.ly/59e059d30b9c21060cb4c2ec/23fe908b-44e2-4972-981f-d857c429b126.wav",w=(e,t)=>{const{itemList:n}=e.config,s=n.map((e=>null===e.image.source?null:{src:e.image.source,title:e.title,id:(0,o.Ak)()})).filter(b);(0,r.p)({getTargetNodeItem:()=>e.item,initialState:void 0,renderApp:()=>{const{coverImage:n,fitImages:o,numRows:r,onEndAction:a}=e.config;t.preloadAudio(v),t.preloadAudio(y);const l=()=>{t.playAudio({source:v})},d=()=>{t.playAudio({source:y})},c=()=>{null===a||void 0===a||a.run()};return()=>(0,i.jsx)(f,{theme:t.theme,images:s,coverImageSrc:String(n.source),fitImages:o,rowsDitributionFromConfig:(0,h.v)(r),onSuccess:l,onFailure:d,onGameWon:c})}})(e,t)}},41381:(e,t,n)=>{n.d(t,{p:()=>s});var i=n(70377),o=n(66264),r=n(60708);function s(e){let{getTargetNodeItem:t,renderApp:n,initialState:s}=e,a=!1;const l=[],d=e=>{l.push(e)};return e=>{const c=t(e.config),u=null===c||void 0===c?void 0:c.parentSlide;function m(){if(!c)return;let e=null;if("idOfFreeNode"in c)e=document.getElementById(c.idOfFreeNode);else{const t=document.createElement("div");t.innerHTML=c.source;let n=t.getElementsByClassName("genially-widget-app");n.length||(n=t.getElementsByClassName("genially-widget-gallery"));const{id:i}=n[0];if(!i)return;e=document.getElementById(i)}if(e){const t=o=>{if(a){const r=n({setState:t,onUnmount:d});i.render(r(o),e)}else console.warn('"rerender" was called when the widget was already unmounted. This is a no-op. Did you forget to dispose of an event handler with "onUnmount"?')};a=!0,t(s),l.push((()=>{i.unmountComponentAtNode(e)}))}}function p(){a=!1,l.forEach((e=>{e()})),l.length=0}null===c||void 0===c||c.on(o.q.Mount,(()=>{m()})),null===c||void 0===c||c.on(o.q.Unmount,(()=>{p()})),c&&"isTransversal"in c&&c.isTransversal?m():null===u||void 0===u||u.on(r.m.Entering,(()=>{a||m()})),null===u||void 0===u||u.on(r.m.Exited,(()=>{c&&"isTransversal"in c&&c.isTransversal||a&&p()}))}}}}]);
//# sourceMappingURL=https://s3-static-genially.genially.com/view/static/js/5086.6cbeeaec.chunk.js.map