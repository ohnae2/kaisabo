<template>
	<div id="product">
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
import ProductService from '../../service/pr/ProductService';
// 상품
const data = reactive({
grid: {} as any, 
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
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: '상품번호', name: 'prodNo', editor: 'text'}, // 상품번호
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '상품명', name: 'prodNm', editor: 'text'}, // 상품명
			{header: '인원수', name: 'psnelCnt', editor: 'text'}, // 인원수
			{header: '최대인원수', name: 'maxPsnelCnt', editor: 'text'}, // 최대인원수
			{header: '평수', name: 'm2', editor: 'text'}, // 평수
			{header: '애완동물가능여부', name: 'petPsbYn', editor: 'text'}, // 애완동물가능여부
			{header: '내용', name: 'cnts', editor: 'text'}, // 내용
			{header: '우선순위', name: 'prir', editor: 'text'}, // 우선순위
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: '사용여부', name: 'useYn', editor: 'text'}, // 사용여부
			{header: '전시여부', name: 'dispYn', editor: 'text'}, // 전시여부
			{header: '비고', name: 'note', editor: 'text'}, // 비고
			{header: '연동참조2', name: 'linkRef2', editor: 'text'}, // 연동참조2
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

	getList();
});

</script>

<style scoped>
#product {
width: 100%;
}
</style>

