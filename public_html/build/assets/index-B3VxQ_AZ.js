import{j as t,r,F as v,y as N}from"./app-DPeqRPcX.js";import{s as w,u as x}from"./settings-CNzXT97W.js";import{B as g}from"./index-BuV88OsN.js";import{A as C}from"./AuthenticatedLayout-BfKv6hjQ.js";import{D as y,C as l}from"./datatable.esm-Bn6VL9qF.js";import{a as F}from"./index-CZiaJmKJ.js";import D from"./MxDropCheck-l8VzLvtq.js";import{s as T}from"./index-BtqGtben.js";import{N as A}from"./NoData-Bx3RbsXE.js";import"./index-DOPl3nEV.js";import"./iconBase-BE7iW8MJ.js";import"./tooltip.esm-B48pQ4fn.js";import"./componentbase.esm-CEyx904k.js";import"./portal.esm-ZPKbRoAC.js";import"./StyledButton-ciDqVOpa.js";import"./AuthenticatedContext-YAhfpYvk.js";import"./index.esm-UiDtkRAd.js";import"./objectWithoutPropertiesLoose-BwfzGx52.js";import"./iconbase.esm-CycjtHYb.js";import"./index.esm-D2Mau25a.js";import"./ripple.esm-BKB6VsNq.js";import"./sidebar.esm-C28GSpQQ.js";import"./Select-CJRs8Qvl.js";import"./Dropdown-VWJDfQuR.js";import"./index-DAW83uBr.js";import"./index-B-zkmOMm.js";import"./icon-ntwga0O_.js";import"./Note-ClESBGl_.js";import"./IconButton-lyUs3Fyy.js";import"./avatar.esm-CbNomGyH.js";import"./button.esm-CxIIzWwq.js";import"./inputtext.esm-DpYC840t.js";import"./overlayservice.esm-Dx_aOCB9.js";import"./index.esm-DxvocRbz.js";const dt=({auth:o,tickets:a,...p})=>t.jsx(C,{user:o.user,title:"Support",pusher:!0,children:t.jsx(M,{tickets:a})}),M=({tickets:o})=>{const a=["id","date","subject","category","status"],[p,O]=r.useState(o);r.useState(0);const[m,j]=r.useState([...a]),[n,c]=r.useState(""),[d,f]=r.useState({global:{value:null,matchMode:v.CONTAINS}}),u=w(p),h=s=>{let e={...d};e.global.value=s,f(e)},S=s=>{c(s.target.value),h(s.target.value)},i={gen:{maxWidth:"8rem"},id:{},date:{},subject:{maxWidth:"30rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},category:{},status:{}};return t.jsx("div",{className:"mx-spt-data-tbl",children:(T(o.length>0,()=>{var s;return t.jsxs(y,{filters:d,globalFilterFields:m,selectionMode:"single",dataKey:"id",onSelectionChange:e=>N.visit(e.value.id),paginator:!0,rows:9,alwaysShowPaginator:!1,value:u,header:t.jsxs("div",{className:"spt-head",children:[t.jsx(g,{children:"Create New Ticket"}),t.jsxs("div",{className:"sb-box",children:[t.jsx("input",{value:n,onChange:S,placeholder:"Search All Columns"}),n?t.jsx("i",{onClick:e=>{c(""),h("")},className:"pi pi-times"}):void 0,t.jsx(D,{defaultList:a,optionState:[m,j],icon:t.jsx(F,{className:"gear-icon"})})]})]}),children:[(s=Object.keys(u[0]))==null?void 0:s.map(e=>e=="date"?t.jsx(l,{field:e,header:x(e),body:b=>new Date(b.date).toLocaleDateString(void 0,{dateStyle:"medium"}),bodyStyle:{...i.gen,...i[e]}},e):t.jsx(l,{field:e,header:x(e),bodyStyle:{...i.gen,...i[e]}},e)),t.jsx(l,{body:t.jsx("i",{className:"pi pi-angle-right"})})]})}),t.jsxs(A,{children:[t.jsx(t.Fragment,{children:"No Tickets"}),t.jsx(t.Fragment,{children:"All Tickets will be displayed here"}),t.jsx(g,{shape:"pill",children:"Create Ticket"})]}))})};export{dt as default};
