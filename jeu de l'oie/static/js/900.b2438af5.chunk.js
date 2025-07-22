"use strict";(self.webpackChunk_genially_view_client=self.webpackChunk_genially_view_client||[]).push([[900],{89690:(e,t,i)=>{i.d(t,{Z:()=>a});var n=i(45992),r=i(62772),o=i(11833);const a=e=>{let{title:t,frontImageSrc:i,coverImageSrc:a,fitImages:s,flipped:l,burned:d,onClick:m}=e;const c=Boolean(d),p=Boolean(l);return(0,n.jsxs)(o.Ox,{role:"button",$burned:c,$flipped:p,onClick:e=>{e.stopPropagation(),m&&m()},"aria-label":`Card showing ${p?"front":"back"} side with title: ${t}`,"aria-disabled":c,tabIndex:c?-1:0,children:[(0,n.jsx)("img",{style:{opacity:p?1:0,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:s?"contain":"cover",transition:`opacity ${o.uD}ms steps(1)`},src:i,alt:"front"}),(0,n.jsx)("img",{style:{opacity:p?0:1,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:s?"contain":"cover",transition:`opacity ${o.uD}ms steps(1)`},src:a,alt:"cover"}),t&&(0,n.jsx)(o.aW,{hidden:!p,children:(0,n.jsx)(r.m_,{text:t,placement:r.m_.Position.TOP,fallbackPlacements:[r.m_.Position.TOP],renderReferencePortalNode:document.querySelector("body"),children:(0,n.jsx)(o.hE,{"data-testid":"card-title",children:t})})})]})}},11833:(e,t,i)=>{i.d(t,{Ox:()=>l,aW:()=>a,hE:()=>s,rl:()=>r,uD:()=>o});var n=i(37577);const r=1e3,o=r/3.4,a=n.Ay.div({display:"flex",justifyContent:"center",alignItems:"center",flexShrink:0,position:"absolute",paddingLeft:"12px",paddingRight:"12px",bottom:0,left:0,userSelect:"none",minHeight:"25%",top:"75%",width:"100%",backgroundColor:"rgba(18,18,18,0.5)"}),s=n.Ay.p({color:"white",fontSize:12,textAlign:"center",fontStyle:"normal",fontWeight:400,lineHeight:"16px",overflow:"hidden",textOverflow:"ellipsis",wordWrap:"break-word",whiteSpace:"nowrap",pointerEvents:"none"}),l=n.Ay.div`
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

  cursor: ${e=>{let{$flipped:t,$burned:i}=e;return t||i?"default":"pointer"}};

  animation-name: ${e=>{let{$flipped:t}=e;return t?"rotate-out":"rotate-in"}}
    ${e=>{let{$burned:t}=e;return t?",pulse":""}};
  animation-duration: ${r}ms;
  animation-delay: 0ms, ${r}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-out, ease-in-out;
  perspective: 1500px;

  border-radius: 9%;

  /* HACK: We need to set border as important because .genially-embed is reseting our borders in the View */
  border: 1px solid
    ${e=>{let{theme:t,$flipped:i}=e;return i?t.color.border.primary.disabled():t.color.border.primary.default()}} !important;
  outline: 1px white solid;

  filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(0px 1px 4px rgba(0, 15, 51, 0.2))"}};

  &:hover {
    filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(rgba(0, 15, 51, 0.3) 0px 1px 8px)"}};
    border-color: ${e=>{let{theme:t,$flipped:i}=e;return i?t.color.border.primary.disabled():t.color.border.primary.hover()}} !important;
  }

  ${a} {
    visibility: ${e=>{let{$flipped:t}=e;return t?"initial":"hidden"}};
    transition: visibility ${o}ms steps(1);
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
    transition: opacity ${r}ms steps(1);
    transition-delay: ${r}ms;
    background-color: white;
    pointer-events: none;
  }
`},56292:(e,t,i)=>{i.d(t,{x:()=>m});var n=i(45992),r=i(40671),o=i(99049),a=i(76838),s=i(37577);const l=s.Ay.div`
  container-type: size;
  height: 100%;
  padding: 8px;
`,d=s.Ay.div`
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
`,m=(s.Ay.canvas({width:"100%",height:"100%",pointerEvents:"none",position:"absolute",top:0,left:0,zIndex:3}),e=>{let{items:t,renderItem:i,keyExtractor:s,getComputedStyles:m,forcedRows:c}=e;const p=(0,a.f)(t.length,c);return(0,n.jsx)(l,{children:(0,n.jsx)(d,{numColumns:p.numColumns,numRows:p.numRows,children:(0,n.jsx)(r.N,{children:t.map(((e,t)=>(0,n.jsx)(o.P.div,{layout:!0,style:m?m(e,t):void 0,initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},transition:{type:"spring",ease:"easeInOut",stiffness:30,damping:10},"data-testid":`grid-item-${s(e)}`,children:i(e)},s(e))))})})})})},900:(e,t,i)=>{i.r(t),i.d(t,{geniallyFindThePairEditorScript:()=>g});var n=i(45992),r=i(54072),o=i(62772),a=i(57277),s=i(17588),l=i(37577),d=i(89690),m=i(56292);const c=e=>{let{theme:t,pairedImages:i,fitImages:r,forwardSetFlipped:o,coverImageSrc:a,rowsDitributionFromConfig:c}=e;const[p,u]=(0,s.useState)(!1);return(0,s.useEffect)((()=>{o(u)}),[o]),(0,n.jsx)(l.NP,{theme:t,children:(0,n.jsx)(m.x,{items:i,forcedRows:c,renderItem:e=>(0,n.jsx)(d.Z,{title:e.title,frontImageSrc:e.src,coverImageSrc:a,fitImages:r,flipped:p}),keyExtractor:e=>e.id,getComputedStyles:()=>({pointerEvents:"none"})})})};var p=i(76838);const u=e=>null!==e,g=e=>{let{script:t,editor:i}=e;const s=t.item;let l;if(!s)return;s.thumbnail="https://static.genially.com/widgets/find-the-pair-thumbnail";let d=[];t.on("configChange",(e=>{let{config:t,prevConfig:i}=e;if(!i)return;const{itemList:n}=t,{itemList:o}=i;d=((e,t,i)=>e.map(((e,n)=>{var o;if(n>=t.length&&e.image)return{src:e.image.source||"",title:e.title,altText:e.image.altText||"",id:(0,r.Ak)()};const a=t[n];return(null===a||void 0===a?void 0:a.image)&&e.image&&(e.image.source!==a.image.source||e.title!==a.title||e.image.altText!==a.image.altText)?Object.assign(Object.assign({},i[n]),{src:(null===(o=e.image)||void 0===o?void 0:o.source)||"",title:e.title,altText:e.image.altText||""}):i[n]})))(n,o,d),((e,t,i)=>{const{itemList:n}=t,{itemList:r}=i,{numRows:o}=t,{numRows:a}=i;if(0===n.length-r.length&&o===a)return;const s=2*r.length,l=(0,p.f)(s,(0,p.v)(a)),d=e.width/l.numColumns,m=e.height/l.numRows,c=2*n.length,u=(0,p.f)(c,(0,p.v)(o));e.setSize(u.numColumns*d,u.numRows*m)})(s,t,i)})),i.on("sidebarOpened",(e=>{let{isOpened:t}=e;l&&l(t)})),(0,a.x)({getTargetNodeItem:()=>t.item,renderApp:()=>{const{justCreatedFromSidebar:e}=i,{itemList:a,coverImage:s,fitImages:m,numRows:g}=t.getConfig();0===d.length&&(d=(e=>e.map((e=>null===e.image.source?null:{src:e.image.source,title:e.title,id:(0,r.Ak)(),altText:e.image.altText||""})).filter(u))(a));const f=(e=>{const t=e.map((e=>Object.assign(Object.assign({},e),{id:`${e.id}-pair`}))).reverse();return[...e,...t]})(d);return(0,n.jsx)(c,{theme:o.iF.themes.newPrimary,pairedImages:f,coverImageSrc:String(s.source),fitImages:m,forwardSetFlipped:t=>{e&&t(!0),l=t},rowsDitributionFromConfig:(0,p.v)(g)})},nodePrefix:"find-the-pair"})({script:t,editor:i})}},76838:(e,t,i)=>{i.d(t,{f:()=>r,v:()=>n});const n=e=>{if("auto"===e)return;const t=Number(e);if(!Number.isNaN(t))return t;console.warn("Cannot parse row distribution. Setting to auto",e)},r=(e,t)=>t?((e,t)=>e<t?{numColumns:1,numRows:e}:{numColumns:Math.ceil(e/t),numRows:t})(e,t):(e=>{if(e<4)return{numColumns:1,numRows:e};let t=4;for(;e%t!==0&&t<7;)t+=1;return{numColumns:t,numRows:Math.ceil(e/t)}})(e)},57277:(e,t,i)=>{i.d(t,{x:()=>r});var n=i(70377);function r(e){let{getTargetNodeItem:t,renderApp:i,nodePrefix:r}=e;return e=>{let{script:o,editor:a}=e,s=null;function l(e){s&&(n.unmountComponentAtNode(s),s=null),e&&"innerHtml"in e&&(e.innerHtml='<div class="card-iframe"><div style="width: 100%; height: 100%; background: #FF0000; color: #FFFFFF;">Deleted</div><script><\/script></div>')}function d(){s&&n.render(i(),s)}function m(){const e=t(o.getConfig());if(!e)return;const i=`${r}-${e.id}`;"innerHtml"in e&&(e.innerHtml=`<div class="card-iframe"><div id="${i}" class="genially-widget-app" style="width: 100%; height: 100%;"></div></div>`),requestAnimationFrame((()=>{s="idOfFreeNode"in e?document.getElementById(e.idOfFreeNode):document.getElementById(i),d()}))}o.on("configChange",(e=>{let{config:i,prevConfig:n}=e;const r=t(i),o=n?t(n):void 0;o&&o!==r&&l(o),r&&(r!==o?m():d())})),o.on("dispose",(()=>{l(t(o.getConfig()))})),a.on("itemMount",(e=>{let{item:t}=e;t===o.item&&m()})),a.on("itemUnmount",(e=>{let{item:t}=e;t===o.item&&l()}))}}}}]);
//# sourceMappingURL=https://s3-static-genially.genially.com/view/static/js/900.b2438af5.chunk.js.map