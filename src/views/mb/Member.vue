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
			{header: '회원ID', name: 'mbrId', editor: 'text'}, // 회원ID
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '레벨', name: 'lv', editor: 'text'}, // 레벨
			{header: '비밀번호', name: 'pwd', editor: 'text'}, // 비밀번호
			{header: '닉네임', name: 'nic', editor: 'text'}, // 닉네임
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: '이름', name: 'nm', editor: 'text'}, // 이름
			{header: '휴대전화번호', name: 'hpNo', editor: 'text'}, // 휴대전화번호
			{header: '우편번호', name: 'postNo', editor: 'text'}, // 우편번호
			{header: '주소', name: 'addr', editor: 'text'}, // 주소
			{header: '상세주소', name: 'dtlAddr', editor: 'text'}, // 상세주소
			{header: '방문횟수', name: 'bisitCnt', editor: 'text'}, // 방문횟수
			{header: '로그인일시', name: 'loginDt', editor: 'text'}, // 로그인일시
			{header: '탈퇴일시', name: 'wtdwDt', editor: 'text'}, // 탈퇴일시
			{header: '비밀번호갱신일시', name: 'pwdRfsDt', editor: 'text'}, // 비밀번호갱신일시
			{header: '회원상태코드', name: 'mbrStatCd', editor: 'text'}, // 회원상태코드=NOM:정상,STOP:정지,WTDW:탈퇴,CERT:인증
			{header: '이메일', name: 'email', editor: 'text'}, // 이메일
			{header: '결제인증키', name: 'payCertKey', editor: 'text'}, // 결제인증키
			{header: '간편가입코드', name: 'simAdmsCd', editor: 'text'}, // 간편가입코드=NAVER:네이버,GOOGLE:구글,FACEBOOK:페이스북
			{header: '잠금여부', name: 'lckYn', editor: 'text'}, // 잠금여부
			{header: '실패횟수', name: 'flCnt', editor: 'text'}, // 실패횟수
			{header: '비고', name: 'note', editor: 'text'}, // 비고
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

