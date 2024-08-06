import{r as d,P as ze,c as Te,Z as W,i as Ee,D as y,O as Ve}from"./app-Dy4LvLRF.js";import{C as qe,u as Je,a as Qe,e as et,E as tt,j as nt,m as rt,f as ot,b as V,g as it}from"./componentbase.esm-Ba9buBfq.js";import{P as at}from"./portal.esm-C5r96rIL.js";function $(){return $=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(t[c]=n[c])}return t},$.apply(this,arguments)}function S(t){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(o){return typeof o}:function(o){return o&&typeof Symbol=="function"&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},S(t)}function lt(t,o){if(S(t)!=="object"||t===null)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var c=n.call(t,o||"default");if(S(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(o==="string"?String:Number)(t)}function ut(t){var o=lt(t,"string");return S(o)==="symbol"?o:String(o)}function Oe(t,o,n){return o=ut(o),o in t?Object.defineProperty(t,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[o]=n,t}function q(t,o){(o==null||o>t.length)&&(o=t.length);for(var n=0,c=new Array(o);n<o;n++)c[n]=t[n];return c}function st(t){if(Array.isArray(t))return q(t)}function ct(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Se(t,o){if(t){if(typeof t=="string")return q(t,o);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return q(t,o)}}function pt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ft(t){return st(t)||ct(t)||Se(t)||pt()}function dt(t){if(Array.isArray(t))return t}function vt(t,o){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var c,i,x,w,h=[],T=!0,P=!1;try{if(x=(n=n.call(t)).next,o!==0)for(;!(T=(c=x.call(n)).done)&&(h.push(c.value),h.length!==o);T=!0);}catch(C){P=!0,i=C}finally{try{if(!T&&n.return!=null&&(w=n.return(),Object(w)!==w))return}finally{if(P)throw i}}return h}}function mt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function O(t,o){return dt(t)||vt(t,o)||Se(t,o)||mt()}var ht={root:function(o){var n=o.positionState,c=o.classNameState;return Te("p-tooltip p-component",Oe({},"p-tooltip-".concat(n),!0),c)},arrow:"p-tooltip-arrow",text:"p-tooltip-text"},yt={arrow:function(o){var n=o.context;return{top:n.bottom?"0":n.right||n.left||!n.right&&!n.left&&!n.top&&!n.bottom?"50%":null,bottom:n.top?"0":null,left:n.right||!n.right&&!n.left&&!n.top&&!n.bottom?"0":n.top||n.bottom?"50%":null,right:n.left?"0":null}}},bt=`
@layer primereact {
    .p-tooltip {
        position: absolute;
        padding: .25em .5rem;
        /* #3687: Tooltip prevent scrollbar flickering */
        top: -9999px;
        left: -9999px;
    }
    
    .p-tooltip.p-tooltip-right,
    .p-tooltip.p-tooltip-left {
        padding: 0 .25rem;
    }
    
    .p-tooltip.p-tooltip-top,
    .p-tooltip.p-tooltip-bottom {
        padding:.25em 0;
    }
    
    .p-tooltip .p-tooltip-text {
       white-space: pre-line;
       word-break: break-word;
    }
    
    .p-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }
    
    .p-tooltip-right .p-tooltip-arrow {
        top: 50%;
        left: 0;
        margin-top: -.25rem;
        border-width: .25em .25em .25em 0;
    }
    
    .p-tooltip-left .p-tooltip-arrow {
        top: 50%;
        right: 0;
        margin-top: -.25rem;
        border-width: .25em 0 .25em .25rem;
    }
    
    .p-tooltip.p-tooltip-top {
        padding: .25em 0;
    }
    
    .p-tooltip-top .p-tooltip-arrow {
        bottom: 0;
        left: 50%;
        margin-left: -.25rem;
        border-width: .25em .25em 0;
    }
    
    .p-tooltip-bottom .p-tooltip-arrow {
        top: 0;
        left: 50%;
        margin-left: -.25rem;
        border-width: 0 .25em .25rem;
    }

    .p-tooltip-target-wrapper {
        display: inline-flex;
    }
}
`,k=qe.extend({defaultProps:{__TYPE:"Tooltip",appendTo:null,at:null,autoHide:!0,autoZIndex:!0,baseZIndex:0,className:null,closeOnEscape:!1,content:null,disabled:!1,event:null,hideDelay:0,hideEvent:"mouseleave",id:null,mouseTrack:!1,mouseTrackLeft:5,mouseTrackTop:5,my:null,onBeforeHide:null,onBeforeShow:null,onHide:null,onShow:null,position:"right",showDelay:0,showEvent:"mouseenter",showOnDisabled:!1,style:null,target:null,updateDelay:0,children:void 0},css:{classes:ht,styles:bt,inlineStyles:yt}});function we(t,o){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);o&&(c=c.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),n.push.apply(n,c)}return n}function gt(t){for(var o=1;o<arguments.length;o++){var n=arguments[o]!=null?arguments[o]:{};o%2?we(Object(n),!0).forEach(function(c){Oe(t,c,n[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):we(Object(n)).forEach(function(c){Object.defineProperty(t,c,Object.getOwnPropertyDescriptor(n,c))})}return t}var Et=d.memo(d.forwardRef(function(t,o){var n=Je(),c=d.useContext(ze),i=k.getProps(t,c),x=d.useState(!1),w=O(x,2),h=w[0],T=w[1],P=d.useState(i.position||"right"),C=O(P,2),E=C[0],B=C[1],xe=d.useState(""),J=O(xe,2),Q=J[0],ee=J[1],te={props:i,state:{visible:h,position:E,className:Q},context:{right:E==="right",left:E==="left",top:E==="top",bottom:E==="bottom"}},R=k.setMetaData(te),U=R.ptm,Z=R.cx,Pe=R.sx,Ce=R.isUnstyled;Qe(k.css.styles,Ce,{name:"tooltip"}),et({callback:function(){b()},when:i.closeOnEscape,priority:[tt.TOOLTIP,0]});var p=d.useRef(null),D=d.useRef(null),f=d.useRef(null),I=d.useRef(null),j=d.useRef(!0),ne=d.useRef({}),re=d.useRef(null),Re=nt({listener:function(e){!y.isTouchDevice()&&b(e)}}),oe=O(Re,2),De=oe[0],Ie=oe[1],je=rt({target:f.current,listener:function(e){b(e)},when:h}),ie=O(je,2),Le=ie[0],Ae=ie[1],Ne=function(e){return!(i.content||v(e,"tooltip"))},Me=function(e){return!(i.content||v(e,"tooltip")||i.children)},F=function(e){return v(e,"mousetrack")||i.mouseTrack},ae=function(e){return v(e,"disabled")==="true"||ue(e,"disabled")||i.disabled},le=function(e){return v(e,"showondisabled")||i.showOnDisabled},L=function(){return v(f.current,"autohide")||i.autoHide},v=function(e,r){return ue(e,"data-pr-".concat(r))?e.getAttribute("data-pr-".concat(r)):null},ue=function(e,r){return e&&e.hasAttribute(r)},se=function(e){var r=[v(e,"showevent")||i.showEvent],s=[v(e,"hideevent")||i.hideEvent];if(F(e))r=["mousemove"],s=["mouseleave"];else{var l=v(e,"event")||i.event;l==="focus"&&(r=["focus"],s=["blur"]),l==="both"&&(r=["focus","mouseenter"],s=["blur","mouseleave"])}return{showEvents:r,hideEvents:s}},ce=function(e){return v(e,"position")||E},_e=function(e){var r=v(e,"mousetracktop")||i.mouseTrackTop,s=v(e,"mousetrackleft")||i.mouseTrackLeft;return{top:r,left:s}},pe=function(e,r){if(D.current){var s=v(e,"tooltip")||i.content;s?(D.current.innerHTML="",D.current.appendChild(document.createTextNode(s)),r()):i.children&&r()}},fe=function(e){pe(f.current,function(){var r=re.current,s=r.pageX,l=r.pageY;i.autoZIndex&&!W.get(p.current)&&W.set("tooltip",p.current,c&&c.autoZIndex||Ee.autoZIndex,i.baseZIndex||c&&c.zIndex.tooltip||Ee.zIndex.tooltip),p.current.style.left="",p.current.style.top="",L()&&(p.current.style.pointerEvents="none");var u=F(f.current)||e==="mouse";(u&&!I.current||u)&&(I.current={width:y.getOuterWidth(p.current),height:y.getOuterHeight(p.current)}),de(f.current,{x:s,y:l},e)})},A=function(e){f.current=e.currentTarget;var r=ae(f.current),s=Me(le(f.current)&&r?f.current.firstChild:f.current);if(!(s||r))if(re.current=e,h)N("updateDelay",fe);else{var l=M(i.onBeforeShow,{originalEvent:e,target:f.current});l&&N("showDelay",function(){T(!0),M(i.onShow,{originalEvent:e,target:f.current})})}},b=function(e){if(ve(),h){var r=M(i.onBeforeHide,{originalEvent:e,target:f.current});r&&N("hideDelay",function(){!L()&&j.current===!1||(W.clear(p.current),y.removeClass(p.current,"p-tooltip-active"),T(!1),M(i.onHide,{originalEvent:e,target:f.current}))})}},de=function(e,r,s){var l=0,u=0,m=s||E;if((F(e)||m=="mouse")&&r){var g={width:y.getOuterWidth(p.current),height:y.getOuterHeight(p.current)};l=r.x,u=r.y;var ye=_e(e),_=ye.top,H=ye.left;switch(m){case"left":l=l-(g.width+H),u=u-(g.height/2-_);break;case"right":case"mouse":l=l+H,u=u-(g.height/2-_);break;case"top":l=l-(g.width/2-H),u=u-(g.height+_);break;case"bottom":l=l-(g.width/2-H),u=u+_;break}l<=0||I.current.width>g.width?(p.current.style.left="0px",p.current.style.right=window.innerWidth-g.width-l+"px"):(p.current.style.right="",p.current.style.left=l+"px"),p.current.style.top=u+"px",y.addClass(p.current,"p-tooltip-active")}else{var X=y.findCollisionPosition(m),Ke=v(e,"my")||i.my||X.my,Ye=v(e,"at")||i.at||X.at;p.current.style.padding="0px",y.flipfitCollision(p.current,e,Ke,Ye,function(G){var be=G.at,z=be.x,Xe=be.y,Ge=G.my.x,ge=i.at?z!=="center"&&z!==Ge?z:Xe:G.at["".concat(X.axis)];p.current.style.padding="",B(ge),He(ge),y.addClass(p.current,"p-tooltip-active")})}},He=function(e){if(p.current){var r=getComputedStyle(p.current);e==="left"?p.current.style.left=parseFloat(r.left)-parseFloat(r.paddingLeft)*2+"px":e==="top"&&(p.current.style.top=parseFloat(r.top)-parseFloat(r.paddingTop)*2+"px")}},We=function(){L()||(j.current=!1)},ke=function(e){L()||(j.current=!0,b(e))},$e=function(e){if(e){var r=se(e),s=r.showEvents,l=r.hideEvents,u=me(e);s.forEach(function(m){return u==null?void 0:u.addEventListener(m,A)}),l.forEach(function(m){return u==null?void 0:u.addEventListener(m,b)})}},Be=function(e){if(e){var r=se(e),s=r.showEvents,l=r.hideEvents,u=me(e);s.forEach(function(m){return u==null?void 0:u.removeEventListener(m,A)}),l.forEach(function(m){return u==null?void 0:u.removeEventListener(m,b)})}},N=function(e,r){ve();var s=v(f.current,e.toLowerCase())||i[e];s?ne.current["".concat(e)]=setTimeout(function(){return r()},s):r()},M=function(e){if(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),l=1;l<r;l++)s[l-1]=arguments[l];var u=e.apply(void 0,s);return u===void 0&&(u=!0),u}return!0},ve=function(){Object.values(ne.current).forEach(function(e){return clearTimeout(e)})},me=function(e){if(e){if(le(e)){if(!e.hasWrapper){var r=document.createElement("div"),s=e.nodeName==="INPUT";return s?y.addMultipleClasses(r,"p-tooltip-target-wrapper p-inputwrapper"):y.addClass(r,"p-tooltip-target-wrapper"),e.parentNode.insertBefore(r,e),r.appendChild(e),e.hasWrapper=!0,r}return e.parentElement}else if(e.hasWrapper){var l;(l=e.parentElement).replaceWith.apply(l,ft(e.parentElement.childNodes)),delete e.hasWrapper}return e}return null},Ue=function(e){Y(e),K(e)},K=function(e){he(e||i.target,$e)},Y=function(e){he(e||i.target,Be)},he=function(e,r){if(e=Ve.getRefElement(e),e)if(y.isElement(e))r(e);else{var s=function(u){var m=y.find(document,u);m.forEach(function(g){r(g)})};e instanceof Array?e.forEach(function(l){s(l)}):s(e)}};ot(function(){h&&f.current&&ae(f.current)&&b()}),V(function(){return K(),function(){Y()}},[A,b,i.target]),V(function(){if(h){var a=ce(f.current),e=v(f.current,"classname");B(a),ee(e),fe(a),De(),Le()}else B(i.position||"right"),ee(""),f.current=null,I.current=null,j.current=!0;return function(){Ie(),Ae()}},[h]),V(function(){var a=ce(f.current);h&&a!=="mouse"&&N("updateDelay",function(){pe(f.current,function(){de(f.current)})})},[i.content]),it(function(){b(),W.clear(p.current)}),d.useImperativeHandle(o,function(){return{props:i,updateTargetEvents:Ue,loadTargetEvents:K,unloadTargetEvents:Y,show:A,hide:b,getElement:function(){return p.current},getTarget:function(){return f.current}}});var Ze=function(){var e=Ne(f.current),r=n({id:i.id,className:Te(i.className,Z("root",{positionState:E,classNameState:Q})),style:i.style,role:"tooltip","aria-hidden":h,onMouseEnter:function(m){return We()},onMouseLeave:function(m){return ke(m)}},k.getOtherProps(i),U("root")),s=n({className:Z("arrow"),style:Pe("arrow",gt({},te))},U("arrow")),l=n({className:Z("text")},U("text"));return d.createElement("div",$({ref:p},r),d.createElement("div",s),d.createElement("div",$({ref:D},l),e&&i.children))};if(h){var Fe=Ze();return d.createElement(at,{element:Fe,appendTo:i.appendTo,visible:!0})}return null}));Et.displayName="Tooltip";export{Et as T};
