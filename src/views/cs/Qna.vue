<template>
	<div id="qna">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import QnaService from '../../service/cs/QnaService';
// QNA
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'QNA 번호', name: 'qnaNo', editor: 'text'}, // QNA 번호
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '회원ID', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: '회원 명', name: 'mbrNm', editor: 'text'}, // 회원 명
			{header: '회원 전화번호', name: 'mbrTelNo', editor: 'text'}, // 회원 전화번호
			{header: '회원 이메일', name: 'mbrEmail', editor: 'text'}, // 회원 이메일
			{header: '비밀번호', name: 'pwd', editor: 'text'}, // 비밀번호
			{header: '제목', name: 'tit', editor: 'text'}, // 제목
			{header: '내용', name: 'cnts', editor: 'text'}, // 내용
			{header: '문자여부', name: 'chrYn', editor: 'text'}, // 문자여부
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
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
		QnaService.getQnaList().then(
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
#qna {
width: 100%;
}
</style>

