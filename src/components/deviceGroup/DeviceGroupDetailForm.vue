<script setup>
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const curDeviceGroupId = useRoute().params.id
const dtFormVisible = ref(false)

const deviceGroup = ref({
    name: "",
    description: ""
})

const deviceGroupMenbers = ref([])

const deviceNotInGroup = ref([])

function getDeviceGroup() {
    client.get(`/device/group/${curDeviceGroupId}`)
    .then((resp) => {
        if (resp.data.code == "200") {
            deviceGroup.value = resp.data.data
        } else {
            errorMes("加载失败")
        }
    })
}

function getDeviceGroupMenbers() {
    client.post(`/device/group/findByGroup`, {
        "id" : curDeviceGroupId
    })
    .then((resp) => {
        if (resp.data.code == "200") {
            deviceGroupMenbers.value = resp.data.data
        } else {
            errorMes("加载失败")
        }
    })
}

function leaveGroup(deviceId) {
    client.post("/device/group/leave", {
        groupId: curDeviceGroupId,
        deviceIdSet: [deviceId]
    })
    .then((resp) => {
        if (resp.data.code == "200") {
            successMes("移出成功")
            getDeviceGroupMenbers()
        } else {
            errorMes("移出失败")
        }
    })
}

function addMenberClickHandler() {
    dtFormVisible.value = true
    getAllDeviceNotInCurGroup()
}

function getAllDeviceNotInCurGroup() {
    client.get('/device/?page=1&perPage=10000')
    .then((resp) => {
        let devices = resp.data.data
    })
}

onMounted(() => {
    getDeviceGroup()
    getDeviceGroupMenbers()
})
</script>

<template>
    <el-descriptions title="设备组详情" :column="1" border>
        <el-descriptions-item label="id">{{ curDeviceGroupId }}</el-descriptions-item>
        <el-descriptions-item label="设备组名">{{ deviceGroup.name }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{ deviceGroup.description}}</el-descriptions-item>
    </el-descriptions>
    <p class="group-detail-title">组员详情
        <el-button style="float: right;"  type="primary" @click="addMenberClickHandler">Add</el-button>
    </p>
    <el-dialog v-model="dtFormVisible" title="Group Join" width="700">
        <el-transfer v-model="deviceGroupMenbers" :data="deviceNotInGroup" />
    </el-dialog>
    <el-scrollbar max-height="400px">
    <p v-for="item in deviceGroupMenbers" :key="item" class="scrollbar-demo-item">
        <span class="del"><a @click="leaveGroup(item.id)">X</a></span>
      <span class="bold">设备名:</span> {{ item.name }} <span class="bold">设备编号:</span> {{ item.deviceCode }} 
    </p>
  </el-scrollbar>
    <div class="btn-group">

    </div>
</template>

<style scoped>
.bold {
    font-weight: bold;
    margin-left: 20px;
    margin-right: 1rem;
}
.del a{
    color: gray;
    font-size: medium;
}
.del {
    margin-left: 1em;
}
.add {
    font-size: xx-large;
    margin: auto auto;
    height: 100%;
    width: 20px;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background-color: #F5F7FA;
}
.group-detail-title {
    margin-top: 32px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>