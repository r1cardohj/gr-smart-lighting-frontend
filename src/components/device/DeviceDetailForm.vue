<script setup>
import client from '@/utils/api';
import { errorMes, successMes } from '@/utils/util';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const curDeviceId = useRoute().params.id
const curDevice = ref({})
const curDeviceRumtime = ref({})
const curDeviceStatus = ref(false)

function getDeviceInfo() {
    client.get(`/device/${curDeviceId}`)
    .then((resp) => {
        if (resp.data.code == "200")
            curDevice.value = resp.data.data
        else
            errorMes(`device: ${curDeviceId} get failed.`)
    })
}

function getDeviceRuntime() {
    client.get(`/device/runtime/${curDeviceId}`)
    .then((resp) => {
        if (resp.data.code == "200") {
            curDeviceRumtime.value = resp.data.data
            curDeviceStatus.value = resp.data.data.status === 1 ? true : false
            console.log(curDeviceStatus.value)
        }
        else
            errorMes(`device: ${curDeviceId} get runtime failed.`)
    })
}

function handlerSwitchChange(status) {
    const base_path = "/device/runtime/control/"
    const path = base_path + (status? "on" : "off")
    client.post(path, {deviceId: curDeviceId})
    .then((resp) => {
        if (resp.data.code == "200") {
            successMes("操作成功")
            getDeviceRuntime()
        } else {
            errorMes(`操作失败: ${resp.data.msg}`)
            curDeviceRumtime.value = !curDeviceRumtime.value
        }
    })
}

function handleSliderChange(number) {
    client.post("/device/runtime/control/brightness", {deviceId: curDeviceId, brightness: number})
    .then((resp) => {
        if (resp.data.code == "200") {
            successMes("操作成功")
        } else {
            errorMes(`操作失败: ${resp.data.msg}`)
        }
        getDeviceRuntime()
    })
}

function handleIsOnlineSwitchChange(status) {
    client.post("/device/update", {id: curDeviceId, isOnline: status })
    .then((resp) => {
        if (resp.data.code == "200") {
            successMes("操作成功")
        } else {
            errorMes(`操作失败: ${resp.data.msg}`)
        }
        getDeviceInfo()
    })
}

onMounted(() => {
    getDeviceInfo()
    getDeviceRuntime()
})

</script>

<template>
<el-descriptions title="概览" :column="2" border>
    <template #extra>
        <el-switch
        v-model="curDevice.isOnline"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        inline-prompt
        active-text="在线"
        inactive-text="离线"
        @change="handleIsOnlineSwitchChange"
        />
    </template>
    <el-descriptions-item
    label="ID"
    label-align="left"
    align="center"
    >
    {{ curDevice.id }}
    </el-descriptions-item>
    <el-descriptions-item
    label="设备名"
    label-align="left"
    align="center"
    >
    {{ curDevice.name }}
    </el-descriptions-item>
    <el-descriptions-item
    label="设备编码"
    label-align="left"
    align="center"
    >
    {{ curDevice.deviceCode }}
    </el-descriptions-item>
    <el-descriptions-item
    label="规格型号"
    label-align="left"
    align="center"
    >
    {{ curDevice.specifications }}
    </el-descriptions-item>
    <el-descriptions-item
    label="位置"
    label-align="left"
    align="center"
    >
    {{ curDevice.position }}
    </el-descriptions-item>
    <el-descriptions-item
    label="位置"
    label-align="left"
    align="center"
    >
    {{ curDevice.position }}
    </el-descriptions-item>
    <el-descriptions-item
    label="照明类型"
    label-align="left"
    align="center"
    >
    {{ curDevice.lightlingType }}
    </el-descriptions-item>
    <el-descriptions-item
    label="序列号"
    label-align="left"
    align="center"
    >
    {{ curDevice.serialNumber }}
    </el-descriptions-item>
    <el-descriptions-item
    label="负责人"
    label-align="left"
    align="center"
    >
    {{ curDevice.chargeBy }}
    </el-descriptions-item>
    <el-descriptions-item
    label="出厂日期"
    label-align="left"
    align="center"
    >
    {{ curDevice.exFactoryDate }}
    </el-descriptions-item>
    <el-descriptions-item
    label="报废日期"
    label-align="left"
    align="center"
    >
    {{ curDevice.expireDate }}
    </el-descriptions-item>
</el-descriptions>
<p class="group-detail-title">开关灯
</p>
    <el-switch
     v-model="curDeviceStatus" 
    inline-prompt 
    size="large"
    active-text="开灯"
    inactive-text="关灯"
    @change="handlerSwitchChange" />
<p class="group-detail-title">亮度调整</p>
<div class="slider-demo-block">
<span class="demonstration">当前亮度 {{ curDeviceRumtime.brightness }}%</span>
<el-slider v-model="curDeviceRumtime.brightness" @change="handleSliderChange"/>
</div>
</template>

<style>
.group-detail-title {
    margin-top: 32px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>