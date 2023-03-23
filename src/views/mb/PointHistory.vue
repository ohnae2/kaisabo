<template>
	<div id="pointhistory">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import PointHistoryService from '../../service/mb/PointHistoryService';
// 회원포인트내역
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
		{header: 'pntHistNo', name: 'pntHistNo', editor: 'text'}, // 포인트이력번호
		{header: 'mbrId', name: 'mbrId', editor: 'text'}, // 회원ID
		{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
		{header: 'pntNo', name: 'pntNo', editor: 'text'}, // 포인트번호
		{header: 'pntUseCd', name: 'pntUseCd', editor: 'text'}, // 포인트사용코드=ACML:적립,DDTN:차감
		{header: 'ordNo', name: 'ordNo', editor: 'text'}, // 주문번호
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
		PointHistoryService.getPointHistoryList().then(
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
#pointhistory {
width: 100%;
}
</style>

