<!-- eslint-disable vue/no-mutating-props -->
<template>
    <label class="img">
        <span class="icon" v-if="!(data && data.file && data.file.tmpUrl) && !(data.file.upAddFileNm)">&#xe80e;</span>
        <img :src="data.file.tmpUrl" v-if="data && data.file && data.file.tmpUrl">
        <img :src="data.path + data.file.upAddFileNm" v-if="!(data && data.file && data.file.tmpUrl) && data.file.upAddFileNm">
        <input @change="clickedInput($event)" style="display:none;" v-bind:id="data.name" type="file" class="sr-only" />
    </label>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';

const data = reactive({
    fleIdList: new Array(),
    name: '',
    addFleList: new Array(),
    size: 1000000,
    length: 100,
    file: {
        upAddFileNm: '',
        tmpUrl: '',
    },
    path: '',
});

const clickOnInput = function () {
    //const uploadInput = document.getElementById(data.data.chkCd);
    //uploadInput.click();
}
const clickedInput = function (e: any) {
    createFile(e);
    /*if(data.$parent.codeChange){
        data.$parent.codeChange();
    }*/
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
    var file = (e.target.files || e.dataTransfer.files)[0];
    let isValid = true;
    if (file.size > data.size) {
        isValid = false;
        alert('파일 사이즈 ' + data.size + 'Byte 이하로 올려주시기 바랍니다.')
    } else {
        file = createUrl(file);
    }
    if (isValid) {
        // data.data.file = file;
    }
}
</script>
<style scoped>
.img {text-align:center; width:100%; height:100%;}
.img .icon {font-size:100px; width:100%; color:#eee; cursor:pointer; display:inline-block; text-align:center; line-height:100px;}
.img img {height:100px; display:inline-block;}
</style>
