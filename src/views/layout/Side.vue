<template>
  <div id="side">
    <ul>
      <li v-for="(menu, idx) in menuList" :key="idx" @click="clickLeftMenu(menu)">
        <!--<span class="icon" v-html="menu.iconCd"></span>-->
        <span>{{ menu.menuNm }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuList = reactive(JSON.parse(sessionStorage.getItem('menuList') || '{}'))

const clickLeftMenu = function(menu:any) {
  router.push(menu.url);
}
</script>

<style scoped>
#side {transition:0.3s all linear; width:100px; background:#333; border-right:1px solid #000; color:#ddd; height:100%; position:absolute; z-index:200; overflow:auto; white-space:nowrap;}
#side ul {width:100%; padding:2px 10px 2px 10px;}
#side ul li {border-bottom:1px dashed #555; cursor:pointer; padding:10px 0 10px 5px; position:relative; overflow:hidden;}
#side ul li span.icon {position:absolute; left:0; top:9px;}
#side ul li .active {color:#FF9933;}
.on #side {left:0px;}
</style>
