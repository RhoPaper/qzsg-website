<template>
  <section class="school-profile">
    <div class="container">
      <div class="profile-container">
        <div class="profile-content" ref="profileContent">
          <div class="profile-title-container">
            <h2 class="profile-title">机构简介 / School Profile</h2>
          </div>
          <p class="profile-text fade-in-right" ref="text1">
            亲子拾光成立于2010年，是一家专注于3-12岁儿童综合素质培养的教育机构。十余年来，我们始终秉持"一切为了孩子，为了孩子的一切"的教育理念，致力于为孩子提供全面、科学、个性化的教育服务。
          </p>
          <p class="profile-text fade-in-right" ref="text2" style="transition-delay: 0.2s;">
            我们拥有一支专业的教师团队，他们不仅具备扎实的专业知识，还拥有丰富的教学经验和对儿童心理的深刻理解。我们的课程体系涵盖语言表达、逻辑思维、艺术创造、体能发展等多个领域，旨在培养孩子的综合素质和核心竞争力。
          </p>
          <p class="profile-text fade-in-right" ref="text3" style="transition-delay: 0.4s;">
            目前，我们在全国已有30多家分校，服务学员超过10万人次，得到了家长和社会的广泛认可。我们将继续秉持初心，不断创新教育方法，为每一个孩子的成长保驾护航。
          </p>
        </div>
        <div class="profile-image-container" ref="profileImage">
          <div class="profile-image-wrapper">
            <img src="https://public.readdy.ai/ai/img_res/503b9ecb8945af81f9414d3d3b9fce6b.jpg" alt="教育理念" class="profile-image">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const profileContent = ref(null);
const profileImage = ref(null);
const text1 = ref(null);
const text2 = ref(null);
const text3 = ref(null);

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
  if (profileContent.value) observer.observe(profileContent.value);
  if (profileImage.value) observer.observe(profileImage.value);
  if (text1.value) observer.observe(text1.value);
  if (text2.value) observer.observe(text2.value);
  if (text3.value) observer.observe(text3.value);
});
</script>

<style scoped>
.school-profile {
  padding: 4rem 0;
  background-color: var(--primary);
  overflow: hidden;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .profile-container {
    flex-direction: row;
  }
}

.profile-content {
  width: 100%;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.profile-content.animate {
  opacity: 1;
  transform: translateX(0);
}

@media (min-width: 768px) {
  .profile-content {
    width: 50%;
  }
}

.profile-title-container {
  margin-bottom: 1.5rem;
}

.profile-title {
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--white);
  display: inline-block;
}

.profile-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 3px;
  background-color: var(--secondary);
  transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.profile-content.animate .profile-title::after {
  width: 60px;
}

.profile-text {
  color: var(--white);
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.profile-text.animate {
  opacity: 1;
  transform: translateX(0);
}

.profile-image-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.profile-image-container.animate {
  opacity: 1;
  transform: translateX(0);
}

@media (min-width: 768px) {
  .profile-image-container {
    width: 50%;
  }
}

.profile-image-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.profile-image {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 100%;
  transition: all 0.5s;
  transform: rotateY(20deg);
  opacity: 0.8;
}

.profile-image-container.animate .profile-image {
  animation: floatImage 6s ease-in-out infinite alternate;
}

@keyframes floatImage {
  0% {
    transform: rotateY(20deg) translateY(0);
  }
  50% {
    transform: rotateY(0deg) translateY(-10px);
  }
  100% {
    transform: rotateY(-20deg) translateY(0);
  }
}

/* 从右侧淡入动画 */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-right {
  opacity: 0;
}

.fade-in-right.animate {
  animation: fadeInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
</style>