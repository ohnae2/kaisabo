<template>
	<div id="paymentcancel">
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
import PaymentCancelService from '../../service/or/PaymentCancelService';
// 결제취소내역
const data = reactive({
grid: {} as any, 
});
const getList = function () {
	PaymentCancelService.getPaymentCancelList().then(
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
			{header: '결제취소번호', name: 'payCnclNo', editor: 'text'}, // 결제취소번호
			{header: '상품번호', name: 'prodNo', editor: 'text'}, // 상품번호
			{header: '결제번호', name: 'payNo', editor: 'text'}, // 결제번호
			{header: '주문번호', name: 'ordNo', editor: 'text'}, // 주문번호
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '회원ID', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: '취소요금', name: 'cnclPrice', editor: 'text'}, // 취소요금
			{header: '환불요금', name: 'rfdPrice', editor: 'text'}, // 환불요금
			{header: '환불수단코드', name: 'rfdWayCd', editor: 'text'}, // 환불수단코드=NOBANK:무통장입금
			{header: '계좌번호', name: 'acctNo', editor: 'text'}, // 계좌번호
			{header: '카드번호', name: 'crdNo', editor: 'text'}, // 카드번호
			{header: '결과코드', name: 'rsltCd', editor: 'text'}, // 결과코드=SCS:성공,ERR:오류,ETC:기타
			{header: '승인번호', name: 'apprNo', editor: 'text'}, // 승인번호
			{header: '비고', name: 'note', editor: 'text'}, // 비고
			{header: '연동참조', name: 'linkRef', editor: 'text'}, // 연동참조
			{header: '취소일시', name: 'cnclDt', editor: 'text'}, // 취소일시
			{header: '수정ID', name: 'modId'}, // 수정ID
			{header: '수정일시', name: 'modDt'}, // 수정일시
			{header: '등록ID', name: 'regId'}, // 등록ID
			{header: '등록일시', name: 'regDt'}, // 등록일시
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
#paymentcancel {
width: 100%;
}
</style>

