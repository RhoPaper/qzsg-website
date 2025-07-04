<template>
  <section class="teacher-team">
    <div class="container">
      <div class="team-title-container">
        <h2 class="team-title">导师团队 / Teacher Team</h2>
        <div class="team-title-line"></div>
      </div>
      <div class="team-container">
        <!-- Logo放在旋转容器外部，这样就不会跟着旋转 -->
        <div class="team-logo">
          <img class="team-logo-img" src="../assets/static/image/qzsg-logo.avif">
          <!-- <span class="team-logo-text">亲子拾光</span> -->
        </div>

        <div class="team-orbit-container" ref="orbitContainer">
          <div v-for="(teacher, index) in teachers" :key="index" class="teacher-orbit-item"
            :style="getOrbitStyle(index)" :class="{ 'active': activeTeacher === index }"
            @mouseenter="showTeacherDetails(index)" @mouseleave="hideTeacherDetails()">
            <div class="teacher-avatar-container">
              <img :src="teacher.image" :alt="teacher.name" class="teacher-avatar">
            </div>

            <div class="teacher-details" :class="{ 'show': activeTeacher === index }">
              <h3 class="teacher-name">{{ teacher.name }}</h3>
              <p class="teacher-title">{{ teacher.title }}</p>
              <p class="teacher-description">
                {{ teacher.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';


const teachers = [
  {
    name: '老K',
    title: '深耕体验教育·赋能成长探索',
    description: '管理学学士、文学学士、原江西外语外贸学院管理学院教师、浙江万里学院校外导师、10年日企管理经验、人杜部研学旅行指导证、中国登山协会户外指导员、中国营地教育联盟认证营长、国家体验式培训师、"爱丁堡公爵奖励"青少年导师、Kailas领攀教练班成员',
    image: new URL('../assets/static/image/lao-K.png', import.meta.url).href
  },
  {
    name: 'Summer（夏天）',
    title: '跨界育行·自然疗愈',
    description: '自媒体人、"亲子拾光"品牌创始人、日本自然教育指导师、荷兰PSBK儿童社会心理游戏理疗师，国家体验式培训师、北E区户外运动协会副会长，中国红十字放护员、网红育儿达人，带儿子游历18个国家和中国20多个省份、深刻理解亲子旅行中的教育意义',
    image: new URL('../assets/static/image/summer.png', import.meta.url).href
  }
];

const orbitContainer = ref(null);
const activeTeacher = ref(null);
const hideTimer = ref(null);
const baseRadius = ref(180);

const handleResize = () => {
  // 根据屏幕宽度动态调整轨道半径
  baseRadius.value = Math.min(window.innerWidth * 0.35, 180);
};

// 计算每个教师头像的轨道样式
const getOrbitStyle = (index) => {
  const angle = (index / teachers.length) * 2 * Math.PI;
  const x = Math.cos(angle) * baseRadius.value;
  const y = Math.sin(angle) * baseRadius.value;

  return {
    '--orbit-x': `${x}px`,
    '--orbit-y': `${y}px`,
    '--base-x': x,
    '--base-y': y,
    '--orbit-delay': `${index * 0.5}s`
  };
};



// 显示教师详情
const showTeacherDetails = (index) => {
  // 清除之前的定时器
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
  activeTeacher.value = index;

  // 暂停旋转动画
  if (orbitContainer.value) {
    orbitContainer.value.style.animationPlayState = 'paused';
  }
};

// 隐藏教师详情
const hideTeacherDetails = () => {
  hideTimer.value = setTimeout(() => {
    activeTeacher.value = null;

    // 恢复旋转动画
    if (orbitContainer.value) {
      orbitContainer.value.style.animationPlayState = 'running';
    }

    hideTimer.value = null;
  }, 100);
};

// 组件挂载时启动动画
onMounted(() => {

  handleResize(); // 初始化计算
  window.addEventListener('resize', handleResize);
  // 确保轨道容器开始旋转
  if (orbitContainer.value) {
    orbitContainer.value.style.animationPlayState = 'running';
  }
});

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
  }
});
</script>

<style scoped>
.teacher-team {
  padding: 4rem 0;
  background-color: var(--white);
  overflow: visible;
}

.team-title-container {
  text-align: center;
  margin-bottom: 3rem;
}

.team-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-800);
  display: inline-block;
  position: relative;
}

.team-title-line {
  width: 5rem;
  height: 0.25rem;
  background-color: var(--secondary);
  margin: 1rem auto 0;
}

.team-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  height: 500px;
}

.team-orbit-container {
  position: relative;
  width: 100%;
  height: 100%;
  animation: rotate 30s linear infinite;
  animation-play-state: running;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.team-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  animation: pulse 3s infinite alternate;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    box-shadow: 0 0 40px rgba(239, 68, 68, 0.7);
    transform: translate(-50%, -50%) scale(1.05);
  }
}

.team-logo-img {
  width: 60%;
  height: 60%;
  object-fit: fill;
}

.teacher-orbit-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + var(--orbit-x)), calc(-50% + var(--orbit-y)));
  animation: counter-rotate 30s linear infinite;
  animation-play-state: inherit;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
}

@keyframes counter-rotate {
  from {
    transform: translate(calc(-50% + var(--orbit-x)), calc(-50% + var(--orbit-y))) rotate(0deg);
  }

  to {
    transform: translate(calc(-50% + var(--orbit-x)), calc(-50% + var(--orbit-y))) rotate(-360deg);
  }
}

.teacher-orbit-item.active {
  z-index: 20;
  animation-play-state: paused;
}

.teacher-avatar-container {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  transition:
    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  border: 3px solid var(--red-500);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateZ(0);
  /* 启用GPU加速 */
  backface-visibility: hidden;
  /* 消除边缘锯齿 */
}

.teacher-orbit-item.active .teacher-avatar-container {
  width: 6rem;
  height: 6rem;
  border-radius: 16px;
  border-width: 5px;
  border-color: var(--secondary);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.teacher-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: all 0.5s;
}

.teacher-orbit-item.active .teacher-avatar {
  transform: scale(1.1);
}

/* 教师详情 */
.teacher-details {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: var(--white);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 16rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 30;
  pointer-events: none;
  /* 默认不接收鼠标事件 */
}

.teacher-details::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent var(--white) transparent;
  z-index: 100;
}

.teacher-details.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(20px);
  pointer-events: auto;
  /* 显示时接收鼠标事件 */
}

.teacher-name {
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--gray-800);
  margin-bottom: 0.25rem;
}

.teacher-title {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 0.75rem;
}

.teacher-description {
  font-size: 0.75rem;
  color: var(--gray-700);
  line-height: 1.5;
}
</style>