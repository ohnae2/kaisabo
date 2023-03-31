<template>
  <span>
    <div id="Container"></div>
  </span>
</template>
<script setup lang="ts">
/* eslint-disable no-debugger */
import DatePicker from 'tui-date-picker';
import { onMounted, ref, reactive } from 'vue';

const name = 'date';
const startObject = reactive({
  language: 'ko',
  date: new Date(),
  input: {
    element: document.getElementById(name + 'Picker'),
  },
  selectableRanges: [[new Date(1090, 11, 30), new Date()]], // 시작일의 경우 미래를 선택할수 없는 고정값
  openers: ['#' + name + 'Opener'],
});

const data = reactive({
  datePicker: {} as any,
});

onMounted(() => {

  // data.datePicker = new DatePicker(document.getElementById('Container') as HTMLElement, startObject as any);

});

</script>
<style scoped>
.pickerWrap {position:relative; display:inline-block;}
.pickerWrap .icon {font-size:30px; line-height:30px; vertical-align:middle; width:30px; margin:2px 10px 0 -0; color:#aaa;}
.pickerWrap input.input {width:118px;}
.pickerWrap div.container {position:absolute; left:0; top:39px; background:#fff; z-index:200;}
</style>
