import{W as n,j as e,Y as d}from"./app-DPeqRPcX.js";import{T as u,I as p,P as c}from"./TextInput-WUpXx_Sz.js";import{G as x}from"./GuestLayout-BKe6UnOB.js";import"./message.esm-D0JP2ibE.js";import"./componentbase.esm-CEyx904k.js";import"./index.esm-D2Mau25a.js";import"./iconbase.esm-CycjtHYb.js";import"./icon-ntwga0O_.js";import"./index-BtqGtben.js";function P({status:t}){const{data:a,setData:r,post:o,processing:m,errors:i}=n({email:""}),l=s=>{s.preventDefault(),o(route("password.email"))};return e.jsxs(x,{title:"Enter your email",children:[e.jsx(d,{title:"Forgot Password"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),t&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),e.jsxs("form",{onSubmit:l,children:[e.jsx(u,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",isFocused:!0,onChange:s=>r("email",s.target.value)}),e.jsx(p,{message:i.email,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-end mt-4",children:e.jsx(c,{className:"ms-4",disabled:m,children:"Email Password Reset Link"})})]})]})}export{P as default};
