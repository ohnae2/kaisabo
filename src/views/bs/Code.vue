
<template>
  <div id="code" style="height:500px; overflow:auto;">
    <button @click="getData">getData</button>
    <div id="grid"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import BasicService from '../../service/bs/BasicService';

const data = reactive({
  grid: {} as any, 
});

const getData = function(){
}

onMounted(() => {
  data.grid = new Grid({
    el: document.getElementById('grid') as HTMLElement,
    columns: [
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
    ],
    scrollX: true,
    scrollY: true,
    minBodyHeight: 200,
    bodyHeight: 500,
    columnOptions: {
      resizable: true,
    },
    minRowHeight : 40,
    rowHeight : 40,
    header : {
      height: 40,
    },
  });

  data.grid?.on('click', function(e:any) {
    if( e.columnName === 'cd') {
      console.log('1111')
    }
  });

  const getList = function () {
    BasicService.getCodeList().then(
      (res) => {
        let idx = 0;
        for(let o of res.data) {
          o.rowIdx = idx++;
        }
        data.grid?.resetData(res.data, {});
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getList();
});

</script>

<style scoped>
#code {
  width: 100%;
}
</style>
