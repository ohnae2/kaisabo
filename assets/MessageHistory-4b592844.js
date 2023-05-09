import{d as H,b as S,r as m,x,o as y,e as b,f as t,w as l,v as u,J as k,B as C,K as R,l as _,h as g,H as L,i as Y,L as V,p as q,j as K,_ as T}from"./index-b96c7cd4.js";import{G as B,S as N,a as U}from"./SelectGroupDate-2b14e51a.js";import{j as p}from"./jsonApi-4e63100b.js";import{f}from"./formApi-09baa514.js";import"./index-3df2611e.js";import"./util.date-6e182eaa.js";class A{async getMessageHistoryList(d){return(await p("/bo/bs/getMessageHistoryList",d||{})).data}async getMessageHistory(d){return(await p("/bo/bs/getMessageHistory",d||{})).data}async setMessageHistoryList(d){return(await p("/bo/bs/setMessageHistoryList",d||{})).data}async insertMessageHistory(d){return(await f("/bo/bs/insertMessageHistory",d)).data}async updateMessageHistory(d){return(await f("/bo/bs/updateMessageHistory",d)).data}async deleteMessageHistory(d){return(await f("/bo/bs/getMessageHistoryList",d)).data}}const w=new A,r=i=>(q("data-v-a9a2a584"),i=i(),K(),i),E={id:"messagehistory"},G=["onSubmit","onKeyup"],z=r(()=>t("legend",null,"검색",-1)),F=r(()=>t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1)),J=r(()=>t("th",null,"검색조건",-1)),O={colspan:"3"},W={key:0},X=r(()=>t("th",null,"업체ID",-1)),$={colspan:"3"},j={class:"audit"},P=r(()=>t("th",null,"수정기간",-1)),Q={colspan:"3"},Z=r(()=>t("th",null,"등록일",-1)),tt={colspan:"3"},et=r(()=>t("th",null,"수정ID",-1)),st=r(()=>t("th",null,"등록ID",-1)),ot={class:"btnWrap"},at=r(()=>t("span",{class:"icon"},"",-1)),nt=r(()=>t("span",{class:"icon"},"",-1)),dt=r(()=>t("span",{class:"icon"},"",-1)),rt=r(()=>t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1)),it=r(()=>t("span",{class:"icon"},'"',-1)),lt=[it],ut={class:"totalCount"},ct=r(()=>t("div",{id:"grid"},null,-1)),gt=H({__name:"MessageHistory",setup(i){const d=S(),o=m({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),n=m({grid:{},required:["cnts"],totalCount:0,list:[],audit:!1}),c=function(){w.getMessageHistoryList(o).then(a=>{n.totalCount=a.count?a.count:0,n.list=a.data,n.grid.resetData(a.data,{})},a=>{console.log(a)})},M=function(){n.grid.appendRow({},{at:0})},D=function(){let a=n.grid.getFocusedCell();if(a.rowKey==null||a.rowKey==null){alert("행을 먼저 선택해주세요.");return}confirm("선택한 행을 정말 삭제하시겠습니까?")&&n.grid.removeRow(a.rowKey)},v=function(){location.reload()},h=function(a){for(let e in a)for(let s of n.required)if(e==s&&!a[e])return alert(e+" 필수값이 없습니다."),!1;return!0},I=function(){n.grid.blur();let a=[],e=[0,0,0];for(let s of n.grid.getModifiedRows().createdRows){if(s.crud="C",!h(s))return;a.push(s),e[0]++}for(let s of n.grid.getModifiedRows().updatedRows){if(s.crud="U",!h(s))return;a.push(s),e[1]++}for(let s of n.grid.getModifiedRows().deletedRows)s.crud="D",a.push(s),e[2]++;if(e[0]==0&&e[1]==0&&e[2]==0){alert("변경사항이 없습니다.");return}confirm("등록 "+e[0]+"건, 수정 "+e[1]+"건, 삭제 "+e[2]+"건을 정말 저장하시겠습니까?")&&w.setMessageHistoryList(a).then(s=>{location.reload()},s=>{console.log(s)})};return x(()=>{n.grid=new B({el:document.getElementById("grid"),columns:[{header:"메시지번호",name:"msgNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"사용자ID",name:"usrId",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"회원ID",name:"mbrId",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"내용",name:"cnts",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),n.grid.on("click",function(a){a.columnName==="cd"&&console.log("click")}),c()}),(a,e)=>(y(),b("div",E,[t("form",{class:"search",onSubmit:Y(c,["prevent"]),onKeyup:V(c,["enter"])},[t("fieldset",null,[z,t("table",null,[F,t("tbody",null,[t("tr",null,[J,t("td",O,[l(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=s=>o.keyword=s)},null,512),[[u,o.keyword]])])]),k(d).userInfo.cmpId=="kaisa"?(y(),b("tr",W,[X,t("td",$,[l(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=s=>o.cmpId=s)},null,512),[[u,o.cmpId]])])])):C("",!0)]),l(t("tbody",j,[t("tr",null,[P,t("td",Q,[_(N,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[o.startModDt,o.endModDt],onSetStartDate:e[2]||(e[2]=s=>{o.startModDt=s.date}),onSetEndDate:e[3]||(e[3]=s=>{o.endModDt=s.date})},null,8,["date"])])]),t("tr",null,[Z,t("td",tt,[_(U,{name:["regDt"],format:"YYYY-MM-DD",date:[o.regDt],onSetStartDate:e[4]||(e[4]=s=>{o.regDt=s.date})},null,8,["date"])])]),t("tr",null,[et,t("td",null,[l(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=s=>o.modId=s)},null,512),[[u,o.modId]])]),st,t("td",null,[l(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=s=>o.regId=s)},null,512),[[u,o.regId]])])])],512),[[R,n.audit]])])]),t("div",ot,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:M},[at,g("추가")]),t("button",{type:"button",class:"button save",onClick:I},[nt,g("저장")]),t("button",{type:"button",class:"button del",onClick:D},[dt,g("삭제")])]),t("button",{type:"button",class:"audit",onClick:e[7]||(e[7]=s=>n.audit=!n.audit)},"상세조회"),rt,t("button",{type:"reset",onClick:v},lt),t("div",ut,"총 "+L(n.totalCount)+"건",1)])],40,G),ct]))}});const _t=T(gt,[["__scopeId","data-v-a9a2a584"]]);export{_t as default};
