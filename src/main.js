import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// 引入ElementPlus组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入ElementPlus图标库
import * as ElementPlusIcon from '@element-plus/icons-vue'

const app = createApp(App);

// 遍历ElementPlusIcon对象，注册ElementPlus图标库
for (const [key, component] of Object.entries(ElementPlusIcon)) {
  // 向应用实例中全局注册ElementPlus图标组件
  app.component(key, component)
}

app.use(router); // 使用Vue-Router路由
app.use(ElementPlus) // 使用ElementPlus组件库
app.use(ElementPlusIcon) // 使用ElementPlus图标库

app.mount('#app');


