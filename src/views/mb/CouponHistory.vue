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
			{header: '쿠폰이력번호', name: 'cpnHistNo', editor: 'text'}, // 쿠폰이력번호
			{header: '회원ID', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '쿠폰번호', name: 'cpnNo', editor: 'text'}, // 쿠폰번호
			{header: '쿠폰사용일시', name: 'cpnUseDt', editor: 'text'}, // 쿠폰사용일시
			{header: '사용여부', name: 'useYn', editor: 'text'}, // 사용여부
			{header: '주문번호', name: 'ordNo', editor: 'text'}, // 주문번호
			{header: '연동참조', name: 'linkRef', editor: 'text'}, // 연동참조
			{header: '수정ID', name: 'modId'}, // 수정ID
			{header: '수정일시', name: 'modDt'}, // 수정일시
			{header: '등록ID', name: 'regId'}, // 등록ID
			{header: '등록일시', name: 'regDt'}, // 등록일시
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

