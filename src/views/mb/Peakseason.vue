<template>
	<div id="peakseason">
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
import PeakseasonService from '../../service/mb/PeakseasonService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import dateUtil from '../../utils/util.date';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

// 성수기
const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	PeakseasonService.getPeakseasonList(search).then(
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
			{header: '준성수기시작일', name: 'sdsnStrtDay', sortable: true, width: 100, disabled: false, // 준성수기시작일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '준성수기종료일', name: 'sdsnEndDay', sortable: true, width: 100, disabled: false, // 준성수기종료일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '성수기시작일', name: 'pksnStrtDay', sortable: true, width: 100, disabled: false, // 성수기시작일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '성수기종료일', name: 'pksnEndDay', sortable: true, width: 100, disabled: false, // 성수기종료일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '극성수기시작일', name: 'tksnStrtDay', sortable: true, width: 100, disabled: false, // 극성수기시작일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '극성수기종료일', name: 'tksnEndDay', sortable: true, width: 100, disabled: false, // 극성수기종료일
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd'
					}
				}
			},
			{header: '주중요금', name: 'weekPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 주중요금
			{header: '금요일요금', name: 'friPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 금요일요금
			{header: '주말요금', name: 'wkedPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 주말요금
			{header: '준성수기주중요금', name: 'sdsnWeekPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 준성수기주중요금
			{header: '준성수기금요일요금', name: 'sdsnFriPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 준성수기금요일요금
			{header: '준성수기주말요금', name: 'sdsnWkedPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 준성수기주말요금
			{header: '성수기주중요금', name: 'pksnWeekPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 성수기주중요금
			{header: '성수기금요일요금', name: 'pksnFriPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 성수기금요일요금
			{header: '성수기주말요금', name: 'pksnWkedPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 성수기주말요금
			{header: '극성수기주중요금', name: 'tksnWeekPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 극성수기주중요금
			{header: '극성수기금요일요금', name: 'tksnFriPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 극성수기금요일요금
			{header: '극성수기주말요금', name: 'tksnWkedPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 극성수기주말요금
			{header: '인원초과요금', name: 'psnelOverPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 인원초과요금
			{header: '온수요금', name: 'wwtPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 온수요금
			{header: '바베큐요금', name: 'bbqPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 바베큐요금
			{header: '기타요금', name: 'etcPrice', sortable: true, width: 100, disabled: false, editor: 'text'}, // 기타요금
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
#peakseason {
width: 100%;
}
</style>

