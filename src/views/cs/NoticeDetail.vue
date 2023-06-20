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
						<!-- 보이는 이미지와 저장이미지 (저장이미지만 리턴받음) -->
						<FileListUploader
							:name="'notice'"
							:fileList="props.data.fileList"
							:addFileList="data.addFileList"
							@set-file-list="(o:any) => {
								props.data.fileList = o;
							}"
							@set-add-file-list="(o:any) => {
								data.addFileList = o;
							}"
						/>
					</td></tr>
					<tr><td colspan="2" class="td">
						<!--<input type="text" v-model="props.data.cnts" />-->
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
import { onMounted, ref, reactive, PropType, ComponentObjectPropsOptions } from 'vue';
import NoticeService from '../../service/cs/NoticeService';
import FtpService from '../../service/common/FtpService';
import SelectDate from '../../components/SelectDate.vue';
import CommonCode from '../../components/CommonCode.vue';
import FileListUploader from '../../components/FileListUploader.vue';
import Editor from '@toast-ui/editor';
import dateUtil from '../../utils/util.date';

const emit = defineEmits(['set-close']);

const props = defineProps({
	// data: { type: Object as PropType<NoticeDetail>, required: true },
	data: { type: Object as any, required: true },
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
const data = reactive({
	addFileList: [] as any,
});

const edit = reactive({
	editor: {} as Editor,
	editorOption: {}
});

const getDetail = () => {
	if(props.data.notiNo) {
		NoticeService.getNotice({ notiNo: props.data.notiNo}).then(
			(res) => {
				props.data.fileNo = res.data.fileNo;
				props.data.cnts = res.data.cnts;
				props.data.fileList = res.data.fileList;
				drawDetail();
			},
			(err) => {
				console.log(err);
			},
		);
	} else {
		drawDetail();
	}
}

const drawDetail = () => {
	edit.editor = new Editor({
		el: document.querySelector('#noticeEditor') as HTMLElement,
		previewStyle: 'vertical',
		// previewStyle: 'tab',
		toolbarItems: [
			['heading', 'bold', 'italic', 'strike'],
			['hr', 'quote'],
			['ul', 'ol', 'task', 'indent', 'outdent'],
			['table', 'link'], // 'image'
			['code', 'codeblock']
		],
		initialEditType: 'markdown', // 'wysiwyg',
		height: '390px',
		initialValue: props.data.cnts || ' ', // null 시 에러발생 
	});
	edit.editor.removeHook("addImageBlobHook"); // blob:http 임시 url 을 전달을 못한다...;;
}

const save = () => {
	let fileData = new FormData();
	fileData.append('fileNo', props.data.fileNo + '');
	fileData.append('path', 'notice');
	// 추가파일 
	let countAdd = 0;
	for(let file of data.addFileList) {
		fileData.append('addFileList', file);
		countAdd++;
	}
	// 삭제파일 
	let countDel = 0;
	for(let file of props.data.fileList) {
		if(file.delYn == 'Y') {
			fileData.append('deleteFileDtlNo', file.fileDtlNo);
			countDel++;
		}
	}
	/**
	 * 파일업로드
	 */
	if (countAdd > 0 || countDel > 0) {
		FtpService.uploadList(fileData).then(
			(res) => {
				if (res.success) {
					props.data.fileNo = res.data.fileNo;
					saveInfo();
				} else {
					return false;
				}
			},
			(err) => {
				console.log(err);
				return false;
			},
		);
	} else {
		saveInfo();
	}
}
const saveInfo = () => {
	/**
	 * 정보저장
	 */
	let formData = new FormData();
	formData.append('notiNo', props.data.notiNo + '');
	formData.append('cmpId', props.data.cmpId);
	formData.append('tit', props.data.tit);
	formData.append('fileNo', props.data.fileNo + '');
	formData.append('useYn', props.data.useYn);
	formData.append('strtDt', props.data.strtDt);
	formData.append('endDt', props.data.endDt);
	formData.append('cnts', edit.editor.getMarkdown());
	if(!props.data.notiNo) {
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
const close = () => {
    emit('set-close');
}
onMounted(() => {
	getDetail();
});
</script>
<style scoped>
</style>
