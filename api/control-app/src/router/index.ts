import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import store from '@/store/index';
import Login from '@/views/Login.vue';
import Frame from '@/views/Frame.vue';
import Tabs from '@/views/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs'
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: Tabs,
    meta: {reqAuth: true },
      children: [
      {
        path: '',
        redirect: '/tabs/frames'
      },
      {
        path: '/tabs/frames/:id',
        name: 'Frame',
        component: Frame,
        props: (route) => ({ id: route.params.id }),
        meta: { reqAuth: true }
      },
      {
        path: 'frames',
        component: () => import('@/views/Frames.vue')
      },
      {
        path: 'galleries',
        component: () => import('@/views/Galleries.vue')
      },
      {
        path: 'galleries/:id',
        name: 'Gallery',
        component: () => import('@/views/Gallery.vue'),
        props: (route) => ({id: route.params.id }),
        meta: { reqAuth: true }
      },
      {
        path: 'setup',
        component: () => import('@/views/Setup.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { reqNoAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta.reqAuth && !store.getters['auth/isAuthenticated']) {
    next('/login');
  } else if (to.meta.reqUnauth && store.getters['auth/isAuthenticated']) {
    next('/');
  } else {
    next();
  }
});

export default router
