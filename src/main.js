import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// 按需引入ElementPlus图标库 - 只引入需要的图标
import { 
  ArrowUp,
  Message,
  Phone,
  Location,
  Clock,
  User,
  Star,
  Check,
  Close,
  Search,
  Menu,
  Close as CloseIcon
} from '@element-plus/icons-vue'

const app = createApp(App);

// 只注册需要的图标组件
const icons = {
  ArrowUp,
  Message,
  Phone,
  Location,
  Clock,
  User,
  Star,
  Check,
  Close,
  Search,
  Menu,
  CloseIcon
}

// 注册图标组件
Object.entries(icons).forEach(([key, component]) => {
  app.component(key, component)
})

app.use(router); // 使用Vue-Router路由

app.mount('#app');

// 注册Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // 检查更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 有新版本可用
              console.log('New version available');
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}


