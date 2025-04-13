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
    name: 'Login',
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
  const { value: licenseKey } = await Preferences.get({ key: 'license_key' });

  // Redirect to /license if licenseKey is not set
  if (!licenseKey && to.path !== '/license') {
    next('/license');
    return;
  }

  // Redirect to /login if the route requires authentication and no token is present
  if (to.meta.requiresAuth && !token) {
    next('/login');
    return;
  }


  // Redirect to /home if the user is already logged in and tries to access /login
  if (to.path === '/login' && token) {
    next('/home');
    return;
  }

  // Allow access to the route
  next();
});

export default router;