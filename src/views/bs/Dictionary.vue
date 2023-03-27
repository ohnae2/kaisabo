<template>
	<div id="dirctionary">
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
import DictionaryService from '../../service/bs/DictionaryService';

const data = reactive({
grid: {} as any, 
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

onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'abb', name: 'abb', editor: 'text', sortable: true, align: 'center' },
			{header: 'ko', name: 'ko', editor: 'text', hidden: false},
			{header: 'ko', name: 'ko', editor: 'text', hidden: false, width: 80, 
				/*formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
					listItems: [
						{ text: '', value: '', dataType: 'string'},
						{ text: '접수', value: '20', dataType: 'string'},
						{ text: '관찰', value: '30', dataType: 'string'},
						{ text: '완료', value: '40', dataType: 'string'},
					]
					},
				},*/
			},
			{header: 'en', name: 'en', editor: 'text'},
			{header: 'dsc', name: 'dsc', editor: 'text'},
			{header: 'linkRef', name: 'linkRef', editor: 'text', defaultValue: ''},
			{header: 'modDat', name: 'modDt', editor: 'text', disabled: false},
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
#dirctionary {
width: 100%;
}
</style>

