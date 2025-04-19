<template>
  <div class="app-container">
    <NavBar />
    <router-view />
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import Clarity from '@microsoft/clarity';

// 加载 Microsoft Clarity 组件
const projectId = "r6t8kssmg9"
Clarity.init(projectId);
</script>

<style>
/* 全局样式 */
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css');

:where([class^="ri-"])::before { content: "\f3c2"; }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  background-color: #f9fafb;
  color: #333;
  line-height: 1.5;
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

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
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
</style>