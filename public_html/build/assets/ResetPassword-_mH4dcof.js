import{W as w,r as f,j as s,Y as x}from"./app-DPeqRPcX.js";import{T as t,I as m,P as j}from"./TextInput-WUpXx_Sz.js";import{I as i}from"./InputLabel-DNJeEK4x.js";import{G as v}from"./GuestLayout-BKe6UnOB.js";import"./message.esm-D0JP2ibE.js";import"./componentbase.esm-CEyx904k.js";import"./index.esm-D2Mau25a.js";import"./iconbase.esm-CycjtHYb.js";import"./icon-ntwga0O_.js";import"./index-BtqGtben.js";function R({token:l,email:n}){const{data:e,setData:r,post:p,processing:d,errors:o,reset:c}=w({token:l,email:n,password:"",password_confirmation:""});f.useEffect(()=>()=>{c("password","password_confirmation")},[]);const u=a=>{a.preventDefault(),p(route("password.store"))};return s.jsxs(v,{title:"Reset your password",children:[s.jsx(x,{title:"Reset Password"}),s.jsxs("form",{onSubmit:u,children:[s.jsxs("div",{children:[s.jsx(i,{htmlFor:"email",value:"Email"}),s.jsx(t,{id:"email",type:"email",name:"email",value:e.email,className:"mt-1 block w-full",autoComplete:"username",onChange:a=>r("email",a.target.value)}),s.jsx(m,{message:o.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(i,{htmlFor:"password",value:"Password"}),s.jsx(t,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,onChange:a=>r("password",a.target.value)}),s.jsx(m,{message:o.password,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(i,{htmlFor:"password_confirmation",value:"Confirm Password"}),s.jsx(t,{type:"password",name:"password_confirmation",value:e.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>r("password_confirmation",a.target.value)}),s.jsx(m,{message:o.password_confirmation,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(j,{className:"ms-4",disabled:d,children:"Reset Password"})})]})]})}export{R as default};
