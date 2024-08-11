<script setup>
import { computed, onMounted, ref } from 'vue';
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
import router from '@/router/router';
import { SCOPE } from 'element-plus';
const handleClick = () => {
console.log('click')
}

const tableData = ref([])
const selectedData = ref([])

const tableCount = computed(() => {
  return tableData.value.length
})

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
   <el-row style="margin: 0 auto;">
    <el-col :span="6">
      <el-statistic title="DeviceGroup" :value=tableCount />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            good
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Online Devices" />
    </el-col>
  </el-row>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelect">
      <el-table-column fixed type="selection" width="55" />
      <el-table-column fixed prop="id" label="ID" width="50" />
      <el-table-column prop="name" label="组名" width="120" />
      <el-table-column prop="description" label="描述" width="120" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template v-slot="scope">
          <el-button link type="primary" size="small" @click="router.push(`/device/group/detail/${scope.row.id}`)">
           详情 
          </el-button>
          <el-button link type="primary" size="small" @click="router.push(`/device/group/edit/${scope.row.id}`)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-group">
      <el-button @click="router.push('/device/group/create')">新增</el-button>
      <el-button @click="delSelectedDeviceGroup">删除</el-button>
    </div>
</template>

<style>
.btn-group {
  margin-top: 30px;
}
</style>