import{r,j as t,c as k}from"./app-CXhxP4IC.js";import{T as C}from"./index-ByMu0qn2.js";import{D as u}from"./Dropdown-XGO5mqUA.js";import{e as D}from"./index-SyAJMH_1.js";import{G as E}from"./iconBase-DWzPX-n0.js";import{b as I}from"./StyledButton-DM_a2VOH.js";import{T as a,s as L}from"./index-uIOWaCi_.js";function M(c){return E({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"32",d:"M416 128 192 384l-96-96"},child:[]}]})(c)}const P="_main_10a3y_1",R="_dot_10a3y_5",b={main:P,dot:R};function z(c,l){return t.jsx(C,{noPad:!0,children:c[l]})}function B(c,l){return t.jsx(C,{none:!0,"data-section":"title",noPad:!0,medium:!0,md:!0,children:c[l]})}function Q({textColor:c="",menuGap:l,color:N="success",marker:i="tick",gap:f,label:h="label",variant:F="contain",sx:w,menuItemTemplate:S=z,contentTemplate:T=B,menu:y=h,...e}){const[o,j]=r.useState(e.value),[d]=r.useState(e.value),_=r.useRef();r.useEffect(()=>{var n;e.value&&((n=e==null?void 0:e.value)==null?void 0:n[e.unique])!=(d==null?void 0:d[e.unique])&&j(e.value)},[e.value]);const g=I(N),m=g.color,x=i=="background"?g.effects().text:c;return t.jsx(a,{sx:w,element:"div",className:k(e.className,b.main,{"px-2 py-2 bg-theme-bgColor":e.contained,"!bg-transparent":e.transaparent}),children:t.jsxs(a,{element:"div","column-gap":f?f+"px":void 0,className:"flex items-center justify-between",children:[t.jsx(a,{element:"div",color:x,className:"flex items-center grow",...e.quick?{onClick:()=>{var s;let n=(s=_.current)==null?void 0:s.parentElement;n&&!n.classList.contains("open")&&n.click()}}:{},children:o?T(o,h):e.placeholder||"Make Selection"}),t.jsx("div",{className:"self-center items-center flex",children:t.jsxs(u,{className:"!static",children:[t.jsx(u.Trigger,{children:t.jsx(a,{element:"span",color:x,onClick:n=>n.preventDefault(),className:e.trigger,children:e.icon||t.jsx(D,{})})}),t.jsx(u.Content,{width:k("w-full",e.content),children:e.items.map((n,s)=>t.jsx(u.Link,{onClick:q=>{var v;j(n),(v=e.onSelect)==null||v.call(e,{...q,value:n})},children:t.jsxs(a,{element:"div",...i=="background"?{background:m,color:x}:{},"column-gap":l?l+"px":void 0,className:"flex justify-between items-center",children:[t.jsx("div",{className:"grow",children:S(n,y)}),L(n[e.unique]==(o==null?void 0:o[e.unique])&&["dot","tick"].includes(i),t.jsx("span",{className:"flex items-center",children:i=="tick"?t.jsx(M,{fontSize:"20px",color:m}):i=="dot"?t.jsx(a,{element:"span",borderColor:m,className:b.dot}):""}))]})},s))})]})})]})})}export{Q as S};
