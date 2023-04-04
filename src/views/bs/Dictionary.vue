<template>
	<div id="dirctionary">
		<form class="search" @submit="getList" @keyup.enter="getList">
			<fieldset>
				<legend>검색</legend>
				<table>
					<colgroup>
						<col width="100" />
						<col width="*" />
						<col width="100" />
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th class="required">약어</th>
							<td colspan="2"><input type="text" v-model="search.abb" /></td>
						</tr>
					</tbody>
					<tbody class="audit" v-show="data.audit">
						<tr>
							<th>수정기간</th>
							<td colspan="2">
								<SelectGroupDate 
									:name="['startModDt', 'endModDt']"
									:format="'YYYY-MM-DD'"
									:date="[search.startModDt, search.endModDt]"
									@set-start-date="(o) => {
										search.startModDt = o.date;
									}"
									@set-end-date="(o) => {
										search.endModDt = o.date;
									}"
								/>
							</td>
						</tr>
						<tr>
							<th>등록일</th>
							<td colspan="2">
								<SelectDate 
									:name="['regDt']"
									:format="'YYYY-MM-DD'"
									:date="[search.regDt]"
									@set-start-date="(o) => {
										search.regDt = o.date;
									}"
								/>
							</td>
						</tr>
						<tr>
							<th>수정ID</th>
							<td><input type="text" v-model="search.modId" /></td>
							<th>등록ID</th>
							<td><input type="text" v-model="search.regId" /></td>
						</tr>
					</tbody>
				</table>
			</fieldset>
			<div class="btnWrap">
				<span class="crud">
					<button type="button" class="button add" @click="add"><span class="icon">&#xe813;</span>추가</button>
					<button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
					<button type="button" class="button del" @click="del"><span class="icon">&#xe815;</span>삭제</button>
				</span>
				<button type="button" class="audit" @click="data.audit = !data.audit">감사컬럼조회</button>
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
import SelectDate from '../../components/SelectDate.vue';
import SelectGroupDate from '../../components/SelectGroupDate.vue';

import dateUtil from '../../utils/util.date';

const search = reactive({
	abb: '',
	startModDt: '', // dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endModDt: '', // dateUtil.format(new Date(),'YYYY-MM-DD'), 
	regDt: '', // dateUtil.format(new Date(),'YYYY-MM-DD'), 
	regId: '', 
	modId: '', 
});

const data = reactive({
	grid: {} as any,
	totalCount: 0,
	audit: false,
});

const getList = function () {
	data.totalCount = 0;
	DictionaryService.getDictionaryList(search).then(
		(res) => {
			for(let o of res.data) {
				o.rowIdx = data.totalCount++;
			}
			data.grid.resetData(res.data, {});
		},
		(err) => {
			console.log(err);
		},
	);
}
const add = function() {
	location.reload();
}
const save = function() {
	location.reload();
}
const del = function() {
	location.reload();
}
const refresh = function() {
	location.reload();
}

onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		rowHeaders: ['checkbox'],
		columns: [
			{header: '약어', name: 'abb', editor: 'text', sortable: true, align: 'center' },
			{header: '한국어', name: 'ko', hidden: false, editor: 'text', 
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
			{header: '영어', name: 'en', editor: 'text'},
			{header: '설명', name: 'dsc', editor: 'text'},
			{header: '연동참조', name: 'linkRef', editor: 'text', hidden: true, defaultValue: '', width: 150},
			{header: '수정일시', name: 'modDt', disabled: false, 
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

	data.grid.on('click', function(e:any) {
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

