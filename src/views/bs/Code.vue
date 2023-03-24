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
			{header: '그룹코드', name: 'grpCd', editor: 'text'}, // 그룹코드
			{header: '코드', name: 'cd', editor: 'text'}, // 코드
			{header: '코드명', name: 'cdNm', editor: 'text'}, // 코드명
			{header: '참조1', name: 'ref1', editor: 'text'}, // 참조1
			{header: '참조2', name: 'ref2', editor: 'text'}, // 참조2
			{header: '참조3', name: 'ref3', editor: 'text'}, // 참조3
			{header: '비고', name: 'note', editor: 'text'}, // 비고
			{header: '설명', name: 'dsc', editor: 'text'}, // 설명
			{header: '우선순위', name: 'prir', editor: 'text'}, // 우선순위
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

