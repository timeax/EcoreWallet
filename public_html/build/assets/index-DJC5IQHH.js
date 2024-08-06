import{r as a,P,O as w,c as y,j as e}from"./app-Dy4LvLRF.js";import{I as N}from"./inputtext.esm-DnvBpWCX.js";import{a as r,s as b,k as C}from"./index-BJExDeV9.js";import{C as E,u as k,a as R}from"./componentbase.esm-Ba9buBfq.js";import{d as T,e as _}from"./index-CmxVb01E.js";var L={root:"p-float-label"},F=`
@layer primereact {
    .p-float-label {
        display: block;
        position: relative;
    }
    
    .p-float-label label {
        position: absolute;
        pointer-events: none;
        top: 50%;
        margin-top: -.5rem;
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
    }
    
    .p-float-label:has(textarea) label {
        top: 1rem;
    }
    
    .p-float-label:has(input:focus) label,
    .p-float-label:has(input.p-filled) label,
    .p-float-label:has(input:-webkit-autofill) label,
    .p-float-label:has(textarea:focus) label,
    .p-float-label:has(textarea.p-filled) label,
    .p-float-label:has(.p-inputwrapper-focus) label,
    .p-float-label:has(.p-inputwrapper-filled) label {
        top: -.75rem;
        font-size: 12px;
    }
    
    .p-float-label .p-placeholder,
    .p-float-label input::placeholder,
    .p-float-label .p-inputtext::placeholder {
        opacity: 0;
        transition-property: all;
        transition-timing-function: ease;
    }
    
    .p-float-label .p-focus .p-placeholder,
    .p-float-label input:focus::placeholder,
    .p-float-label .p-inputtext:focus::placeholder {
        opacity: 1;
        transition-property: all;
        transition-timing-function: ease;
    }
}`,p=E.extend({defaultProps:{__TYPE:"FloatLabel",children:void 0},css:{classes:L,styles:F}}),g=a.memo(a.forwardRef(function(c,t){var f=k(),d=a.useContext(P),l=p.getProps(c,d),n=a.useRef(t),s=p.setMetaData({props:l}),m=s.ptm,i=s.cx,u=s.isUnstyled;R(p.css.styles,u,{name:"floatlabel"}),a.useEffect(function(){w.combinedRefs(n,t)},[n,t]);var o=f({ref:n,className:y(i("root"))},p.getOtherProps(l),m("root"));return a.createElement("span",o,l.children)}));g.displayName="FloatLabel";const S="_textfield_kkfrq_1",B={textfield:S},z=({className:c,label:t,floatLabel:f,onChange:d,desc:l,descId:n,errorText:s,id:m,htmlFor:i,sx:u,type:o,inputElement:v=N,...h})=>{const[x,j]=a.useState(!1);return e.jsxs(r,{element:f?g:"div",id:m,className:"flex flex-col gap-1 "+c,sx:u,children:[t?e.jsxs(r,{fontSize:"14px",element:"label",color:"rgb(var(--color-theme-title))",className:"font-medium",htmlFor:i,children:[t," ",b(h.required,e.jsx("span",{className:"text-danger-300",children:"*"}))]}):"",e.jsxs("div",{className:"relative h-fit",children:[e.jsx(r,{element:v,type:y(o,{text:o=="password"&&x}),"data-section":"input",className:B.textfield,id:i,"aria-describedby":n,onChange:d,...h}),b(o=="password",e.jsx(r,{onClick:()=>j(!x),element:"div",sx:{position:"absolute",height:"100%",right:0,top:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 10px"},children:b(x,e.jsx(T,{}),e.jsx(_,{}))}))]}),l?e.jsx("small",{id:n,children:l}):"",s?e.jsx(C,{className:"!text-danger-700 !font-medium",variant:"small",children:s}):""]})};export{z as T};
