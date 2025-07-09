"use strict";(self.webpackChunk_genially_view_client=self.webpackChunk_genially_view_client||[]).push([[900],{91720:(e,t,i)=>{i.d(t,{Z:()=>m});var r=i(45992),n=i(62772),o=i(17588),s=i(97690);const a=e=>({transform:`${e.preTransforms.join(" ")} scale(${e.scale}) rotateX(${e.rotateX}deg) rotateY(${e.rotateY}deg) ${(0,s.Y)(e.rotateZ)}`,transition:e.transitions.join(", "),filter:e.filters.join(" ")});const l=e=>{const[t,i]=(0,o.useState)(null),[n,s]=(0,o.useState)(void 0),[l,d]=(0,o.useState)(void 0),[m,c]=(0,o.useState)(!1),u=(0,o.useRef)(null),p=(0,o.useCallback)((e=>{u.current=e,i(e)}),[]);(0,o.useEffect)((()=>{e&&(s(void 0),d(void 0),c(!1))}),[e]);const f=(0,o.useCallback)((i=>{if(!t||e)return;c(!0);const r=t.getBoundingClientRect(),n=(i.clientX-r.left)/r.width,o=(i.clientY-r.top)/r.height,a={coords:{x:Math.min(Math.max(n,0),1),y:Math.min(Math.max(o,0),1)}};s(a),m||d(a)}),[t,m,e]),g=(0,o.useCallback)((()=>{s(void 0),c(!1)}),[]),{innerCardStyle:h,specialFxLayerStyles:v}=function(e){let{hoveringState:t}=e;const i={scale:1,rotateX:0,rotateY:0,rotateZ:0,preTransforms:[],transitions:[],filters:[]};i.rotateZ+=0;const r=[],n=e=>{var t;return null!==(t=r[e])&&void 0!==t||(r[e]={scale:1,rotateX:0,rotateY:0,rotateZ:0,preTransforms:[],transitions:[],filters:[]}),r[e]},o="perspective(1500px)",s=n(0),l=n(1),d="cubic-bezier(0.89, -0.3, 0.18, 1.37)";i.transitions.push(`transform 400ms ${d}`),s.transitions.push("transform 100ms linear"),l.transitions.push(`filter 400ms ${d}`);const m=e=>`drop-shadow(rgba(0, 15, 51, ${e}) 0px 1px 8px)`;if(t){i.preTransforms.push(o),s.preTransforms.push(o),l.filters.push(m(.3)),i.scale+=.05;const{coords:e}=t,r=20;s.rotateX+=r*-(e.y-.5),s.rotateY+=r*(e.x-.5)}else l.filters.push(m(0));return{specialFxLayerStyles:r.filter((e=>!!e)).map((e=>Object.assign(Object.assign({},a(e)),{top:0,bottom:0,left:0,right:0,width:"100%",height:"100%"}))),innerCardStyle:Object.assign({},a(i))}}({hoveringState:!n&&m?l:n}),x=(e,t)=>0===t.length?e:(0,r.jsx)("div",{style:t[0],children:x(e,t.slice(1))});return{handleMouseEnterOrMove:f,handleMouseLeave:g,innerCardStyle:h,specialFxLayerStyles:v,setCardRef:p,wrapInsideStyledCard:x}};var d=i(11833);const m=e=>{let{title:t,frontImageSrc:i,coverImageSrc:o,fitImages:s,flipped:a,burned:m,onClick:c}=e;const u=Boolean(m),p=Boolean(a),{handleMouseEnterOrMove:f,handleMouseLeave:g,innerCardStyle:h,setCardRef:v,specialFxLayerStyles:x,wrapInsideStyledCard:b}=l(p);return b((0,r.jsxs)(d.Ox,{onMouseMove:f,onMouseEnter:f,onMouseLeave:g,role:"button",style:p?h:{},$burned:u,$flipped:p,ref:v,onClick:e=>{e.stopPropagation(),c&&c()},"aria-label":`Card showing ${p?"front":"back"} side with title: ${t}`,"aria-disabled":u,tabIndex:u?-1:0,children:[(0,r.jsx)("img",{style:{opacity:p?1:0,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:s?"contain":"cover",transition:`opacity ${d.uD}ms steps(1)`},src:i,alt:"front"}),(0,r.jsx)("img",{style:{opacity:p?0:1,position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:s?"contain":"cover",transition:`opacity ${d.uD}ms steps(1)`},src:o,alt:"cover"}),t&&(0,r.jsx)(d.aW,{hidden:!p,children:(0,r.jsx)(n.m_,{text:t,placement:n.m_.Position.TOP,fallbackPlacements:[n.m_.Position.TOP],renderReferencePortalNode:document.querySelector("body"),children:(0,r.jsx)(d.hE,{"data-testid":"card-title",children:t})})})]}),x)}},11833:(e,t,i)=>{i.d(t,{Ox:()=>l,aW:()=>s,hE:()=>a,rl:()=>n,uD:()=>o});var r=i(37577);const n=1e3,o=n/3.4,s=r.Ay.div({display:"flex",justifyContent:"center",alignItems:"center",flexShrink:0,position:"absolute",paddingLeft:"12px",paddingRight:"12px",bottom:0,left:0,userSelect:"none",minHeight:"25%",top:"75%",width:"100%",backgroundColor:"rgba(18,18,18,0.5)"}),a=r.Ay.p({color:"white",fontSize:12,textAlign:"center",fontStyle:"normal",fontWeight:400,lineHeight:"16px",overflow:"hidden",textOverflow:"ellipsis",wordWrap:"break-word",whiteSpace:"nowrap",pointerEvents:"none"}),l=r.Ay.div`
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
  animation-duration: ${n}ms;
  animation-delay: 0ms, ${n}ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-out, ease-in-out;
  perspective: 1500px;

  border-radius: ${e=>{let{theme:t}=e;return t.borderRadius.large}};

  /* HACK: We need to set border as important because .genially-embed is reseting our borders in the View */
  border: 1px solid
    ${e=>{let{theme:t,$flipped:i}=e;return i?t.color.border.primary.disabled():t.color.border.primary.default()}} !important;
  outline: 1px white solid;

  filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(0px 1px 4px rgba(0, 15, 51, 0.2))"}};

  &:hover {
    filter: ${e=>{let{$flipped:t}=e;return t?"":"drop-shadow(rgba(0, 15, 51, 0.3) 0px 1px 8px)"}};
    border-color: ${e=>{let{theme:t,$flipped:i}=e;return i?t.color.border.primary.disabled():t.color.border.primary.hover()}} !important;
  }

  ${s} {
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
    transition: opacity ${n}ms steps(1);
    transition-delay: ${n}ms;
    background-color: white;
    pointer-events: none;
  }
`},56292:(e,t,i)=>{i.d(t,{x:()=>d});var r=i(45992),n=i(40671),o=i(99049),s=i(76838),a=i(37577);const l=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.numColumns}, minmax(0, 1fr));
  grid-template-rows: repeat(${e=>e.numRows}, 1fr);
  grid-auto-flow: column;
  height: 100%;
  gap: 16px;
  padding: 8px;
  perspective: 1500px;
`,d=(a.Ay.canvas({width:"100%",height:"100%",pointerEvents:"none",position:"absolute",top:0,left:0,zIndex:3}),e=>{let{items:t,renderItem:i,keyExtractor:a,getComputedStyles:d,forcedRows:m}=e;const c=(0,s.f)(t.length,m);return(0,r.jsx)(l,{numColumns:c.numColumns,numRows:c.numRows,children:(0,r.jsx)(n.N,{children:t.map(((e,t)=>(0,r.jsx)(o.P.div,{layout:!0,style:d?d(e,t):void 0,initial:{opacity:0,scale:.7},animate:{opacity:1,scale:1},transition:{type:"spring",ease:"linear",stiffness:150,damping:20},"data-testid":`grid-item-${a(e)}`,children:i(e)},a(e))))})})})},900:(e,t,i)=>{i.r(t),i.d(t,{geniallyFindThePairEditorScript:()=>f});var r=i(45992),n=i(54072),o=i(62772),s=i(57277),a=i(17588),l=i(37577),d=i(91720),m=i(56292);const c=e=>{let{theme:t,pairedImages:i,fitImages:n,forwardSetFlipped:o,coverImageSrc:s,rowsDitributionFromConfig:c}=e;const[u,p]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{o(p)}),[o]),(0,r.jsx)(l.NP,{theme:t,children:(0,r.jsx)(m.x,{items:i,forcedRows:c,renderItem:e=>(0,r.jsx)(d.Z,{title:e.title,frontImageSrc:e.src,coverImageSrc:s,fitImages:n,flipped:u}),keyExtractor:e=>e.id,getComputedStyles:()=>({pointerEvents:"none"})})})};var u=i(76838);const p=e=>null!==e,f=e=>{let{script:t,editor:i}=e;const a=t.item;let l;if(!a)return;a.thumbnail="https://static.genially.com/widgets/find-the-pair-thumbnail";let d=[];t.on("configChange",(e=>{let{config:t,prevConfig:i}=e;if(!i)return;const{itemList:r}=t,{itemList:o}=i;d=((e,t,i)=>e.map(((e,r)=>{var o;if(r>=t.length&&e.image)return{src:e.image.source||"",title:e.title,altText:e.image.altText||"",id:(0,n.Ak)()};const s=t[r];return(null===s||void 0===s?void 0:s.image)&&e.image&&(e.image.source!==s.image.source||e.title!==s.title||e.image.altText!==s.image.altText)?Object.assign(Object.assign({},i[r]),{src:(null===(o=e.image)||void 0===o?void 0:o.source)||"",title:e.title,altText:e.image.altText||""}):i[r]})))(r,o,d),((e,t,i)=>{const{itemList:r}=t,{itemList:n}=i,{numRows:o}=t,{numRows:s}=i;if(0===r.length-n.length&&o===s)return;const a=2*n.length,l=(0,u.f)(a,(0,u.v)(s)),d=e.width/l.numColumns,m=e.height/l.numRows,c=2*r.length,p=(0,u.f)(c,(0,u.v)(o));e.setSize(p.numColumns*d,p.numRows*m)})(a,t,i)})),i.on("sidebarOpened",(e=>{let{isOpened:t}=e;l&&l(t)})),(0,s.x)({getTargetNodeItem:()=>t.item,renderApp:()=>{const{justCreatedFromSidebar:e}=i,{itemList:s,coverImage:a,fitImages:m,numRows:f}=t.getConfig();0===d.length&&(d=(e=>e.map((e=>null===e.image.source?null:{src:e.image.source,title:e.title,id:(0,n.Ak)(),altText:e.image.altText||""})).filter(p))(s));const g=(e=>{const t=e.map((e=>Object.assign(Object.assign({},e),{id:`${e.id}-pair`}))).reverse();return[...e,...t]})(d);return(0,r.jsx)(c,{theme:o.iF.themes.newPrimary,pairedImages:g,coverImageSrc:String(a.source),fitImages:m,forwardSetFlipped:t=>{e&&t(!0),l=t},rowsDitributionFromConfig:(0,u.v)(f)})},nodePrefix:"find-the-pair"})({script:t,editor:i})}},76838:(e,t,i)=>{i.d(t,{f:()=>n,v:()=>r});const r=e=>{if("auto"===e)return;const t=Number(e);if(!Number.isNaN(t))return t;console.warn("Cannot parse row distribution. Setting to auto",e)},n=(e,t)=>t?((e,t)=>e<t?{numColumns:1,numRows:e}:{numColumns:Math.ceil(e/t),numRows:t})(e,t):(e=>{if(e<4)return{numColumns:1,numRows:e};let t=4;for(;e%t!==0&&t<7;)t+=1;return{numColumns:t,numRows:Math.ceil(e/t)}})(e)},57277:(e,t,i)=>{i.d(t,{x:()=>n});var r=i(70377);function n(e){let{getTargetNodeItem:t,renderApp:i,nodePrefix:n}=e;return e=>{let{script:o,editor:s}=e,a=null;function l(e){a&&(r.unmountComponentAtNode(a),a=null),e&&"innerHtml"in e&&(e.innerHtml='<div class="card-iframe"><div style="width: 100%; height: 100%; background: #FF0000; color: #FFFFFF;">Deleted</div><script><\/script></div>')}function d(){a&&r.render(i(),a)}function m(){const e=t(o.getConfig());if(!e)return;const i=`${n}-${e.id}`;"innerHtml"in e&&(e.innerHtml=`<div class="card-iframe"><div id="${i}" class="genially-widget-app" style="width: 100%; height: 100%;"></div></div>`),requestAnimationFrame((()=>{a="idOfFreeNode"in e?document.getElementById(e.idOfFreeNode):document.getElementById(i),d()}))}o.on("configChange",(e=>{let{config:i,prevConfig:r}=e;const n=t(i),o=r?t(r):void 0;o&&o!==n&&l(o),n&&(n!==o?m():d())})),o.on("dispose",(()=>{l(t(o.getConfig()))})),s.on("itemMount",(e=>{let{item:t}=e;t===o.item&&m()})),s.on("itemUnmount",(e=>{let{item:t}=e;t===o.item&&l()}))}}}}]);
//# sourceMappingURL=https://s3-static-genially.genially.com/view/static/js/900.545ff866.chunk.js.map