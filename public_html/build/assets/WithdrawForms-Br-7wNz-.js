import{r as c,W as V,j as e,c as I,y as q}from"./app-DPeqRPcX.js";import{T as _}from"./index-Dfq4-ipG.js";import{s as f,i as l,T as n,j as w,a as B}from"./index-BtqGtben.js";import{S as L}from"./Select-CJRs8Qvl.js";import{a as $}from"./index-euvBnKB1.js";import{s as G}from"./trade.module-J6tOawwr.js";import{B as y}from"./index-BuV88OsN.js";import{D as R}from"./dialog.esm-B90dCpDH.js";import{a as J}from"./index-C25-0pYC.js";import{l as U,c as K}from"./index-DOPl3nEV.js";import{b as O}from"./AuthenticatedContext-YAhfpYvk.js";import{A as Q}from"./avatar.esm-CbNomGyH.js";import"./inputtext.esm-DpYC840t.js";import"./componentbase.esm-CEyx904k.js";import"./tooltip.esm-B48pQ4fn.js";import"./portal.esm-ZPKbRoAC.js";import"./index-CFd3A8tf.js";import"./iconBase-BE7iW8MJ.js";import"./Dropdown-VWJDfQuR.js";import"./StyledButton-ciDqVOpa.js";import"./index.esm-UiDtkRAd.js";import"./objectWithoutPropertiesLoose-BwfzGx52.js";import"./iconbase.esm-CycjtHYb.js";import"./ripple.esm-BKB6VsNq.js";import"./index.esm-D2Mau25a.js";import"./sidebar.esm-C28GSpQQ.js";import"./NoData-Bx3RbsXE.js";const Ce=({channel:m,services:F=[],wallet:r})=>{const[s,N]=c.useState(),[E,p]=c.useState(""),[j,k]=c.useState(!1),[g,C]=c.useState(!1),[S,M]=c.useState(0),W=O(),{data:o,setData:u,post:z,processing:D,errors:b,reset:X}=V({amount:0,currency_id:r==null?void 0:r.curr.id,wallet_id:r==null?void 0:r.id,wallet_address:"",type:"wallet",charge:0,network:"",ecoreuser:null}),[a,A]=c.useState({username:"",verified:!1,photo:"",status:500,name:"",temp:""});c.useEffect(()=>{r&&(m=="@ecore"?(N({commission:{fee_amount:"0",percent:"0"},currency:r.curr.code,is_available:!0,limit:{max_amount:r.curr.charges.withdraw_limit_max,min_amount:r.curr.charges.withdraw_limit_min},network:""}),p(""),u({...o,currency_id:r.curr.id,wallet_id:r.id,type:"@ecore"})):N(void 0))},[m,r]);const v=i=>{var d;(d=i.preventDefault)==null||d.call(i),z(route("user.crypto.process.withdraw"),{onSuccess(t){q.reload()}}),j?k(!1):g&&C(!1)},P=e.jsx("div",{children:e.jsx(_,{label:"Amount",placeholder:"Enter Amount",type:"number",value:o.amount,desc:f(s&&r,e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx("span",{children:"Total Fee"}),e.jsx(J,{}),e.jsx("span",{children:S})]})),errorText:E||b.amount,onChange:i=>{let d=0,t=i.target.value.trim();if(t=="."?t="0.":t.startsWith("0")?t.length>1&&(t.charAt(1)==="0"?t="0":t.charAt(1)!=="."&&(t=t.substring(1))):t.startsWith("-")?t="0":t.startsWith(".")&&(t="0"+t),d=t?l.times(t,1):0,!s||!r)return u("amount",t);const H=l.times(r.all_balance.available,1),T=r==null?void 0:r.curr.charges;let h=l.times(m!=="@ecore"&&(T==null?void 0:T.withdraw_charge)||"0.0",1);h&&h>0&&(h=l.plus(l.times(d,l.divide(h,100)),(s==null?void 0:s.commission.fee_amount)||"0.0")),d<l.times((s==null?void 0:s.limit.min_amount)||"0.0",1)||d>l.times((s==null?void 0:s.limit.max_amount)||"100",1)?p(`Min amount is ${s==null?void 0:s.limit.min_amount}, Max is ${s==null?void 0:s.limit.max_amount}`):r&&h+d>H?p("Insufficient Funds"):E&&p(""),M(t>0?h:0),u("amount",t)}})});switch(c.useEffect(()=>{u("network",(s==null?void 0:s.network)||"")},[m]),m){case"wallet":return e.jsxs("form",{onSubmit:v,className:"flex flex-col gap-3",children:[e.jsx("div",{children:e.jsx(_,{onChange:()=>{},desc:f(s,e.jsxs(e.Fragment,{children:["Min: ",s==null?void 0:s.limit.min_amount,", Max: ",s==null?void 0:s.limit.max_amount]})),errorText:b.network,label:"Network",inputElement:()=>e.jsx(B,{element:L,items:F.filter(i=>i.currency===(r==null?void 0:r.curr.code)),contentTemplate:i=>e.jsxs(n,{bright:!0,noPad:!0,md:!0,children:[e.jsx("span",{children:r==null?void 0:r.curr.code}),"-",e.jsx("span",{children:i.network})]}),menuItemTemplate:i=>e.jsxs("div",{children:[e.jsxs(n,{light:!0,bright:!0,className:"gap-2",noPad:!0,sm:!0,children:[e.jsx("span",{children:"fee"})," ",e.jsx($,{})," ",i.commission.fee_amount]}),e.jsxs(n,{noPad:!0,lg:!0,children:[e.jsx("span",{children:r==null?void 0:r.curr.code}),"-",e.jsx("span",{children:i.network})]})]}),unique:"network",outlined:!0,className:G.mobileNetwork,quick:!0,placeholder:"Choose a network",trigger:"!bg-transparent",value:F.find(i=>i.currency==(s==null?void 0:s.currency)&&s.network==i.network),onSelect:i=>{u({...o,network:i.value.network,charge:i.value.commission.fee_amount,currency_id:r==null?void 0:r.curr.id,wallet_id:r==null?void 0:r.id}),N(i.value)},container:"!px-[8px] !py-[1px]"})})}),e.jsx("div",{children:e.jsx(_,{label:"Wallet address",placeholder:"Enter wallet address",type:"text",errorText:b.wallet_address,value:o.wallet_address,onChange:i=>u("wallet_address",i.target.value)})}),P,e.jsx(y,{shape:"pill",type:"button",disabled:D,onClick:()=>{o.amount&&o.network&&o.wallet_address?k(!0):W.error("Fill in all fields")},className:"justify-center",children:"Continue"}),e.jsx(R,{className:"max-w-[350px] w-auto",footer:i=>e.jsx(y,{onClick:v,size:"normal",bgColor:"primary",children:"Confirm"}),header:"Summary",visible:j,onHide:()=>{j&&k(!1)},children:f(j,e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(x,{children:e.jsxs("div",{children:[e.jsx(n,{children:"Network"}),e.jsx(n,{bold:!0,children:o.network})]})}),e.jsx(x,{children:e.jsxs("div",{children:[e.jsx(n,{children:"Amount"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(n,{bold:!0,children:o.amount}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(n,{children:"Fee"}),e.jsx(U,{}),e.jsx(n,{noPad:!0,children:S})]})]})]})}),e.jsx(x,{children:e.jsxs("div",{children:[e.jsx(n,{children:"Wallet Address"}),e.jsx(n,{bold:!0,children:o.wallet_address})]})})]}))})]});case"@ecore":return e.jsxs("form",{onSubmit:v,className:"flex flex-col gap-3",children:[e.jsx("div",{children:e.jsx(_,{desc:e.jsx(n,{normal:!0,noPad:!0,className:I({"!text-danger-400":a.status==500,"!text-warning-400":a.status==400}),children:a.username}),errorText:b.ecoreuser,onChange:i=>{const d=i.target.value;u("ecoreuser",d),window.axios.get(route("user.transfer.details",{account_no:d})).then(t=>{if(t.status===200){if(t.data.verified==0)return A(t.data);A({status:400,username:"This user is not verified - username is "+t.data.username,verified:t.data.verified==1,photo:t.data.photo,name:t.data.name,temp:t.data.username})}}).catch(()=>{A({username:"User not found",verified:!1,temp:"",status:500,photo:"",name:""})})},label:"Ecore Id",placeholder:"6 digit ID"})}),P,e.jsx(y,{type:"button",shape:"pill",onClick:()=>{o.amount&&o.ecoreuser&&a.status!==500?C(!0):W.error("Fill in all fields")},disabled:D,className:"justify-center",children:"Continue"}),e.jsx(R,{className:"max-w-[350px]",footer:i=>e.jsx(y,{shape:"pill",onClick:v,size:"normal",bgColor:"primary",children:"Confirm"}),header:"Summary",visible:g,onHide:()=>{g&&C(!1)},children:f(g,e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx(x,{children:e.jsxs("div",{children:[e.jsx(n,{children:"Account number"}),e.jsx(n,{bold:!0,children:o.ecoreuser})]})}),e.jsx(x,{children:e.jsxs("div",{className:"w-full",children:[e.jsxs(n,{className:"items-center",children:["Username ",e.jsx("small",{className:I("ml-4",{"!text-danger-400":a.verified==0,"!text-warning-400":a.verified==2,"!text-success-400":a.verified==1}),children:a.status==1?"Verified":"unverified"})]}),e.jsxs("div",{className:"flex items-center gap",children:[e.jsx(n,{bold:!0,children:a.temp||a.username}),e.jsx(Q,{className:"!rounded-full ml-auto",icon:f(a.photo,e.jsx("img",{src:w(a.photo)}),e.jsx(e.Fragment,{children:a.name.toUpperCase()})),style:{backgroundColor:"rgb(var(--color-primary-800))",color:"#ffffff"}})]})]})}),e.jsx(x,{children:e.jsxs("div",{children:[e.jsx(n,{children:"Amount"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(n,{bold:!0,children:o.amount}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(n,{children:"Fee"}),e.jsx(U,{}),e.jsx(n,{noPad:!0,children:S})]})]})]})}),e.jsx(x,{children:e.jsxs("div",{children:[e.jsx(n,{children:"Wallet Address"}),e.jsx(n,{bold:!0,children:o.wallet_address})]})})]}))})]})}},x=({children:m})=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{children:e.jsx(K,{})}),m]});export{Ce as default};
