<template>
	<div id="noticeDetail" class="popup">
		<div class="popupWrap">
			<h3>공지사항 등록/수정</h3>
			<div class="close" @click="close"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="save">
				<table class="popT">
					<tr><th class="th">업체ID</th><td class="td"><input type="text" v-model="props.data.cmpId" /></td></tr>
					<tr><th class="th">제목</th><td class="td"><input type="text" v-model="props.data.tit" /></td></tr>
					<tr><th class="th">파일번호</th><td class="td"><input type="text" v-model="props.data.fileNo" /></td></tr>
					<tr><th class="th">사용여부</th><td class="td"><input type="text" v-model="props.data.useYn" /></td></tr>
					<tr><th class="th">파일</th><td class="td">
						<FileUploader :model="'logo.svg'" :path="'http://pumpkinev.iptime.org:5526/static/25bd3aa3/images/svgs/'" />
					</td></tr>
					<tr><th class="th">파일</th><td class="td">
						<FileListUploader :model="'logo.svg'" :path="'http://pumpkinev.iptime.org:5526/static/25bd3aa3/images/svgs/'" />
					</td></tr>
					<tr><th class="th">시작/종료일</th><td class="td">
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
						~
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
					<tr><td colspan="2" class="td">
						<!--<input type="text" v-model="data.cnts" />-->
						<div id="noticeEditor"></div>
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
import FileUploader from '../../components/FileUploader.vue';
import FileListUploader from '../../components/FileListUploader.vue';
import Editor from '@toast-ui/editor';

const emit = defineEmits(['set-close'])

const props = defineProps({
	data: { type: Object, required: true },
});

if(!props.data.endDt) {
	props.data.endDt = new Date();
}

const edit = reactive({
	editor: {} as Editor,
	editorOption: {}
});

const save = function(){
	console.log(edit.editor.getMarkdown())
}
const close = function(){
    emit('set-close');
}
onMounted(() => {
	// ![image](http://pumpkinev.iptime.org:5526/static/25bd3aa3/images/svgs/logo.svg)
	edit.editor = new Editor({
		el: document.querySelector('#noticeEditor') as HTMLElement,
		previewStyle: 'vertical',
		// previewStyle: 'tab',
		initialEditType: 'markdown', // 'wysiwyg',
		height: '390px',
		initialValue: props.data.cnts,
	});

	edit.editor.removeHook("addImageBlobHook");
	edit.editor.addHook("addImageBlobHook", (blob, callback) => {
		console.log(blob);
	});
});

</script>

<style scoped>
</style>
