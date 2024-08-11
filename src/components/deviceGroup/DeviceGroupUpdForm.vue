<script setup>
import router from '@/router/router';
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const curDeviceGroupId = useRoute().params.id

const deviceGroupForm = ref({
    name: "",
    description: ""
})

const deviceGroupFormRef = ref()

function getDeviceGroup() {
    client.get(`/device/group/${curDeviceGroupId}`)
    .then((resp) => {
        if (resp.data.code == "200") {
            deviceGroupForm.value = resp.data.data
        } else {
            errorMes("加载失败")
        }
    })
}

function onCancel() {
    router.push("/group")
}

function onSubmit() {
    client.post("/device/group/update", deviceGroupForm.value)
    .then((resp) => {
        if (resp.data.code == "200") {
            router.push("/group")
            successMes("编辑成功")
        } else {
            errorMes("编辑失败")
        }
    })
}
onMounted(() =>  {
    getDeviceGroup()
})

</script>

<template>
    <el-form
    ref="deviceGroupFormRef"
    style="max-width: 800px;"
    :model="deviceGroupForm"
    label-width="auto"
    status-icon
    id="form"
    >
    <el-form-item label="设备组名" prop="name">
        <el-input v-model="deviceGroupForm.name"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
        <el-input v-model="deviceGroupForm.description"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">Edit</el-button>
        <el-button type="danger" @click="onCancel">Cancel</el-button>
    </el-form-item>
    </el-form>
</template>

<style>
#form{
    margin-left: 150px;
}
</style>