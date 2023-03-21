
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
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/store.auth';
const auth = useAuthStore();
</script>

<style scoped>
#header {width:100%; border-bottom:1px solid #ccc; box-shadow:3px 3px 3px rgba(0,0,0,0.1); background:#eee; z-index:100; padding-left:60px; height:50px; overflow:hidden; position:fixed; left:0; top:0;}
#header h1 {text-align:center; padding:30px;}
#header h1 img {width:50px}
#header .userInfo {text-align:right; padding:13px 13px 0 0; color:#333;}
#header .userInfo li {display:inline-block; padding:0 5px;}
</style>
