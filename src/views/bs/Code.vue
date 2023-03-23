<template>
	<div id="code">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import CodeService from '../../service/bs/CodeService';
// 코드
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'grpCd', name: 'grpCd', editor: 'text'}, // 그룹코드
			{header: 'cd', name: 'cd', editor: 'text'}, // 코드
			{header: 'cdNm', name: 'cdNm', editor: 'text'}, // 코드명
			{header: 'ref1', name: 'ref1', editor: 'text'}, // 참조1
			{header: 'ref2', name: 'ref2', editor: 'text'}, // 참조2
			{header: 'ref3', name: 'ref3', editor: 'text'}, // 참조3
			{header: 'note', name: 'note', editor: 'text'}, // 비고
			{header: 'dsc', name: 'dsc', editor: 'text'}, // 설명
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
		CodeService.getCodeList().then(
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
#code {
width: 100%;
}
</style>

