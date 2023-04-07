<template>
	<div id="pointhistory">
		<form class="search" @submit.prevent="getList" @keyup.enter="getList">
			<fieldset>
				<legend>검색</legend>
				<table>
					<colgroup>
						<col width="80" />
						<col width="30%" />
						<col width="80" />
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th>검색조건</th>
							<td colspan="3"><input type="text" v-model="search.keyword" /></td>
						</tr>
						<tr v-if="auth.userInfo.cmpId == 'kaisa'">
							<th>업체ID</th>
							<td colspan="3"><input type="text" v-model="search.cmpId" /></td>
						</tr>
					</tbody>
					<tbody class="audit" v-show="data.audit">
						<tr>
							<th>수정기간</th>
							<td colspan="3">
								<SelectGroupDate 
									:name="['startModDt', 'endModDt']"
									:format="'YYYY-MM-DD'"
									:date="[search.startModDt, search.endModDt]"
									@set-start-date="(o) => {
										search.startModDt = o.date;
									}"
									@set-end-date="(o) => {
										search.endModDt = o.date;
									}"
								/>
							</td>
						</tr>
						<tr>
							<th>등록일</th>
							<td colspan="3">
								<SelectDate 
									:name="['regDt']"
									:format="'YYYY-MM-DD'"
									:date="[search.regDt]"
									@set-start-date="(o) => {
										search.regDt = o.date;
									}"
								/>
							</td>
						</tr>
						<tr>
							<th>수정ID</th>
							<td><input type="text" v-model="search.modId" /></td>
							<th>등록ID</th>
							<td><input type="text" v-model="search.regId" /></td>
						</tr>
					</tbody>
				</table>
			</fieldset>
			<div class="btnWrap">
				<span class="crud">
					<button type="button" class="button add" @click="add"><span class="icon">&#xe813;</span>추가</button>
					<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
					<button type="button" class="button del" @click="del"><span class="icon">&#xe815;</span>삭제</button>
					</span>
				<button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
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
import PointHistoryService from '../../service/mb/PointHistoryService';
import SelectDate from '../../components/SelectDate.vue';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startModDt: '',
	endModDt: '',
	regDt: '', // dateUtil.format(new Date(),'YYYY-MM-DD') 
	regId: '',
	modId: '',
	cmpId: '',
});
// 회원포인트내역
const data = reactive({
	grid: {} as Grid,
	totalCount: 0,
	list: [],
	audit: false,
});
const getList = function () {
	PointHistoryService.getPointHistoryList(search).then(
		(res) => {
			data.totalCount = (res.count) ? res.count : 0;
			data.list = res.data;
			data.grid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const add = function() {
	data.grid.appendRow({}, {at: 0, focus: true});
}
const del = function () {
	let selectRow = data.grid.getFocusedCell();
	if(!selectRow.rowKey) {
		alert('행을 먼저 선택해주세요.');
		return;
	}
	if (confirm('선택한 행을 정말 삭제하시겠습니까?')) {
		if (selectRow && selectRow.rowKey) {
			data.grid.removeRow(selectRow.rowKey);
		}
	}
}
const refresh = function() {
	location.reload();
}
const save = function() {
	let saveList = [];
	let count = [0, 0, 0];
	for(let o of data.grid.getModifiedRows().createdRows as any) {
		o.crud = 'C';
		saveList.push(o);
		if(!o.abb) {
			alert('필수값을 입력하세요');
			return;
		}
		count[0]++;
	}
	for(let o of data.grid.getModifiedRows().updatedRows as any) {
		o.crud = 'U';
		saveList.push(o);
		count[1]++;
	}
	for(let o of data.grid.getModifiedRows().deletedRows as any) {
		o.crud = 'D';
		saveList.push(o);
		count[2]++;
	}
	if(count[0] == 0 && count[1] == 0 && count[2] == 0) {
		alert('변경사항이 없습니다.');
		return;
	}
	if(confirm('등록 ' + count[0] + '건, 수정 ' + count[1] + '건, 삭제 ' + count[2] + '건을 정말 저장하시겠습니까?')) {
		PointHistoryService.setPointHistoryList(saveList).then(
			(res) => {
				location.reload();
			},
			(err) => {
				console.log(err);
			},
		);
	}
}
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		//rowHeaders: ['checkbox'],
		columns: [
			{header: '포인트이력번호', name: 'pntHistNo', sortable: true, width: 100, align: 'right', disabled: false, editor: 'text'}, // 포인트이력번호
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, align: 'left', disabled: false, editor: 'text'}, // 회원ID
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, align: 'left', disabled: false, editor: 'text'}, // 업체ID
			{header: '포인트번호', name: 'pntNo', sortable: true, width: 100, align: 'right', disabled: false, editor: 'text'}, // 포인트번호
			{header: '포인트사용코드', name: 'pntUseCd', width: 120, align: 'left', sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['PNT_USE_CD'] // 포인트사용코드=ACML:적립,DDTN:차감
					},
				},
			},
			{header: '주문번호', name: 'ordNo', sortable: true, width: 100, align: 'right', disabled: false, editor: 'text'}, // 주문번호
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, align: 'left', disabled: false, editor: 'text'}, // 연동참조
			{header: '수정ID', name: 'modId', align: 'left', sortable: true, width: 110, disabled: true }, // 수정ID
			{header: '수정일시', name: 'modDt', align: 'left', sortable: true, width: 120, disabled: true }, // 수정일시
			{header: '등록ID', name: 'regId', align: 'left', sortable: true, width: 110, disabled: true }, // 등록ID
			{header: '등록일시', name: 'regDt', align: 'left', sortable: true, width: 120, disabled: true }, // 등록일시
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
	data.grid.on('click', function(e:any) {
		if( e.columnName === 'cd') {
			console.log('click')
		}
	});
	getList();
});
</script>
<style scoped>
#pointhistory {width: 100%;}
</style>
