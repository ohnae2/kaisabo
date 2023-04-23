<template>
	<div id="noticeDetail" class="popup">
		<div class="popupWrap">
			<h3>공지사항 등록/수정</h3>
			<div class="close" @click="close"><span class="icon">&#xe097;</span></div>
			<form @submit.prevent="save">
				<table class="popT">
					<tr><th class="th">업체ID</th><td class="td"><input type="text" v-model="props.data.cmpId" minlength="5" maxlength="50" /></td></tr>
					<tr><th class="th required">제목</th><td class="td"><input type="text" v-model="props.data.tit" minlength="5" maxlength="100" /></td></tr>
					<!--<tr><th class="th">파일번호</th><td class="td"><input type="text" v-model="props.data.fileNo" /></td></tr>-->
					<tr><th class="th">사용여부</th><td class="td">
						<CommonCode :cd="'YN_CD'" :model="props.data.useYn" @set-data="(val) => { props.data.useYn = val; }" />
					</td></tr>
					<tr><th class="th">시작/종료일</th><td class="td">
						<SelectDate 
							:name="['strtDt']"
							:format="'YYYY-MM-DD HH:mm'"
							:date="[props.data.strtDt]"
							:isAll="false"
							:timer="true"
							@set-start-date="(o) => {
								props.data.strtDt = o.date;
							}"
						/>
						~
						<SelectDate 
							:name="['endDt']"
							:format="'YYYY-MM-DD HH:mm'"
							:date="[props.data.endDt]"
							:isAll="false"
							:timer="true"
							@set-start-date="(o) => {
								props.data.endDt = o.date;
							}"
						/>
					</td></tr>
					<tr><th class="th">파일</th><td class="td">
						<!-- TODO -->
						<FileListUploader
							:name="'notice'"
							:fileNo="file.list"
							:fileList="file.list"
							@set-file="(o) => {
								file.list = o;
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
import { onMounted, ref, reactive, ComponentObjectPropsOptions } from 'vue';
import NoticeService from '../../service/cs/NoticeService';
import FileService from '../../service/bs/FileService';
import SelectDate from '../../components/SelectDate.vue';
import CommonCode from '../../components/CommonCode.vue';
import FileListUploader from '../../components/FileListUploader.vue';
import Editor from '@toast-ui/editor';
import dateUtil from '../../utils/util.date';

const emit = defineEmits(['set-close']);

interface NoticeDetail {
    notiNo: number;
    cmpId: string;
    tit: string;
    fileNo: number;
    useYn: string;
    strtDt: string;
    endDt: string;
    cnts: string;
}
const props = defineProps({
	data: { type: NoticeDetail, required: true },
});

const file = reactive({
	list: [] as any
});

if(!props.data.strtDt) {
	props.data.strtDt = dateUtil.format(new Date(),'YYYY-MM-DD HH:mm');
}
if(!props.data.endDt) {
	props.data.endDt = dateUtil.format(new Date(),'YYYY-MM-DD HH:mm');
}
if(!props.data.useYn) {
	props.data.useYn = 'Y';
}

const edit = reactive({
	editor: {} as Editor,
	editorOption: {}
});

const save = function(){

	let fileData = new FormData();
	/*private String folderName;
    private String originalFileName;
    private String exe;
    private String path;
    private String type;
    private long fileNo;
    private String saveFileName;
    private MultipartFile file;
    private long fileSize;
    private boolean success;*/
	
	// fileData.append();

	console.log(file.list);

	return;

	FileService.uploadList(fileData).then(
		(res) => {
			if(res.success) {
				location.reload();
			} else {
				console.log(res);
			}
		},
		(err) => {
			console.log(err);
		},
	);

	return;
	
	let formData = new FormData();
	formData.append('notiNo', props.data.notiNo);
	formData.append('cmpId', props.data.cmpId);
	formData.append('tit', props.data.tit);
	// formData.append('fileNo', props.data.fileNo);
	formData.append('useYn', props.data.useYn);
	formData.append('strtDt', props.data.strtDt);
	formData.append('endDt', props.data.endDt);
	formData.append('cnts', edit.editor.getMarkdown());

	if(props.data.mode === 'add') {
		NoticeService.insertNotice(formData).then(
			(res) => {
				if(res.success) {
					location.reload();
				} else {
					console.log(res);
				}
			},
			(err) => {
				console.log(err);
			},
		);
	} else {
		NoticeService.updateNotice(formData).then(
			(res) => {
				if(res.success) {
					location.reload();
				} else {
					console.log(res);
				}
			},
			(err) => {
				console.log(err);
			},
		);
	}
}
const close = function(){
    emit('set-close');
}

const getDetail = function(){
	if(props.data.notiNo) {
		NoticeService.getNotice({ notiNo: props.data.notiNo}).then(
			(res) => {
				props.data.cnts = res.data.cnts;
			},
			(err) => {
				console.log(err);
			},
		);
	}
}

onMounted(() => {
	
	// getDetail();
	
	// ![image](http://pumpkinev.iptime.org:5526/static/25bd3aa3/images/svgs/logo.svg)
	edit.editor = new Editor({
		el: document.querySelector('#noticeEditor') as HTMLElement,
		previewStyle: 'vertical',
		// previewStyle: 'tab',
		initialEditType: 'markdown', // 'wysiwyg',
		height: '390px',
		initialValue: props.data.cnts || '', // null 시 에러발생 
	});

	edit.editor.removeHook("addImageBlobHook");
	edit.editor.addHook("addImageBlobHook", (blob, callback) => {
		console.log(blob);
	});
});

</script>

<style scoped>
</style>
