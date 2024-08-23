<script setup>
import { computed, onMounted, ref } from 'vue';
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
import router from '@/router/router';

const tableData = ref([])
const selectedData = ref([])
const pagination = ref({
    page: 1,
    pageSize: 5,
    totalCount: 0
})

const tableCount = computed(() => {
  return pagination.value.totalCount
})

const getDeviceGroups = () => {
  client.get(`/device/group/?page=${pagination.value.page}&perPage=${pagination.value.pageSize}`)
  .then( (resp) => {
    tableData.value = resp.data.data
    pagination.value = resp.data.pagination
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
const handlePageChange = ((num) => {
  pagination.value.page = num
  getDeviceGroups()
})

</script>
<template>
  <h2 class="title-1">概览</h2>
   <el-row class="panel">
    <el-col :span="12">
      <el-statistic title="All DeviceGroups" :value=tableCount />
    </el-col>
    <el-col :span="12">
      <el-statistic title="Online Devices" />
    </el-col>
  </el-row>
  <h2 class="title-2">明细</h2>
    <el-table :data="tableData" style="width: 100%;margin-top: 20px" @selection-change="handleSelect">
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
    
    <el-pagination class="pagination" size="small" layout="prev, pager, next" 
    :total="pagination.totalCount"
    :page-size="pagination.pageSize"
    :current-page="pagination.page"
    @current-change="handlePageChange"
    />
    <div class="btn-group">
      <el-button @click="router.push('/device/group/create')">新增</el-button>
      <el-button @click="delSelectedDeviceGroup">删除</el-button>
    </div>
</template>

<style>
.btn-group {
  margin-top: 30px;
}
.title-1 ,.title-2{
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>