<template>
	<div id="filedetail">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import FileDetailService from '../../service/bs/FileDetailService';
// 파일상세
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'fileDtlNo', name: 'fileDtlNo', editor: 'text'}, // 파일상세번호
			{header: 'fileNo', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: 'path', name: 'path', editor: 'text'}, // 경로
			{header: 'fileNm', name: 'fileNm', editor: 'text'}, // 파일명
			{header: 'fileOrgNm', name: 'fileOrgNm', editor: 'text'}, // 파일원명
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
		FileDetailService.getFileDetailList().then(
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
#filedetail {
width: 100%;
}
</style>

