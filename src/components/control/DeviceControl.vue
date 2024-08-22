<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Light from '../Light.vue';
import client from '@/utils/api';
import { errorMes } from '@/utils/util';

const runtimes = ref([])

const lights = ref([])

const sseSession = ref([])

let sseReConnTime = 0

async function subscribeRuntime(client) {
    let sse = new EventSource(`http://127.0.0.1:8080/device/runtime/control/sse/register/${client}`)
    sse.retry = 1000;
    sseSession.value.push(sse)
    sse.onmessage= (({data}) => {
        let { status, brightness, deviceId } = JSON.parse(data)
        const runtime = lights.value.find((el) => el.value.deviceId === deviceId)
        if (runtime) { 
            runtime.value.status = status
            runtime.value.brightness = brightness
        }
    })
    sse.onerror((e) => {
        console.log(e)
        sse.close()
        if (sseReConnTime < 6) {
            sse = new EventSource(`http://127.0.0.1:8080/device/runtime/control/sse/register/${client}`)
            sseReConnTime++
        } else {
            console.error("sse is re connect to many time.")
        }
    })
}

async function getDevicesRunTime() {
    client.get("/device/runtime/")
    .then((resp) => {
        if (resp.data.code == "200"){
            let deviceRuntimes = resp.data.data
            runtimes.value = deviceRuntimes
            for(let runtime of runtimes.value) {
                makeLight(runtime)
            }
        }
        else
            errorMes("获取设备运行时失败")
    })
}

function makeLight(runtime) {
    let device = null
    client.get(`/device/${runtime.deviceId}`)
    .then((resp) => {
        if(resp.data.code == "200") {
            device = resp.data.data
            if (device) {
                lights.value.push(ref({
                    deviceId: device.id,
                    name: device.name,
                    status: runtime.status,
                    brightness: runtime.brightness
                }))
                lights.value.sort((a, b) => a.value.deviceId - b.value.deviceId)
            }
        }
        else
            errorMes(`获取设备id: ${deviceId}`)
    })
}


getDevicesRunTime()

onMounted(() => {
    subscribeRuntime("1")
})

onBeforeUnmount(() => {
    sseSession.value.forEach((el) => el.close())
})
</script>

<template>
    <el-row :gutter="20">
        
        <el-col v-for="(light, idx) in lights" :span="4" :key="light.value.deviceId">
            <Light v-model="lights[idx].value"></Light>
        </el-col>
    </el-row>
</template>
<style>
</style>