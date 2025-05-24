<template>
  <main class="page-container">
    <div class="container">
      <h1 class="page-title">联系我们</h1>
      <div class="contact-container">
        <div class="contact-card">
          <div class="contact-grid">
            <div class="contact-info">
              <h2 class="contact-section-title">联系方式</h2>
              <div class="contact-details">
                <p class="contact-item">
                  <el-icon class="contact-icon">
                    <Location />
                  </el-icon>
                  浙江省宁波市鄞州区翔云路100号科贸中心东楼2001
                </p>
                <p class="contact-item">
                  <el-icon class="contact-icon">
                    <Phone />
                  </el-icon>
                  <a href="tel:17706497762">
                    177 0649 7762
                  </a>
                </p>
                <p class="contact-item">
                  <el-icon class="contact-icon">
                    <Message />
                  </el-icon>
                  <a href="mailto:info@qinzishiguang.com">
                    info@qinzishiguang.com
                  </a>
                </p>
                <p class="contact-item">
                  <el-icon class="contact-icon">
                    <Timer />
                  </el-icon>
                  周一至周日 9:00-18:00
                </p>
              </div>
              <div class="contact-social">
                <h3 class="contact-social-title">关注我们</h3>
                <div class="social-links">
                  <router-link to="/ltw" class="social-link">
                    <el-icon>
                      <ChatDotRound />
                    </el-icon>
                  </router-link>
                  <a href="https://www.xiaohongshu.com/user/profile/6413be5c00000000110233ab" class="social-link">
                    <el-icon>
                      <Notebook />
                    </el-icon>
                  </a>
                  <a href="https://space.bilibili.com/433425092" class="social-link">
                      <svg t="1748102944781" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5162" width="20" height="20"><path d="M777.514667 131.669333a53.333333 53.333333 0 0 1 0 75.434667L728.746667 255.829333h49.92A160 160 0 0 1 938.666667 415.872v320a160 160 0 0 1-160 160H245.333333A160 160 0 0 1 85.333333 735.872v-320a160 160 0 0 1 160-160h49.749334L246.4 207.146667a53.333333 53.333333 0 0 1 75.392-75.434667l113.152 113.152c3.370667 3.370667 6.186667 7.04 8.448 10.965333h137.088c2.261333-3.925333 5.12-7.68 8.490667-11.008l113.109333-113.152a53.333333 53.333333 0 0 1 75.434667 0z m1.152 231.253334H245.333333a53.333333 53.333333 0 0 0-53.205333 49.365333l-0.128 4.010667v320c0 28.117333 21.76 51.114667 49.365333 53.162666l3.968 0.170667h533.333334a53.333333 53.333333 0 0 0 53.205333-49.365333l0.128-3.968v-320c0-29.44-23.893333-53.333333-53.333333-53.333334z m-426.666667 106.666666c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z m320 0c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z" p-id="5163" fill="#ffffff"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="contact-form">
              <h2 class="contact-section-title">留言咨询</h2>
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="name" class="form-label">姓名</label>
                  <input v-model="form.name" type="text" id="name" class="form-control">
                </div>
                <div class="form-group">
                  <label for="phone" class="form-label">电话</label>
                  <input v-model="form.phone" type="text" id="phone" class="form-control">
                </div>
                <div class="form-group">
                  <label for="message" class="form-label">留言内容</label>
                  <textarea v-model="form.message" id="message" rows="4" class="form-control"></textarea>
                </div>
                <button type="submit" class="submit-button">提交留言</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  phone: '',
  message: ''
});

const submitForm = () => {
  alert('感谢您的留言，我们会尽快与您联系！');
  form.name = '';
  form.phone = '';
  form.message = '';
};
</script>

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

.contact-container {
  max-width: 56rem;
  margin: 0 auto;
}

.contact-card {
  background-color: var(--white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.contact-section-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.contact-details {
  margin-bottom: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.contact-icon {
  margin-right: 0.5rem;
  color: var(--primary);
}

.contact-social-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: background-color 0.3s;
}

.social-link:hover {
  background-color: rgba(11, 139, 155, 0.9);
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.25rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem;
  outline: none;
  transition: all 0.3s;
}

.form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(11, 139, 155, 0.2);
}

textarea.form-control {
  resize: vertical;
}

.submit-button {
  background-color: var(--primary);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: rgba(11, 139, 155, 0.9);
}
</style>