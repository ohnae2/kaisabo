
<template>
  <div id="header">
    <ul class="userInfo">
      <li class="name">
        <b><span class="icon user">&#xe809;</span> {{ auth.info.nm }}</b>
      </li>
      <li class="btn">
        <u v-on:click="auth.logout()" style="cursor:pointer;">로그아웃</u>
      </li>
    </ul>
    <ol class="tab">
      <li>Home</li>
    </ol>
  </div>
  <div id="side">
    <div class="menu" v-for="(side, i) in sideMenu" :key="i" v-bind:class="{'on': side.active }" v-show="side.menu.length > 0">
      <h2 @click="clickCategory(side)">{{ side.pathNm }}</h2>
      <ul>
        <li v-for="(menu, idx) in side.menu" :key="idx" @click="clickMenu(menu)">
          <span class="icon pre" v-html="menu.iconCd"></span>
          <span class="name">{{ menu.menuNm }}</span>
          <span class="icon fav">&#xe807;</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const router = useRouter();

let sideMenu = reactive<any[]>([
  {path: 'or', active: true, pathNm: '주문관리', menu: []},
  {path: 'bs', active: true, pathNm: '기초관리', menu: []},
  {path: 'cs', active: true, pathNm: '고객관리', menu: []},
  {path: 'pr', active: true, pathNm: '상품관리', menu: []},
  {path: 'mb', active: true, pathNm: '회원관리', menu: []},
  {path: 'dp', active: true, pathNm: '전시관리', menu: []},
]);

const sessionMenu = <any[]>(JSON.parse(sessionStorage.getItem('menuList') || '[]'));

for(let c of sideMenu) {
  for(let m of sessionMenu) {
    if(m.url.match('/'+ c.path + '/')) {
      c.menu.push(m);
    }
  }
}

const data = reactive({
  path: '',
});

const clickCategory = function(side:any) {
  side.active = !side.active;
}
const clickMenu = function(menu:any) {
  router.push(menu.url);
}
</script>

<style scoped>
#header {width:100%; position:absolute; left:0; top:0; background:#eee; z-index:100; height:80px; overflow:hidden;}
#header .userInfo {text-align:right; padding:13px 13px 0 0; color:#333;}
#header .userInfo li {display:inline-block; padding:0 5px;}

#side {transition:0.3s all linear; width:200px; padding-bottom:10px; background:#333; border-right:1px solid #000; height:100%; position:fixed; left:0; top:0; z-index:200; overflow:auto; white-space:nowrap;}
#side .menu {width:200px; height:40px; overflow:hidden;}
#side .menu.on {height:auto;}
#side .menu h2 {padding:0 20px; color:#999; height:40px; line-height:40px; cursor: pointer; }
#side .menu ul {width:100%;}
#side .menu ul li {padding:0; color:#bbb; cursor:pointer; height:34px; line-height:34px; position:relative; overflow:hidden; background:rgba(0,0,0,0.3);}
#side .menu ul li span.pre {position:absolute; font-size:13px; opacity:0.5; left:10px; top:50%; margin-top:-12px;}
#side .menu ul li span.name {display:block; padding:0 40px; border-bottom:1px solid rgba(255,255,255,0.1); height:33px; line-height:31px;}
#side .menu ul li:last-child span.name {border:0;}
#side .menu ul li span.fav {position:absolute; right:10px; top:50%; margin-top:-14px; opacity:0.5;}
#side .menu ul li span.fav.on {opacity:1; color:rgb(229, 255, 0);}
#side .menu ul li span.fav:hover {opacity:1; color:rgb(229, 255, 0); text-shadow:0 0 5px rgba(229, 255, 0, 0.8);}
#side .menu ul li .active {color:#FF9933;}
#side .menu ul li:hover {color:#e29242; background:rgba(0,0,0,0.5);}
</style>
