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
			{header: 'usrId', name: 'usrId', editor: 'text'}, // 사용자ID
			{header: 'cmpId', name: 'cmpId', editor: 'text'}, // 업체ID
			{header: 'grpId', name: 'grpId', editor: 'text'}, // 그룹ID
			{header: 'pwd', name: 'pwd', editor: 'text'}, // 비밀번호
			{header: 'fileNo', name: 'fileNo', editor: 'text'}, // 파일번호
			{header: 'nm', name: 'nm', editor: 'text'}, // 이름
			{header: 'hpNo', name: 'hpNo', editor: 'text'}, // 휴대전화번호
			{header: 'pwdRfsDt', name: 'pwdRfsDt', editor: 'text'}, // 비밀번호갱신일시
			{header: 'usrStatCd', name: 'usrStatCd', editor: 'text'}, // 사용자상태코드=NOM:정상,STOP:정지,WTDW:탈퇴,CERT:인증
			{header: 'email', name: 'email', editor: 'text'}, // 이메일
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

