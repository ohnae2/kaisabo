<template>
	<div id="display">
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
import DisplayService from '../../service/dp/DisplayService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import dateUtil from '../../utils/util.date';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

// 전시
const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	DisplayService.getDisplayList(search).then(
		(res) => {
			data.totalCount = 0;
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
			{header: '전시번호', name: 'dispNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 전시번호
			{header: '업체구분코드', name: 'cmpDivCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['CMP_DIV_CD'] // 업체구분코드=PENS:펜션,MOTEL:모텔,HOTEL:호텔,BEDBKF:민박,GUHS:게스트하우스,SVTW:요양원,WTSKI:수상스키
					},
				},
			},
			{header: '전시코드', name: 'dispCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['DISP_CD'] // 전시코드=MAIN:메인,DISP:전시,PROD:상품,ETC:기타
					},
				},
			},
			{header: '우선순위', name: 'prir', sortable: true, width: 100, disabled: false, editor: 'text'}, // 우선순위
			{header: '전시여부', name: 'dispYn', sortable: true, width: 100, disabled: false, editor: 'text'}, // 전시여부
			{header: '연동참조', name: 'linkRef', sortable: true, width: 100, disabled: false, editor: 'text'}, // 연동참조
			{header: '수정ID', name: 'modId', sortable: true, width: 110}, // 수정ID
			{header: '수정일시', name: 'modDt', sortable: true, width: 120, disabled: false, // 수정일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '등록ID', name: 'regId', sortable: true, width: 110}, // 등록ID
			{header: '등록일시', name: 'regDt', sortable: true, width: 120, disabled: false, // 등록일시
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
#display {
width: 100%;
}
</style>

