<script setup>
import { onMounted, ref } from 'vue';
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
const handleClick = () => {
console.log('click')
}

const tableData = ref([])
const selectedData = ref([])

const getDeviceGroups = () => {
  client.get("/device/group/")
  .then( (resp) => {
    tableData.value = resp.data.data
  }) 
}

const delDeviceGroups = (deviceGroupId) => {
  client.post("/device/group/delete", { id : deviceGroupId })
    .then((resp) => {
      if (resp.data.code == "200") {
        successMes(`设备组 ${deviceGroupId} 删除成功`)
        getDeviceGroups()
      } else {
        ElNotification({
          title: "Error",
          message: `设备组 ${deviceGroupId} 删除失败`,
          type: "error"
        })
      }
    }).catch(() => {
      errorMes(`设备组 ${deviceGroupId} 删除失败`)
  })
}

const delSelectedDeviceGroup = () => {
  for (let i = 0; i < selectedData.value.length; i++) {
    let deviceGroupId = selectedData.value[i].id
    delDeviceGroups(deviceGroupId)
  }
}



onMounted(() => {
  getDeviceGroups()
}) 

const handleSelect = (deviceGroups) => {
  selectedData.value = deviceGroups;
}


</script>
<template>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelect">
      <el-table-column fixed type="selection" width="55" />
      <el-table-column fixed prop="id" label="ID" width="50" />
      <el-table-column prop="name" label="组名" width="120" />
      <el-table-column prop="description" label="描述" width="120" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
           详情 
          </el-button>
          <el-button link type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-group">
      <el-button @click="">新增</el-button>
      <el-button @click="delSelectedDeviceGroup">删除</el-button>
    </div>
</template>

<style>
.btn-group {
  margin-top: 30px;
}
</style>