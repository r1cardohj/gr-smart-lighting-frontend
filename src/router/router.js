import { createMemoryHistory, createRouter } from "vue-router";

import DeviceTable from "@/components/DeviceTable.vue";
import DeviceGroupTable from "@/components/DeviceGroupTable.vue";

const routes = [
    { path: '/', component: DeviceTable },
    { path: '/group', component: DeviceGroupTable },
    { path: '/device', component: DeviceTable }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;