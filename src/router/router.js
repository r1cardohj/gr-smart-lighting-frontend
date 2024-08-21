import { createMemoryHistory, createRouter } from "vue-router";

import DeviceTable from "@/components/device/DeviceTable.vue";
import DeviceGroupTable from "@/components/deviceGroup/DeviceGroupTable.vue";
import DeviceAddForm from "@/components/device/DeviceAddForm.vue"
import DeviceUpdForm from "@/components/device/DeviceUpdForm.vue"
import DeviceGroupAddForm from "@/components/deviceGroup/DeviceGroupAddForm.vue";
import DeviceGroupUpdForm from "@/components/deviceGroup/DeviceGroupUpdForm.vue";
import DeviceGroupDetailForm from "@/components/deviceGroup/DeviceGroupDetailForm.vue";
import Light from "@/components/Light.vue";
import DeviceControl from "@/components/control/DeviceControl.vue";

const routes = [
    { path: '/', component: DeviceTable },
    { path: '/group', component: DeviceGroupTable },
    { path: '/device', component: DeviceTable },
    { path: '/device/create', component: DeviceAddForm},
    { path: '/device/edit/:id', component: DeviceUpdForm, props: true},
    { path: '/device/group/create', component: DeviceGroupAddForm},
    { path: '/device/group/edit/:id', component: DeviceGroupUpdForm, props: true},
    { path: '/device/group/detail/:id', component: DeviceGroupDetailForm, props: true},
    { path: '/control', component: DeviceControl, props: true}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;