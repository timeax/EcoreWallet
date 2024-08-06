import{r as c,j as r,c as k}from"./app-Dy4LvLRF.js";import{C as y}from"./CryptoIcon-Brjrfh8i.js";import{A as S}from"./AuthenticatedLayout-C92U24GF.js";import{B as _}from"./index-dnLEsu6m.js";import{k as v}from"./index-d7zu85NA.js";import{G as T}from"./iconBase-DZCv2ijQ.js";import{_ as F}from"./index-C0ZgeAGQ.js";import{T as t,e as j,s as P}from"./index-BJExDeV9.js";import{S as b}from"./Select-BZEsACh4.js";import{N as E}from"./Note-Qrm8FgDR.js";import{s as n}from"./trade.module-J6tOawwr.js";import{C as q}from"./TransactionDetail-hSnsC-hu.js";import{b as z}from"./AuthenticatedContext-DYcGaU71.js";import"./index-O4j8kqIm.js";import"./index-Da1p3if4.js";import"./icon-ntwga0O_.js";import"./IconButton-F67XAmfK.js";import"./StyledButton-8JroDcsV.js";import"./avatar.esm-BP5CrG_R.js";import"./componentbase.esm-Ba9buBfq.js";import"./Dropdown-Cgtiaw3a.js";import"./currency-format-CTpoYpuH.js";import"./sidebar.esm-osMPGO0h.js";import"./index.esm-DtYrnCeX.js";import"./objectWithoutPropertiesLoose-BwfzGx52.js";import"./iconbase.esm-DEtBX37m.js";import"./portal.esm-C5r96rIL.js";import"./ripple.esm-DQkBLYAI.js";import"./index.esm-C6CMJl19.js";import"./NoData-CwHNK1Kq.js";function B(e){return T({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{id:"Clock_2"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{d:"M12,21.933A9.933,9.933,0,1,1,21.933,12,9.944,9.944,0,0,1,12,21.933ZM12,3.067A8.933,8.933,0,1,0,20.933,12,8.943,8.943,0,0,0,12,3.067Z"},child:[]},{tag:"path",attr:{d:"M18,12.5H12a.429.429,0,0,1-.34-.14c-.01,0-.01-.01-.02-.02A.429.429,0,0,1,11.5,12V6a.5.5,0,0,1,1,0v5.5H18A.5.5,0,0,1,18,12.5Z"},child:[]}]}]}]})(e)}const pr=({auth:e,addresses:s,wallets:d,wallet:x,services:p,...h})=>{const[o,a]=c.useState(),[i,u]=c.useState([]),[A,f]=c.useState();return c.useEffect(()=>{a(d.find(m=>m.curr.code===x))},[]),c.useEffect(()=>{if(!o)return;const m=s==null?void 0:s.filter(l=>l.currency_id===o.curr.id).map(l=>{var g;const C=(g=p.find(N=>o.curr.code===N.currency&&N.network===l.network))==null?void 0:g.is_available;return{...l,isAvailable:C}});u(m),f(m[0])},[o]),r.jsx(S,{user:e.user,...h,desc:"Add Crypto to your Ecorewallet account!",title:"Fund Account",children:r.jsx(I,{setService:f,serviceList:i,setWallet:a,wallet:o,wallets:d,service:A})})},I=({wallet:e,service:s,serviceList:d,setWallet:x,wallets:p,setService:h})=>{const o=z();function a(i,u){return s?r.jsx(i,{...u}):""}return r.jsx(r.Fragment,{children:r.jsxs("div",{className:n.deposit,children:[r.jsx("div",{className:n.select,children:r.jsxs("div",{className:"flex flex-col gap-4",children:[r.jsxs("div",{className:"flex flex-col gap-3",children:[r.jsx(t,{medium:!0,bright:!0,children:"Select Coin"}),r.jsx(j,{children:r.jsx(b,{quick:!0,contentTemplate:M,menuItemTemplate:L,items:p,unique:"id",placeholder:"Wallet",value:e,onSelect:i=>x(i.value)})})]}),r.jsxs("div",{className:"flex gap-4 pl-4",children:[r.jsx(t,{children:"Total Balance:"}),r.jsxs(t,{md:!0,bold:!0,children:[e==null?void 0:e.balance," ",e==null?void 0:e.curr.code]})]}),r.jsxs("div",{className:k("flex flex-col gap-3",n.coin_address),children:[r.jsxs(t,{medium:!0,bright:!0,children:[e==null?void 0:e.curr.code," Address"]}),r.jsx(j,{children:r.jsxs("div",{className:"flex justify-between",children:[r.jsx(t,{md:!0,medium:!0,normal:!0,children:(s==null?void 0:s.address)||"Please Select A Network"}),r.jsx("div",{children:r.jsx(_,{onClick:()=>{var i;s&&((i=navigator.clipboard)==null||i.writeText(s.address).then(u=>{o.success("Copied wallet address")}))},iconLoc:"right",iconSize:"16px",size:"normal",icon:r.jsx(v,{}),rounded:!0,children:"Copy"})})]})})]})]})}),r.jsxs("div",{className:n.address,children:[r.jsx("div",{className:"mb-4",children:r.jsx(t,{bright:!0,className:n.address_title,medium:!0,children:"Deposit Network"})}),r.jsxs("div",{className:"flex flex-col gap-4",children:[r.jsxs("div",{children:[r.jsx(j,{children:r.jsx(b,{items:d,unique:"id",value:s,label:"network",variant:"outline",quick:!0,onSelect:i=>h(i.value)})}),r.jsxs("div",{className:"flex pl-3 py-4 gap-2 items-center",children:[r.jsx(B,{}),s!=null&&s.isAvailable?r.jsxs(r.Fragment,{children:[r.jsx(t,{noPad:!0,children:"Average Arrival Time:"}),r.jsx(t,{noPad:!0,bold:!0,children:"3 Minutes"})]}):r.jsx(r.Fragment,{children:r.jsx(t,{noPad:!0,children:"Netork is currently down"})})]})]}),r.jsxs("div",{className:"flex flex-col gap-5 items-center",children:[r.jsxs(t,{lg:!0,bold:!0,children:[e==null?void 0:e.curr.code," Address"]}),r.jsxs("div",{className:"flex flex-col gap-4 items-center justify-center",children:[r.jsx("div",{className:n.coin_address_mobile,children:P(s==null?void 0:s.network,r.jsx(q,{value:s==null?void 0:s.address}))}),a(F,{value:s==null?void 0:s.address,size:220})]})]})]}),r.jsx(E,{title:r.jsxs(r.Fragment,{children:["Send Only ",e==null?void 0:e.curr.code," to this Address !"]}),children:r.jsxs(r.Fragment,{children:["Sending coin or token other than ",e==null?void 0:e.curr.code," to this Address may result in the loss of your deposit"]})})]})]})})},L=e=>r.jsx("div",{className:"flex w-fit items-center gap-5",children:r.jsxs("div",{className:"flex items-center gap-2 py-1 px-3 rounded-[999px]",children:[r.jsx(y,{width:"2rem",curr:e.curr,name:e==null?void 0:e.curr.curr_name,label:e==null?void 0:e.curr.symbol}),r.jsx(t,{md:!0,noPad:!0,medium:!0,children:e.curr.curr_name})]})}),M=e=>r.jsxs("div",{className:"flex w-fit items-center gap-5",children:[r.jsxs("div",{className:"flex items-center gap-1 bg-theme-bgContent py-2 px-3 rounded-[999px]",children:[r.jsx(y,{curr:e.curr,width:"2.2rem",height:"2.2rem",size:"12px",name:e==null?void 0:e.curr.curr_name,label:e==null?void 0:e.curr.symbol}),r.jsx(t,{md:!0,noPad:!0,medium:!0,children:e.curr.curr_name})]}),r.jsx(t,{xs:!0,children:e.curr.code})]});export{M as contentTemplate,pr as default,L as menuTemplate};
