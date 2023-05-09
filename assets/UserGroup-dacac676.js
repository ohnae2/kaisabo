import{d as G,b as M,r as h,x as S,o as _,e as b,f as t,w as l,v as u,J as k,B as x,K as C,l as w,h as p,H as R,i as L,L as Y,p as V,j as K,_ as N}from"./index-b96c7cd4.js";import{G as B,S as q,a as H}from"./SelectGroupDate-2b14e51a.js";import{j as m}from"./jsonApi-4e63100b.js";import{f}from"./formApi-09baa514.js";import"./index-3df2611e.js";import"./util.date-6e182eaa.js";class T{async getUserGroupList(n){return(await m("/bo/mb/getUserGroupList",n||{})).data}async getUserGroup(n){return(await m("/bo/mb/getUserGroup",n||{})).data}async setUserGroupList(n){return(await m("/bo/mb/setUserGroupList",n||{})).data}async insertUserGroup(n){return(await f("/bo/mb/insertUserGroup",n)).data}async updateUserGroup(n){return(await f("/bo/mb/updateUserGroup",n)).data}async deleteUserGroup(n){return(await f("/bo/mb/getUserGroupList",n)).data}}const y=new T,a=i=>(V("data-v-4972c2f2"),i=i(),K(),i),A={id:"usergroup"},E=["onSubmit","onKeyup"],z=a(()=>t("legend",null,"검색",-1)),F=a(()=>t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1)),J=a(()=>t("th",null,"검색조건",-1)),O={colspan:"3"},W={key:0},X=a(()=>t("th",null,"업체ID",-1)),$={colspan:"3"},j={class:"audit"},P=a(()=>t("th",null,"수정기간",-1)),Q={colspan:"3"},Z=a(()=>t("th",null,"등록일",-1)),tt={colspan:"3"},et=a(()=>t("th",null,"수정ID",-1)),ot=a(()=>t("th",null,"등록ID",-1)),st={class:"btnWrap"},rt=a(()=>t("span",{class:"icon"},"",-1)),nt=a(()=>t("span",{class:"icon"},"",-1)),dt=a(()=>t("span",{class:"icon"},"",-1)),at=a(()=>t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1)),it=a(()=>t("span",{class:"icon"},'"',-1)),lt=[it],ut={class:"totalCount"},ct=a(()=>t("div",{id:"grid"},null,-1)),pt=G({__name:"UserGroup",setup(i){const n=M(),s=h({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),d=h({grid:{},required:["grpNm"],totalCount:0,list:[],audit:!1}),c=function(){y.getUserGroupList(s).then(r=>{d.totalCount=r.count?r.count:0,d.list=r.data,d.grid.resetData(r.data,{})},r=>{console.log(r)})},D=function(){d.grid.appendRow({},{at:0})},I=function(){let r=d.grid.getFocusedCell();if(r.rowKey==null||r.rowKey==null){alert("행을 먼저 선택해주세요.");return}confirm("선택한 행을 정말 삭제하시겠습니까?")&&d.grid.removeRow(r.rowKey)},v=function(){location.reload()},g=function(r){for(let e in r)for(let o of d.required)if(e==o&&!r[e])return alert(e+" 필수값이 없습니다."),!1;return!0},U=function(){d.grid.blur();let r=[],e=[0,0,0];for(let o of d.grid.getModifiedRows().createdRows){if(o.crud="C",!g(o))return;r.push(o),e[0]++}for(let o of d.grid.getModifiedRows().updatedRows){if(o.crud="U",!g(o))return;r.push(o),e[1]++}for(let o of d.grid.getModifiedRows().deletedRows)o.crud="D",r.push(o),e[2]++;if(e[0]==0&&e[1]==0&&e[2]==0){alert("변경사항이 없습니다.");return}confirm("등록 "+e[0]+"건, 수정 "+e[1]+"건, 삭제 "+e[2]+"건을 정말 저장하시겠습니까?")&&y.setUserGroupList(r).then(o=>{location.reload()},o=>{console.log(o)})};return S(()=>{d.grid=new B({el:document.getElementById("grid"),columns:[{header:"그룹ID",name:"grpId",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"업체ID",name:"cmpId",sortable:!0,width:100,align:"left",disabled:n.userInfo.cmpId!="kaisa",editor:"text"},{header:"그룹명",name:"grpNm",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),d.grid.on("click",function(r){r.columnName==="cd"&&console.log("click")}),c()}),(r,e)=>(_(),b("div",A,[t("form",{class:"search",onSubmit:L(c,["prevent"]),onKeyup:Y(c,["enter"])},[t("fieldset",null,[z,t("table",null,[F,t("tbody",null,[t("tr",null,[J,t("td",O,[l(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=o=>s.keyword=o)},null,512),[[u,s.keyword]])])]),k(n).userInfo.cmpId=="kaisa"?(_(),b("tr",W,[X,t("td",$,[l(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=o=>s.cmpId=o)},null,512),[[u,s.cmpId]])])])):x("",!0)]),l(t("tbody",j,[t("tr",null,[P,t("td",Q,[w(q,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[s.startModDt,s.endModDt],onSetStartDate:e[2]||(e[2]=o=>{s.startModDt=o.date}),onSetEndDate:e[3]||(e[3]=o=>{s.endModDt=o.date})},null,8,["date"])])]),t("tr",null,[Z,t("td",tt,[w(H,{name:["regDt"],format:"YYYY-MM-DD",date:[s.regDt],onSetStartDate:e[4]||(e[4]=o=>{s.regDt=o.date})},null,8,["date"])])]),t("tr",null,[et,t("td",null,[l(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=o=>s.modId=o)},null,512),[[u,s.modId]])]),ot,t("td",null,[l(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=o=>s.regId=o)},null,512),[[u,s.regId]])])])],512),[[C,d.audit]])])]),t("div",st,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:D},[rt,p("추가")]),t("button",{type:"button",class:"button save",onClick:U},[nt,p("저장")]),t("button",{type:"button",class:"button del",onClick:I},[dt,p("삭제")])]),t("button",{type:"button",class:"audit",onClick:e[7]||(e[7]=o=>d.audit=!d.audit)},"상세조회"),at,t("button",{type:"reset",onClick:v},lt),t("div",ut,"총 "+R(d.totalCount)+"건",1)])],40,E),ct]))}});const wt=N(pt,[["__scopeId","data-v-4972c2f2"]]);export{wt as default};
