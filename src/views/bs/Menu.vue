<template>
	<div id="menu">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import MenuService from '../../service/bs/MenuService';
// 메뉴
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: '메뉴번호', name: 'menuNo', editor: 'text'}, // 메뉴번호
			{header: '상위메뉴번호', name: 'hgrkMenuNo', editor: 'text'}, // 상위메뉴번호
			{header: 'URL', name: 'url', editor: 'text'}, // URL
			{header: '메뉴명', name: 'menuNm', editor: 'text'}, // 메뉴명
			{header: '하위메뉴여부', name: 'lwrkMenuYn', editor: 'text'}, // 하위메뉴여부
			{header: '사용여부', name: 'useYn', editor: 'text'}, // 사용여부
			{header: '깊이', name: 'dpth', editor: 'text'}, // 깊이
			{header: '아이콘코드', name: 'iconCd', editor: 'text'}, // 아이콘코드
			{header: '우선순위', name: 'prir', editor: 'text'}, // 우선순위
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
		MenuService.getMenuList().then(
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
#menu {
width: 100%;
}
</style>

