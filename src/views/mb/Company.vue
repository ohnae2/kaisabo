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
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '업체구분코드', name: 'cmpDivCd', editor: 'text'}, // 업체구분코드=PENS:펜션,MOTEL:모텔,HOTEL:호텔,BEDBKF:민박,GUHS:게스트하우스,SVTW:요양원,WTSKI:수상스키
			{header: '업체명', name: 'cmpNm', editor: 'text'}, // 업체명
			{header: '사업자등록번호', name: 'bizno', editor: 'text'}, // 사업자등록번호
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: '주소', name: 'addr', editor: 'text'}, // 주소
			{header: '상세주소', name: 'dtlAddr', editor: 'text'}, // 상세주소
			{header: '위도', name: 'lttd', editor: 'text'}, // 위도
			{header: '경도', name: 'lotd', editor: 'text'}, // 경도
			{header: '사이트URL', name: 'steUrl', editor: 'text'}, // 사이트URL
			{header: '전화번호', name: 'telNo', editor: 'text'}, // 전화번호
			{header: '비고', name: 'note', editor: 'text'}, // 비고
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

