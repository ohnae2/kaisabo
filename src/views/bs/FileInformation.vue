<template>
	<div id="fileinformation">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import FileInformationService from '../../service/bs/FileInformationService';
// 파일정보
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
		{header: 'tblNm', name: 'tblNm', editor: 'text'}, // 테이블명
		{header: 'clmnNm', name: 'clmnNm', editor: 'text'}, // 컬럼명
		{header: 'fileCnt', name: 'fileCnt', editor: 'text'}, // 파일수
		{header: 'fileLmt', name: 'fileLmt', editor: 'text'}, // 파일제한
		{header: 'imgFileEcluYn', name: 'imgFileEcluYn', editor: 'text'}, // 이미지파일전용여부
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
		FileInformationService.getFileInformationList().then(
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
#fileinformation {
width: 100%;
}
</style>

