<template>
	<div id="order">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import OrderService from '../../service/or/OrderService';
// 주문
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
		{header: 'ordNo', name: 'ordNo', editor: 'text'}, // 주문번호
		{header: 'prodNo', name: 'prodNo', editor: 'text'}, // 상품번호
		{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
		{header: 'mbrId', name: 'mbrId', editor: 'text'}, // 회원ID
		{header: 'mbrNm', name: 'mbrNm', editor: 'text'}, // 회원명
		{header: 'telNo', name: 'telNo', editor: 'text'}, // 전화번호
		{header: 'email', name: 'email', editor: 'text'}, // 이메일
		{header: 'ordStatCd', name: 'ordStatCd', editor: 'text'}, // 주문상태코드=RSV:예약,PAYEND:결제완료,CNCL:취소,PAYCNCL:결제취소
		{header: 'price', name: 'price', editor: 'text'}, // 요금
		{header: 'addPrice', name: 'addPrice', editor: 'text'}, // 추가요금
		{header: 'usePnt', name: 'usePnt', editor: 'text'}, // 사용포인트
		{header: 'cpnNo', name: 'cpnNo', editor: 'text'}, // 쿠폰번호
		{header: 'dcPrice', name: 'dcPrice', editor: 'text'}, // 할인요금
		{header: 'psnelCnt', name: 'psnelCnt', editor: 'text'}, // 인원수
		{header: 'addPsnelCnt', name: 'addPsnelCnt', editor: 'text'}, // 추가인원수
		{header: 'wwtAddYn', name: 'wwtAddYn', editor: 'text'}, // 온수추가여부
		{header: 'bbqAddYn', name: 'bbqAddYn', editor: 'text'}, // 바베큐추가여부
		{header: 'pickupYn', name: 'pickupYn', editor: 'text'}, // 픽업여부
		{header: 'rsvPathCd', name: 'rsvPathCd', editor: 'text'}, // 예약경로코드=NAVER:네이버,YANOLJA:야놀자,YEOGI:여기어때,ETC:기타
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
		OrderService.getOrderList().then(
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
#order {
width: 100%;
}
</style>

