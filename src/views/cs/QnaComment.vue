<template>
	<div id="qnacomment">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import QnaCommentService from '../../service/cs/QnaCommentService';
// QNA 댓글
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'QNA 댓글 번호', name: 'qnaCmmtNo', editor: 'text'}, // QNA 댓글 번호
			{header: 'QNA 번호', name: 'qnaNo', editor: 'text'}, // QNA 번호
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: '회원 명', name: 'mbrNm', editor: 'text'}, // 회원 명
			{header: '내용', name: 'cnts', editor: 'text'}, // 내용
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
		QnaCommentService.getQnaCommentList().then(
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
#qnacomment {
width: 100%;
}
</style>

