<template>
	<div id="qnacomment">
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
						<th>수정날짜</th>
						<td>
							<SelectGroupDate 
								:name="['startDate', 'endDate']"
								:format="'YYYY-MM-DD'"
								:date="[search.startDate, search.endDate]"
								@set-start-date="(o) => {
									search.startDate = o.date;
								}"
								@set-end-date="(o) => {
									search.endDate = o.date;
								}"
							/>
						</td>
					</tr>
				</table>
			</fieldset>
			<div class="btnWrap">
				<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
				<button type="reset" @click="refresh"><span class="icon">&#x22;</span></button>
				<div class="totalCount">총 {{ data.totalCount }}건</div>
			</div>
		</form>
		<div id="grid"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import QnaCommentService from '../../service/cs/QnaCommentService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import dateUtil from '../../utils/util.date';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

// QNA 댓글
const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	QnaCommentService.getQnaCommentList(search).then(
		(res) => {
			data.totalCount = 0;
			for(let o of res.data) {
				o.rowIdx = data.totalCount++;
			}
			data.grid?.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}

const refresh = function() {
	location.reload();
}

onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		rowHeaders: ['checkbox'],
		columns: [
			{header: 'QNA 댓글 번호', name: 'qnaCmmtNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // QNA 댓글 번호
			{header: 'QNA 번호', name: 'qnaNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // QNA 번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 업체ID
			{header: '파일번호', name: 'fileNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 파일번호
			{header: '회원 명', name: 'mbrNm', sortable: true, width: 100, disabled: false, editor: 'text'}, // 회원 명
			{header: '내용', name: 'cnts', sortable: true, width: 100, disabled: false, editor: 'text'}, // 내용
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, disabled: false, editor: 'text'}, // 연동참조
			{header: '수정 ID', name: 'modId', sortable: true, width: 110}, // 수정 ID
			{header: '수정 일시', name: 'modDt', sortable: true, width: 120, disabled: false, // 수정 일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '등록 ID', name: 'regId', sortable: true, width: 110}, // 등록 ID
			{header: '등록 일시', name: 'regDt', sortable: true, width: 120, disabled: false, // 등록 일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
		],
		scrollX: true,
		scrollY: true,
		minBodyHeight: 200,
		bodyHeight: 468,
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
#qnacomment {
width: 100%;
}
</style>

