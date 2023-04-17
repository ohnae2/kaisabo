<template>
    <div class="fileUploaderWrap">
        <div class="fileItemWrap">
            <!-- 기존 파일 -->
            <div class="fileItem" v-for="(file, index) in data.fleIdList" :key="index" v-show="file.delYn !== 'Y'">
                <template v-if="file.fleExt == 'jpg' || file.fleExt == 'png' || file.fleExt == 'gif' || file.fleExt == 'jpeg'">
                    <span class="icon remove" @click="remove(index)">&#xe042;</span>
                    <span class="icon download" @click="download(file)">&#xf0ed;</span>
                    <img :src="'/file/image?fileNm=' + file.path + file.fleNm">
                    <!--<img :src="'/file/image?fileNm=/image/AS0010/FLE_GRP_ID/20221130122145661c22.jpg'" />-->
                </template>
                <template v-else>
                    <span class="icon remove" @click="remove(index)">&#xe042;</span>
                    <span class="icon download" @click="download(file)">&#xf0ed;</span>
                    <img :src="'img/common/file.png'">
                </template>
            </div>
            <!-- 신규 파일 -->
            <div class="fileItem" v-for="(file, index) in data.addFleList" :key="index">
                <template v-if="file.fleExt == 'image'">
                    <span class="icon remove" @click="cancel(index)">&#xe042;</span>
                    <img :src="file.tmpUrl">
                </template>
                <template v-else>
                    <span class="icon remove" @click="cancel(index)">&#xe042;</span>
                    <img :src="'img/common/file.png'">
                </template>
            </div>
        </div>
        <div class="dragWrap" @drop.prevent="drop($event)" @click.self="clickOnInput()" @dragover.prevent="dragover($event)">
            <div @click.self="clickOnInput()">
                <p @click.self="clickOnInput()"><span class="icon">&#xe01b;</span>이곳에 파일을 넣어주세요. 클릭해도 됩니다.</p>
                <label for="file-upload" style="display:none;">
                    <input multiple @change="clickedInput($event)" v-bind:id="data.name + 'FileUpload'" type="file" class="sr-only" />
                </label>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';

const data = reactive({
    fleIdList: new Array(),
    name: '',
    addFleList: new Array(),
    size: 1000000,
    length: 100,
});

data.name = data.name;
data.fleIdList = data.fleIdList;
data.addFleList = new Array();
data.fleIdList.forEach(o => {
    o.delYn = 'N';
});

const remove = function (index: number) {
    // URL.revokeObjectURL(file);
    data.fleIdList[index].delYn = 'Y';
    // data.fleIdList[index].source.cancel();
}
const download = function (file: File) {
    console.log(file);
    /*const param = '?path='+file.path+'&fileNm='+file.fleNm+'&originNm='+file.originNm;
    CommonService.fileDown(param).then(
        (resp) => {
            const href = URL.createObjectURL(resp);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', file.originNm);
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
    data.addFleList.splice(index, 1);
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
    const uploadInput = document.getElementById(data.name + 'FileUpload') as HTMLElement;
    uploadInput.click();
}
const clickedInput = function (e: any) {
    createFile(e);
}
const createUrl = function (o: any) {
    if (o.type.match(/image.*/)) {
        o.fleExt = 'image';
        o.tmpUrl = URL.createObjectURL(o);
    } else {
        o.fleExt = 'file';
        o.tmpUrl = URL.createObjectURL(o);
    }
    return o;
}
const createFile = function (e: any) {
    var files = [...e.target.files || e.dataTransfer.files]; // Array of all fleIdList
    let isValid = true;
    files.forEach(o => {
        if (o.size > data.size) {
            isValid = false;
            alert('파일 사이즈 ' + data.size + 'Byte 이하로 올려주시기 바랍니다.')
        } else {
            o = createUrl(o);
        }
    });
    if ((data.fleIdList && data.addFleList) && (data.fleIdList.length + data.addFleList.length) >= data.length) {
        isValid = false;
        alert('첨부파일은 ' + data.length + '개 이하로 올려주시기 바랍니다.')
    }
    if (isValid) {
        data.addFleList.push(...files);
        // data.$emit('set-add-file', files);
    }
}
</script>
<style scoped>
.fileUploaderWrap {width:100%;}
.dragWrap {width:100%; text-align:center; padding:20px; border:3px dotted #aaa; margin:10px 0; background:#f1f1f1; cursor:pointer;}
.dragWrap p {font-size:11px;}
.dragWrap p .icon {font-size:30px; vertical-align:middle; margin-right:20px; color:#aaa;}
.fileItemWrap {width: 100%;}
.fileItem {width: 80px; height: 80px; display: inline-block; margin: 5px; position:relative;}
.fileItem .icon {font-size:18px; text-shadow:1px 1px 2px rgba(255,255,255,0.7); color:#666;}
.fileItem .icon.remove {position:absolute; right:1px; top:1px; cursor:pointer;}
.fileItem .icon.download {position:absolute; left:1px; bottom:1px; cursor:pointer;}
.fileItem .icon:hover {color:#000;}
.fileItem video,
.fileItem img {width:80px; height:80px; border:1px solid #ddd; outline:0;}
</style>
