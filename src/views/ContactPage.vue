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
                  <a href="#" class="social-link">
                    <el-icon>
                      <ChatDotRound />
                    </el-icon>
                  </a>
                  <a href="#" class="social-link">
                    <el-icon>
                      <Share />
                    </el-icon>
                  </a>
                  <a href="#" class="social-link">
                    <el-icon>
                      <VideoPlay />
                    </el-icon>
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