<template>
	<div id="faq">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import FaqService from '../../service/cs/FaqService';
// FAQ
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'FAQ 번호', name: 'faqNo', editor: 'text'}, // FAQ 번호
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '제목', name: 'tit', editor: 'text'}, // 제목
			{header: '내용', name: 'cnts', editor: 'text'}, // 내용
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: '우선순위', name: 'prir', editor: 'text'}, // 우선순위
			{header: '사용 여부', name: 'useYn', editor: 'text'}, // 사용 여부
			{header: '시작일시', name: 'strtDt', editor: 'text'}, // 시작일시
			{header: '종료일시', name: 'endDt', editor: 'text'}, // 종료일시
			{header: '연동참조', name: 'linkRef', editor: 'text'}, // 연동참조
			{header: '수정 ID', name: 'modId'}, // 수정 ID
			{header: '수정 일시', name: 'modDt'}, // 수정 일시
			{header: '등록 ID', name: 'regId'}, // 등록 ID
			{header: '등록 일시', name: 'regDt'}, // 등록 일시
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
		FaqService.getFaqList().then(
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
#faq {
width: 100%;
}
</style>

