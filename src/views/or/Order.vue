<template>
	<div id="order">
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
import OrderService from '../../service/or/OrderService';
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
// 주문
const data = reactive({
	grid: {} as Grid,
	required: ['prodNo', 'mbrNm', 'telNo', 'rsvDay', 'email', 'ordStatCd', 'price'],
	totalCount: 0,
	list: [],
	audit: false,
});
const getList = function () {
	OrderService.getOrderList(search).then(
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
const valid = function(o:any) {
	for(let c in o) {
		for(let r of data.required) {
			if(c == r && !o[c]) {
				alert(c + ' 필수값이 없습니다.');
				return false;
			}
		}
	}
	return true;
}
const save = function() {
	data.grid.blur();
	let saveList = [];
	let count = [0, 0, 0];
	for(let o of data.grid.getModifiedRows().createdRows as any) {
		o.crud = 'C';
		if(!valid(o)) {
			return;
		}
		saveList.push(o);
		count[0]++;
	}
	for(let o of data.grid.getModifiedRows().updatedRows as any) {
		o.crud = 'U';
		if(!valid(o)) {
			return;
		}
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
		OrderService.setOrderList(saveList).then(
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
			{header: '주문번호', name: 'ordNo', sortable: true, width: 100, align: 'right', disabled: true, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 주문번호
			{header: '상품번호', name: 'prodNo', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 상품번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, align: 'left', disabled: (auth.userInfo.cmpId != 'kaisa'), editor: 'text'}, // 업체ID
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 회원ID
			{header: '회원명', name: 'mbrNm', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 회원명
			{header: '전화번호', name: 'telNo', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 전화번호
			{header: '예약일', name: 'rsvDay', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, // 예약일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '이메일', name: 'email', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: false }, editor: 'text'}, // 이메일
			{header: '주문상태코드', name: 'ordStatCd', width: 120, align: 'left', sortable: true, disabled: false, validation: { dataType: 'string' , required: false }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['ORD_STAT_CD'] // 주문상태코드=RSV:예약,PAYEND:결제완료,CNCL:취소,PAYCNCL:결제취소
					},
				},
			},
			{header: '요금', name: 'price', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: false }, editor: 'text'}, // 요금
			{header: '추가요금', name: 'addPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 추가요금
			{header: '사용포인트', name: 'usePnt', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 사용포인트
			{header: '쿠폰번호', name: 'cpnNo', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 쿠폰번호
			{header: '할인요금', name: 'dcPrice', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 할인요금
			{header: '인원수', name: 'psnelCnt', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 인원수
			{header: '추가인원수', name: 'addPsnelCnt', sortable: true, width: 100, align: 'right', disabled: false, validation: { dataType: 'number' , required: true }, editor: 'text'}, // 추가인원수
			{header: '온수추가여부', name: 'wwtAddYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: false, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 온수추가여부
					},
				},
			},
			{header: '바베큐추가여부', name: 'bbqAddYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: false, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 바베큐추가여부
					},
				},
			},
			{header: '픽업여부', name: 'pickupYn', width: 120, align: 'left', sortable: true, defaultValue: 'Y', disabled: false, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['YN_CD'] // 픽업여부
					},
				},
			},
			{header: '예약경로코드', name: 'rsvPathCd', width: 120, align: 'left', sortable: true, disabled: false, validation: { dataType: 'string' , required: true }, 
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['RSV_PATH_CD'] // 예약경로코드=NAVER:네이버,YANOLJA:야놀자,YEOGI:여기어때,ETC:기타
					},
				},
			},
			{header: '비고', name: 'note', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 비고
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, align: 'left', disabled: false, validation: { dataType: 'string' , required: true }, editor: 'text'}, // 연동참조
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
#order {width: 100%;}
</style>
