import{d as P,b as C,r as b,x as T,o as g,e as _,f as t,w as l,v as u,J as Y,B as M,K as S,l as w,h as p,H as k,i as q,L,p as N,j as R,_ as V}from"./index-b96c7cd4.js";import{G as K,S as B,a as H}from"./SelectGroupDate-2b14e51a.js";import{j as f}from"./jsonApi-4e63100b.js";import{f as m}from"./formApi-09baa514.js";import"./index-3df2611e.js";import"./util.date-6e182eaa.js";class U{async getProductList(r){return(await f("/bo/pr/getProductList",r||{})).data}async getProduct(r){return(await f("/bo/pr/getProduct",r||{})).data}async setProductList(r){return(await f("/bo/pr/setProductList",r||{})).data}async insertProduct(r){return(await m("/bo/pr/insertProduct",r)).data}async updateProduct(r){return(await m("/bo/pr/updateProduct",r)).data}async deleteProduct(r){return(await m("/bo/pr/getProductList",r)).data}}const y=new U,i=n=>(N("data-v-883bf04e"),n=n(),R(),n),A={id:"product"},E=["onSubmit","onKeyup"],G=i(()=>t("legend",null,"검색",-1)),z=i(()=>t("colgroup",null,[t("col",{width:"80"}),t("col",{width:"30%"}),t("col",{width:"80"}),t("col",{width:"*"})],-1)),F=i(()=>t("th",null,"검색조건",-1)),J={colspan:"3"},O={key:0},W=i(()=>t("th",null,"업체ID",-1)),X={colspan:"3"},$={class:"audit"},j=i(()=>t("th",null,"수정기간",-1)),Q={colspan:"3"},Z=i(()=>t("th",null,"등록일",-1)),tt={colspan:"3"},et=i(()=>t("th",null,"수정ID",-1)),ot=i(()=>t("th",null,"등록ID",-1)),at={class:"btnWrap"},dt=i(()=>t("span",{class:"icon"},"",-1)),rt=i(()=>t("span",{class:"icon"},"",-1)),st=i(()=>t("span",{class:"icon"},"",-1)),it=i(()=>t("button",{type:"submit",class:"button3"},[t("span",{class:"icon"},"")],-1)),nt=i(()=>t("span",{class:"icon"},'"',-1)),lt=[nt],ut={class:"totalCount"},ct=i(()=>t("div",{id:"grid"},null,-1)),pt=P({__name:"Product",setup(n){const r=C(),a=b({keyword:"",startModDt:"",endModDt:"",regDt:"",regId:"",modId:"",cmpId:""}),s=b({grid:{},required:["prodNm","petPsbYn","prir"],totalCount:0,list:[],audit:!1}),c=function(){y.getProductList(a).then(d=>{s.totalCount=d.count?d.count:0,s.list=d.data,s.grid.resetData(d.data,{})},d=>{console.log(d)})},v=function(){s.grid.appendRow({},{at:0})},D=function(){let d=s.grid.getFocusedCell();if(d.rowKey==null||d.rowKey==null){alert("행을 먼저 선택해주세요.");return}confirm("선택한 행을 정말 삭제하시겠습니까?")&&s.grid.removeRow(d.rowKey)},I=function(){location.reload()},h=function(d){for(let e in d)for(let o of s.required)if(e==o&&!d[e])return alert(e+" 필수값이 없습니다."),!1;return!0},x=function(){s.grid.blur();let d=[],e=[0,0,0];for(let o of s.grid.getModifiedRows().createdRows){if(o.crud="C",!h(o))return;d.push(o),e[0]++}for(let o of s.grid.getModifiedRows().updatedRows){if(o.crud="U",!h(o))return;d.push(o),e[1]++}for(let o of s.grid.getModifiedRows().deletedRows)o.crud="D",d.push(o),e[2]++;if(e[0]==0&&e[1]==0&&e[2]==0){alert("변경사항이 없습니다.");return}confirm("등록 "+e[0]+"건, 수정 "+e[1]+"건, 삭제 "+e[2]+"건을 정말 저장하시겠습니까?")&&y.setProductList(d).then(o=>{location.reload()},o=>{console.log(o)})};return T(()=>{s.grid=new K({el:document.getElementById("grid"),columns:[{header:"상품번호",name:"prodNo",sortable:!0,width:100,align:"right",disabled:!0,validation:{dataType:"number",required:!1},editor:"text"},{header:"업체ID",name:"cmpId",sortable:!0,width:100,align:"left",disabled:r.userInfo.cmpId!="kaisa",editor:"text"},{header:"상품명",name:"prodNm",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!1},editor:"text"},{header:"인원수",name:"psnelCnt",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!0},editor:"text"},{header:"최대인원수",name:"maxPsnelCnt",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!0},editor:"text"},{header:"평수",name:"m2",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!0},editor:"text"},{header:"애완동물가능여부",name:"petPsbYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!1,validation:{dataType:"string",required:!1},formatter:"listItemText",editor:{type:"select",options:{listItems:r.codeList.YN_CD}}},{header:"내용",name:"cnts",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"우선순위",name:"prir",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!1},editor:"text"},{header:"파일번호",name:"fileNo",sortable:!0,width:100,align:"right",disabled:!1,validation:{dataType:"number",required:!0},editor:"text"},{header:"사용여부",name:"useYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!1,validation:{dataType:"string",required:!0},formatter:"listItemText",editor:{type:"select",options:{listItems:r.codeList.YN_CD}}},{header:"전시여부",name:"dispYn",width:120,align:"left",sortable:!0,defaultValue:"Y",disabled:!1,validation:{dataType:"string",required:!0},formatter:"listItemText",editor:{type:"select",options:{listItems:r.codeList.YN_CD}}},{header:"비고",name:"note",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"연동참조2",name:"linkRef2",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"연동참조",name:"linkRef",sortable:!0,width:100,align:"left",disabled:!1,validation:{dataType:"string",required:!0},editor:"text"},{header:"수정ID",name:"modId",align:"left",sortable:!0,width:110,disabled:!0},{header:"수정일시",name:"modDt",align:"left",sortable:!0,width:120,disabled:!0},{header:"등록ID",name:"regId",align:"left",sortable:!0,width:110,disabled:!0},{header:"등록일시",name:"regDt",align:"left",sortable:!0,width:120,disabled:!0}],scrollX:!0,scrollY:!0,minBodyHeight:200,bodyHeight:468,columnOptions:{resizable:!0},minRowHeight:40,rowHeight:40,header:{height:40}}),s.grid.on("click",function(d){d.columnName==="cd"&&console.log("click")}),c()}),(d,e)=>(g(),_("div",A,[t("form",{class:"search",onSubmit:q(c,["prevent"]),onKeyup:L(c,["enter"])},[t("fieldset",null,[G,t("table",null,[z,t("tbody",null,[t("tr",null,[F,t("td",J,[l(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=o=>a.keyword=o)},null,512),[[u,a.keyword]])])]),Y(r).userInfo.cmpId=="kaisa"?(g(),_("tr",O,[W,t("td",X,[l(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=o=>a.cmpId=o)},null,512),[[u,a.cmpId]])])])):M("",!0)]),l(t("tbody",$,[t("tr",null,[j,t("td",Q,[w(B,{name:["startModDt","endModDt"],format:"YYYY-MM-DD",date:[a.startModDt,a.endModDt],onSetStartDate:e[2]||(e[2]=o=>{a.startModDt=o.date}),onSetEndDate:e[3]||(e[3]=o=>{a.endModDt=o.date})},null,8,["date"])])]),t("tr",null,[Z,t("td",tt,[w(H,{name:["regDt"],format:"YYYY-MM-DD",date:[a.regDt],onSetStartDate:e[4]||(e[4]=o=>{a.regDt=o.date})},null,8,["date"])])]),t("tr",null,[et,t("td",null,[l(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=o=>a.modId=o)},null,512),[[u,a.modId]])]),ot,t("td",null,[l(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=o=>a.regId=o)},null,512),[[u,a.regId]])])])],512),[[S,s.audit]])])]),t("div",at,[t("span",{class:"crud"},[t("button",{type:"button",class:"button add",onClick:v},[dt,p("추가")]),t("button",{type:"button",class:"button save",onClick:x},[rt,p("저장")]),t("button",{type:"button",class:"button del",onClick:D},[st,p("삭제")])]),t("button",{type:"button",class:"audit",onClick:e[7]||(e[7]=o=>s.audit=!s.audit)},"상세조회"),it,t("button",{type:"reset",onClick:I},lt),t("div",ut,"총 "+k(s.totalCount)+"건",1)])],40,E),ct]))}});const wt=V(pt,[["__scopeId","data-v-883bf04e"]]);export{wt as default};
