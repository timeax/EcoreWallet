import{O as E,r as c,P as N,i as U,c as W,D as a}from"./app-CXhxP4IC.js";import{C as $,u as B,i as Y,f as K,b as R,g as X}from"./tooltip.esm-A3nGpM54.js";function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}function d(e){"@babel/helpers - typeof";return d=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(e)}function q(e,t){if(d(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(d(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function z(e){var t=q(e,"string");return d(t)==="symbol"?t:String(t)}function F(e,t,r){return t=z(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function G(e){if(Array.isArray(e))return e}function J(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,l,g,o,i=[],m=!0,p=!1;try{if(g=(r=r.call(e)).next,t!==0)for(;!(m=(n=g.call(r)).done)&&(i.push(n.value),i.length!==t);m=!0);}catch(y){p=!0,l=y}finally{try{if(!m&&r.return!=null&&(o=r.return(),Object(o)!==o))return}finally{if(p)throw l}}return i}}function _(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Q(e,t){if(e){if(typeof e=="string")return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(e,t)}}function V(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Z(e,t){return G(e)||J(e,t)||Q(e,t)||V()}var ee=`
@layer primereact {
    .p-ripple {
        overflow: hidden;
        position: relative;
    }
    
    .p-ink {
        display: block;
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 100%;
        transform: scale(0);
    }
    
    .p-ink-active {
        animation: ripple 0.4s linear;
    }
    
    .p-ripple-disabled .p-ink {
        display: none;
    }
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}

`,te={root:"p-ink"},f=$.extend({defaultProps:{__TYPE:"Ripple",children:void 0},css:{styles:ee,classes:te},getProps:function(t){return E.getMergedProps(t,f.defaultProps)},getOtherProps:function(t){return E.getDiffProps(t,f.defaultProps)}});function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),r.push.apply(r,n)}return r}function re(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?x(Object(r),!0).forEach(function(n){F(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var ne=c.memo(c.forwardRef(function(e,t){var r=c.useState(!1),n=Z(r,2),l=n[0],g=n[1],o=c.useRef(null),i=c.useRef(null),m=B(),p=c.useContext(N),y=f.getProps(e,p),h=p&&p.ripple||U.ripple,A={props:y};Y(f.css.styles,{name:"ripple",manual:!h});var O=f.setMetaData(re({},A)),D=O.ptm,T=O.cx,w=function(){return o.current&&o.current.parentElement},S=function(){i.current&&i.current.addEventListener("pointerdown",j)},k=function(){i.current&&i.current.removeEventListener("pointerdown",j)},j=function(u){var v=a.getOffset(i.current),H=u.pageX-v.left+document.body.scrollTop-a.getWidth(o.current)/2,L=u.pageY-v.top+document.body.scrollLeft-a.getHeight(o.current)/2;C(H,L)},C=function(u,v){!o.current||getComputedStyle(o.current,null).display==="none"||(a.removeClass(o.current,"p-ink-active"),b(),o.current.style.top=v+"px",o.current.style.left=u+"px",a.addClass(o.current,"p-ink-active"))},M=function(u){a.removeClass(u.currentTarget,"p-ink-active")},b=function(){if(o.current&&!a.getHeight(o.current)&&!a.getWidth(o.current)){var u=Math.max(a.getOuterWidth(i.current),a.getOuterHeight(i.current));o.current.style.height=u+"px",o.current.style.width=u+"px"}};if(c.useImperativeHandle(t,function(){return{props:y,getInk:function(){return o.current},getTarget:function(){return i.current}}}),K(function(){g(!0)}),R(function(){l&&o.current&&(i.current=w(),b(),S())},[l]),R(function(){o.current&&!i.current&&(i.current=w(),b(),S())}),X(function(){o.current&&(i.current=null,k())}),!h)return null;var I=m({"aria-hidden":!0,className:W(T("root"))},f.getOtherProps(y),D("root"));return c.createElement("span",P({role:"presentation",ref:o},I,{onAnimationEnd:M}))}));ne.displayName="Ripple";export{ne as R};
