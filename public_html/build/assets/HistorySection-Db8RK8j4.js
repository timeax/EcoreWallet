import{j as r,a as p,d,c}from"./app-DPeqRPcX.js";import{U as j,d as m,T as t,s as u,i as f,n as g}from"./index-BtqGtben.js";import{C as h}from"./CryptoIcon-C9dw8rPY.js";import{N as y}from"./NoData-Bx3RbsXE.js";import{B as v}from"./index-BuV88OsN.js";import{r as l,e as w,B as N}from"./index-DAW83uBr.js";import{C as x}from"./currency-format-BghgJM0E.js";import{a as b}from"./StyledButton-ciDqVOpa.js";import{B as T}from"./index-CZiaJmKJ.js";import{G as C}from"./iconBase-BE7iW8MJ.js";import{u as L,S as P}from"./TransactionDetail-Bbh_PUdh.js";import"./index-DOPl3nEV.js";import"./index-B-zkmOMm.js";import"./sidebar.esm-C28GSpQQ.js";import"./componentbase.esm-CEyx904k.js";import"./index.esm-UiDtkRAd.js";import"./objectWithoutPropertiesLoose-BwfzGx52.js";import"./iconbase.esm-CycjtHYb.js";import"./portal.esm-ZPKbRoAC.js";import"./ripple.esm-BKB6VsNq.js";import"./AuthenticatedContext-YAhfpYvk.js";import"./index.esm-D2Mau25a.js";import"./Select-CJRs8Qvl.js";import"./Dropdown-VWJDfQuR.js";function B(e){return C({tag:"svg",attr:{viewBox:"0 0 32 32"},child:[{tag:"path",attr:{d:"M 15 4 L 15 24.0625 L 10.71875 19.78125 L 9.28125 21.1875 L 16 27.90625 L 22.71875 21.1875 L 21.28125 19.78125 L 17 24.0625 L 17 4 Z"},child:[]}]})(e)}const S=({transactions:e})=>r.jsx("section",{children:r.jsx(j,{header:r.jsx(m,{lg:!0,title:"Recent Transactions",children:r.jsx(t,{noPad:!0,normal:!0,md:!0,bright:!0,children:r.jsx(p,{href:route(l("history").route),children:"See all"})})}),className:d.history,children:u(e.length>0,r.jsx(k,{transactions:e}),r.jsxs(y,{children:[r.jsx(r.Fragment,{children:"No Transaction Data Found"}),r.jsx(r.Fragment,{children:"Your latest transactions or activities will be displayed here"}),r.jsx(v,{href:route(l("fund").route),shape:"pill",size:"normal",children:"Make a deposit"})]}))})}),tr=S,k=({transactions:e})=>{const n=L();function i(s,a=!1){const o=g(s);return r.jsxs(r.Fragment,{children:[r.jsx(t,{bright:!0,noPad:!0,xs:!0,children:o.time}),r.jsx(t,{bright:!0,noPad:!0,children:a?o.date.split(" ").slice(1,-1).join(" "):o.date})]})}return r.jsxs("div",{children:[r.jsx("table",{children:r.jsx("tbody",{children:e.map(s=>r.jsxs("tr",{onClick:()=>n({data:s}),children:[r.jsx("td",{children:r.jsxs("div",{className:"flex gap-2",children:[r.jsx(h,{size:"13px",height:"30px",width:"30px",curr:s.currency}),r.jsx(t,{bold:!0,brighter:!0,noPad:!0,children:s.currency.code})]})}),r.jsx("td",{children:r.jsx("div",{children:i(s.created_at)})}),r.jsx("td",{children:r.jsx(t,{noPad:!0,children:s.details})}),r.jsx("td",{children:r.jsx(t,{noPad:!0,children:r.jsx(x,{value:s.amount,displayType:"text",thousandSeparator:!0,renderText:a=>r.jsx("span",{children:a})})})}),r.jsx("td",{children:r.jsx(t,{noPad:!0,className:c({"!text-success":s.status=="success"||s.status=="","!text-warning":s.status=="pending","!text-danger":s.status=="failed"}),children:s.status||"success"})})]},s.id))})}),r.jsx("div",{className:d.history_mobile,children:e.map(s=>r.jsxs("div",{className:c("flex py-2 justify-between",d.history_item),onClick:()=>n({data:s}),children:[r.jsxs("div",{className:"flex gap-2 items-center",children:[r.jsx(I,{type:s.remark.toLowerCase()}),r.jsxs("div",{children:[r.jsx(t,{noPad:!0,children:s.remark}),r.jsx("div",{className:"flex gap-1",children:i(s.updated_at||s.created_at,!0)})]})]}),r.jsxs("div",{className:"flex flex-col items-end",children:[r.jsxs("div",{className:"flex items-center",children:[s.type,r.jsxs(t,{noPad:!0,className:"flex gap-1",children:[r.jsx(x,{value:f.round(s.amount,8),displayType:"text",thousandSeparator:!0,renderText:a=>r.jsx("span",{children:a})}),s.currency.code]})]}),r.jsx(P,{textProps:{className:"items-center !font-light !text-[.6em]"},stats:s.status,value:s.status})]})]},s.id))})]})},I=({type:e,curr:n,className:i})=>{const s=e==="deposit"?r.jsx(B,{}):e==="exchange"?r.jsx(T,{}):e=="withdraw"?r.jsx(w,{}):r.jsx(N,{}),a=e==="deposit"?"success":e==="exchange"?"primary":e=="withdraw"?"warning":"info",o=b("background")(a,{normal:300});return r.jsxs("div",{style:{color:o.color},className:c(d.transaction_icon,i),children:[s,u(n,r.jsx("div",{"data-section":"crypto-icon",children:r.jsx(h,{curr:n,width:"12px",fit:!0})}))]})};export{k as History,I as TransactionIcon,tr as default};
