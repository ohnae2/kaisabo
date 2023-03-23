<template>
	<div id="member">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import MemberService from '../../service/mb/MemberService';
// 회원
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: 'mbrId', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'lv', name: 'lv', editor: 'text'}, // 레벨
			{header: 'pwd', name: 'pwd', editor: 'text'}, // 비밀번호
			{header: 'nic', name: 'nic', editor: 'text'}, // 닉네임
			{header: 'fileNo', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: 'nm', name: 'nm', editor: 'text'}, // 이름
			{header: 'hpNo', name: 'hpNo', editor: 'text'}, // 휴대전화번호
			{header: 'postNo', name: 'postNo', editor: 'text'}, // 우편번호
			{header: 'addr', name: 'addr', editor: 'text'}, // 주소
			{header: 'dtlAddr', name: 'dtlAddr', editor: 'text'}, // 상세주소
			{header: 'bisitCnt', name: 'bisitCnt', editor: 'text'}, // 방문횟수
			{header: 'loginDt', name: 'loginDt', editor: 'text'}, // 로그인일시
			{header: 'wtdwDt', name: 'wtdwDt', editor: 'text'}, // 탈퇴일시
			{header: 'pwdRfsDt', name: 'pwdRfsDt', editor: 'text'}, // 비밀번호갱신일시
			{header: 'mbrStatCd', name: 'mbrStatCd', editor: 'text'}, // 회원상태코드=NOM:정상,STOP:정지,WTDW:탈퇴,CERT:인증
			{header: 'email', name: 'email', editor: 'text'}, // 이메일
			{header: 'payCertKey', name: 'payCertKey', editor: 'text'}, // 결제인증키
			{header: 'simAdmsCd', name: 'simAdmsCd', editor: 'text'}, // 간편가입코드=NAVER:네이버,GOOGLE:구글,FACEBOOK:페이스북
			{header: 'lckYn', name: 'lckYn', editor: 'text'}, // 잠금여부
			{header: 'flCnt', name: 'flCnt', editor: 'text'}, // 실패횟수
			{header: 'note', name: 'note', editor: 'text'}, // 비고
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
		MemberService.getMemberList().then(
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
#member {
width: 100%;
}
</style>

