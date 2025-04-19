<template>
  <section class="teacher-team">
    <div class="container">
      <div class="team-title-container">
        <h2 class="team-title">导师团队 / Teacher Team</h2>
        <div class="team-title-line"></div>
      </div>
      <div class="team-container">
        <!-- Logo放在旋转容器外部，这样就不会跟着旋转 -->
        <div class="team-logo" >
          <img class="team-logo-img" src="../assets/static/image/qzsg-logo.svg">
          <!-- <span class="team-logo-text">亲子拾光</span> -->
        </div>
        
        <div class="team-orbit-container" ref="orbitContainer">
          <div 
            v-for="(teacher, index) in teachers" 
            :key="index" 
            class="teacher-orbit-item"
            :style="getOrbitStyle(index)"
            :class="{ 'active': activeTeacher === index }"
            @mouseenter="showTeacherDetails(index)"
            @mouseleave="hideTeacherDetails()"
          >
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
    name: '张教授',
    title: '教育学博士，儿童心理学专家',
    description: '从事儿童教育研究20余年，发表学术论文30余篇，著有《儿童心理发展与教育》等多部专著，曾获国家级教学成果奖。',
    image: 'https://public.readdy.ai/ai/img_res/0d6883ddd95485ab49e3f847f88561d8.jpg'
  },
  {
    name: '林老师',
    title: '语言表达与沟通能力培训专家',
    description: '毕业于北京师范大学，拥有10年少儿语言教学经验，善于通过游戏和互动激发孩子的语言表达能力和创造力。',
    image: 'https://public.readdy.ai/ai/img_res/45b8445fc98d19fbdc9be7f568fbab62.jpg'
  },
  {
    name: '王老师',
    title: 'STEM教育与逻辑思维培训专家',
    description: '理工科背景，曾在国际知名教育机构任职，擅长通过实验和项目式学习培养孩子的逻辑思维和动手能力。',
    image: 'https://public.readdy.ai/ai/img_res/dd09bffe3fa8214bd0a6f87be8803acb.jpg'
  },
  {
    name: '陈老师',
    title: '艺术创意与美育教育专家',
    description: '毕业于中央美术学院，擅长通过多种艺术形式激发孩子的创造力和审美能力，让每个孩子都能找到表达自我的方式。',
    image: 'https://public.readdy.ai/ai/img_res/9d1b32fd18b39d3a4d043342efef2edb.jpg'
  },
  {
    name: '刘老师',
    title: '体能发展与健康教育专家',
    description: '体育教育背景，曾担任青少年体育教练，注重培养孩子的身体协调能力、团队合作精神和健康生活习惯。',
    image: 'https://public.readdy.ai/ai/img_res/01b0389407c7c713b4b02bd3450ad284.jpg'
  },
  {
    name: '赵老师',
    title: '情商教育与社交能力培训专家',
    description: '心理学背景，专注于儿童情绪管理和社交能力培养，通过角色扮演和团队活动帮助孩子建立健康的人际关系。',
    image: 'https://public.readdy.ai/ai/img_res/2bf2061c61628face3a4b2bd52f733c0.jpg'
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
  overflow: hidden;
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
  max-width: 56rem;
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
  transform: translateZ(0); /* 启用GPU加速 */
  backface-visibility: hidden; /* 消除边缘锯齿 */
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
  pointer-events: none; /* 默认不接收鼠标事件 */
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
  pointer-events: auto; /* 显示时接收鼠标事件 */
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