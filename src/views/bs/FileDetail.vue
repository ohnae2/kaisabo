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
			{header: '파일상세번호', name: 'fileDtlNo', editor: 'text'}, // 파일상세번호
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: '경로', name: 'path', editor: 'text'}, // 경로
			{header: '파일명', name: 'fileNm', editor: 'text'}, // 파일명
			{header: '파일원명', name: 'fileOrgNm', editor: 'text'}, // 파일원명
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

