<template>
  <ShowMsg />
  <WechatButton v-if="!isHideWechatButton" />
  <!-- <SideButton /> -->
  <div class="app-container">
    <NavBar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <FooterSection />
  </div>
  <PrintInfo />
  <!-- 替换Element Plus的Backtop为自定义组件 -->
  <div v-if="showBackTop" class="back-to-top" @click="scrollToTop">
    <ArrowUp />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import WechatButton from './components/PopWechatButton.vue';
// import SideButton from './components/SideButton.vue';
import PrintInfo from './components/PrintInfo.vue';
import { useRoute } from 'vue-router'
import ShowMsg from '@/components/ShowMsg.vue'
import { ArrowUp } from '@element-plus/icons-vue'

// 计算属性判断当前路由是否为 /ltw
const route = useRoute()
const isHideWechatButton = computed(() => route.path === '/ltw')

// 返回顶部功能
const showBackTop = ref(false)

const handleScroll = () => {
  showBackTop.value = window.pageYOffset > 100
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // 监听滚动事件
  window.addEventListener('scroll', handleScroll)
  
  // 延迟加载 Microsoft Clarity 分析组件
  setTimeout(() => {
    import('@microsoft/clarity').then(({ default: Clarity }) => {
      const projectId = "r6t8kssmg9"
      Clarity.init(projectId);
    }).catch(err => {
      console.warn('Failed to load Clarity:', err);
    });
  }, 2000); // 延迟2秒加载
});
</script>

<style>
/* 字体预加载优化 */
@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/notosanssc/v36/k3kXo84MPvpLmixcA63oeALhLOCT-xWNm8Hqd37g1OkDRZe7lR4sg1IzSy-MNbE9VH8V.119.woff2') format('woff2');
  unicode-range: U+4e00-9fff, U+3400-4dbf, U+20000-2a6df, U+2a700-2b73f, U+2b740-2b81f, U+2b820-2ceaf, U+f900-faff, U+3300-33ff, U+fe30-fe4f, U+ff00-ffef;
}

@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/notosanssc/v36/k3kXo84MPvpLmixcA63oeALhLOCT-xWNm8Hqd37g1OkDRZe7lR4sg1IzSy-MNbE9VH8V.119.woff2') format('woff2');
  unicode-range: U+4e00-9fff, U+3400-4dbf, U+20000-2a6df, U+2a700-2b73f, U+2b740-2b81f, U+2b820-2ceaf, U+f900-faff, U+3300-33ff, U+fe30-fe4f, U+ff00-ffef;
}

/* 移除外部字体引用，使用本地字体 */
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap'); */

:where([class^="ri-"])::before {
  content: "\f3c2";
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f9fafb;
  color: #333;
  line-height: 1.5;
  /* 启用字体平滑 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* 优化文字渲染 */
  text-rendering: optimizeLegibility;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
}

.section-title {
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: #F5A623;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 不使用浏览器滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

/* 全局变量 */
:root {
  --primary: #0B8B9B;
  --secondary: #F5A623;
  --white: #ffffff;
  --black: #000000;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --red-500: #ef4444;
  --yellow-500: #eab308;
  --green-500: #22c55e;
  --blue-500: #3b82f6;
}

/* 自定义返回顶部按钮 */
.back-to-top {
  position: fixed;
  right: 40px;
  bottom: 70px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
}

.back-to-top:hover {
  background-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* 图片懒加载优化 */
img {
  max-width: 100%;
  height: auto;
  /* 启用图片优化 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* 预加载关键资源 */
@media (preload) {
  .critical-image {
    display: block;
  }
}
</style>