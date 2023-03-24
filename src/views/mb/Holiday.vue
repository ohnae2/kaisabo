<template>
	<div id="holiday">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import HolidayService from '../../service/mb/HolidayService';
// 휴일
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: '휴일', name: 'hld', editor: 'text'}, // 휴일
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '휴일명', name: 'hldNm', editor: 'text'}, // 휴일명
			{header: '휴일코드', name: 'hldCd', editor: 'text'}, // 휴일코드=HLD:휴일,SPD:특정일
			{header: '휴일요금', name: 'hldPrice', editor: 'text'}, // 휴일요금
			{header: '연동참조', name: 'linkRef', editor: 'text'}, // 연동참조
			{header: '수정ID', name: 'modId'}, // 수정ID
			{header: '수정일시', name: 'modDt'}, // 수정일시
			{header: '등록ID', name: 'regId'}, // 등록ID
			{header: '등록일시', name: 'regDt'}, // 등록일시
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
			console.log('click')
		}
	});

	const getList = function () {
		HolidayService.getHolidayList().then(
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
#holiday {
width: 100%;
}
</style>

