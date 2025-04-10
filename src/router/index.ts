import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import DefaultLayout from '../layouts/default.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '',
  //   redirect: '/folder/Inbox'
  // },
  // {
  //   path: '/folder/:id',
  //   component: () => import ('../views/FolderPage.vue'),
  //   meta: { requiresAuth: true } 
  // },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/home',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    next('/login');
  } else {
    // Proceed to the route
    next();
  }
});

export default router;