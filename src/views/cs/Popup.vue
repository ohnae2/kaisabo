<template>
	<div id="popup">
		<form class="search" @submit.prevent="getList">
			<fieldset>
				<legend>검색</legend>
				<table>
					<colgroup>
						<col width="100" />
						<col width="*" />
				</colgroup>
					<tr>
						<th>검색조건</th>
						<td><input type="text" /></td>
					</tr>
				</table>
			</fieldset>
			<div class="btnWrap">
				<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
				<button type="reset" class="refresh"><span class="icon">&#x22;</span></button>
			</div>
		</form>
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import PopupService from '../../service/cs/PopupService';
// 팝업
const data = reactive({
grid: {} as any, 
});
const getList = function () {
	PopupService.getPopupList().then(
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
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: '팝업번호', name: 'popNo', editor: 'text'}, // 팝업번호
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

	getList();
});

</script>

<style scoped>
#popup {
width: 100%;
}
</style>

