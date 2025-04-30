<template>
    <div class="container">
      <!-- 链接展示区域 -->
      <div class="link-box">
        <p>公众号关注链接：</p>
        <code>{{ targetLink }}</code>
      </div>
  
      <!-- 操作按钮区域 -->
      <div class="button-group">
        <button @click="copyLink">点击手动复制链接</button>
        <a 
          href="weixin://" 
          @click="openWechat"
          class="wechat-btn"
        >打开微信准备发送</a>
      </div>
  
      <!-- 教程指引 -->
      <div class="tutorial">
        <h3>操作指引：</h3>
        <ol>
          <li>点击上方按钮复制链接</li>
          <li>在微信中粘贴链接发送给"文件传输助手"或自己</li>
          <li>在微信聊天窗口中点击该链接即可关注</li>
        </ol>
      </div>
  
      <!-- 提示弹窗 -->
      <div v-if="showAlert" class="alert-mask">
        <div class="alert-box">
          <p>⚠️ 未能自动跳转，请手动打开微信</p>
          <button @click="closeAlert">知道了</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        targetLink: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwOTQ1NzkxNw==',
        showAlert: false,
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
          console.log('自动复制成功');
        } catch (err) {
          console.log('自动复制失败，需要手动复制');
        }
      },
      async copyLink() {
        try {
          await navigator.clipboard.writeText(this.targetLink);
          alert('复制成功！快去微信粘贴吧~');
        } catch (err) {
          alert('复制失败，请长按链接手动选择复制');
        }
      },
      openWechat() {
        // 设置检测定时器
        this.timer = setTimeout(() => {
          this.showAlert = true;
        }, 2000);
        
        // 兼容处理：部分浏览器需要延迟跳转
        setTimeout(() => {
          window.location.href = 'weixin://';
        }, 500);
      },
      closeAlert() {
        this.showAlert = false;
        clearTimeout(this.timer);
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
    word-break: break-all;
    display: inline-block;
    margin-top: 10px;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  button, .wechat-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: white;
  }
  
  button {
    background: #007bff;
  }
  
  .wechat-btn {
    background: #07c160;
  }
  
  .tutorial {
    margin-top: 30px;
    padding: 15px;
    background: #fff8e1;
    border-radius: 8px;
  }
  
  .alert-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .alert-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  .alert-box button {
    margin-top: 15px;
    padding: 8px 20px;
  }
  </style>