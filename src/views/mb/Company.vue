<template>
	<div id="company">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import CompanyService from '../../service/mb/CompanyService';
// 업체
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'cmpDivCd', name: 'cmpDivCd', editor: 'text'}, // 업체구분코드=PENS:펜션,MOTEL:모텔,HOTEL:호텔,BEDBKF:민박,GUHS:게스트하우스,SVTW:요양원,WTSKI:수상스키
			{header: 'cmpNm', name: 'cmpNm', editor: 'text'}, // 업체명
			{header: 'bizno', name: 'bizno', editor: 'text'}, // 사업자등록번호
			{header: 'fileNo', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: 'addr', name: 'addr', editor: 'text'}, // 주소
			{header: 'dtlAddr', name: 'dtlAddr', editor: 'text'}, // 상세주소
			{header: 'lttd', name: 'lttd', editor: 'text'}, // 위도
			{header: 'lotd', name: 'lotd', editor: 'text'}, // 경도
			{header: 'steUrl', name: 'steUrl', editor: 'text'}, // 사이트URL
			{header: 'telNo', name: 'telNo', editor: 'text'}, // 전화번호
			{header: 'note', name: 'note', editor: 'text'}, // 비고
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
		CompanyService.getCompanyList().then(
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
#company {
width: 100%;
}
</style>

