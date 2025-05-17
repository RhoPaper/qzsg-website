import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
// 引入ElementPlus组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(router); // 使用Vue-Router路由
app.use(ElementPlus) // 使用ElementPlus组件库
app.mount('#app');


