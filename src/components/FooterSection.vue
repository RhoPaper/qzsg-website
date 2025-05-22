<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">联系我们</h3>
          <p class="footer-contact-item">
            <el-icon>
              <Location />
            </el-icon>
            浙江省宁波市鄞州区翔云路100号科贸中心东楼2001
          </p>
          <p class="footer-contact-item">
            <el-icon>
              <Phone />
            </el-icon>
            <a href="tel:17706497762">
              177 0649 7762
            </a>
          </p>
          <p class="footer-contact-item">
            <el-icon>
              <Message />
            </el-icon>
            <a href="mailto:info@qinzishiguang.com">
              info@qinzishiguang.com
            </a>
          </p>
          <p class="footer-contact-item">
            <el-icon>
              <Timer />
            </el-icon>
            周一至周日 9:00-18:00
          </p>
          <div class="footer-social">
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
        <div class="footer-section">
          <h3 class="footer-title">快速链接</h3>
          <ul class="footer-links">
            <li><router-link to="/" class="footer-link">首页</router-link></li>
            <li><router-link to="/about" class="footer-link">机构介绍</router-link></li>
            <li><router-link to="/activities" class="footer-link">教研活动</router-link></li>
            <li><router-link to="/courses" class="footer-link">课程中心</router-link></li>
            <li><router-link to="/teachers" class="footer-link">师资团队</router-link></li>
            <li><router-link to="/contact" class="footer-link">联系我们</router-link></li>
          </ul>

          <div class="footer-form">
            <form @submit.prevent="submitMessage">
              <div class="form-group">
                <input v-model="message" type="text" placeholder="请输入您的留言" class="form-input">
                <button type="submit" class="form-button">提交</button>
              </div>
            </form>
          </div>
        </div>
        <div class="footer-section">
          <div class="qrcode-container">
            <h3 class="qrcode-title">关注公众号</h3>
            <p class="qrcode-text">扫描二维码，获取更多教育资讯和活动信息</p>
            <div class="qrcode">
              <div class="qrcode-placeholder">
                <el-icon>
                  <Crop />
                </el-icon>
              </div>
            </div>
            <button class="qrcode-button">立即关注</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>©2024 - {{ new Date().getFullYear() }} 拾光研学旅行社（宁波）有限公司 保留所有权利.</p>
        </div>
        <div class="powered-by">
          <p>Powered By <a href="https://rhopaper.top/about" target="_blank">RhoPaper</a></p>
        </div>
        <br/>
        <div class="footer-beian">
          <a target="_blank" href="https://beian.miit.gov.cn">
            <span>浙ICP备2022004790号-1 | </span>
          </a>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33020902000466">
            <img src="../assets/static/image/ga-icon.png" alt="浙公网安备33020902000466号" style="width: 18px; height: 18px;" />
            <span>浙公网安备33020902000466号</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');

const submitMessage = () => {
  if (message.value.trim()) {
    ElMessage({
      message: '感谢您的留言，您的意见是我们前进的动力！',
      type: 'success',
      duration: 4000,
      onClose: () => {
        message.value = '';
      }
    });
  }
};
</script>

<style scoped>
.footer {
  background-color: var(--gray-900);
  color: var(--white);
  padding-top: 3rem;
  padding-bottom: 1.5rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
}

.footer-section {
  width: 100%;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .footer-section {
    width: 33.333333%;
  }
}

.footer-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.footer-contact-item i {
  margin-right: 0.5rem;
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 4%
}

.footer-link {
  transition: color 0.3s;
}

.footer-link:hover {
  color: var(--secondary);
}

.footer-form {
  margin-top: 1.5rem;
}

.form-group {
  display: flex;
}

.form-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border: none;
  outline: none;
  color: var(--gray-800);
}

.form-button {
  background-color: var(--secondary);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  white-space: nowrap;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: rgba(245, 166, 35, 0.9);
}

.qrcode-container {
  background-color: var(--red-500);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.qrcode-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.qrcode-text {
  margin-bottom: 1rem;
}

.qrcode {
  background-color: var(--white);
  padding: 0.5rem;
  border-radius: 0.25rem;
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1rem;
}

.qrcode-placeholder {
  width: 100%;
  height: 100%;
  background-color: var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
}

.qrcode-placeholder i {
  font-size: 2.5rem;
  color: var(--gray-500);
}

.qrcode-button {
  width: 100%;
  background-color: var(--white);
  color: var(--red-500);
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.qrcode-button:hover {
  background-color: var(--gray-100);
}

.footer-bottom {
  border-top: 1px solid var(--gray-800);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  padding-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--gray-400);
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.powered-by {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.powered-by a {
  color: #42b883;
}

@media (min-width: 768px) {
  .footer-copyright {
    flex-direction: row;
    justify-content: space-between;
  }
  .powered-by {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-beian {
  text-align: center;
}

</style>
