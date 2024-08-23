<script setup>
import client from '@/utils/api';
import { ElNotification } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
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

const onlineDeviceCount = ref(0)
const statusOnDeviceCount = ref(0)

const handleSelect = (devices) => {
    selectedData.value = devices
}


function getDevices() {
    client.get(`/device/?page=${pagination.value.page}&perPage=${pagination.value.pageSize}`)
    .then((response) => {
       let devices = response.data.data 
       tableData.value = devices
       pagination.value = response.data.pagination
    })
}

function getOnlineDeviceCount() {
    client.get(`/device/countOnline`)
    .then((resp) => {
        onlineDeviceCount.value = resp.data.data.count
    })
}

function getOnDeviceCount() {
    client.get(`/device/runtime/countOn`)
    .then((resp) => {
        statusOnDeviceCount.value = resp.data.data.count
    })
}


function connectOrClose(device) {
    client.post("/device/update", {
        "id": device.id,
        "isOnline": device.isOnline 
    }).then( () => {
        ElNotification({
        title: 'Success',
        message: "Switch success.",
        type: "success"
    })
    getOnlineDeviceCount()
    }
    ).catch(
        (err) => {
            ElNotification({
                title: 'Error',
                message: err,
                type: "error"
            })
            device.isOnline = !device.isOnline
        }
    )
}

function delDevices() {
    for(let i = 0; i < selectedData.value.length; i++) {
        let selectedDeviceId = selectedData.value[i].id
        client.post('/device/delete', {
            id : selectedDeviceId
        }).then(() => {
            ElNotification({
            title: "Success",
            message: `device ${selectedDeviceId} is delete.`,
            type: "success" })
            //重新获取设备列表
            getDevices()
        }).catch((err) => ElNotification({
            title: "Error",
            message: err,
            type: "error"
        }))
    }
    console.log(tableData.value);
}

function toCreatePage() {
    router.push('device/create')
}

function toEditPage(device) {
    router.push({
        path: `device/edit/${device.id}`,
    })
}

function toDetailPage(device) {
    router.push({
        path: `device/detail/${device.id}`
    })
}

function handlePageChange(num) {
    pagination.value.page = num
    getDevices()
}


onMounted(() => {
    getDevices()
    getOnlineDeviceCount()
    getOnDeviceCount()
})
  
</script>
<template>
    <div class="">
        <h2 class="title-1">概览</h2>
     <el-row> 
    <el-col :span="8">
      <el-statistic title="All Devices" :value="tableCount" />
    </el-col>  
    <el-col :span="8">
      <el-statistic title="Online Devices" :value="onlineDeviceCount"/>
    </el-col>
    <el-col :span="8">
      <el-statistic title="Turned On Devices" :value="statusOnDeviceCount"/>
    </el-col>
  </el-row>
    </div>
    <h2 class="title-2">明细</h2>
    <el-table :data="tableData" style="width: 100%;margin-top: 20px;" @selection-change="handleSelect">
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
        
        <template v-slot="scope">
          <el-button link type="primary" size="small" @click="toDetailPage(scope.row)">
            详情
          </el-button>
          <el-button link type="primary" size="small" @click="toEditPage(scope.row)">编辑</el-button>
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
    <el-button @click="toCreatePage">新增</el-button>
    <el-button @click="delDevices">删除</el-button>
    </div>
</template>
  
<style>
.btn-group{
    margin: 0 auto;
    margin-top: 30px;
}
.pagination{
    margin-top: 12px;
}
.title-1 ,.title-2{
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>