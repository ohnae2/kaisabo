import{d as _,u as b,a as f,b as g,c as h,r as v,o as w,e as S,f as s,w as d,v as m,g as x,h as U,i as k,p as y,j as L,_ as I}from"./index-b96c7cd4.js";import{f as V}from"./formApi-09baa514.js";import"./index-3df2611e.js";class A{async getUserLogin(r){return(await V("/auth/getUserLogin",r)).data}}const B=new A,a=n=>(y("data-v-c624793f"),n=n(),L(),n),C={id:"login"},D=a(()=>s("legend",null,"로그인",-1)),F=a(()=>s("h1",null,"Administrator",-1)),M={class:"label"},T=a(()=>s("span",{class:"icon"},"",-1)),q={class:"label"},N=a(()=>s("span",{class:"icon"},"",-1)),$=a(()=>s("span",{class:"remember"}," 아이디 저장",-1)),j=a(()=>s("button",{type:"submit"},"로그인",-1)),E=_({__name:"Login",setup(n){const{cookies:r}=b(),p=f(),l=g();h();const c=r.get("id")||"",o=v({id:c,password:"",remember:!!c}),u=()=>{const i=new FormData;i.append("id",o.id),i.append("password",o.password),i.append("remember",o.remember+""),o.remember?r.set("id",o.id):r.remove("id"),B.getUserLogin(i).then(e=>{e&&e.success?l.loginSuccess(e.data):(l.loginFail(),p.open({title:null,message:"("+l.count+") "+e.message}))},e=>{console.log(e)})};return(i,e)=>(w(),S("div",C,[s("form",{onSubmit:e[3]||(e[3]=k(t=>u(),["prevent"])),method:"POST",ref:"login"},[s("fieldset",null,[D,F,s("label",M,[T,d(s("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>o.id=t),name:"id",placeholder:"아이디를 입력해주세요",required:""},null,512),[[m,o.id]])]),s("label",q,[N,d(s("input",{type:"password","onUpdate:modelValue":e[1]||(e[1]=t=>o.password=t),name:"password",placeholder:"비밀번호를 입력해주세요",required:""},null,512),[[m,o.password]])]),s("label",null,[d(s("input",{type:"checkbox","onUpdate:modelValue":e[2]||(e[2]=t=>o.remember=t),name:"remember"},null,512),[[x,o.remember]]),U(),$]),j])],544)]))}});const z=I(E,[["__scopeId","data-v-c624793f"]]);export{z as default};
