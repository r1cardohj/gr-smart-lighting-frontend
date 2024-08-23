<script setup>
import client from '@/utils/api';
import { errorMes } from '@/utils/util';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const curDeviceId = useRoute().params.id
const curDevice = ref({})
const curDeviceRumtime = ref({})

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
        if (resp.data.code == "200")
            curDeviceRumtime.value = resp.data.data
        else
            errorMes(`device: ${curDeviceId} get runtime failed.`)
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
    {{ curDevice.chargeBy}}
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
    <el-switch v-model="curDeviceRumtime.status" inline-prompt size="large" active-text="开灯" inactive-text="关灯" />
<p class="group-detail-title">亮度亮度调整</p>
<div class="slider-demo-block">
<span class="demonstration">当前亮度 {{ curDeviceRumtime.brightness }}%</span>
<el-slider v-model="curDeviceRumtime.brightness" />
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