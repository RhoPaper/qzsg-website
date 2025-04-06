<template>
  <section class="hero-section">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="hero-text-container">
        <div class="hero-text-box slide-in-left">
          <h1 class="hero-title">一切为了孩子，为了孩子的一切</h1>
          <p class="hero-subtitle">All for children, For all children</p>
        </div>
        <div class="hero-buttons slide-in-left" style="animation-delay: 0.3s;">
          <router-link to="/about" class="btn btn-primary">了解更多</router-link>
          <router-link to="/contact" class="btn btn-secondary">联系我们</router-link>
        </div>
      </div>
    </div>
    <div class="hero-side-buttons">
      <button class="side-button pop-in" style="animation-delay: 0.4s;">
        <i class="ri-arrow-down-line"></i>
      </button>
      <button class="side-button pop-in" style="animation-delay: 0.5s;">
        <i class="ri-search-line"></i>
      </button>
      <button class="side-button pop-in" style="animation-delay: 0.6s;">
        <i class="ri-question-line"></i>
      </button>
      <button class="side-button pop-in" style="animation-delay: 0.7s;">
        <i class="ri-refresh-line"></i>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  background-image: url('https://public.readdy.ai/ai/img_res/fd432472d176f555759df9ade608af7d.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 10;
  padding: 5rem 1rem;
}

@media (min-width: 768px) {
  .hero-content {
    padding: 8rem 1rem;
  }
}

.hero-text-container {
  max-width: 36rem;
}

.hero-text-box {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.hero-title {
  color: var(--white);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 1.875rem;
  }
}

.hero-subtitle {
  color: var(--white);
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .hero-subtitle {
    font-size: 1rem;
  }
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s;
}

.btn-primary {
  background-color: var(--secondary);
  color: var(--white);
}

.btn-primary:hover {
  background-color: rgba(245, 166, 35, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.btn-secondary {
  background-color: var(--white);
  color: var(--primary);
}

.btn-secondary:hover {
  background-color: var(--gray-100);
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hero-side-buttons {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 20;
}

.side-button {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--secondary);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: all 0.3s;
}

.side-button:hover {
  background-color: rgba(245, 166, 35, 0.9);
  transform: scale(1.2) rotate(15deg);
}

/* 动画效果 */
@keyframes slideInLeft {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  60% {
    transform: translateX(20px);
    opacity: 0.8;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left {
  animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
}

@keyframes popIn {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.2) rotate(15deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.pop-in {
  animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}
</style>