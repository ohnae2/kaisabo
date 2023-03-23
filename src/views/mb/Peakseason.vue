<template>
	<div id="peakseason">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import PeakseasonService from '../../service/mb/PeakseasonService';
// 성수기
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'sdsnStrtDay', name: 'sdsnStrtDay', editor: 'text'}, // 준성수기시작일
			{header: 'sdsnEndDay', name: 'sdsnEndDay', editor: 'text'}, // 준성수기종료일
			{header: 'pksnStrtDay', name: 'pksnStrtDay', editor: 'text'}, // 성수기시작일
			{header: 'pksnEndDay', name: 'pksnEndDay', editor: 'text'}, // 성수기종료일
			{header: 'tksnStrtDay', name: 'tksnStrtDay', editor: 'text'}, // 극성수기시작일
			{header: 'tksnEndDay', name: 'tksnEndDay', editor: 'text'}, // 극성수기종료일
			{header: 'weekPrice', name: 'weekPrice', editor: 'text'}, // 주중요금
			{header: 'friPrice', name: 'friPrice', editor: 'text'}, // 금요일요금
			{header: 'wkedPrice', name: 'wkedPrice', editor: 'text'}, // 주말요금
			{header: 'sdsnWeekPrice', name: 'sdsnWeekPrice', editor: 'text'}, // 준성수기주중요금
			{header: 'sdsnFriPrice', name: 'sdsnFriPrice', editor: 'text'}, // 준성수기금요일요금
			{header: 'sdsnWkedPrice', name: 'sdsnWkedPrice', editor: 'text'}, // 준성수기주말요금
			{header: 'pksnWeekPrice', name: 'pksnWeekPrice', editor: 'text'}, // 성수기주중요금
			{header: 'pksnFriPrice', name: 'pksnFriPrice', editor: 'text'}, // 성수기금요일요금
			{header: 'pksnWkedPrice', name: 'pksnWkedPrice', editor: 'text'}, // 성수기주말요금
			{header: 'tksnWeekPrice', name: 'tksnWeekPrice', editor: 'text'}, // 극성수기주중요금
			{header: 'tksnFriPrice', name: 'tksnFriPrice', editor: 'text'}, // 극성수기금요일요금
			{header: 'tksnWkedPrice', name: 'tksnWkedPrice', editor: 'text'}, // 극성수기주말요금
			{header: 'psnelOverPrice', name: 'psnelOverPrice', editor: 'text'}, // 인원초과요금
			{header: 'wwtPrice', name: 'wwtPrice', editor: 'text'}, // 온수요금
			{header: 'bbqPrice', name: 'bbqPrice', editor: 'text'}, // 바베큐요금
			{header: 'etcPrice', name: 'etcPrice', editor: 'text'}, // 기타요금
			{header: 'note', name: 'note', editor: 'text'}, // 비고
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
		PeakseasonService.getPeakseasonList().then(
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
#peakseason {
width: 100%;
}
</style>

