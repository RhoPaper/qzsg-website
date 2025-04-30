<template>
  <header class="header">
    <div class="container header-container">
      <div class="header-left">
        <router-link to="/" class="logo">
          <img 
            src="../assets/static/image/qzsg.png"
            width="180" 
            height="60"
            alt="亲子拾光"
          >
        </router-link>
        <nav class="desktop-nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/about" class="nav-link">机构介绍</router-link>
          <router-link to="/activities" class="nav-link">教研活动</router-link>
          <router-link to="/courses" class="nav-link">课程中心</router-link>
          <router-link to="/teachers" class="nav-link">师资团队</router-link>
          <router-link to="/contact" class="nav-link">联系我们</router-link>
        </nav>
      </div>
      <div class="header-right">
        <a href="tel:17706497762" v-if="!isMobile">
          <div class="phone-container">
            <div class="phone-icon">
              <i class="ri-phone-line"></i>
            </div>
            <span>177 0649 7762</span>
          </div>
        </a>
        
        <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwOTQ1NzkxNw==" target="_blank">
          <button class="wechat-button" v-if="!isMobile">
            <i class="ri-wechat-line"></i>
          </button>
        </a>
        <a href="tel:17706497762">
          <button class="mobile-icon-button" v-if="isMobile">
              <i class="ri-phone-line"></i> <!-- 替换为移动端需要显示的图标 -->
        </button>
      </a>
        <button @click="toggleMobileMenu" class="menu-button" :class="{ 'is-active': mobileMenuOpen }">
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </button>
      </div>
    </div>
    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'is-open': mobileMenuOpen }">
      <div class="container">
        <nav class="mobile-nav">
          <router-link @click="closeMobileMenu" to="/" class="nav-link">首页</router-link>
          <router-link @click="closeMobileMenu" to="/about" class="nav-link">机构介绍</router-link>
          <router-link @click="closeMobileMenu" to="/activities" class="nav-link">教研活动</router-link>
          <router-link @click="closeMobileMenu" to="/courses" class="nav-link">课程中心</router-link>
          <router-link @click="closeMobileMenu" to="/teachers" class="nav-link">师资团队</router-link>
          <router-link @click="closeMobileMenu" to="/contact" class="nav-link">联系我们</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const mobileMenuOpen = ref(false);
const isMobile = ref(false); // 新增响应式变量

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

// 检测屏幕宽度并更新isMobile
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

// 挂载时检测屏幕宽度
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// 组件销毁前移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.header {
  background-color: var(--primary);
  color: var(--white);
  position: relative;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: inline-block;
  width: clamp(120px, 15vw, 180px); /* 自适应宽度 */
  height: clamp(40px, 5vw, 60px);   /* 自适应高度 */
  margin-right: 2.5rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保图片完整显示 */
  filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1));
  transition: inherit;
}

/* 桌面端悬停效果 */
@media (hover: hover) {
  .logo:hover {
    transform: scale(1.05);
  }
  
  .logo:hover img {
    opacity: 0.9;
    filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2));
  }
}

/* 移动端点击反馈 */
@media (hover: none) {
  .logo:active {
    transform: scale(0.98);
    transition-duration: 0.1s;
  }
}

/* 移动端小屏幕适配 */
@media (max-width: 768px) {
  .logo {
    margin-right: 1.5rem;
    width: clamp(100px, 20vw, 120px);
    height: clamp(30px, 6vw, 40px);
  }
}

.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
    gap: 1.5rem;
  }
}

.nav-link {
  padding: 0.5rem 0;
  transition: color 0.3s, transform 0.3s;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--secondary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: right;
}

.nav-link:hover {
  color: var(--secondary);
  transform: translateY(-2px);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.phone-container {
  display: none;
  align-items: center;
}

@media (min-width: 768px) {
  .phone-container {
    display: flex;
  }
}

.phone-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

.wechat-button, .mobile-icon-button {
  width: 2rem;
  height: 2rem;
  background-color: var(--secondary);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: all 0.3s;
}

.wechat-button:hover {
  transform: scale(1.2) rotate(-12.5deg);
  box-shadow: 0 0 10px rgba(245, 166, 35, 0.5);
}

.menu-button {
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparent;
  padding: 0.25rem;
  position: relative;
  z-index: 101;
}

.menu-bar {
  width: 100%;
  height: 2px;
  background-color: var(--white);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.menu-button.is-active .menu-bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-button.is-active .menu-bar:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.menu-button.is-active .menu-bar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (min-width: 768px) {
  .menu-button {
    display: none;
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--primary);
  z-index: 100;
  padding-top: 4rem;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  visibility: hidden;
}

.mobile-menu.is-open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}

.mobile-nav .nav-link {
  font-size: 1.25rem;
  padding: 0.75rem 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.mobile-menu.is-open .nav-link {
  opacity: 1;
  transform: translateY(0);
  transition-delay: calc(0.1s * var(--i, 0));
}

.mobile-menu.is-open .nav-link:nth-child(1) { --i: 1; }
.mobile-menu.is-open .nav-link:nth-child(2) { --i: 2; }
.mobile-menu.is-open .nav-link:nth-child(3) { --i: 3; }
.mobile-menu.is-open .nav-link:nth-child(4) { --i: 4; }
.mobile-menu.is-open .nav-link:nth-child(5) { --i: 5; }
.mobile-menu.is-open .nav-link:nth-child(6) { --i: 6; }
</style>