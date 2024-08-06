import{r as s,P as ce,U as se,c as V,i as S,D as y,Z as D,I as ue,l as pe}from"./app-DPeqRPcX.js";import{C as fe,u as ye,a as ve,c as de,d as me,e as be,f as ge,g as Oe,E as he}from"./componentbase.esm-CEyx904k.js";import{C as Pe,T as Ee}from"./index.esm-UiDtkRAd.js";import{O as _}from"./overlayservice.esm-Dx_aOCB9.js";import{P as xe}from"./portal.esm-ZPKbRoAC.js";import{R as Ce}from"./ripple.esm-BKB6VsNq.js";function j(){return j=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},j.apply(this,arguments)}function w(e){"@babel/helpers - typeof";return w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},w(e)}function Se(e,n){if(w(e)!=="object"||e===null)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var r=t.call(e,n||"default");if(w(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}function we(e){var n=Se(e,"string");return w(n)==="symbol"?n:String(n)}function Ie(e,n,t){return n=we(n),n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function ke(e){if(Array.isArray(e))return e}function _e(e,n){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var r,a,I,b,u=[],g=!0,v=!1;try{if(I=(t=t.call(e)).next,n!==0)for(;!(g=(r=I.call(t)).done)&&(u.push(r.value),u.length!==n);g=!0);}catch(d){v=!0,a=d}finally{try{if(!g&&t.return!=null&&(b=t.return(),Object(b)!==b))return}finally{if(v)throw a}}return u}}function Y(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function je(e,n){if(e){if(typeof e=="string")return Y(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Y(e,n)}}function Re(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function K(e,n){return ke(e)||_e(e,n)||je(e,n)||Re()}var Te={root:function(n){n.props;var t=n.context;return V("p-overlaypanel p-component",{"p-input-filled":t&&t.inputStyle==="filled"||S.inputStyle==="filled","p-ripple-disabled":t&&t.ripple===!1||S.ripple===!1})},closeIcon:"p-overlaypanel-close-icon",closeButton:"p-overlaypanel-close p-link",content:"p-overlaypanel-content",transition:"p-overlaypanel"},Ae=`
@layer primereact {
    .p-overlaypanel {
        position: absolute;
        margin-top: 10px;
        /* Github #3122: Prevent animation flickering  */
        top: -9999px;
        left: -9999px;
    }
    
    .p-overlaypanel-flipped {
        margin-top: 0;
        margin-bottom: 10px;
    }
    
    .p-overlaypanel-close {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
    }
    
    /* Animation */
    .p-overlaypanel-enter {
        opacity: 0;
        transform: scaleY(0.8);
    }
    
    .p-overlaypanel-enter-active {
        opacity: 1;
        transform: scaleY(1);
        transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);
    }
    
    .p-overlaypanel-enter-done {
        transform: none;
    }
    
    .p-overlaypanel-exit {
        opacity: 1;
    }
    
    .p-overlaypanel-exit-active {
        opacity: 0;
        transition: opacity .1s linear;
    }
    
    .p-overlaypanel:after, .p-overlaypanel:before {
        bottom: 100%;
        left: calc(var(--overlayArrowLeft, 0) + 1.25rem);
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    
    .p-overlaypanel:after {
        border-width: 8px;
        margin-left: -8px;
    }
    
    .p-overlaypanel:before {
        border-width: 10px;
        margin-left: -10px;
    }
    
    .p-overlaypanel-flipped:after, .p-overlaypanel-flipped:before {
        bottom: auto;
        top: 100%;
    }
    
    .p-overlaypanel.p-overlaypanel-flipped:after {
        border-bottom-color: transparent;
    }
    
    .p-overlaypanel.p-overlaypanel-flipped:before {
        border-bottom-color: transparent
    }
}
`,C=fe.extend({defaultProps:{__TYPE:"OverlayPanel",id:null,dismissable:!0,showCloseIcon:!1,closeIcon:null,style:null,className:null,appendTo:null,breakpoints:null,ariaCloseLabel:null,transitionOptions:null,onShow:null,onHide:null,children:void 0,closeOnEscape:!0},css:{classes:Te,styles:Ae}});function M(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function Ne(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?M(Object(t),!0).forEach(function(r){Ie(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):M(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}var Le=s.forwardRef(function(e,n){var t=ye(),r=s.useContext(ce),a=C.getProps(e,r),I=s.useState(!1),b=K(I,2),u=b[0],g=b[1],v=C.setMetaData({props:a,state:{visible:u}}),d=v.ptm,O=v.cx;v.sx;var R=v.isUnstyled;ve(C.css.styles,R,{name:"overlaypanel"});var T=s.useRef(""),l=s.useRef(null),p=s.useRef(null),h=s.useRef(!1),P=s.useRef(null),m=s.useRef(null),Z=de({target:p,overlay:l,listener:function(o,i){var f=i.type,x=i.valid;if(x)switch(f){case"outside":a.dismissable&&!h.current&&E();break;case"resize":case"scroll":case"orientationchange":k();break}h.current=!1},when:u}),U=K(Z,2),$=U[0],G=U[1],B=u&&a.closeOnEscape,H=me("overlay-panel",B);be({callback:function(){E()},when:B&&H,priority:[he.OVERLAY_PANEL,H]});var q=function(o){return l&&l.current&&!(l.current.isSameNode(o)||l.current.contains(o))},J=function(o,i){return p.current!=null&&p.current!==(i||o.currentTarget||o.target)},W=function(o){E(),o.preventDefault()},X=function(o){h.current=!0,_.emit("overlay-click",{originalEvent:o,target:p.current})},z=function(){h.current=!0},F=function(o,i){u?(E(),J(o,i)&&(p.current=i||o.currentTarget||o.target,setTimeout(function(){A(o,p.current)},200))):A(o,i)},A=function(o,i){p.current=i||o.currentTarget||o.target,u?k():(g(!0),m.current=function(f){!q(f.target)&&(h.current=!0)},_.on("overlay-click",m.current))},E=function(){g(!1),_.off("overlay-click",m.current),m.current=null},Q=function(){l.current.setAttribute(T.current,""),D.set("overlay",l.current,r&&r.autoZIndex||S.autoZIndex,r&&r.zIndex.overlay||S.zIndex.overlay),y.addStyles(l.current,{position:"absolute",top:"0",left:"0"}),k()},ee=function(){$(),a.onShow&&a.onShow()},ne=function(){G()},te=function(){D.clear(l.current),a.onHide&&a.onHide()},k=function(){if(p.current&&l.current){y.absolutePosition(l.current,p.current);var o=y.getOffset(l.current),i=y.getOffset(p.current),f=0;o.left<i.left&&(f=i.left-o.left),l.current.style.setProperty("--overlayArrowLeft","".concat(f,"px")),o.top<i.top?(l.current.setAttribute("data-p-overlaypanel-flipped","true"),R&&y.addClass(l.current,"p-overlaypanel-flipped")):(l.current.setAttribute("data-p-overlaypanel-flipped","false"),R&&y.removeClass(l.current,"p-overlaypanel-flipped"))}},re=function(){if(!P.current){P.current=y.createInlineStyle(r&&r.nonce||S.nonce,r&&r.styleContainer);var o="";for(var i in a.breakpoints)o=o+`
                    @media screen and (max-width: `.concat(i,`) {
                        .p-overlaypanel[`).concat(T.current,`] {
                            width: `).concat(a.breakpoints[i],`;
                        }
                    }
                `);P.current.innerHTML=o}};ge(function(){T.current=se(),a.breakpoints&&re()}),Oe(function(){P.current=y.removeInlineStyle(P.current),m.current&&(_.off("overlay-click",m.current),m.current=null),D.clear(l.current)}),s.useImperativeHandle(n,function(){return{props:a,toggle:F,show:A,hide:E,align:k,isVisible:function(){return u},getElement:function(){return l.current}}});var oe=function(){var o=t({className:O("closeIcon"),"aria-hidden":!0},d("closeIcon")),i=a.closeIcon||s.createElement(Ee,o),f=ue.getJSXIcon(i,Ne({},o),{props:a}),x=a.ariaCloseLabel||pe("close"),N=t({type:"button",className:O("closeButton"),onClick:function(ie){return W(ie)},"aria-label":x},d("closeButton"));return a.showCloseIcon?s.createElement("button",N,f,s.createElement(Ce,null)):null},ae=function(){var o=oe(),i=t({id:a.id,className:V(a.className,O("root",{context:r})),style:a.style,onClick:function(L){return X(L)}},C.getOtherProps(a),d("root")),f=t({className:O("content"),onClick:function(L){return z()},onMouseDown:z},C.getOtherProps(a),d("content")),x=t({classNames:O("transition"),in:u,timeout:{enter:120,exit:100},options:a.transitionOptions,unmountOnExit:!0,onEnter:Q,onEntered:ee,onExit:ne,onExited:te},d("transition"));return s.createElement(Pe,j({nodeRef:l},x),s.createElement("div",j({ref:l},i),s.createElement("div",f,a.children),o))},le=ae();return s.createElement(xe,{element:le,appendTo:a.appendTo})});Le.displayName="OverlayPanel";export{Le as O};
