<script setup>
import router from '@/router/router';
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
import { reactive, ref } from 'vue';


const deviceGroupForm = reactive({
    name: "",
    description: ""
})

const deviceGroupFormRef = ref()

function onCancel() {
    router.push("/group")
}

function onSubmit() {
    client.post("/device/group/create", deviceGroupForm)
    .then((resp) => {
        if (resp.data.code == "200") {
            router.push("/group")
            successMes("创建成功")
        } else {
            errorMes("创建失败")
        }
    })
}
</script>

<template>
    <el-form
    ref="deviceGroupFormRef"
    style="max-width: 800px;"
    :model="deviceGroupForm"
    label-width="auto"
    status-icon
    id="addForm"
    >
    <el-form-item label="设备组名" prop="name">
        <el-input v-model="deviceGroupForm.name"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
        <el-input v-model="deviceGroupForm.description"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button type="danger" @click="onCancel">Cancel</el-button>
    </el-form-item>
    </el-form>
</template>

<style>
#addForm {
    margin-left: 0;
}
</style>