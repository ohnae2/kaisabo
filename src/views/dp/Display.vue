<template>
	<div id="display">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import DisplayService from '../../service/dp/DisplayService';
// 전시
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: '전시번호', name: 'dispNo', editor: 'text'}, // 전시번호
			{header: '업체구분코드', name: 'cmpDivCd', editor: 'text'}, // 업체구분코드=PENS:펜션,MOTEL:모텔,HOTEL:호텔,BEDBKF:민박,GUHS:게스트하우스,SVTW:요양원,WTSKI:수상스키
			{header: '전시코드', name: 'dispCd', editor: 'text'}, // 전시코드=MAIN:메인,DISP:전시,PROD:상품,ETC:기타
			{header: '우선순위', name: 'prir', editor: 'text'}, // 우선순위
			{header: '전시여부', name: 'dispYn', editor: 'text'}, // 전시여부
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
		DisplayService.getDisplayList().then(
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
#display {
width: 100%;
}
</style>

