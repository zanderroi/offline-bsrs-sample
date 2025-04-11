import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Preferences } from '@capacitor/preferences';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import DefaultLayout from '../layouts/default.vue';
import LicenseKey from '../views/LicenseKey.vue';

const routes: Array<RouteRecordRaw> = [

  {
    path: '/login',
    component: Login,
  },
  {
    path: '/license',
    component: LicenseKey
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


router.beforeEach(async (to, from, next) => {
  const { value: token } = await Preferences.get({ key: 'token' });

  if (to.meta.requiresAuth && !token) {
    // Redirect to login if not authenticated
    next('/login');
  } else {
    // Proceed to the route
    next();
  }
});

export default router;