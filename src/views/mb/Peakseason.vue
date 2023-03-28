<template>
	<div id="peakseason">
		<form class="search" @submit.prevent="getList">
			<fieldset>
				<legend>검색</legend>
				<table>
					<colgroup>
						<col width="100" />
						<col width="*" />
				</colgroup>
					<tr>
						<th>검색조건</th>
						<td><input type="text" /></td>
					</tr>
				</table>
			</fieldset>
			<div class="btnWrap">
				<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
				<button type="reset" class="refresh"><span class="icon">&#x22;</span></button>
			</div>
		</form>
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
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '준성수기시작일', name: 'sdsnStrtDay', editor: 'text'}, // 준성수기시작일
			{header: '준성수기종료일', name: 'sdsnEndDay', editor: 'text'}, // 준성수기종료일
			{header: '성수기시작일', name: 'pksnStrtDay', editor: 'text'}, // 성수기시작일
			{header: '성수기종료일', name: 'pksnEndDay', editor: 'text'}, // 성수기종료일
			{header: '극성수기시작일', name: 'tksnStrtDay', editor: 'text'}, // 극성수기시작일
			{header: '극성수기종료일', name: 'tksnEndDay', editor: 'text'}, // 극성수기종료일
			{header: '주중요금', name: 'weekPrice', editor: 'text'}, // 주중요금
			{header: '금요일요금', name: 'friPrice', editor: 'text'}, // 금요일요금
			{header: '주말요금', name: 'wkedPrice', editor: 'text'}, // 주말요금
			{header: '준성수기주중요금', name: 'sdsnWeekPrice', editor: 'text'}, // 준성수기주중요금
			{header: '준성수기금요일요금', name: 'sdsnFriPrice', editor: 'text'}, // 준성수기금요일요금
			{header: '준성수기주말요금', name: 'sdsnWkedPrice', editor: 'text'}, // 준성수기주말요금
			{header: '성수기주중요금', name: 'pksnWeekPrice', editor: 'text'}, // 성수기주중요금
			{header: '성수기금요일요금', name: 'pksnFriPrice', editor: 'text'}, // 성수기금요일요금
			{header: '성수기주말요금', name: 'pksnWkedPrice', editor: 'text'}, // 성수기주말요금
			{header: '극성수기주중요금', name: 'tksnWeekPrice', editor: 'text'}, // 극성수기주중요금
			{header: '극성수기금요일요금', name: 'tksnFriPrice', editor: 'text'}, // 극성수기금요일요금
			{header: '극성수기주말요금', name: 'tksnWkedPrice', editor: 'text'}, // 극성수기주말요금
			{header: '인원초과요금', name: 'psnelOverPrice', editor: 'text'}, // 인원초과요금
			{header: '온수요금', name: 'wwtPrice', editor: 'text'}, // 온수요금
			{header: '바베큐요금', name: 'bbqPrice', editor: 'text'}, // 바베큐요금
			{header: '기타요금', name: 'etcPrice', editor: 'text'}, // 기타요금
			{header: '비고', name: 'note', editor: 'text'}, // 비고
			{header: '연동참조', name: 'linkRef', editor: 'text'}, // 연동참조
			{header: '수정ID', name: 'modId'}, // 수정ID
			{header: '수정일시', name: 'modDt'}, // 수정일시
			{header: '등록ID', name: 'regId'}, // 등록ID
			{header: '등록일시', name: 'regDt'}, // 등록일시
		],
		scrollX: true,
		scrollY: true,
		minBodyHeight: 200,
		bodyHeight: 468,
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

	getList();
});

</script>

<style scoped>
#peakseason {
width: 100%;
}
</style>

