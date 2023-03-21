<template>
  <v-header />
  <v-side />
  <div id="contents">
    <router-view />
  </div>
  <br />
  <v-footer />
</template>
<script setup lang="ts">
import vSide from '../views/layout/Side.vue';
import vHeader from '../views/layout/Header.vue';
import vFooter from '../views/layout/Footer.vue';
</script>

<style scoped>
#contents {padding:50px;}
</style>
