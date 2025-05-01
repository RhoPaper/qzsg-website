<template>
    <div class="follow-wechat">
        <Tick></Tick>
        <a href="javascript:void(0)" @click="OpenWechat"><p class="link-text">关注公众号</p></a>
    </div>
</template>

<script setup>
import Tick from './icons/IconTick.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const OpenWechat = () => {
    // 这里实现关注公众号的具体逻辑
    console.log('触发关注公众号操作')
    // window.open("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwOTQ1NzkxNw==")
    router.push('/ltw') // 这里使用vue-router的push方法跳转到指定页面
}
</script>

<style scoped>
.follow-wechat {
    position: fixed;
    top: 12.5%; /* 可根据需要调整与顶部的距离 */
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 0 10px;
    background-color: #34CF95;
    height: 38px;
    border: none;
    border-radius: 19px;
    text-decoration: none;
    cursor: pointer;
}

.follow-wechat a {
    color: white;
    font-size: 12px;
    text-decoration: none;
    white-space: nowrap;
}

.link-text {
    font-family: 'Noto Sans SC', sans-serif;
    font-weight: 400;
}
</style>