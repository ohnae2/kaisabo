<template>
  main1
</template>

<script setup lang="ts">
import UserService from '../../service/auth/UserService';
import { useAuthStore } from '../../store/store.auth';

const menu = function () {
  /*UserService.getUserMenuList().then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    },
  );*/
}
const auth = useAuthStore();
</script>

<style scoped>
h1 {cursor: pointer;}

</style>
