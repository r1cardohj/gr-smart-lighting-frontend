<script setup>
import router from '@/router/router';
import client from '@/utils/api';
import { onMounted, reactive, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useRoute } from 'vue-router';

const curDeviceId = useRoute().params.id

  const deviceForm = ref({
    name: '',
    deviceCode: '',
    specifications: '',
    position: '',
    lightingType: '',
    serialNumber: '',
    chargeBy: '',
    exFactoryDate: '',
    expiredDate: ''
})

const deviceFormRef = ref()

function onCancel() {
    router.push("/")
}

function getDevice() {
  client.get(`/device/${curDeviceId}`)
  .then( (resp) => {
    if (resp.data.code == "200") {
      deviceForm.value = resp.data.data
    } else {
      ElNotification({
        title: "Error",
        message: "加载失败",
        type: "error"
        })
    }
  }
  )
}

function onSubmit() {
  client.post("/device/update", deviceForm.value)
  .then( (resp) => {
    if (resp.data.code == "200") {
      router.push("/")
      ElNotification({
        title: "Success",
        message: "编辑成功",
        type: "success"
      })
    } else {
      ElNotification({
        title: "Error",
        message: "修改失败",
        type: "error"
        })
    }

  }) 
}

onMounted(() => {
  getDevice()
})

</script>
<template>
    <el-form
    ref="deviceFormRef"
    style="max-width: 800px; margin-left: 150px;"
    :model="deviceForm"
    label-width="auto"
    status-icon
    id="form"
  >
  <el-form-item label="设备名" prop="name">
    <el-input v-model="deviceForm.name"></el-input>
  </el-form-item>
  <el-form-item label="设备编号" prop="deviceCode">
    <el-input v-model="deviceForm.deviceCode"></el-input>
  </el-form-item>
  <el-form-item label="描述" prop="specifications">
    <el-input v-model="deviceForm.specifications"
        style="width: 240px" 
        :rows="3"
        type="textarea"
        placeholder="enter..."
        ></el-input>
  </el-form-item>
  <el-form-item label="位置" prop="position">
    <el-input v-model="deviceForm.position"></el-input>
  </el-form-item>
  <el-form-item label="照明类型" prop="lightingType">
    <el-input v-model="deviceForm.lightingType"></el-input>
  </el-form-item>
  <el-form-item label="序列号" prop="serialNumber">
    <el-input v-model="deviceForm.serialNumber"></el-input>
  </el-form-item>
  <el-form-item label="负责人" prop="chargeBy">
    <el-input v-model="deviceForm.chargeBy"></el-input>
  </el-form-item>
  <el-form-item label="出厂日期" prop="exFactoryDate">
    <el-date-picker v-model="deviceForm.exFactoryDate" placeholder="Pick a time" style="width: 100%;"></el-date-picker>
  </el-form-item>
   <el-form-item label="报废日期" prop="expiredDate">
    <el-date-picker v-model="deviceForm.expiredDate" placeholder="Pick a time" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Edit</el-button>
    <el-button type="danger" @click="onCancel">Cancel</el-button>
  </el-form-item>
  </el-form>
</template>

<style>
#form {
    margin-left:  150px;
}
</style>