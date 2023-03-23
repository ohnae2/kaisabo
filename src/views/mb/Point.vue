<template>
	<div id="point">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import PointService from '../../service/mb/PointService';
// 포인트
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'pntNo', name: 'pntNo', editor: 'text'}, // 포인트번호
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'pntNm', name: 'pntNm', editor: 'text'}, // 포인트명
			{header: 'pntPrice', name: 'pntPrice', editor: 'text'}, // 포인트요금
			{header: 'strtDt', name: 'strtDt', editor: 'text'}, // 시작일시
			{header: 'endDt', name: 'endDt', editor: 'text'}, // 종료일시
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
		PointService.getPointList().then(
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
#point {
width: 100%;
}
</style>

