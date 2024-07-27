import { createMemoryHistory, createRouter } from "vue-router";

import DeviceTable from "@/components/DeviceTable.vue";
import DeviceGroupTable from "@/components/DeviceGroupTable.vue";
import DeviceAddForm from "@/components/DeviceAddForm.vue"
import DeviceUpdForm from "@/components/DeviceUpdForm.vue"

const routes = [
    { path: '/', component: DeviceTable },
    { path: '/group', component: DeviceGroupTable },
    { path: '/device', component: DeviceTable },
    { path: '/device/create', component: DeviceAddForm},
    { path: '/device/edit/:id', component: DeviceUpdForm, props: true}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;