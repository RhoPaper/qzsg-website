<template>
  <main class="page-container">
    <div class="container">
      <h1 class="page-title">教研活动</h1>
      <div class="activities-container">
        <p class="activities-description">
          亲子拾光教育致力于不断创新教育方法和教学内容，我们定期组织各类教研活动，旨在提升教学质量，更好地服务每一位学员。
        </p>
        <div class="activities-grid">
          <div class="activity-card">
            <img src="https://public.readdy.ai/ai/img_res/e2042ec62a2aae777e74bd8f274cc8a5.jpg" alt="教研活动" class="activity-image">
            <div class="activity-content">
              <h3 class="activity-title">教师培训工作坊</h3>
              <p class="activity-description">
                定期邀请教育专家为教师团队提供专业培训，不断提升教学水平和专业素养。
              </p>
            </div>
          </div>
          <div class="activity-card">
            <img src="https://public.readdy.ai/ai/img_res/503b9ecb8945af81f9414d3d3b9fce6b.jpg" alt="教研活动" class="activity-image">
            <div class="activity-content">
              <h3 class="activity-title">课程研发会议</h3>
              <p class="activity-description">
                教研团队定期召开会议，根据学员需求和教育发展趋势，不断优化课程内容和教学方法。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page-container {
  padding: 4rem 0;
}

.page-title {
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}

.activities-container {
  max-width: 56rem;
  margin: 0 auto;
}

.activities-description {
  color: var(--gray-700);
  margin-bottom: 1.5rem;
}

.activities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .activities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.activity-card {
  background-color: var(--white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.activity-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}

.activity-content {
  padding: 1rem;
}

.activity-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--gray-800);
  margin-bottom: 0.5rem;
}

.activity-description {
  font-size: 0.875rem;
  color: var(--gray-600);
}
</style>