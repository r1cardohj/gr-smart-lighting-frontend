<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="50" />
      <el-table-column fixed prop="name" label="设备名" width="120" />
      <el-table-column prop="deviceCode" label="设备编码" width="120" />
      <el-table-column prop="isOnline" label="在线" width="120" />
      <el-table-column prop="specifications" label="规格型号" width="300" />
      <el-table-column prop="position" label="位置" width="120" />
      <el-table-column prop="lightingType" label="照明类型" width="120" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            编辑
          </el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>
  
<script setup>
import client from '@/utils/api';
import {onMounted, ref } from 'vue';

let tableData = ref([])

const handleClick = () => {
console.log('click')
}

function getDevices() {
    client.get('/device/').then((response) => {
       let devices = response.data.data 
       for (let i = 0; i < devices.length; i++) {
        tableData.value.push(devices[i])
       }
    })
}

onMounted(() => {
    getDevices()
})
  
</script>
<style>
</style>