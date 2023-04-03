<template>
	<div id="order">
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
import OrderService from '../../service/or/OrderService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import dateUtil from '../../utils/util.date';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

// 주문
const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	OrderService.getOrderList(search).then(
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
			{header: '주문번호', name: 'ordNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 주문번호
			{header: '상품번호', name: 'prodNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 상품번호
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 업체ID
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 회원ID
			{header: '회원명', name: 'mbrNm', sortable: true, width: 100, disabled: false, editor: 'text'}, // 회원명
			{header: '전화번호', name: 'telNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 전화번호
			{header: '예약일', name: 'rsvDay', sortable: true, width: 100, disabled: false, // 예약일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '이메일', name: 'email', sortable: true, width: 100, disabled: false, editor: 'text'}, // 이메일
			{header: '주문상태코드', name: 'ordStatCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['ORD_STAT_CD'] // 주문상태코드=RSV:예약,PAYEND:결제완료,CNCL:취소,PAYCNCL:결제취소
					},
				},
			},
			{header: '요금', name: 'price', sortable: true, width: 100, disabled: false, editor: 'text'}, // 요금
			{header: '추가요금', name: 'addPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 추가요금
			{header: '사용포인트', name: 'usePnt', sortable: true, width: 100, disabled: false, editor: 'text'}, // 사용포인트
			{header: '쿠폰번호', name: 'cpnNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 쿠폰번호
			{header: '할인요금', name: 'dcPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 할인요금
			{header: '인원수', name: 'psnelCnt', sortable: true, width: 100, disabled: false, editor: 'text'}, // 인원수
			{header: '추가인원수', name: 'addPsnelCnt', sortable: true, width: 100, disabled: false, editor: 'text'}, // 추가인원수
			{header: '온수추가여부', name: 'wwtAddYn', sortable: true, width: 100, disabled: false, editor: 'text'}, // 온수추가여부
			{header: '바베큐추가여부', name: 'bbqAddYn', sortable: true, width: 100, disabled: false, editor: 'text'}, // 바베큐추가여부
			{header: '픽업여부', name: 'pickupYn', sortable: true, width: 100, disabled: false, editor: 'text'}, // 픽업여부
			{header: '예약경로코드', name: 'rsvPathCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['RSV_PATH_CD'] // 예약경로코드=NAVER:네이버,YANOLJA:야놀자,YEOGI:여기어때,ETC:기타
					},
				},
			},
			{header: '비고', name: 'note', sortable: true, width: 100, disabled: false, editor: 'text'}, // 비고
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, disabled: false, editor: 'text'}, // 연동참조
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
#order {
width: 100%;
}
</style>

