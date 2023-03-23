<template>
	<div id="payment">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import PaymentService from '../../service/or/PaymentService';
// 결제내역
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'payNo', name: 'payNo', editor: 'text'}, // 결제번호
			{header: 'ordNo', name: 'ordNo', editor: 'text'}, // 주문번호
			{header: 'prodNo', name: 'prodNo', editor: 'text'}, // 상품번호
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'mbrId', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: 'payPrice', name: 'payPrice', editor: 'text'}, // 결제요금
			{header: 'payWayCd', name: 'payWayCd', editor: 'text'}, // 결제수단코드=NOBANK:무통장입금
			{header: 'acctNo', name: 'acctNo', editor: 'text'}, // 계좌번호
			{header: 'crdNo', name: 'crdNo', editor: 'text'}, // 카드번호
			{header: 'apprNo', name: 'apprNo', editor: 'text'}, // 승인번호
			{header: 'rsltCd', name: 'rsltCd', editor: 'text'}, // 결과코드=SCS:성공,ERR:오류,ETC:기타
			{header: 'mcnsCd', name: 'mcnsCd', editor: 'text'}, // 가맹점코드=ETC:기타
			{header: 'note', name: 'note', editor: 'text'}, // 비고
			{header: 'linkRef', name: 'linkRef', editor: 'text'}, // 연동참조
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
		PaymentService.getPaymentList().then(
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
#payment {
width: 100%;
}
</style>

