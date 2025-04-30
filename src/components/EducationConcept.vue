<template>
  <section class="education-concept">
    <div class="container">
      <div class="concept-container">
        <div class="concept-image-container" ref="imageContainer"
              @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
          <RouterLink 
            v-for="(image, index) in conceptImages" 
            :key="index"
            :to="{ path: '/courses' }"
            class="concept-image-wrapper"
            :class="{ 'active': currentIndex === index }"
          >
            <img 
              :src="image.url" 
              :alt="image.title" 
              class="concept-image"
            >
            <div class="concept-image-overlay">
              <h3 class="concept-image-title">{{ image.title }}</h3>
            </div>
          </RouterLink>
        </div>
        
        <div class="concept-content" ref="contentContainer">
          <div class="concept-title-container">
            <h2 class="section-title">教育理念 / Concept</h2>
          </div>
          <p class="concept-text fade-in-up" ref="text1">
            拾光研学原创的户外教育“六商课程”， 由北大、北师大、华师大、杭二中等知名院校专家、国家户外资格教师与拾光研学儿童户外体验教育团队共同研发，秉承“户外即学校、玩乐即课堂”的理念，通过对德商、逆商、情商、体商、财商、美商六大系列的深刻研究和精准阐释，有针对性的将户外体验活动结合传统文化、科学创新、自然探索、职业体验等十大元素精心开发成课程。</p>
          <p class="concept-text fade-in-up" ref="text2">
            再结合孩子爱玩的天性，设置主题任务与游戏，通过“场景”、“体验”、“引导”、“跟踪”的教育模式将孩子带入课程活动中，并以亲身体验的方式学到知识和技能。</p>
          <div class="concept-features" ref="featuresContainer">
            <div class="feature bounce-in" style="animation-delay: 0.1s;">
              <div class="feature-icon feature-icon-red">
                <i class="ri-government-line"></i>
              </div>
              <span class="feature-text">法治教育体系</span>
            </div>
            <div class="feature bounce-in" style="animation-delay: 0.2s;">
              <div class="feature-icon feature-icon-yellow">
                <i class="ri-shield-check-line"></i>
              </div>
              <span class="feature-text">安全创新教育</span>
            </div>
            <div class="feature bounce-in" style="animation-delay: 0.3s;">
              <div class="feature-icon feature-icon-green">
                <i class="ri-book-open-line"></i>
              </div>
              <span class="feature-text">体验式学习模式</span>
            </div>
            <div class="feature bounce-in" style="animation-delay: 0.4s;">
              <div class="feature-icon feature-icon-blue">
                <i class="ri-group-line"></i>
              </div>
              <span class="feature-text">自主活动乐园</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';

const imageContainer = ref(null);
const contentContainer = ref(null);
const text1 = ref(null);
const text2 = ref(null);
const featuresContainer = ref(null);

const conceptImages = ref([
  {
    url: require('../assets/static/image/concept-img1.jpg'),
    title: '美杜莎行动'
  },
  {
    url: require('../assets/static/image/concept-img2.jpg'), // 添加更多图片
    title: '海上丝路'
  },
]);

const currentIndex = ref(0);
let autoPlayTimer = null;

// 自动轮播逻辑
const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % conceptImages.value.length;
  }, 3000);
};

const pauseAutoPlay = () => {
  clearInterval(autoPlayTimer);
};

const resumeAutoPlay = () => {
  startAutoPlay();
};

onMounted(() => {
  // 添加滚动监听，实现滚动触发动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // 观察各个元素
  if (imageContainer.value) observer.observe(imageContainer.value);
  if (contentContainer.value) observer.observe(contentContainer.value);
  if (text1.value) observer.observe(text1.value);
  if (text2.value) observer.observe(text2.value);
  if (featuresContainer.value) observer.observe(featuresContainer.value);
});

onBeforeUnmount(() => {
  clearInterval(autoPlayTimer);
});
</script>

<style scoped>
.education-concept {
  padding: 4rem 0;
  background-color: var(--white);
  overflow: hidden;
}

.concept-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .concept-container {
    flex-direction: row;
  }
}

/* 新增轮播相关样式 */
.concept-image-container {
  position: relative;
  width: 100%;
  height: 20rem; /* 固定高度 */
}

@media (min-width: 768px) {
  .concept-image-container {
    width: 50%;
  }
}

.concept-image-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.concept-image-wrapper.active {
  opacity: 1;
  z-index: 1;
}

.concept-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 8s ease-in-out;
}

.concept-image-wrapper:hover .concept-image {
  transform: scale(1.05);
}

.concept-image-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;
}

.concept-image-wrapper:hover .concept-image-overlay {
  background-color: rgba(0, 0, 0, 0.2);
}

.concept-image-title {
  color: var(--white);
  font-size: 1.875rem;
  font-weight: bold;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s 0.2s;
}

.concept-image-container.animate .concept-image-title,
.concept-image-wrapper.active .concept-image-title {
  transform: translateY(0);
  opacity: 1;
}

.concept-content {
  width: 100%;
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.concept-content.animate {
  opacity: 1;
  transform: translateX(0);
}

@media (min-width: 768px) {
  .concept-content {
    width: 50%;
  }
}

.concept-title-container {
  margin-bottom: 1.5rem;
}

.section-title {
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-800);
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 3px;
  background-color: var(--secondary);
  transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.concept-content.animate .section-title::after {
  width: 60px;
}

.concept-text {
  color: var(--gray-700);
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.concept-text.animate {
  opacity: 1;
  transform: translateY(0);
}

.concept-text:nth-child(3) {
  transition-delay: 0.2s;
}

.concept-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .concept-features {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: scale(0.8);
}

.feature.animate {
  animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

.feature:hover .feature-icon {
  transform: scale(1.1) rotate(10deg);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon i {
  color: var(--white);
  font-size: 1.5rem;
}

.feature-icon-red {
  background-color: var(--red-500);
}

.feature-icon-yellow {
  background-color: var(--yellow-500);
}

.feature-icon-green {
  background-color: var(--green-500);
}

.feature-icon-blue {
  background-color: var(--blue-500);
}

.feature-text {
  font-size: 0.875rem;
  text-align: center;
  transition: all 0.3s;
}

.feature:hover .feature-text {
  color: var(--primary);
  font-weight: bold;
}

/* 淡入上升动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  opacity: 0;
}

.fade-in-up.animate {
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

</style>