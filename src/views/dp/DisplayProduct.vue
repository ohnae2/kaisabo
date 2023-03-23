<template>
	<div id="displayproduct">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import DisplayProductService from '../../service/dp/DisplayProductService';
// 전시상품
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
		{header: 'dispNo', name: 'dispNo', editor: 'text'}, // 전시번호
		{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
		{header: 'prodNo', name: 'prodNo', editor: 'text'}, // 상품번호
		{header: 'prir', name: 'prir', editor: 'text'}, // 우선순위
		{header: 'dispYn', name: 'dispYn', editor: 'text'}, // 전시여부
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
		DisplayProductService.getDisplayProductList().then(
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
#displayproduct {
width: 100%;
}
</style>

