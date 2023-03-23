<template>
	<div id="couponhistory">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import CouponHistoryService from '../../service/mb/CouponHistoryService';
// 회원쿠폰내역
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'cpnHistNo', name: 'cpnHistNo', editor: 'text'}, // 쿠폰이력번호
			{header: 'mbrId', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'cpnNo', name: 'cpnNo', editor: 'text'}, // 쿠폰번호
			{header: 'cpnUseDt', name: 'cpnUseDt', editor: 'text'}, // 쿠폰사용일시
			{header: 'useYn', name: 'useYn', editor: 'text'}, // 사용여부
			{header: 'ordNo', name: 'ordNo', editor: 'text'}, // 주문번호
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
		CouponHistoryService.getCouponHistoryList().then(
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
#couponhistory {
width: 100%;
}
</style>

