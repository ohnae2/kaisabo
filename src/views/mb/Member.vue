<template>
	<div id="member">
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
import MemberService from '../../service/mb/MemberService';
import SelectGroupDate from '../../components/SelectGroupDate.vue';
import dateUtil from '../../utils/util.date';
import { useAuthStore } from '../../store/store.auth';

const auth = useAuthStore();
const search = reactive({
	keyword: '',
	startDate: dateUtil.format(new Date().setMonth(new Date().getMonth() - 1), 'YYYY-MM-DD'), 
	endDate: dateUtil.format(new Date(),'YYYY-MM-DD'), 
});

// 회원
const data = reactive({
	grid: {} as any,
	totalCount: 0,
});

const getList = function () {
	MemberService.getMemberList(search).then(
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
			{header: '회원ID', name: 'mbrId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 회원ID
			{header: '업체ID', name: 'cmpId', sortable: true, width: 100, disabled: false, editor: 'text'}, // 업체ID
			{header: '레벨', name: 'lv', sortable: true, width: 100, disabled: false, editor: 'text'}, // 레벨
			{header: '비밀번호', name: 'pwd', sortable: true, width: 100, disabled: false, editor: 'text'}, // 비밀번호
			{header: '닉네임', name: 'nic', sortable: true, width: 100, disabled: false, editor: 'text'}, // 닉네임
			{header: '파일번호', name: 'fileNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 파일번호
			{header: '이름', name: 'nm', sortable: true, width: 100, disabled: false, editor: 'text'}, // 이름
			{header: '휴대전화번호', name: 'hpNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 휴대전화번호
			{header: '우편번호', name: 'postNo', sortable: true, width: 100, disabled: false, editor: 'text'}, // 우편번호
			{header: '주소', name: 'addr', sortable: true, width: 100, disabled: false, editor: 'text'}, // 주소
			{header: '상세주소', name: 'dtlAddr', sortable: true, width: 100, disabled: false, editor: 'text'}, // 상세주소
			{header: '방문횟수', name: 'bisitCnt', sortable: true, width: 100, disabled: false, editor: 'text'}, // 방문횟수
			{header: '로그인일시', name: 'loginDt', sortable: true, width: 120, disabled: false, // 로그인일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '탈퇴일시', name: 'wtdwDt', sortable: true, width: 120, disabled: false, // 탈퇴일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '비밀번호갱신일시', name: 'pwdRfsDt', sortable: true, width: 120, disabled: false, // 비밀번호갱신일시
				editor: {
				type: 'datePicker',
					options: {
						format: 'yyyy-MM-dd HH:mm'
					}
				}
			},
			{header: '회원상태코드', name: 'mbrStatCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['MBR_STAT_CD'] // 회원상태코드=NOM:정상,STOP:정지,WTDW:탈퇴,CERT:인증
					},
				},
			},
			{header: '이메일', name: 'email', sortable: true, width: 100, disabled: false, editor: 'text'}, // 이메일
			{header: '결제인증키', name: 'payCertKey', sortable: true, width: 100, disabled: false, editor: 'text'}, // 결제인증키
			{header: '간편가입코드', name: 'simAdmsCd', width: 120, sortable: true, disabled: false,
				formatter: 'listItemText',
				editor: {
					type: 'select',
					options: {
						listItems: auth.codeList['SIM_ADMS_CD'] // 간편가입코드=NAVER:네이버,GOOGLE:구글,FACEBOOK:페이스북
					},
				},
			},
			{header: '잠금여부', name: 'lckYn', sortable: true, width: 100, disabled: false, editor: 'text'}, // 잠금여부
			{header: '실패횟수', name: 'flCnt', sortable: true, width: 100, disabled: false, editor: 'text'}, // 실패횟수
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
#member {
width: 100%;
}
</style>

