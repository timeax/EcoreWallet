import{r as f,j as u}from"./app-CXhxP4IC.js";import{d as m,p as x,e as j,s as p,T as h}from"./index-uIOWaCi_.js";const y=Object.keys(m).map(e=>e.split("__").join(" ").trim().toLowerCase());function g(e){const o=y.find(t=>t===e.toLowerCase()||e.startsWith(t))||"defaultColor";return m[o.split(" ").join("__")]}const k=({name:e="",shape:o="circle",label:t=e,curr:s,img:i,...l})=>{let n=["flex items-center justify-center"];o==="circle"&&n.push("rounded-full"),o==="pill"&&n.push("rounded-[999px]"),o==="smooth"&&n.push("rounded"),s&&(e=s.curr_name,t=s.symbol,i||(i=j(s.icon)));const[r,d]=f.useState(),c=f.useRef();return f.useEffect(()=>{if(c.current){const a=c.current.querySelector("img");a&&d(a.complete)}},[]),u.jsxs(C,{tagRef:c,loaded:r,className:n.join(" "),name:e,...l,children:[p(i,u.jsx("img",{src:i})),p(!r,t)]})},C=x(h)(({size:e,width:o="3rem",loaded:t,height:s="3rem",shape:i="circle",variant:l="contained",name:n=""})=>{const r=g(n),d={background:"none",img:{width:"100%"}},c={background:r,color:"white"},a={border:"1px solid "+r,color:r};return{...l==="contained"?c:a,minWidth:o,width:o,display:"flex",height:s,position:"relative",...t?d:{},...e?{fontSize:e}:""}});export{k as C};
