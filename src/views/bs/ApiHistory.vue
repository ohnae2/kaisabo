<template>
	<div id="apihistory">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import ApiHistoryService from '../../service/bs/ApiHistoryService';
// API이력
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'API번호', name: 'apiNo', editor: 'text'}, // API번호
			{header: 'API명', name: 'apiNm', editor: 'text'}, // API명
			{header: '요청URL', name: 'reqUrl', editor: 'text'}, // 요청URL
			{header: '요청값', name: 'reqVal', editor: 'text'}, // 요청값
			{header: '응답값', name: 'resVal', editor: 'text'}, // 응답값
			{header: '결과코드', name: 'rsltCd', editor: 'text'}, // 결과코드=SCS:성공,ERR:오류,ETC:기타
			{header: 'API참조', name: 'apiRef', editor: 'text'}, // API참조
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
		ApiHistoryService.getApiHistoryList().then(
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
#apihistory {
width: 100%;
}
</style>

