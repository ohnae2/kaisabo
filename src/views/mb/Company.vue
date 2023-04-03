<template>
	<div id="company">
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
import CompanyService from '../../service/mb/CompanyService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import dateUtil from '../../utils/util.date';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

// 업체
const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	CompanyService.getCompanyList(search).then(
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
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 업체ID
			{header: '업체구분코드', name: 'cmpDivCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['CMP_DIV_CD'] // 업체구분코드=PENS:펜션,MOTEL:모텔,HOTEL:호텔,BEDBKF:민박,GUHS:게스트하우스,SVTW:요양원,WTSKI:수상스키
					},
				},
			},
			{header: '업체명', name: 'cmpNm', sortable: true, width: 100, disabled: false, editor: 'text'}, // 업체명
			{header: '사업자등록번호', name: 'bizno', sortable: true, width: 100, disabled: false, editor: 'text'}, // 사업자등록번호
			{header: '파일번호', name: 'fileNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 파일번호
			{header: '주소', name: 'addr', sortable: true, width: 100, disabled: false, editor: 'text'}, // 주소
			{header: '상세주소', name: 'dtlAddr', sortable: true, width: 100, disabled: false, editor: 'text'}, // 상세주소
			{header: '위도', name: 'lttd', sortable: true, width: 100, disabled: false, editor: 'text'}, // 위도
			{header: '경도', name: 'lotd', sortable: true, width: 100, disabled: false, editor: 'text'}, // 경도
			{header: '사이트URL', name: 'steUrl', sortable: true, width: 100, disabled: false, editor: 'text'}, // 사이트URL
			{header: '전화번호', name: 'telNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 전화번호
			{header: '비고', name: 'note', sortable: true, width: 100, disabled: false, editor: 'text'}, // 비고
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
#company {
width: 100%;
}
</style>

