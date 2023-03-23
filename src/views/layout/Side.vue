<template>
  <div id="side">
    {{ data.path }}
    <div class="menu" v-for="(side, i) in sideMenu" :key="i" v-bind:class="{'on': side.active }" v-show="side.menu.length > 0">
      <h2 @click="clickCategory(side)">{{ side.pathNm }}</h2>
      <ul>
        <li v-for="(menu, idx) in side.menu" :key="idx" @click="clickMenu(menu)">
          <!--<span class="icon" v-html="menu.iconCd"></span>-->
          <span>{{ menu.menuNm }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let sideMenu = reactive<any[]>([
  {path: 'or', active: false, pathNm: '주문관리', menu: []},
  {path: 'bs', active: false, pathNm: '기초관리', menu: []},
  {path: 'cs', active: false, pathNm: '고객관리', menu: []},
  {path: 'pr', active: false, pathNm: '상품관리', menu: []},
  {path: 'mb', active: false, pathNm: '회원관리', menu: []},
  {path: 'dp', active: false, pathNm: '전시관리', menu: []},
]);

const sessionMenu = <any[]>(JSON.parse(sessionStorage.getItem('menuList') || '{}'));

for(let c of sideMenu) {
  for(let m of sessionMenu) {
    if(m.url.match(c.path)) {
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
#side {transition:0.3s all linear; width:200px; background:#333; border-right:1px solid #000; height:100%; position:absolute; z-index:200; overflow:auto; white-space:nowrap;}
#side .menu {width:200px; height:40px; overflow:hidden;}
#side .menu.on {height:auto;}
#side .menu h2 {padding:0 10px; color:#ddd; margin:0; height:40px; line-height:40px; cursor: pointer; border-bottom:1px dashed #555; }
#side .menu ul {width:100%;}
#side .menu ul li {padding:0 20px; color:#aaa; margin:0; cursor:pointer; height:30px; line-height:30px; position:relative; overflow:hidden;}
#side .menu ul li span.icon {position:absolute; left:0; top:9px;}
#side .menu ul li .active {color:#FF9933;}
.on #side {left:0px;}
</style>
