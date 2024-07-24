<script setup>
import client from '@/utils/api';
import { ElMessage, ElNotification } from 'element-plus';
import {onMounted, ref, resolveComponent } from 'vue';

const tableData = ref([])
const selectedData = ref([])

const handleClick = () => {
    console.log('click')
}


const handleSelect = (devices) => {
    selectedData.value = devices
}


function getDevices() {
    client.get('/device/').then((response) => {
       let devices = response.data.data 
       for (let i = 0; i < devices.length; i++) {
        tableData.value.push(devices[i])
       }
    })
}


function connectOrClose(device) {
    client.post("/device/update", {
        "id": device.id,
        "isOnline": device.isOnline 
    }).then( () => {ElNotification({
        title: 'Success',
        message: "Switch success.",
        type: "success"
    })}).catch(
        (err) => {
            ElNotification({
                title: 'Error',
                message: err,
                type: "error"
            })
        }
    )
}

function delDevices() {
    for(let i = 0; i < selectedData.value.length; i++) {
        let selectedDeviceId = selectedData.value[i].id
        client.post('/device/delete', {
            id : selectedDeviceId
        }).then(() => {
            tableData.value = tableData.value.filter((item) => item != selectedData.value[i])
            ElNotification({
            title: "Success",
            message: `device ${selectedDeviceId} is delete.`,
            type: "success"
        })}).catch((err) => ElNotification({
            title: "Error",
            message: err,
            type: "error"
        }))
    }
}


onMounted(() => {
    getDevices()
})
  
</script>
<template>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelect">
      <el-table-column fixed type="selection" width="55" />
      <el-table-column fixed prop="id" label="ID" width="50" />
      <el-table-column fixed prop="name" label="设备名" width="120" />
      <el-table-column prop="deviceCode" label="设备编码" width="120" />
      <el-table-column prop="isOnline" label="在线" width="120" >
        <template v-slot="scope">
            <el-switch v-model="scope.row.isOnline"  @change="connectOrClose(scope.row)"></el-switch>
        </template>
    </el-table-column>
      <el-table-column prop="specifications" label="规格型号" width="300" />
      <el-table-column prop="position" label="位置" width="120" />
      <el-table-column prop="lightingType" label="照明类型" width="120" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            详情
          </el-button>
          <el-button link type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="">
    <el-button @click="setCurrent(tableData[1])">新增</el-button>
    <el-button @click="delDevices">删除</el-button>
  </div>
</template>
  
<style>
</style>