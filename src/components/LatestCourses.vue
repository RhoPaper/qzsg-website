<template>
  <section class="latest-courses">
    <div class="container">
      <div class="courses-title-container">
        <h2 class="courses-title">最新课程 / News</h2>
        <div class="courses-title-line"></div>
      </div>
      <div class="courses-container">
        <div class="featured-course">
          <div class="featured-course-card">
            <img src="https://public.readdy.ai/ai/img_res/7e19e21e74874d1dbe61a01bc3be6b26.jpg" alt="远方体育训练营" class="featured-course-image">
            <div class="featured-course-content">
              <h3 class="featured-course-title">远方体育训练营</h3>
              <p class="featured-course-description">
                为期7天的体育训练营，通过专业的体能训练和团队协作活动，培养孩子的体能素质和团队精神。
              </p>
              <div class="featured-course-meta">
                <span class="course-date">2025-04-01</span>
                <span class="course-views">浏览: 673次</span>
              </div>
            </div>
          </div>
          <div class="featured-course-indicators">
            <div class="indicator indicator-active"></div>
            <div class="indicator"></div>
            <div class="indicator"></div>
          </div>
        </div>
        <div class="course-list">
          <div v-for="(course, index) in courses" :key="index" class="course-item">
            <div class="course-item-header">
              <h3 class="course-item-title">{{ course.title }}</h3>
              <span class="course-item-date">{{ course.date }}</span>
            </div>
            <p class="course-item-description">
              {{ course.description }}
            </p>
            <div class="course-item-footer">
              <router-link to="/courses" class="course-item-link">查看详情</router-link>
              <span class="course-item-views">浏览: {{ course.views }}次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const courses = [
  {
    title: '战狼少年特训营',
    date: '2025-04-03',
    description: '专为8-12岁男孩设计的特训营，通过军事化管理和挑战性任务，培养孩子的纪律性、勇气和领导力。',
    views: 542
  },
  {
    title: '小小演说家培训班',
    date: '2025-04-02',
    description: '针对5-9岁儿童的口才训练课程，通过有趣的游戏和表演活动，培养孩子的语言表达能力和自信心。',
    views: 489
  },
  {
    title: '科学探索实验室',
    date: '2025-03-30',
    description: '通过有趣的科学实验和项目式学习，激发孩子对科学的兴趣，培养观察、分析和解决问题的能力。',
    views: 412
  },
  {
    title: '创意美术工作坊',
    date: '2025-03-28',
    description: '结合多种艺术形式，如绘画、雕塑、手工等，让孩子在创作中发现美、表达美、创造美。',
    views: 378
  },
  {
    title: '亲子森林探险营',
    date: '2025-03-25',
    description: '周末亲子活动，在专业导师的带领下，家长和孩子一起探索自然，增进亲子关系，培养环保意识。',
    views: 356
  }
];
</script>

<style scoped>
.latest-courses {
  padding: 4rem 0;
  background-color: var(--gray-50);
}

.courses-title-container {
  text-align: center;
  margin-bottom: 3rem;
}

.courses-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-800);
  display: inline-block;
  position: relative;
}

.courses-title-line {
  width: 5rem;
  height: 0.25rem;
  background-color: var(--secondary);
  margin: 1rem auto 0;
}

.courses-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .courses-container {
    flex-direction: row;
  }
}

.featured-course {
  width: 100%;
}

@media (min-width: 768px) {
  .featured-course {
    width: 40%;
  }
}

.featured-course-card {
  background-color: var(--white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.featured-course-image {
  width: 100%;
  height: 16rem;
  object-fit: cover;
  object-position: top;
}

.featured-course-content {
  padding: 1rem;
}

.featured-course-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--gray-800);
  margin-bottom: 0.5rem;
}

.featured-course-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 1rem;
}

.featured-course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-date, .course-views {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.featured-course-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: var(--gray-300);
  margin: 0 0.25rem;
}

.indicator-active {
  background-color: var(--secondary);
}

.course-list {
  width: 100%;
}

@media (min-width: 768px) {
  .course-list {
    width: 60%;
  }
}

.course-item {
  background-color: var(--white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s;
}

.course-item:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.course-item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.course-item-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--gray-800);
}

.course-item-date {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.course-item-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin: 0.5rem 0;
}

.course-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-item-link {
  font-size: 0.875rem;
  color: var(--primary);
}

.course-item-link:hover {
  text-decoration: underline;
}

.course-item-views {
  font-size: 0.75rem;
  color: var(--gray-500);
}
</style>