import{r as s,P as ve,Z as j,i as P,c as C,D as R,O as D,l as ye,I as he}from"./app-DPeqRPcX.js";import{C as ge,u as xe,a as Se,d as Ee,e as we,k as ke,f as Ie,b as _,g as Oe,E as Ce}from"./componentbase.esm-CEyx904k.js";import{C as J,T as Pe}from"./index.esm-UiDtkRAd.js";import{P as je}from"./portal.esm-ZPKbRoAC.js";import{R as Re}from"./ripple.esm-BKB6VsNq.js";function v(){return v=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a])}return n},v.apply(this,arguments)}function S(n){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(n)}function De(n,t){if(S(n)!=="object"||n===null)return n;var e=n[Symbol.toPrimitive];if(e!==void 0){var a=e.call(n,t||"default");if(S(a)!=="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(n)}function _e(n){var t=De(n,"string");return S(t)==="symbol"?t:String(t)}function Te(n,t,e){return t=_e(t),t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function Ne(n){if(Array.isArray(n))return n}function Ae(n,t){var e=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(e!=null){var a,r,f,p,l=[],m=!0,E=!1;try{if(f=(e=e.call(n)).next,t!==0)for(;!(m=(a=f.call(e)).done)&&(l.push(a.value),l.length!==t);m=!0);}catch(w){E=!0,r=w}finally{try{if(!m&&e.return!=null&&(p=e.return(),Object(p)!==p))return}finally{if(E)throw r}}return l}}function K(n,t){(t==null||t>n.length)&&(t=n.length);for(var e=0,a=new Array(t);e<t;e++)a[e]=n[e];return a}function Me(n,t){if(n){if(typeof n=="string")return K(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);if(e==="Object"&&n.constructor&&(e=n.constructor.name),e==="Map"||e==="Set")return Array.from(n);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return K(n,t)}}function Be(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function T(n,t){return Ne(n)||Ae(n,t)||Me(n,t)||Be()}var Le={closeButton:"p-sidebar-close p-sidebar-icon p-link",closeIcon:"p-sidebar-close-icon",mask:function(t){var e=t.props,a=t.maskVisibleState,r=["left","right","top","bottom"],f=r.find(function(p){return p===e.position});return C("p-sidebar-mask",f&&!e.fullScreen?"p-sidebar-".concat(f):"",{"p-component-overlay p-component-overlay-enter":e.modal,"p-sidebar-mask-scrollblocker":e.blockScroll,"p-sidebar-visible":a,"p-sidebar-full":e.fullScreen},e.maskClassName)},header:function(t){var e=t.props;return C("p-sidebar-header",{"p-sidebar-custom-header":e.header})},content:"p-sidebar-content",icons:"p-sidebar-icons",root:function(t){t.props;var e=t.context;return C("p-sidebar p-component",{"p-input-filled":e&&e.inputStyle==="filled"||P.inputStyle==="filled","p-ripple-disabled":e&&e.ripple===!1||P.ripple===!1})},transition:"p-sidebar"},He=`
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
`,Ue={mask:function(t){var e=t.props;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:e.position==="left"?"flex-start":e.position==="right"?"flex-end":"center",alignItems:e.position==="top"?"flex-start":e.position==="bottom"?"flex-end":"center"}}},O=ge.extend({defaultProps:{__TYPE:"Sidebar",appendTo:null,ariaCloseLabel:null,baseZIndex:0,blockScroll:!1,children:void 0,className:null,closeIcon:null,closeOnEscape:!0,content:null,dismissable:!0,fullScreen:!1,header:null,icons:null,id:null,maskClassName:null,maskStyle:null,modal:!0,onHide:null,onShow:null,position:"left",showCloseIcon:!0,style:null,transitionOptions:null,visible:!1},css:{classes:Le,styles:He,inlineStyles:Ue}});function X(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),e.push.apply(e,a)}return e}function Ve(n){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?X(Object(e),!0).forEach(function(a){Te(n,a,e[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):X(Object(e)).forEach(function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(e,a))})}return n}var Ze=s.forwardRef(function(n,t){var e=xe(),a=s.useContext(ve),r=O.getProps(n,a),f=s.useState(!1),p=T(f,2),l=p[0],m=p[1],E=s.useState(!1),w=T(E,2),y=w[0],N=w[1],k=O.setMetaData({props:r,state:{containerVisible:l}}),d=k.ptm,u=k.cx,G=k.sx,A=k.isUnstyled;Se(O.css.styles,A,{name:"sidebar"});var c=s.useRef(null),b=s.useRef(null),h=s.useRef(null),M=y&&r.closeOnEscape,B=Ee("sidebar",M);we({callback:function(i){g(i)},when:M&&B,priority:[Ce.SIDEBAR,B]});var Y=ke({type:"click",listener:function(i){i.button===0&&F(i)&&g(i)}}),L=T(Y,2),H=L[0],U=L[1],F=function(i){return c&&c.current&&!c.current.contains(i.target)},W=function(){var i=document.activeElement,x=i&&c&&c.current.contains(i);!x&&r.showCloseIcon&&h.current&&h.current.focus()},q=function(i){r.dismissable&&r.modal&&b.current===i.target&&g(i)},g=function(i){r.onHide(),i.preventDefault()},Q=function(){r.onShow&&r.onShow(),W(),te()},ee=function(){r.modal&&!A()&&R.addClass(b.current,"p-component-overlay-leave")},ne=function(){j.clear(b.current),m(!1),V()},te=function(){r.dismissable&&!r.modal&&H(),r.blockScroll&&R.blockBodyScroll()},V=function(){U(),r.blockScroll&&R.unblockBodyScroll()};s.useImperativeHandle(t,function(){return{props:r,getElement:function(){return c.current},gteMask:function(){return b.current},getCloseIcon:function(){return h.current}}}),Ie(function(){r.visible&&m(!0)}),_(function(){r.visible&&!l&&m(!0),r.visible!==y&&l&&N(r.visible)}),_(function(){l&&(j.set("modal",b.current,a&&a.autoZIndex||P.autoZIndex,r.baseZIndex||a&&a.zIndex.modal||P.zIndex.modal),N(!0))},[l]),_(function(){y&&(U(),r.dismissable&&!r.modal&&H())},[r.dismissable,r.modal,y]),Oe(function(){V(),b.current&&j.clear(b.current)});var re=function(){var i=r.ariaCloseLabel||ye("close"),x=e({type:"button",ref:h,className:u("closeButton"),onClick:function(me){return g(me)},"aria-label":i},d("closeButton")),I=e({className:u("closeIcon")},d("closeIcon")),be=r.closeIcon||s.createElement(Pe,I),fe=he.getJSXIcon(be,Ve({},I),{props:r});return r.showCloseIcon?s.createElement("button",x,fe,s.createElement(Re,null)):null},ae=function(){return r.header?D.getJSXElement(r.header,r):null},ie=function(){return r.icons?D.getJSXElement(r.icons,r):null},Z=e({ref:b,style:G("mask"),className:u("mask",{maskVisibleState:l}),onMouseDown:function(i){return q(i)}},d("mask")),$=e({id:r.id,className:C(r.className,u("root",{context:a})),style:r.style,role:"complementary"},O.getOtherProps(r),d("root")),se=e({className:u("header")},d("header")),oe=e({className:u("content")},d("content")),le=e({className:u("icons")},d("icons")),ce={enter:r.fullScreen?150:300,exit:r.fullScreen?150:300},z=e({classNames:u("transition"),in:y,timeout:ce,options:r.transitionOptions,unmountOnExit:!0,onEntered:Q,onExiting:ee,onExited:ne},d("transition")),pe=function(){var i={closeIconRef:h,hide:g};return s.createElement("div",Z,s.createElement(J,v({nodeRef:c},z),s.createElement("div",v({ref:c},$),D.getJSXElement(n.content,i))))},de=function(){var i=re(),x=ie(),I=ae();return s.createElement("div",Z,s.createElement(J,v({nodeRef:c},z),s.createElement("div",v({ref:c},$),s.createElement("div",se,I,s.createElement("div",le,x,i)),s.createElement("div",oe,r.children))))},ue=function(){var i=n!=null&&n.content?pe():de();return s.createElement(je,{element:i,appendTo:r.appendTo,visible:!0})};return l&&ue()});Ze.displayName="Sidebar";export{Ze as S};
