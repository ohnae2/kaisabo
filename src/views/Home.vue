<template>
  <v-header />
  <div id="contents">
    <router-view />
  </div>
  <br />
  <v-footer />
</template>
<script setup lang="ts">
import vHeader from '../views/layout/Header.vue';
import vFooter from '../views/layout/Footer.vue';
import { useSettingStore } from '../store/store.setting';

const setting = useSettingStore();

</script>

<style scoped>
#contents {width:calc(100% - 210px); border:1px solid #ccc; height:calc(100% - 80px); position:absolute; right:0; bottom:0; overflow:auto;}
</style>
