<template>
	<div id="product">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import ProductService from '../../service/pr/ProductService';
// 상품
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
		{header: 'prodNo', name: 'prodNo', editor: 'text'}, // 상품번호
		{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
		{header: 'prodNm', name: 'prodNm', editor: 'text'}, // 상품명
		{header: 'psnelCnt', name: 'psnelCnt', editor: 'text'}, // 인원수
		{header: 'maxPsnelCnt', name: 'maxPsnelCnt', editor: 'text'}, // 최대인원수
		{header: 'm2', name: 'm2', editor: 'text'}, // 평수
		{header: 'petPsbYn', name: 'petPsbYn', editor: 'text'}, // 애완동물가능여부
		{header: 'cnts', name: 'cnts', editor: 'text'}, // 내용
		{header: 'prir', name: 'prir', editor: 'text'}, // 우선순위
		{header: 'fileNo', name: 'fileNo', editor: 'text'}, // 파일번호
		{header: 'useYn', name: 'useYn', editor: 'text'}, // 사용여부
		{header: 'dispYn', name: 'dispYn', editor: 'text'}, // 전시여부
		{header: 'note', name: 'note', editor: 'text'}, // 비고
		{header: 'linkRef2', name: 'linkRef2', editor: 'text'}, // 연동참조2
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
		ProductService.getProductList().then(
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
#product {
width: 100%;
}
</style>

