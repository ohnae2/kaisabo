<template>
  <span>
    <span class="pickerWrap">
      <input type="text" class="input" v-bind:id="props.name[0] + 'Picker'" v-model="props.date[0]" v-bind:name="props.name[0] + ''" />
      <span class="icon pointer" v-bind:id="props.name[0] + 'Opener'">&#xf0ce;</span>
      <div v-bind:id="props.name[0] + 'Container'" class="container"></div>
    </span>

  </span>
</template>
<script setup lang="ts">
/* eslint-disable no-debugger */
import DatePicker from 'tui-date-picker';
import { onMounted, ref, reactive } from 'vue';
import dateUtil from '../utils/util.date';

const emit = defineEmits(['set-start-date', 'set-end-date'])

const props = defineProps({
  name: { type: Array, required: true },
  date: { type: Array, required: true },
  format: { type: String, required: false },
  selectableRanges1: { type: [], required: false },
  selectableRanges2: { type: [], required: false },
})

// 옵션 1
let startObject = {
  language: 'ko',
  date: props.date[0],
  input: {
    element: document.getElementById(props.name[0] + 'Picker'),
  },
  selectableRanges: [[new Date(1090, 11, 30), new Date()]], // 시작일의 경우 미래를 선택할수 없는 고정값
  openers: ['#' + props.name[0] + 'Opener'],
};

if (props.selectableRanges1) {
  startObject.selectableRanges = props.selectableRanges1;
}

// 옵션 2
let endObject = {
  language: 'ko',
  date: props.date[1],
  input: {
    element: document.getElementById(props.name[1] + 'Picker'),
  },
  selectableRanges: [[props.date[0], new Date(2090, 11, 30)]], // 종료일경우 시작일에 따른 변동값
  openers: ['#' + props.name[1] + 'Opener'],
};
if (props.selectableRanges2) {
  endObject.selectableRanges = props.selectableRanges2;
}

onMounted(() => {
  const startPicker = new DatePicker(document.getElementById(props.name[0] + 'Container') as any, startObject as any); // HTMLElement
  const endPicker = new DatePicker(document.getElementById(props.name[1] + 'Container') as any, endObject as any);

  startPicker.on('change', () => {
    if (startPicker.getDate() > endPicker.getDate()) {
      endPicker.setDate(dateUtil.format(startPicker.getDate(), props.format));
    }
    endPicker.setRanges([
      [startPicker.getDate(), new Date(2090, 11, 30)] // 종료일경우 시작일에 따른 변동값
    ]);
    emit('set-start-date', { date: dateUtil.format(startPicker.getDate(), props.format) });
    if(endPicker.getDate()) {
      emit('set-end-date', { date: dateUtil.format(endPicker.getDate(), props.format) });
    }
  });

  endPicker.on('change', () => {
    if(startPicker.getDate()) {
      emit('set-start-date', { date: dateUtil.format(startPicker.getDate(), props.format) });
    }
    emit('set-end-date', { date: dateUtil.format(endPicker.getDate(), props.format) });
  });

});

</script>
<style scoped>
.pickerWrap {position:relative; display:inline-block;}
.pickerWrap .icon {font-size:30px; line-height:30px; vertical-align:middle; width:30px; margin:2px 10px 0 -0; color:#aaa;}
.pickerWrap input.input {width:118px;}
.pickerWrap div.container {position:absolute; left:0; top:39px; background:#fff; z-index:200;}
</style>
