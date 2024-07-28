import { ElNotification } from "element-plus"

export function successMes(mes) {
    ElNotification({
        title: "Success",
        message: mes,
        type: "success"
    })
}

export function errorMes(mes) {
    ElNotification({
        title: "Error",
        message: mes,
        type: "error"
    })
}
