<template>
    <div></div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

const route = useRoute()

// 消息映射表
const messageMap = {
    '404': '[warning]目的地通信卫星遭遇太阳风暴，请稍后再试~',
    '403': '[error]旅行签证审核未通过！',
    '500': '[error]服务器君变成废物器了……',
    'success': '[success]操作成功！',
    'error': '[error]操作失败，请重试！',
    'gotow': '[warning]请参考教程前往微信打开此链接！',
    'post404': '[error]找不到你想看的文章，请检查链接！'
    // 可以继续添加更多映射
}

const showNotification = (msg) => {
    if (!msg) return

    // 检查是否是预定义的消息代码
    const mappedMessage = messageMap[msg]
    if (mappedMessage) {
        msg = mappedMessage
    }

    // 解析消息内容和类型
    const match = msg.match(/^\[(.*?)\](.*)/)
    let type = 'info'
    let content = msg

    if (match) {
        const [, typeStr, contentStr] = match
        type = typeStr || 'info'
        content = contentStr
    }

    // 显示通知
    ElNotification({
        title: '通知',
        message: content,
        type: type,
        duration: 3000,
        position: 'top-right'
    })
}

// 监听路由变化
watch(
    () => route.query.msg,
    (newMsg) => {
        if (newMsg) {
            showNotification(newMsg)
        }
    },
    { immediate: true }
)

// 组件挂载时也检查一次
onMounted(() => {
    if (route.query.msg) {
        showNotification(route.query.msg)
    }
})
</script>