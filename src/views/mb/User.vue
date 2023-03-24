<template>
	<div id="user">
		<div id="grid"></div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import Grid from 'tui-grid';
import UserService from '../../service/mb/UserService';
// 사용자
const data = reactive({
grid: {} as any, 
});
onMounted(() => {
	data.grid = new Grid({
		el: document.getElementById('grid') as HTMLElement,
		columns: [
			{header: '사용자ID', name: 'usrId', editor: 'text'}, // 사용자ID
			{header: '업체ID', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: '그룹ID', name: 'grpId', editor: 'text'}, // 그룹ID
			{header: '비밀번호', name: 'pwd', editor: 'text'}, // 비밀번호
			{header: '파일번호', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: '이름', name: 'nm', editor: 'text'}, // 이름
			{header: '휴대전화번호', name: 'hpNo', editor: 'text'}, // 휴대전화번호
			{header: '비밀번호갱신일시', name: 'pwdRfsDt', editor: 'text'}, // 비밀번호갱신일시
			{header: '사용자상태코드', name: 'usrStatCd', editor: 'text'}, // 사용자상태코드=NOM:정상,STOP:정지,WTDW:탈퇴,CERT:인증
			{header: '이메일', name: 'email', editor: 'text'}, // 이메일
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
		UserService.getUserList().then(
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
#user {
width: 100%;
}
</style>

