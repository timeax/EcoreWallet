import{r as l,P as $,D as O,O as E,c as R,I as q}from"./app-CXhxP4IC.js";import{C as K,u as J,a as L,b as W,f as X,T as Y}from"./tooltip.esm-A3nGpM54.js";import{C as z}from"./index.esm-DVhXXx0K.js";function h(){return h=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},h.apply(this,arguments)}function g(t){"@babel/helpers - typeof";return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},g(t)}function G(t,n){if(g(t)!=="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var o=r.call(t,n||"default");if(g(o)!=="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(t)}function Q(t){var n=G(t,"string");return g(n)==="symbol"?n:String(n)}function Z(t,n,r){return n=Q(n),n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function ee(t){if(Array.isArray(t))return t}function te(t,n){var r=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(r!=null){var o,e,x,d,y=[],b=!0,m=!1;try{if(x=(r=r.call(t)).next,n!==0)for(;!(b=(o=x.call(r)).done)&&(y.push(o.value),y.length!==n);b=!0);}catch(s){m=!0,e=s}finally{try{if(!b&&r.return!=null&&(d=r.return(),Object(d)!==d))return}finally{if(m)throw e}}return y}}function j(t,n){(n==null||n>t.length)&&(n=t.length);for(var r=0,o=new Array(n);r<n;r++)o[r]=t[r];return o}function ne(t,n){if(t){if(typeof t=="string")return j(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return j(t,n)}}function re(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oe(t,n){return ee(t)||te(t,n)||ne(t,n)||re()}var ae={box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon",root:function(n){var r=n.props,o=n.checked,e=n.context;return R("p-checkbox p-component",{"p-highlight":o,"p-disabled":r.disabled,"p-invalid":r.invalid,"p-variant-filled":r.variant?r.variant==="filled":e&&e.inputStyle==="filled"})}},k=K.extend({defaultProps:{__TYPE:"Checkbox",autoFocus:!1,checked:!1,className:null,disabled:!1,falseValue:!1,icon:null,id:null,inputId:null,inputRef:null,invalid:!1,variant:null,name:null,onChange:null,onContextMenu:null,onMouseDown:null,readOnly:!1,required:!1,style:null,tabIndex:null,tooltip:null,tooltipOptions:null,trueValue:!0,value:null,children:void 0},css:{classes:ae}});function w(t,n){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);n&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,o)}return r}function _(t){for(var n=1;n<arguments.length;n++){var r=arguments[n]!=null?arguments[n]:{};n%2?w(Object(r),!0).forEach(function(o){Z(t,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(r,o))})}return t}var le=l.memo(l.forwardRef(function(t,n){var r=J(),o=l.useContext($),e=k.getProps(t,o),x=l.useState(!1),d=oe(x,2),y=d[0],b=d[1],m=k.setMetaData({props:e,state:{focused:y},context:{checked:e.checked===e.trueValue,disabled:e.disabled}}),s=m.ptm,P=m.cx,D=m.isUnstyled;L(k.css.styles,D,{name:"checkbox"});var S=l.useRef(null),u=l.useRef(e.inputRef),C=function(){return e.checked===e.trueValue},A=function(a){if(!(e.disabled||e.readonly)&&e.onChange){var p,v=C(),i=v?e.falseValue:e.trueValue,U={originalEvent:a,value:e.value,checked:i,stopPropagation:function(){a==null||a.stopPropagation()},preventDefault:function(){a==null||a.preventDefault()},target:{type:"checkbox",name:e.name,id:e.id,value:e.value,checked:i}};if(e==null||(p=e.onChange)===null||p===void 0||p.call(e,U),a.defaultPrevented)return;O.focus(u.current)}},B=function(){var a;b(!0),e==null||(a=e.onFocus)===null||a===void 0||a.call(e)},F=function(){var a;b(!1),e==null||(a=e.onBlur)===null||a===void 0||a.call(e)};l.useImperativeHandle(n,function(){return{props:e,focus:function(){return O.focus(u.current)},getElement:function(){return S.current},getInput:function(){return u.current}}}),l.useEffect(function(){E.combinedRefs(u,e.inputRef)},[u,e.inputRef]),W(function(){u.current.checked=C()},[e.checked,e.trueValue]),X(function(){e.autoFocus&&O.focus(u.current,e.autoFocus)});var f=C(),M=E.isNotEmpty(e.tooltip),I=k.getOtherProps(e),N=r({id:e.id,className:R(e.className,P("root",{checked:f,context:o})),style:e.style,"data-p-highlight":f,"data-p-disabled":e.disabled,onContextMenu:e.onContextMenu,onMouseDown:e.onMouseDown},I,s("root")),T=function(){var a=E.reduceKeys(I,O.ARIA_PROPS),p=r(_({id:e.inputId,type:"checkbox",className:P("input"),name:e.name,tabIndex:e.tabIndex,onFocus:function(i){return B()},onBlur:function(i){return F()},onChange:function(i){return A(i)},disabled:e.disabled,readOnly:e.readOnly,required:e.required,"aria-invalid":e.invalid,checked:f},a),s("input"));return l.createElement("input",h({ref:u},p))},V=function(){var a=r({className:P("icon")},s("icon")),p=r({className:P("box",{checked:f}),"data-p-highlight":f,"data-p-disabled":e.disabled},s("box")),v=f?e.icon||l.createElement(z,a):null,i=q.getJSXIcon(v,_({},a),{props:e,checked:f});return l.createElement("div",p,i)};return l.createElement(l.Fragment,null,l.createElement("div",h({ref:S},N),T(),V()),M&&l.createElement(Y,h({target:S,content:e.tooltip,pt:s("tooltip")},e.tooltipOptions)))}));le.displayName="Checkbox";export{le as C};
