import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import TeachersPage from '@/views/TeachersPage.vue';
import CoursesPage from '@/views/CoursesPage.vue';
import ActivitiesPage from '@/views/ActivitiesPage.vue';
import ContactPage from '@/views/ContactPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: TeachersPage
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesPage
  },
  {
    path: '/activities',
    name: 'Activities',
    component: ActivitiesPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
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

export default router;
