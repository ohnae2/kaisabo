<template>
	<div id="noticeDetail" class="popup">
		<div class="popupWrap">
			<h3>공지사항 등록/수정</h3>
			<div class="close" @click="close"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="save">
				<table class="popT">
					<tr><th class="th">업체ID</th><td class="td"><input type="text" v-model="data.cmpId" /></td></tr>
					<tr><th class="th">우선순위</th><td class="td"><input type="text" v-model="data.prir" /></td></tr>
					<tr><th class="th">제목</th><td class="td"><input type="text" v-model="data.tit" /></td></tr>
					<tr><td colspan="2" class="td">
						<!--<input type="text" v-model="data.cnts" />-->
						<div id="noticeEditor"></div>
					</td></tr>
					<tr><th class="th">시작일</th><td class="td">
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
					<tr><th class="th">종료일</th><td class="td">
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
		height: '390px',
		initialValue: props.data.cnts
	});
});

</script>

<style scoped>
</style>
