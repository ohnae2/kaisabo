<template>
    <div class="fileUploaderWrap">
        {{ props.fileList }}
        <div class="fileItemWrap">
            <!-- 기존 파일 -->
            <div class="fileItem" v-for="(file, index) in props.fileList" :key="index">
                <template v-if="file.fileNm.match('jpg') || file.fileNm.match('png') || file.fileNm.match('gif') || file.fileNm.match('jpeg') ">
                    <span class="icon remove" @click="remove(file)">&#xe042;</span>
                    <!--<span class="icon download" @click="download(file)">&#xf0ed;</span>-->
                    <img :src="file.path + file.fileNm">
                </template>
                <template v-else>
                    <span class="icon remove" @click="remove(file)">&#xe042;</span>
                    <!--<span class="icon download" @click="download(file)">&#xf0ed;</span>-->
                    <img :src="'img/common/file.png'">
                </template>
            </div>
            <!-- 신규 파일 -->
            <div class="fileItem" v-for="(file, index) in data.addFileList" :key="index">
                <template v-if="file.name.match('jpg') || file.name.match('png') || file.name.match('gif') || file.name.match('jpeg')">
                    <span class="icon remove" @click="cancel(index)">&#xe042;</span>
                    <img :src="file.tempUrl" alt="">
                </template>
                <template v-else>
                    <span class="icon remove" @click="cancel(index)">&#xe042;</span>
                    <img :src="'img/common/file.png'">
                </template>
            </div>
            <br />
            {{ data.addFileList }}
        </div>
        <div class="dragWrap" @drop.prevent="drop($event)" @click.self="clickOnInput()" @dragover.prevent="dragover($event)">
            <div @click.self="clickOnInput()">
                <p @click.self="clickOnInput()"><span class="icon">&#xe01b;</span>이곳에 파일을 넣어주세요. 클릭해도 됩니다.</p>
                <label for="file-upload" style="display:none;">
                    <input multiple @change="clickedInput($event)" v-bind:id="props.name + 'FileUpload'" type="file" class="sr-only" />
                </label>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';

const emit = defineEmits(['set-file-list','set-add-file-list']);

interface FileInfo {
    fileNo: number;
    path: string;
    fileNm: string;
    fileOrgNm: string;
    tempUrl: string;
    delYn: string;
}

const props = defineProps({
	name: { type: String, required: true },
	fileNo: { type: Number, required: false },
    maxSize:  { type: Number, required: false, default: 1000000 },
    maxLength:  { type: Number, required: false, default: 10 },
	fileList: { type: Array<FileInfo>, required: false },
    delYn: { type: String, required: false, default: 'N' },
});

const data = reactive({
    addFileList: [] as any,
});

const remove = function (file:any) {
    file.delYn = 'Y';
    emit('set-file-list', props.fileList);
}
const download = function (o:any) {
    console.log(o);
    /*
    const param = '?path='+o.path+'&fileNm='+o.fleNm+'&originNm='+o.originNm;
    CommonService.fileDown(param).then(
        (resp) => {
            const href = URL.createObjectURL(resp);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', o.originNm);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        },
        (err) => {
            console.log(err);
        },
    );*/
}
const cancel = function (index: number) {
    data.addFileList.splice(index, 1);
    emit('set-add-file-list', data.addFileList);
}
const dragover = function (e: any) {
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
}
const drop = function (e: any) {
    e.stopPropagation();
    createFile(e);
}
const clickOnInput = function () {
    const uploadInput = document.getElementById(props.name + 'FileUpload') as HTMLElement;
    uploadInput.click();
}
const clickedInput = function (e: any) {
    createFile(e);
}
const createUrl = function (o: any) {
    o.tempUrl = URL.createObjectURL(o); // if (o.type.match(/image.*/)) {
    return o;
}
const createFile = function (e: any) {
    let files = [...e.target.files || e.dataTransfer.files]; // Array of all fileList
    let isValid = true;
    files.forEach(file => {
        if (props.maxSize < file.size) {
            isValid = false;
            alert('파일 사이즈 ' + props.maxSize + 'Byte 이하로 올려주시기 바랍니다.')
        } else {
            file = createUrl(file);
        }
    });
    if (props.maxLength <= files.length) {
        isValid = false;
        alert('첨부파일은 ' + props.maxLength + '개 이하로 올려주시기 바랍니다.')
    }
    if (isValid) {
        data.addFileList.push(...files);
        console.log(data.addFileList);
        emit('set-add-file-list', data.addFileList);
    }
}
onMounted(() => {
	console.log(data.addFileList);
});

</script>
<style scoped>
.fileUploaderWrap {width:100%;}
.dragWrap {width:100%; text-align:center; padding:20px; border:3px dotted #aaa; background:#f1f1f1; cursor:pointer;}
.dragWrap p {font-size:11px;}
.dragWrap p .icon {font-size:30px; vertical-align:middle; margin-right:20px; color:#aaa;}
.fileItemWrap {width:100%;}
.fileItem {width: 80px; height: 80px; display: inline-block; margin: 5px; position:relative;}
.fileItem .icon {font-size:18px; text-shadow:1px 1px 2px rgba(255,255,255,0.7); color:#888;}
.fileItem .icon.remove {position:absolute; right:1px; top:1px; cursor:pointer;}
.fileItem .icon.download {position:absolute; left:1px; bottom:1px; cursor:pointer;}
.fileItem .icon:hover {color:#000;}
.fileItem video,
.fileItem img {width:80px; height:80px; border:1px solid #ddd; outline:0;}
</style>
