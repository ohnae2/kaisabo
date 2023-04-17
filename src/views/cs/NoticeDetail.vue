<template>
	<div id="noticeDetail">
		<h3>공지사항 등록/수정</h3>
		<div class="close" @click="close"><span class="icon">&#xe097;</span></div>
		<form @submit.prevent="save">
			<table>
				<tr><th>업체ID</th><td><input type="text" v-model="data.cmpId" /></td></tr>
				<tr><th>우선순위</th><td><input type="text" v-model="data.prir" /></td></tr>
				<tr><th>내용</th><td>
					<!--<input type="text" v-model="data.cnts" />-->
					<div id="noticeEditor"></div>
				</td></tr>
				<tr><th>시작일</th><td>
					<SelectDate 
						:name="['strtDt']"
						:format="'YYYY-MM-DD HH:mm'"
						:date="[data.strtDt]"
						:isAll="false"
						:timer="true"
						@set-start-date="(o) => {
							data.strtDt = o.date;
						}"
					/>
				</td></tr>
				<tr><th>종료일</th><td>
					<SelectDate 
						:name="['endDt']"
						:format="'YYYY-MM-DD HH:mm'"
						:date="[data.endDt]"
						:isAll="false"
						:timer="true"
						@set-start-date="(o) => {
							data.endDt = o.date;
						}"
					/>
				</td></tr>
			</table>
			<div class="btnWrap">
				<button type="submit">저장</button>
				<button type="button" class="gray" @click="close">취소</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import NoticeService from '../../service/cs/NoticeService';
import SelectDate from '../../components/SelectDate.vue';
import Editor from '@toast-ui/editor';

const emit = defineEmits(['set-close'])

const props = defineProps({
	data: { type: Object, required: true },
});

if(!props.data.endDt) {
	props.data.endDt = new Date();
}

const data = reactive({
	editor: {} as Editor,
	editorOption: {
		el: {} as HTMLElement,
		previewStyle: 'vertical',
		height: '500px',
		initialValue: props.data.cnts
	}
});

const save = function(){

}

const close = function(){
    emit('set-close');
}
onMounted(() => {
	data.editor = new Editor({
		el: document.querySelector('#noticeEditor') as HTMLElement,
		previewStyle: 'vertical',
		height: '500px',
		initialValue: props.data.cnts
	});
});

    

</script>

<style scoped>
#noticeDetail {width:600px; padding:10px; height:calc(100% - 160px); position:fixed; right:30px; top:120px; background:#fcfff7; z-index:300; border:1px solid #8a9773; box-shadow:0 0 5px rgba(0,0,0,0.3);}
#noticeDetail h3 {padding:10px 0 15px 5px; color:#333; font-size:16px; font-weight:bold;}
#noticeDetail .close {position:absolute; right:10px; top:10px; cursor: pointer;}
#noticeDetail .close .icon {color:#333; font-size:26px;}
#noticeDetail form {width:100%; height:calc(100% - 60px); overflow: auto;}
#noticeDetail table {width:100%;}
#noticeDetail table th {width:100px; padding:5px 10px; border:1px solid rgba(0,0,0,0.2); color:#333; background:rgba(0,0,0,0.1);}
#noticeDetail table td {padding:5px; border:1px solid rgba(0,0,0,0.2);}
</style>
