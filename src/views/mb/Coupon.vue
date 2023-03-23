<template>
	<div id="coupon">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import CouponService from '../../service/mb/CouponService';
// 쿠폰
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'cpnNo', name: 'cpnNo', editor: 'text'}, // 쿠폰번호
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'cpnNm', name: 'cpnNm', editor: 'text'}, // 쿠폰명
			{header: 'cpnPrice', name: 'cpnPrice', editor: 'text'}, // 쿠폰요금
			{header: 'strtDt', name: 'strtDt', editor: 'text'}, // 시작일시
			{header: 'endDt', name: 'endDt', editor: 'text'}, // 종료일시
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
		CouponService.getCouponList().then(
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
#coupon {
width: 100%;
}
</style>

