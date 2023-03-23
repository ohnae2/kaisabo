<template>
	<div id="paymentcancel">
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
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'payCnclNo', name: 'payCnclNo', editor: 'text'}, // 결제취소번호
			{header: 'prodNo', name: 'prodNo', editor: 'text'}, // 상품번호
			{header: 'payNo', name: 'payNo', editor: 'text'}, // 결제번호
			{header: 'ordNo', name: 'ordNo', editor: 'text'}, // 주문번호
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'mbrId', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: 'cnclPrice', name: 'cnclPrice', editor: 'text'}, // 취소요금
			{header: 'rfdPrice', name: 'rfdPrice', editor: 'text'}, // 환불요금
			{header: 'rfdWayCd', name: 'rfdWayCd', editor: 'text'}, // 환불수단코드=NOBANK:무통장입금
			{header: 'acctNo', name: 'acctNo', editor: 'text'}, // 계좌번호
			{header: 'crdNo', name: 'crdNo', editor: 'text'}, // 카드번호
			{header: 'rsltCd', name: 'rsltCd', editor: 'text'}, // 결과코드=SCS:성공,ERR:오류,ETC:기타
			{header: 'apprNo', name: 'apprNo', editor: 'text'}, // 승인번호
			{header: 'note', name: 'note', editor: 'text'}, // 비고
			{header: 'linkRef', name: 'linkRef', editor: 'text'}, // 연동참조
			{header: 'cnclDt', name: 'cnclDt', editor: 'text'}, // 취소일시
			{header: 'modId', name: 'modId'}, // 수정ID
			{header: 'modDt', name: 'modDt'}, // 수정일시
			{header: 'regId', name: 'regId'}, // 등록ID
			{header: 'regDt', name: 'regDt'}, // 등록일시
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

	getList();
});

</script>

<style scoped>
#paymentcancel {
width: 100%;
}
</style>

