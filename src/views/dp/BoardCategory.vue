<template>
	<div id="boardcategory">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import BoardCategoryService from '../../service/dp/BoardCategoryService';
// 게시판분류
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
		{header: 'brdCatNo', name: 'brdCatNo', editor: 'text'}, // 게시판분류번호
		{header: 'hgrkCatNo', name: 'hgrkCatNo', editor: 'text'}, // 상위분류번호
		{header: 'lwrkCatYn', name: 'lwrkCatYn', editor: 'text'}, // 하위분류여부
		{header: 'catNm', name: 'catNm', editor: 'text'}, // 분류명
		{header: 'useYn', name: 'useYn', editor: 'text'}, // 사용여부
		{header: 'dpth', name: 'dpth', editor: 'text'}, // 깊이
		{header: 'prir', name: 'prir', editor: 'text'}, // 우선순위
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
		BoardCategoryService.getBoardCategoryList().then(
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
#boardcategory {
width: 100%;
}
</style>

