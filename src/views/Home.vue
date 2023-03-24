<template>
  <v-header />
  <div id="contents" v-bind:class="{menuOn : setting.menu.active}">
    <router-view />
  </div>
  <br />
  <v-footer />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import vHeader from '../views/layout/Header.vue';
import vFooter from '../views/layout/Footer.vue';
import { useSettingStore } from '../store/store.setting';

const setting = useSettingStore();

</script>

<style scoped>
#contents {width:calc(100% - 20px); padding:10px; background:#fff; border:1px solid #ccc; height:calc(100% - 119px); z-index:1; position:absolute; right:10px; bottom:20px; overflow:auto;}
#contents.menuOn {width:calc(100% - 240px);}
</style>
