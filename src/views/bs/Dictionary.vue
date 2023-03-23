<template>
	<div id="dirctionary">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import DictionaryService from '../../service/bs/DictionaryService';

const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'abb', name: 'abb', editor: 'text'},
			{header: 'ko', name: 'ko', editor: 'text'},
			{header: 'en', name: 'en', editor: 'text'},
			{header: 'dsc', name: 'dsc', editor: 'text'},
			{header: 'linkRef', name: 'linkRef', editor: 'text'},
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
		DictionaryService.getDictionaryList().then(
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
#dirctionary {
width: 100%;
}
</style>

