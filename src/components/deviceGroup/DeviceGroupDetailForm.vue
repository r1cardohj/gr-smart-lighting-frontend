<script setup>
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const curDeviceGroupId = useRoute().params.id
const dtFormVisible = ref(false)

const deviceGroup = ref({
    name: "",
    description: ""
})

const deviceGroupMenbers = ref([])


// 存在于设备组中的设备 - 用于设备组添加窗口
const deviceGroupMenbersJoinFormData = ref([])

//不在该设备组中的设备
const deviceNotInGroupJoinFormData = ref([])

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

function leaveGroup(deviceIds) {
    client.post("/device/group/leave", {
        groupId: curDeviceGroupId,
        deviceIdSet: deviceIds
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

function joinGroup(deviceIds) {
    client.post("/device/group/join", {
        groupId: curDeviceGroupId,
        deviceIdSet: deviceIds
    })
    .then((resp) => {
        if (resp.data.code == "200") {
            successMes("加入成功")
            getDeviceGroupMenbers()
        } else {
            errorMes("加入失败")
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

        deviceGroupMenbersJoinFormData.value = []
        deviceNotInGroupJoinFormData.value = devices.map((d) => {
            return {
                key: d.id,
                label: d.name
            }
        })
        deviceNotInGroupJoinFormData.value.forEach((elem) => {
            if (deviceGroupMenbers.value.find((device)=> device.id == elem.key)){
                console.log(elem)
                deviceGroupMenbersJoinFormData.value.push(elem.key)
            }
        })
        
    })
}

function changeGroupHandler(value, direction, moveKeys) {
    if (direction === "left") {
        leaveGroup(moveKeys)
    } else {
        joinGroup(moveKeys)
    }
}


function handleBatchOnClick() {
    for (let device of deviceGroupMenbers.value) {
        client.post("/device/runtime/control/on", {deviceId: device.id})
        .then((resp) => {
            if (resp.data.code == "200") {
                successMes(`device ${device.id} open successfully.`)
            } else {
                errorMes(`device ${device.id}: control is invaild.`)
            }
        })
    }
}

function handleBatchOffClick() {
    for (let device of deviceGroupMenbers.value) {
        client.post("/device/runtime/control/off", {deviceId: device.id})
        .then((resp) => {
            if (resp.data.code == "200") {
                successMes(`device ${device.id} off successfully.`)
            } else {
                errorMes(`device ${device.id}: control is invaild.`)
            }
        })
    }
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
    <p class="group-detail-title">设备组控制</p>
    <div class="btn-group">
        <el-button type="success" @click="handleBatchOnClick">批量开</el-button>
        <el-button type="danger" @click="handleBatchOffClick">批量关</el-button>
    </div>
    <p class="group-detail-title">组员详情
        <el-button style="float: right;"  type="primary" @click="addMenberClickHandler">Add</el-button>
    </p>
    <el-dialog v-model="dtFormVisible" title="Group Join" width="700">
        <el-transfer 
        v-model="deviceGroupMenbersJoinFormData"
        :data="deviceNotInGroupJoinFormData"
        :titles="['待加入设备', '已加入设备']"
        @change="changeGroupHandler"
         />
    </el-dialog>
    <el-scrollbar max-height="400px">
    <p v-for="item in deviceGroupMenbers" :key="item" class="scrollbar-demo-item">
      <span class="bold">设备名:</span> {{ item.name }} <span class="bold">设备编号:</span> {{ item.deviceCode }} 
    </p>
  </el-scrollbar>
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