<template>
	<div id="payment">
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
import PaymentService from '../../service/or/PaymentService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import dateUtil from '../../utils/util.date';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

// 결제내역
const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	PaymentService.getPaymentList(search).then(
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
			{header: '결제번호', name: 'payNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 결제번호
			{header: '주문번호', name: 'ordNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 주문번호
			{header: '상품번호', name: 'prodNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 상품번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 업체ID
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 회원ID
			{header: '결제요금', name: 'payPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 결제요금
			{header: '결제수단코드', name: 'payWayCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['PAY_WAY_CD'] // 결제수단코드=NOBANK:무통장입금
					},
				},
			},
			{header: '계좌번호', name: 'acctNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 계좌번호
			{header: '카드번호', name: 'crdNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 카드번호
			{header: '승인번호', name: 'apprNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 승인번호
			{header: '결과코드', name: 'rsltCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['RSLT_CD'] // 결과코드=SCS:성공,ERR:오류,ETC:기타
					},
				},
			},
			{header: '가맹점코드', name: 'mcnsCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['MCNS_CD'] // 가맹점코드=ETC:기타
					},
				},
			},
			{header: '비고', name: 'note', sortable: true, width: 100, disabled: false, editor: 'text'}, // 비고
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, disabled: false, editor: 'text'}, // 연동참조
			{header: '결제일시', name: 'payDt', sortable: true, width: 120, disabled: false, // 결제일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '수정ID', name: 'modId', sortable: true, width: 110}, // 수정ID
			{header: '수정일시', name: 'modDt', sortable: true, width: 120, disabled: false, // 수정일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '등록ID', name: 'regId', sortable: true, width: 110}, // 등록ID
			{header: '등록일시', name: 'regDt', sortable: true, width: 120, disabled: false, // 등록일시
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
#payment {
width: 100%;
}
</style>

