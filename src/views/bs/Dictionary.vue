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
						<td><input type="text" v-model="search.abb" /></td>
						<th>수정날짜</th>
						<td>
							<SelectGroupDate 
								:name="['startDate', 'endDate']"
								:format="'YYYY-MM-DD'"
								:date="[search.startDate, search.endDate]"
								@set-start-date="(o) => {
									search.startDate = o.date;
								}"
								@set-end-date="(o) => {
									search.endDate = o.date;
								}"
							/>
						</td>
					</tr>
				</table>
			</fieldset>
			<div class="btnWrap">
				<button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
				<button type="reset" @click="refresh"><span class="icon">&#x22;</span></button>
				<div class="totalCount">총 {{ data.totalCount }}건</div>
			</div>
		</form>
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import DictionaryService from '../../service/bs/DictionaryService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';

import dateUtil from '../../utils/util.date';

const search = reactive({
	abb: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	data.totalCount = 0;
	DictionaryService.getDictionaryList(search).then(
		(res) => {
			for(let o of res.data) {
				o.rowIdx = data.totalCount++;
			}
			data.grid?.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const refresh = function() {
	location.reload();
}

onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		rowHeaders: ['checkbox'],
		columns: [
			{header: 'abb', name: 'abb', editor: 'text', sortable: true, align: 'center' },
			{header: 'ko', name: 'ko', hidden: false, editor: 'text', 
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
			{header: 'linkRef', name: 'linkRef', editor: 'text', defaultValue: '', width: 150},
			{header: 'modDat', name: 'modDt', disabled: false, 
				editor: {
					type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
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

