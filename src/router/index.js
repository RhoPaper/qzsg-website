import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import TeachersPage from '../views/TeachersPage.vue';
import CoursesPage from '../views/CoursesPage.vue';
import ActivitiesPage from '../views/ActivitiesPage.vue';
import ContactPage from '../views/ContactPage.vue';
import LTW from '../views/LinkToWechatPage.vue';
import PostPage from '../views/PostPage.vue';

// 自定义标题映射表（只包含需要自定义的页面）
const customTitles = {
  '/': '亲子拾光-专业亲子研学连锁机构',
  '/ltw': '关注亲子拾光微信公众号'
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/p',
    redirect: '/courses'
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: TeachersPage,
    meta: {
      title: '师资力量'
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesPage,
    meta: {
      title: '课程介绍'
    }
  },
  {
    path: '/activities',
    name: 'Activities',
    component: ActivitiesPage,
    meta: {
      title: '活动展示'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: {
      title: '联系我们'
    }
  },
  {
    path: '/ltw',
    name: '前往微信公众号',
    component: LTW,
    meta: {
      title: '关注微信公众号'
    }
  },
  {
    path: '/p/:slug',
    name: 'Post',
    component: PostPage,
    meta: {
      title: '文章'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 如果是文章页面，标题会在组件中动态设置
  if (to.name === 'Post') {
    next();
    return;
  }
  
  // 检查是否有自定义标题
  if (customTitles[to.path]) {
    document.title = customTitles[to.path];
  } else {
    // 使用默认的meta标题
    document.title = to.meta.title + ' - 亲子拾光';
  }
  
  next();
});

export default router;
