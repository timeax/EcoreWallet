import{r as p,P as Ie,Z as G,i as V,c as z,D as Y,O as Q,l as Re,I as _e,R as O,j as a}from"./app-CXhxP4IC.js";import{s as pe,b as F}from"./index-uIOWaCi_.js";import{B as De}from"./index-BWw7OOr8.js";import{T as d}from"./index-ByMu0qn2.js";import{C as Ne,u as We,a as Le,d as Me,e as Ae,E as ze,k as Fe,f as He,b as ee,g as Be,P as Ue}from"./tooltip.esm-A3nGpM54.js";import{C as oe,T as $e}from"./index.esm-CrCcFfvx.js";import{R as Ve}from"./ripple.esm-CLCo6fDN.js";import{P as C,C as le}from"./currency-format-Dx_jRBKB.js";import{k as Ke,i as Ze}from"./index-SyAJMH_1.js";function W(){return W=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},W.apply(this,arguments)}function H(e){"@babel/helpers - typeof";return H=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},H(e)}function Je(e,n){if(H(e)!=="object"||e===null)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var i=t.call(e,n||"default");if(H(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}function Xe(e){var n=Je(e,"string");return H(n)==="symbol"?n:String(n)}function qe(e,n,t){return n=Xe(n),n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Ge(e){if(Array.isArray(e))return e}function Ye(e,n){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var i,r,o,s,l=[],f=!0,c=!1;try{if(o=(t=t.call(e)).next,n!==0)for(;!(f=(i=o.call(t)).done)&&(l.push(i.value),l.length!==n);f=!0);}catch(h){c=!0,r=h}finally{try{if(!f&&t.return!=null&&(s=t.return(),Object(s)!==s))return}finally{if(c)throw r}}return l}}function ce(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}function Qe(e,n){if(e){if(typeof e=="string")return ce(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ce(e,n)}}function en(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ne(e,n){return Ge(e)||Ye(e,n)||Qe(e,n)||en()}var nn={closeButton:"p-sidebar-close p-sidebar-icon p-link",closeIcon:"p-sidebar-close-icon",mask:function(n){var t=n.props,i=n.maskVisibleState,r=["left","right","top","bottom"],o=r.find(function(s){return s===t.position});return z("p-sidebar-mask",o&&!t.fullScreen?"p-sidebar-".concat(o):"",{"p-component-overlay p-component-overlay-enter":t.modal,"p-sidebar-mask-scrollblocker":t.blockScroll,"p-sidebar-visible":i,"p-sidebar-full":t.fullScreen},t.maskClassName)},header:function(n){var t=n.props;return z("p-sidebar-header",{"p-sidebar-custom-header":t.header})},content:"p-sidebar-content",icons:"p-sidebar-icons",root:function(n){n.props;var t=n.context;return z("p-sidebar p-component",{"p-input-filled":t&&t.inputStyle==="filled"||V.inputStyle==="filled","p-ripple-disabled":t&&t.ripple===!1||V.ripple===!1})},transition:"p-sidebar"},tn=`
@layer primereact {
    .p-sidebar-mask {
        display: none;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        background-color: transparent;
        transition-property: background-color;
    }
    
    .p-sidebar-visible {
        display: flex;
    }
    
    .p-sidebar-mask.p-component-overlay {
        pointer-events: auto;
    }
    
    .p-sidebar {
        display: flex;
        flex-direction: column;
        pointer-events: auto;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
    }
    
    .p-sidebar-content {
        overflow-y: auto;
        flex-grow: 1;
    }
    
    .p-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    
    .p-sidebar-custom-header {
        justify-content: space-between;
    }
    
    .p-sidebar-icons {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }
    
    .p-sidebar-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
    }
    
    .p-sidebar-full .p-sidebar {
        transition: none;
        transform: none;
        width: 100vw;
        height: 100vh;
        max-height: 100%;
        top: 0px;
        left: 0px;
    }
    
    /* Animation */
    /* Top, Bottom, Left and Right */
    .p-sidebar-top .p-sidebar-enter,
    .p-sidebar-top .p-sidebar-exit-active {
        transform: translate3d(0px, -100%, 0px);
    }
    
    .p-sidebar-bottom .p-sidebar-enter,
    .p-sidebar-bottom .p-sidebar-exit-active {
        transform: translate3d(0px, 100%, 0px);
    }
    
    .p-sidebar-left .p-sidebar-enter,
    .p-sidebar-left .p-sidebar-exit-active {
        transform: translate3d(-100%, 0px, 0px);
    }
    
    .p-sidebar-right .p-sidebar-enter,
    .p-sidebar-right .p-sidebar-exit-active {
        transform: translate3d(100%, 0px, 0px);
    }
    
    .p-sidebar-top .p-sidebar-enter-active,
    .p-sidebar-bottom .p-sidebar-enter-active,
    .p-sidebar-left .p-sidebar-enter-active,
    .p-sidebar-right .p-sidebar-enter-active {
        transform: translate3d(0px, 0px, 0px);
        transition: all 0.3s;
    }
    
    .p-sidebar-top .p-sidebar-enter-done,
    .p-sidebar-bottom .p-sidebar-enter-done,
    .p-sidebar-left .p-sidebar-enter-done,
    .p-sidebar-right .p-sidebar-enter-done {
        transform: none;
    }
    
    .p-sidebar-top .p-sidebar-exit-active,
    .p-sidebar-bottom .p-sidebar-exit-active,
    .p-sidebar-left .p-sidebar-exit-active,
    .p-sidebar-right .p-sidebar-exit-active {
        transition: all 0.3s;
    }
    
    /* Full */
    .p-sidebar-full .p-sidebar-enter {
        opacity: 0;
        transform: scale(0.5);
    }
    
    .p-sidebar-full .p-sidebar-enter-active {
        opacity: 1;
        transform: scale(1);
        transition: all 0.15s cubic-bezier(0, 0, 0.2, 1);
    }
    
    .p-sidebar-full .p-sidebar-enter-done {
        transform: none;
    }
    
    .p-sidebar-full .p-sidebar-exit-active {
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Size */
    .p-sidebar-left .p-sidebar {
        width: 20rem;
        height: 100%;
    }
    
    .p-sidebar-right .p-sidebar {
        width: 20rem;
        height: 100%;
    }
    
    .p-sidebar-top .p-sidebar {
        height: 10rem;
        width: 100%;
    }
    
    .p-sidebar-bottom .p-sidebar {
        height: 10rem;
        width: 100%;
    }
    
    .p-sidebar-left .p-sidebar-sm,
    .p-sidebar-right .p-sidebar-sm {
        width: 20rem;
    }
    
    .p-sidebar-left .p-sidebar-md,
    .p-sidebar-right .p-sidebar-md {
        width: 40rem;
    }
    
    .p-sidebar-left .p-sidebar-lg,
    .p-sidebar-right .p-sidebar-lg {
        width: 60rem;
    }
    
    .p-sidebar-top .p-sidebar-sm,
    .p-sidebar-bottom .p-sidebar-sm {
        height: 10rem;
    }
    
    .p-sidebar-top .p-sidebar-md,
    .p-sidebar-bottom .p-sidebar-md {
        height: 20rem;
    }
    
    .p-sidebar-top .p-sidebar-lg,
    .p-sidebar-bottom .p-sidebar-lg {
        height: 30rem;
    }
    
    .p-sidebar-left .p-sidebar-view,
    .p-sidebar-right .p-sidebar-view,
    .p-sidebar-top .p-sidebar-view,
    .p-sidebar-bottom .p-sidebar-view {
        width: 100%;
        height: 100%;
    }
    
    .p-sidebar-left .p-sidebar-content,
    .p-sidebar-right .p-sidebar-content,
    .p-sidebar-top .p-sidebar-content,
    .p-sidebar-bottom .p-sidebar-content {
        width: 100%;
        height: 100%;
    }
    
    @media screen and (max-width: 64em) {
        .p-sidebar-left .p-sidebar-lg,
        .p-sidebar-left .p-sidebar-md,
        .p-sidebar-right .p-sidebar-lg,
        .p-sidebar-right .p-sidebar-md {
            width: 20rem;
        }
    }        
}
`,rn={mask:function(n){var t=n.props;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:t.position==="left"?"flex-start":t.position==="right"?"flex-end":"center",alignItems:t.position==="top"?"flex-start":t.position==="bottom"?"flex-end":"center"}}},$=Ne.extend({defaultProps:{__TYPE:"Sidebar",appendTo:null,ariaCloseLabel:null,baseZIndex:0,blockScroll:!1,children:void 0,className:null,closeIcon:null,closeOnEscape:!0,content:null,dismissable:!0,fullScreen:!1,header:null,icons:null,id:null,maskClassName:null,maskStyle:null,modal:!0,onHide:null,onShow:null,position:"left",showCloseIcon:!0,style:null,transitionOptions:null,visible:!1},css:{classes:nn,styles:tn,inlineStyles:rn}});function de(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,i)}return t}function an(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?de(Object(t),!0).forEach(function(i){qe(e,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):de(Object(t)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(t,i))})}return e}var fe=p.forwardRef(function(e,n){var t=We(),i=p.useContext(Ie),r=$.getProps(e,i),o=p.useState(!1),s=ne(o,2),l=s[0],f=s[1],c=p.useState(!1),h=ne(c,2),k=h[0],I=h[1],g=$.setMetaData({props:r,state:{containerVisible:l}}),x=g.ptm,y=g.cx,R=g.sx,w=g.isUnstyled;Le($.css.styles,w,{name:"sidebar"});var b=p.useRef(null),v=p.useRef(null),j=p.useRef(null),D=k&&r.closeOnEscape,_=Me("sidebar",D);Ae({callback:function(u){S(u)},when:D&&_,priority:[ze.SIDEBAR,_]});var L=Fe({type:"click",listener:function(u){u.button===0&&J(u)&&S(u)}}),N=ne(L,2),B=N[0],T=N[1],J=function(u){return b&&b.current&&!b.current.contains(u.target)},P=function(){var u=document.activeElement,A=u&&b&&b.current.contains(u);!A&&r.showCloseIcon&&j.current&&j.current.focus()},M=function(u){r.dismissable&&r.modal&&v.current===u.target&&S(u)},S=function(u){r.onHide(),u.preventDefault()},X=function(){r.onShow&&r.onShow(),P(),be()},q=function(){r.modal&&!w()&&Y.addClass(v.current,"p-component-overlay-leave")},he=function(){G.clear(v.current),f(!1),re()},be=function(){r.dismissable&&!r.modal&&B(),r.blockScroll&&Y.blockBodyScroll()},re=function(){T(),r.blockScroll&&Y.unblockBodyScroll()};p.useImperativeHandle(n,function(){return{props:r,getElement:function(){return b.current},gteMask:function(){return v.current},getCloseIcon:function(){return j.current}}}),He(function(){r.visible&&f(!0)}),ee(function(){r.visible&&!l&&f(!0),r.visible!==k&&l&&I(r.visible)}),ee(function(){l&&(G.set("modal",v.current,i&&i.autoZIndex||V.autoZIndex,r.baseZIndex||i&&i.zIndex.modal||V.zIndex.modal),I(!0))},[l]),ee(function(){k&&(T(),r.dismissable&&!r.modal&&B())},[r.dismissable,r.modal,k]),Be(function(){re(),v.current&&G.clear(v.current)});var ye=function(){var u=r.ariaCloseLabel||Re("close"),A=t({type:"button",ref:j,className:y("closeButton"),onClick:function(Ce){return S(Ce)},"aria-label":u},x("closeButton")),U=t({className:y("closeIcon")},x("closeIcon")),Pe=r.closeIcon||p.createElement($e,U),Oe=_e.getJSXIcon(Pe,an({},U),{props:r});return r.showCloseIcon?p.createElement("button",A,Oe,p.createElement(Ve,null)):null},ve=function(){return r.header?Q.getJSXElement(r.header,r):null},xe=function(){return r.icons?Q.getJSXElement(r.icons,r):null},ie=t({ref:v,style:R("mask"),className:y("mask",{maskVisibleState:l}),onMouseDown:function(u){return M(u)}},x("mask")),ae=t({id:r.id,className:z(r.className,y("root",{context:i})),style:r.style,role:"complementary"},$.getOtherProps(r),x("root")),ge=t({className:y("header")},x("header")),je=t({className:y("content")},x("content")),we=t({className:y("icons")},x("icons")),ke={enter:r.fullScreen?150:300,exit:r.fullScreen?150:300},se=t({classNames:y("transition"),in:k,timeout:ke,options:r.transitionOptions,unmountOnExit:!0,onEntered:X,onExiting:q,onExited:he},x("transition")),Se=function(){var u={closeIconRef:j,hide:S};return p.createElement("div",ie,p.createElement(oe,W({nodeRef:b},se),p.createElement("div",W({ref:b},ae),Q.getJSXElement(e.content,u))))},Ee=function(){var u=ye(),A=xe(),U=ve();return p.createElement("div",ie,p.createElement(oe,W({nodeRef:b},se),p.createElement("div",W({ref:b},ae),p.createElement("div",ge,U,p.createElement("div",we,A,u)),p.createElement("div",je,r.children))))},Te=function(){var u=e!=null&&e.content?Se():Ee();return p.createElement(Ue,{element:u,appendTo:r.appendTo,visible:!0})};return l&&Te()});fe.displayName="Sidebar";var sn=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},on=function(){function e(n,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}();function ln(e,n){var t={};for(var i in e)n.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}function cn(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function dn(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n&&(typeof n=="object"||typeof n=="function")?n:e}function un(e,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var te=function(e){un(n,e);function n(){var t;cn(this,n);for(var i=arguments.length,r=Array(i),o=0;o<i;o++)r[o]=arguments[o];var s=dn(this,(t=n.__proto__||Object.getPrototypeOf(n)).call.apply(t,[this].concat(r)));return s.state={},s.styles={ellipsis:{position:"fixed",visibility:"hidden",top:0,left:0}},s.elements={},s.onResize=s.onResize.bind(s),s.onTruncate=s.onTruncate.bind(s),s.calcTargetWidth=s.calcTargetWidth.bind(s),s.measureWidth=s.measureWidth.bind(s),s.getLines=s.getLines.bind(s),s.renderLine=s.renderLine.bind(s),s}return on(n,[{key:"componentDidMount",value:function(){var i=this.elements.text,r=this.calcTargetWidth,o=this.onResize,s=document.createElement("canvas");this.canvasContext=s.getContext("2d"),r(function(){i&&i.parentNode.removeChild(i)}),window.addEventListener("resize",o)}},{key:"componentDidUpdate",value:function(i){this.props.children!==i.children&&this.forceUpdate(),this.props.width!==i.width&&this.calcTargetWidth()}},{key:"componentWillUnmount",value:function(){var i=this.elements.ellipsis,r=this.onResize,o=this.timeout;i.parentNode.removeChild(i),window.removeEventListener("resize",r),window.cancelAnimationFrame(o)}},{key:"innerText",value:function(i){var r=document.createElement("div"),o="innerText"in window.HTMLElement.prototype?"innerText":"textContent";r.innerHTML=i.innerHTML.replace(/\r\n|\r|\n/g," ");var s=r[o],l=document.createElement("div");return l.innerHTML="foo<br/>bar",l[o].replace(/\r\n|\r/g,`
`)!==`foo
bar`&&(r.innerHTML=r.innerHTML.replace(/<br.*?[\/]?>/gi,`
`),s=r[o]),s}},{key:"onResize",value:function(){this.calcTargetWidth()}},{key:"onTruncate",value:function(i){var r=this.props.onTruncate;typeof r=="function"&&(this.timeout=window.requestAnimationFrame(function(){r(i)}))}},{key:"calcTargetWidth",value:function(i){var r=this.elements.target,o=this.calcTargetWidth,s=this.canvasContext,l=this.props.width;if(r){var f=l||Math.floor(r.parentNode.getBoundingClientRect().width);if(!f)return window.requestAnimationFrame(function(){return o(i)});var c=window.getComputedStyle(r),h=[c["font-weight"],c["font-style"],c["font-size"],c["font-family"]].join(" ");s.font=h,this.setState({targetWidth:f},i)}}},{key:"measureWidth",value:function(i){return this.canvasContext.measureText(i).width}},{key:"ellipsisWidth",value:function(i){return i.offsetWidth}},{key:"trimRight",value:function(i){return i.replace(/\s+$/,"")}},{key:"getLines",value:function(){for(var i=this.elements,r=this.props,o=r.lines,s=r.ellipsis,l=r.trimWhitespace,f=this.state.targetWidth,c=this.innerText,h=this.measureWidth,k=this.onTruncate,I=this.trimRight,g=[],x=c(i.text),y=x.split(`
`).map(function(q){return q.split(" ")}),R=!0,w=this.ellipsisWidth(this.elements.ellipsis),b=1;b<=o;b++){var v=y[0];if(v.length===0){g.push(),y.shift(),b--;continue}var j=v.join(" ");if(h(j)<=f&&y.length===1){R=!1,g.push(j);break}if(b===o){for(var D=v.join(" "),_=0,L=D.length-1;_<=L;){var N=Math.floor((_+L)/2),B=D.slice(0,N+1);h(B)+w<=f?_=N+1:L=N-1}var T=D.slice(0,_);if(l)for(T=I(T);!T.length&&g.length;){var J=g.pop();T=I(J)}j=O.createElement("span",null,T,s)}else{for(var P=0,M=v.length-1;P<=M;){var S=Math.floor((P+M)/2),X=v.slice(0,S+1).join(" ");h(X)<=f?P=S+1:M=S-1}if(P===0){b=o-1;continue}j=v.slice(0,P).join(" "),y[0].splice(0,P)}g.push(j)}return k(R),g}},{key:"renderLine",value:function(i,r,o){if(r===o.length-1)return O.createElement("span",{key:r},i);var s=O.createElement("br",{key:r+"br"});return i?[O.createElement("span",{key:r},i),s]:s}},{key:"render",value:function(){var i=this,r=this.elements.target,o=this.props,s=o.children,l=o.ellipsis,f=o.lines,c=ln(o,["children","ellipsis","lines"]),h=this.state.targetWidth,k=this.getLines,I=this.renderLine,g=this.onTruncate,x=void 0,y=!!(r&&h);return typeof window<"u"&&y&&(f>0?x=k().map(I):(x=s,g(!1))),delete c.onTruncate,delete c.trimWhitespace,O.createElement("span",sn({},c,{ref:function(w){i.elements.target=w}}),O.createElement("span",null,x),O.createElement("span",{ref:function(w){i.elements.text=w}},s),O.createElement("span",{ref:function(w){i.elements.ellipsis=w},style:this.styles.ellipsis},l))}}]),n}(p.Component);te.propTypes={children:C.node,ellipsis:C.node,lines:C.oneOfType([C.oneOf([!1]),C.number]),trimWhitespace:C.bool,width:C.number,onTruncate:C.func};te.defaultProps={children:"",ellipsis:"…",lines:1,trimWhitespace:!1,width:0};const me=p.createContext({});function In(){return p.useContext(me).setData}function ue(e){var n;if(e){const t=((n=e==null?void 0:e.details)==null?void 0:n.toLowerCase())||"";if(t){if(t.includes("deposit"))return"Deposit";if(t.includes("exchange"))return"Exchange";if(t.includes("withdraw"))return"Withdraw";if(t.includes("transfer"))return"Transfer"}}return"Transaction"}const Rn=({children:e,...n})=>{const[t,i]=p.useState(),r=a.jsxs(d,{noPad:!0,xl:!0,medium:!0,children:[ue(t==null?void 0:t.data)," details"]}),o=s=>{var l,f;if(s){const c=((f=(l=s==null?void 0:s.data)==null?void 0:l.details)==null?void 0:f.toLowerCase())||"";if(c.includes("deposit"))return xn(s);if(c.includes("exchange"))return yn(s);if(c.includes("withdraw"))return fn(s);if(c.includes("transfer"))return hn(s)}};return a.jsxs(me.Provider,{value:{...n,setData:(s=null)=>{if(s&&s.data){const l=s.data,f=l.currency_id;switch(l.currency=n.currencies.find(c=>{var h;return c.id==((h=s.data)==null?void 0:h.currency_id)}),ue(s.data)){case"Deposit":l.deposit=n.deposits.find(c=>c.cryptomus_uuid===(l==null?void 0:l.ref));break;case"Exchange":l.exchanges=n.exchanges.find(c=>c.transaction_id===l.trnx&&(l.type==="+"&&c.to==f||l.type=="-"&&c.from==f));break;case"Withdraw":l.withdrawals=n.withdrawals.find(c=>c.trx==l.ref);case"Transfer":l.transfers=n.transfers.find(c=>c.transaction_ref==l.ref)}}i(s)}},children:[a.jsx(fe,{position:"right",header:r,visible:!!t,onHide:()=>i(null),children:o(t)}),e]})};function K(e,n){return a.jsx("div",{className:"mt-4 px-1",children:e.map(t=>{var i,r,o;return a.jsxs("div",{className:"flex items-center py-1.5",children:[a.jsx(d,{md:!0,noPad:!0,light:!0,bright:!0,children:t.name}),a.jsx("div",{className:"flex justify-end grow",children:pe(t.render,(r=t.render)==null?void 0:r.call(t,(i=n.data)==null?void 0:i[t.key]),a.jsx(d,{children:(o=n.data)==null?void 0:o[t.key]}))})]},t.name)})})}const pn=[{name:"Status",key:"status",render(e){return a.jsx(Z,{stats:e,value:e})}},{name:"Date",key:"updated_at",render(e){const n=F(e);return a.jsxs(d,{className:"flex items-center gap-2",children:[a.jsx("span",{children:n.localTime})," ",n.time]})}},{name:"Coin",key:"currency",render(e){return a.jsx(d,{noPad:!0,light:!0,children:e.code})}},{name:"Withdraw amount",key:"amount"},{name:"Network",key:"withdrawals",render(e){return a.jsx(d,{children:e==null?void 0:e.network})}},{name:"Fees",key:"charge",render(e){return e<=0?a.jsx(d,{noPad:!0,children:"No Fees"}):a.jsx(d,{noPad:!0,children:e})}},{name:"Ref",key:"ref",render(e){return a.jsx(E,{value:e})}},{name:"TxID",key:"trnx",render(e){return a.jsx(E,{value:e})}}],fn=e=>a.jsx(a.Fragment,{children:K(pn,e)}),mn=[{key:"status",name:"Status",render(e){return a.jsx(Z,{stats:e,value:e})}},{name:"Date",key:"updated_at",render(e){const n=F(e);return a.jsxs(d,{className:"flex items-center gap-2",children:[a.jsx("span",{children:n.localTime})," ",n.time]})}},{key:"amount",name:"Amount"},{key:"currency",name:"Coin",render(e){return a.jsx(d,{noPad:!0,children:e.code})}},{name:"Transaction Fees",key:"charge",render(e){return e<=0?a.jsx(d,{noPad:!0,children:"No Fees"}):a.jsx(d,{noPad:!0,children:e})}},{name:"Transaction ID",key:"trnx",render(e){return a.jsx(E,{value:e})}},{name:"Ref",key:"ref",render(e){return a.jsx(E,{value:e.transaction_id})}}],hn=e=>K(mn,e),bn=[{key:"status",name:"Status",render(e){return a.jsx(Z,{stats:e,value:e})}},{key:"exchanges",name:"Exchange Type",render(e){return a.jsx(d,{noPad:!0,children:e.type})}},{name:"Date",key:"updated_at",render(e){const n=F(e);return a.jsxs(d,{className:"flex items-center gap-2",children:[a.jsx("span",{children:n.localTime})," ",n.time]})}},{key:"amount",name:"Exchange Amount"},{key:"currency",name:"Coin",render(e){return a.jsx(d,{noPad:!0,children:e.code})}},{name:"Trade Category",key:"type",render(e){return e==="+"?a.jsx(d,{noPad:!0,children:"Buy"}):a.jsx(d,{noPad:!0,children:"Sell"})}},{name:"Transaction Fees",key:"charge",render(e){return e<=0?a.jsx(d,{noPad:!0,children:"No Fees"}):a.jsx(d,{noPad:!0,children:e})}},{name:"Rate",key:"exchanges",render(e){return console.log(e),a.jsx(d,{children:a.jsx(le,{thousandSeparator:!0,displayType:"text",value:e==null?void 0:e.rate})})}},{name:"Limit Rate",key:"exchanges",render(e){return e.limit_rate?a.jsx("div",{children:a.jsx(d,{noPad:!0,children:a.jsx(le,{thousandSeparator:!0,displayType:"text",value:e.limit_rate})})}):a.jsx(d,{noPad:!0,children:"Unset"})}},{name:"Expiry Date",key:"exchanges",render(e){if(e.expire_in){const n=F(e.updated_at);return a.jsxs(d,{className:"flex gap-2",noPad:!0,children:[a.jsx("span",{children:n.date})," ",n.time]})}return a.jsx(d,{noPad:!0,children:"Unset"})}},{name:"Transaction Ref",key:"ref",render(e){return a.jsx(E,{value:e})}},{name:"Exchange Ref",key:"exchanges",render(e){return a.jsx(E,{value:e.transaction_id})}}],yn=e=>{var n,t;return a.jsxs(a.Fragment,{children:[K(bn,e),pe(((t=(n=e.data)==null?void 0:n.exchanges)==null?void 0:t.status)=="pending",a.jsx(a.Fragment,{children:a.jsx("div",{className:"flex mt-4",children:a.jsx(De,{variant:"contained",className:"grow",centered:!0,bgColor:"warning",size:"normal",children:"Cancel"})})}))]})},vn=[{name:"Status",key:"status",render(e){return a.jsx(Z,{stats:e,value:e})}},{name:"Date",key:"updated_at",render(e){const n=F(e);return a.jsxs(d,{className:"flex items-center gap-2",children:[a.jsx("span",{children:n.localTime})," ",n.time]})}},{name:"Coin",key:"currency",render(e){return a.jsx(d,{noPad:!0,light:!0,children:e.code})}},{name:"Deposit amount",key:"amount"},{name:"Network",key:"deposit",render(e){return a.jsx(d,{children:e.network})}},{name:"Address",key:"deposit",render(e){return a.jsx(E,{value:e.wallet_address})}},{name:"Ref",key:"ref",render(e){return a.jsx(E,{value:e})}},{name:"TxID",key:"trnx",render(e){return a.jsx(E,{value:e})}}],xn=e=>K(vn,e),E=({value:e})=>a.jsxs("div",{className:"flex gap-3 items-center",children:[a.jsx(d,{noPad:!0,children:a.jsx(te,{width:150,ellipsis:a.jsx("span",{children:"..."}),children:e})}),a.jsxs("div",{className:"flex gap-2",children:[a.jsx(d,{noPad:!0,brighter:!0,children:a.jsx(Ke,{})}),a.jsx(d,{noPad:!0,brighter:!0,children:a.jsx(Ze,{})})]})]}),Z=({value:e,stats:n,textProps:t={}})=>(n=n.toLowerCase(),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:z("border-4 rounded-full",{"border-success-400":n.includes("success"),"bg-danger":n.includes("fail"),"bg-warning":n.includes("pend")||n.includes("cancel")})}),a.jsx(d,{noPad:!0,sm:!0,medium:!0,...t,children:e})]}));export{E as C,Z as S,Rn as T,In as u};
