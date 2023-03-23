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
		{header: 'hld', name: 'hld', editor: 'text'}, // 휴일
		{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
		{header: 'hldNm', name: 'hldNm', editor: 'text'}, // 휴일명
		{header: 'hldCd', name: 'hldCd', editor: 'text'}, // 휴일코드=HLD:휴일,SPD:특정일
		{header: 'hldPrice', name: 'hldPrice', editor: 'text'}, // 휴일요금
		{header: 'linkRef', name: 'linkRef', editor: 'text'}, // 연동참조
		{header: 'modId', name: 'modId'}, // 수정ID
		{header: 'modDt', name: 'modDt'}, // 수정일시
		{header: 'regId', name: 'regId'}, // 등록ID
		{header: 'regDt', name: 'regDt'}, // 등록일시
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

