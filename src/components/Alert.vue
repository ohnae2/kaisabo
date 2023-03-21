<template>
  <div id="alert">
    <h3>{{ alert.info.title }}</h3>
    <div>{{ alert.info.message }}</div>
  </div>
</template>

<script setup lang="ts">

const alert = defineProps({
  alert: Object,
});

</script>
<style>
#alert {animation-duration:4s; right:5%; top:0%; animation-name:alert; opacity:0; z-index:9000; box-shadow:0 0 5px rgba(0,0,0,0.3); background:#ffb8b8; color:#000; width:90%; text-align:center; position:fixed; padding:20px 30px; border-radius:10px; overflow:hidden;}
#alert.green {background-color:#9ef0c0;}
@keyframes alert {
  0%   {opacity:0; top:0%;}
  25%  {opacity:1; top:5%;}
  75%  {opacity:1; top:5%;}
  100% {opacity:0; top:0%;}
}
</style>
