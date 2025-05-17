<template>
  <div class="container">
    <!-- 链接展示区域 -->
    <div class="link-box">
      <p>公众号关注链接：</p>
      <code>{{ targetLink }}</code>
    </div>

    <!-- 操作按钮区域 -->
    <div class="button-group">
      <el-button type="primary" class="action-btn" @click="copyLink" style="margin-left: 0;">点击手动复制链接</el-button>
      <el-button type="success" class="action-btn" @click="openWechat" style="margin-left: 0;">打开微信准备发送</el-button>
    </div>

    <!-- 教程指引 -->
    <div class="tutorial">
      <h3>操作指引：</h3>
      <div class="do-list">
        <ol>
          <li>点击上方按钮复制链接</li>
          <li>在微信中粘贴链接发送给"文件传输助手"或自己</li>
          <li>在微信聊天窗口中点击该链接即可关注</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  data() {
    return {
      targetLink: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwOTQ1NzkxNw==',
      timer: null
    }
  },
  mounted() {
    // 页面加载时尝试自动复制
    this.autoCopy();
  },
  methods: {
    async autoCopy() {
      try {
        await navigator.clipboard.writeText(this.targetLink);
        ElMessage.success('自动复制成功，请点击绿色按钮前往微信发送');
      } catch (err) {
        ElMessage.error('自动复制失败，需要手动复制');
      }
    },
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.targetLink);
        ElMessage.success('复制成功！快去微信粘贴吧~');
      } catch (err) {
        ElMessage.error('复制失败，请长按链接手动选择复制');
      }
    },
    openWechat() {
      window.location.href = 'weixin://';
      // 设置检测定时器
      this.timer = setTimeout(() => {
        ElMessageBox.alert('未能自动跳转，请手动打开微信', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            clearTimeout(this.timer);
          }
        });
      }, 4000);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.link-box {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.link-box code {
  user-select: all;
  -webkit-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 240px;
  margin: 0 auto;
}

.action-btn {
  width: 240px;
  height: 40px;
  font-size: 14px;
  padding: 10;
}

.tutorial {
  margin-top: 30px;
  padding: 15px;
  background: #fff8e1;
  border-radius: 6px;
}

.do-list {
  margin-left: 25px;
}
</style>