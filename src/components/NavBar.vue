<template>
  <header class="header">
    <div class="container header-container">
      <div class="header-left">
        <router-link to="/" class="logo">亲子拾光</router-link>
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
        <div class="phone-container">
          <div class="phone-icon">
            <i class="ri-phone-line"></i>
          </div>
          <span>400-888-9999</span>
        </div>
        <button class="wechat-button">
          <i class="ri-wechat-line"></i>
        </button>
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
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  
  // 当菜单打开时，禁止背景滚动
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
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  font-family: 'Pacifico', cursive;
  font-size: 1.5rem;
  margin-right: 2.5rem;
  color: var(--white);
  position: relative;
  overflow: hidden;
}

.logo::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--secondary);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.logo:hover::after {
  transform: translateX(0);
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

.wechat-button {
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
  transform: scale(1.1) rotate(15deg);
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