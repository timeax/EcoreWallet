import{r as o,P as H,D as U,O as d,c as R}from"./app-DPeqRPcX.js";import{C as q,u as j,a as M}from"./componentbase.esm-CEyx904k.js";import{T as W}from"./tooltip.esm-B48pQ4fn.js";import{R as J}from"./ripple.esm-BKB6VsNq.js";function B(){return B=Object.assign?Object.assign.bind():function(e){for(var l=1;l<arguments.length;l++){var n=arguments[l];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},B.apply(this,arguments)}function F(e,l){(l==null||l>e.length)&&(l=e.length);for(var n=0,i=new Array(l);n<l;n++)i[n]=e[n];return i}function X(e){if(Array.isArray(e))return F(e)}function Y(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function K(e,l){if(e){if(typeof e=="string")return F(e,l);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(e,l)}}function z(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function k(e){return X(e)||Y(e)||K(e)||z()}function G(e){if(Array.isArray(e))return e}function Q(e,l){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var i,t,p,f,m=[],b=!0,u=!1;try{if(p=(n=n.call(e)).next,l!==0)for(;!(b=(i=p.call(n)).done)&&(m.push(i.value),m.length!==l);b=!0);}catch(y){u=!0,t=y}finally{try{if(!b&&n.return!=null&&(f=n.return(),Object(f)!==f))return}finally{if(u)throw t}}return m}}function Z(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function L(e,l){return G(e)||Q(e,l)||K(e,l)||Z()}var ee={root:function(l){var n=l.props;return R("p-selectbutton p-button-group p-component",{"p-invalid":n.invalid})},button:function(l){var n=l.itemProps,i=l.focusedState;return R("p-button p-component",{"p-highlight":n.selected,"p-disabled":n.disabled,"p-focus":i})},label:"p-button-label p-c"},_=q.extend({defaultProps:{__TYPE:"SelectButton",id:null,value:null,options:null,optionLabel:null,optionValue:null,optionDisabled:null,tabIndex:null,multiple:!1,invalid:!1,unselectable:!0,allowEmpty:!0,disabled:!1,style:null,className:null,dataKey:null,tooltip:null,tooltipOptions:null,itemTemplate:null,onChange:null,children:void 0},css:{classes:ee}}),V=o.memo(function(e){var l=o.useState(!1),n=L(l,2),i=n[0],t=n[1],p=j(),f=e.ptm,m=e.cx,b=function(r){return f(r,{hostName:e.hostName,context:{selected:e.selected,disabled:e.disabled,option:e.option}})},u=function(r,g){e.setFocusedIndex(g),e.onClick&&e.onClick({originalEvent:r,option:e.option})},y=function(){t(!0)},E=function(){t(!1)},w=function(r,g){switch(r.code){case"Space":{u(r,g),r.preventDefault();break}case"ArrowDown":case"ArrowRight":{C(r,"next"),r.preventDefault();break}case"ArrowUp":case"ArrowLeft":{C(r,"prev"),r.preventDefault();break}}},C=function(r,g){for(var h,v,x=0;x<=e.elementRef.current.children.length-1;x++)e.elementRef.current.children[x].getAttribute("tabindex")==="0"&&(h={elem:e.elementRef.current.children[x],index:x});g==="prev"?h.index===0?v=e.elementRef.current.children.length-1:v=h.index-1:h.index===e.elementRef.current.children.length-1?v=0:v=h.index+1,e.setFocusedIndex(v),e.elementRef.current.children[v].focus()},T=function(){var r=p({className:m("label")},b("label"));return e.template?d.getJSXElement(e.template,e.option):o.createElement("span",r,e.label)},N=T(),A=p({className:R(e.className,m("button",{itemProps:e,focusedState:i})),role:"button","aria-label":e.label,"aria-pressed":e.selected,onClick:function(r){return u(r,e.index)},onKeyDown:function(r){return w(r,e.index)},tabIndex:e.tabIndex,"aria-disabled":e.disabled,onFocus:y,onBlur:E},b("button"));return o.createElement("div",A,N,!e.disabled&&o.createElement(J,null))});V.displayName="SelectButtonItem";var te=o.memo(o.forwardRef(function(e,l){var n=j(),i=o.useContext(H),t=_.getProps(e,i),p=o.useState(0),f=L(p,2),m=f[0],b=f[1],u=o.useRef(null),y=_.setMetaData({props:t}),E=y.ptm,w=y.cx,C=y.isUnstyled;M(_.css.styles,C,{name:"selectbutton",styled:!0});var T=function(a){if(!(t.disabled||s(a.option))){var c=r(a.option);if(!(c&&!(t.unselectable&&t.allowEmpty))){var D=A(a.option),I;if(t.multiple){var P=t.value?k(t.value):[];I=c?P.filter(function(O){return!d.equals(O,D,t.dataKey)}):[].concat(k(P),[D])}else I=c?null:D;t.onChange&&t.onChange({originalEvent:a.originalEvent,value:I,stopPropagation:function(){a.originalEvent.stopPropagation()},preventDefault:function(){a.originalEvent.preventDefault()},target:{name:t.name,id:t.id,value:I}})}}},N=function(a){return t.optionLabel?d.resolveFieldData(a,t.optionLabel):a&&a.label!==void 0?a.label:a},A=function(a){return t.optionValue?d.resolveFieldData(a,t.optionValue):a&&a.value!==void 0?a.value:a},s=function(a){return t.optionDisabled?d.isFunction(t.optionDisabled)?t.optionDisabled(a):d.resolveFieldData(a,t.optionDisabled):a&&a.disabled!==void 0?a.disabled:!1},r=function(a){var c=A(a);if(t.multiple){if(t.value&&t.value.length)return t.value.some(function(D){return d.equals(D,c,t.dataKey)})}else return d.equals(t.value,c,t.dataKey);return!1},g=function(){return t.options&&t.options.length?t.options.map(function(a,c){var D=t.disabled||s(a),I=N(a),P=t.disabled||c!==m?"-1":"0",O=r(a),$=I+"_"+c;return o.createElement(V,{hostName:"SelectButton",key:$,label:I,className:a.className,option:a,setFocusedIndex:b,onClick:T,template:t.itemTemplate,selected:O,tabIndex:P,index:c,disabled:D,ptm:E,cx:w,elementRef:u})}):null};o.useImperativeHandle(l,function(){return{props:t,focus:function(){return U.focusFirstElement(u.current)},getElement:function(){return u.current}}});var h=d.isNotEmpty(t.tooltip),v=g(),x=n({ref:u,id:t.id,className:R(t.className,w("root")),style:t.style,role:"group"},_.getOtherProps(t),E("root"));return o.createElement(o.Fragment,null,o.createElement("div",x,v,t.children),h&&o.createElement(W,B({target:u,content:t.tooltip,pt:E("tooltip")},t.tooltipOptions)))}));te.displayName="SelectButton";export{te as S};
