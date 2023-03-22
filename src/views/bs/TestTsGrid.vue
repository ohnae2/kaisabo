
<template>
  <div id="code" style="height:500px; overflow:auto;">
    <button @click="getData">getData</button>
    <tui-grid ref="GridTable" :data="data.list" :columns="columns" :key="data.list"></tui-grid>
  </div>
  {{ data.count }}
</template>

<script setup lang="ts">
import { TuiGridElement, Vue3OptColumn, Vue3OptGrid  } from 'vue3-tui-grid';
import { onMounted, ref, reactive } from 'vue';
import BasicService from '../../service/bs/BasicService';

const columns = ref<Vue3OptColumn[]>([
  {header: 'grpCd', name: 'grpCd', editor: 'text', resizable: true},
  {header: 'cd', name: 'cd', editor: 'text'},
  {header: 'cdNm', name: 'cdNm', editor: 'text', resizable: true},
  {header: 'ref1', name: 'ref1', editor: 'text'},
  {header: 'ref2', name: 'ref2', editor: 'text'},
  {header: 'ref3', name: 'ref3', editor: 'text'},
  {header: 'note', name: 'note', editor: 'text'},
  {header: 'dsc', name: 'dsc', editor: 'text'},
  {header: 'prir', name: 'prir', editor: 'text'},
  {header: 'linkRef', name: 'linkRef', editor: 'text'},
  {header: 'modId', name: 'modId', editor: 'text'},
  {header: 'modDt', name: 'modDt', editor: 'text'},
  {header: 'regId', name: 'regId', editor: 'text'},
  {header: 'regDt', name: 'regDt', editor: 'text'},
]);

const GridTable = ref<TuiGridElement>();
const grid = GridTable.value?.gridInstance;
const data = reactive({ 
  list: [], 
  originList: [],
  count: 0,
});

const getList = function () {
  BasicService.getCodeList().then(
    (res) => {
      let idx = 0;
      for(let o of res.data) {
        o.rowIdx = idx++;
      }
      data.list = res.data;
      data.originList = res.data;
      data.count = res.data.length;
    },
    (err) => {
      console.log(err);
    },
  );
}

const getData = function(){
  const grid = GridTable.value?.gridInstance;
  console.log(grid?.getData());
}

onMounted(() => {
  const grid = GridTable.value;
  grid?.setLanguage("ko");
  const instance = grid?.gridInstance;
  instance?.setBodyHeight(200);
  grid?.invoke("setBodyHeight", 200);
  getList();
});

</script>

<style scoped>
#code {
  width: 100%;
}
</style>
