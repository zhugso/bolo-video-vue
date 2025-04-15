import { useTokenStore } from '@/stores/token';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../views/IndexView.vue'),
    },
    {
      path: '/video/:videoId',
      name: 'Video',
      component: () => import('../views/VideoView.vue'),
      props: true,
    },
    {
      path: '/search/:input',
      name: 'Search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView/HomeView.vue'),
      redirect: '/home/index',
      children: [
        {
          path: 'index',
          name: 'HomeIndex',
          component: () => import('../views/HomeView/IndexView.vue'),
        },
        {
          path: 'avatar',
          name: 'HomeAvatar',
          component: () => import('../views/HomeView/AvatarView.vue'),
        },
        {
          path: 'info',
          name: 'HomeInfo',
          component: () => import('../views/HomeView/InfoView.vue'),
        },
      ],
    },
    {
      path: '/upload-manager',
      name: 'UploadManager',
      redirect: '/upload-manager/index',
      component: () => import('../views/UploadManager/UploadManagerView.vue'),
      children: [
        {
          path: 'upload',
          name: 'UploadManagerUpload',
          component: () => import('../views/UploadManager/UploadView.vue'),
        },
        {
          path: 'index',
          name: 'UploadManagerIndex',
          component: () => import('../views/UploadManager/IndexView.vue'),
        },
        {
          path: 'article',
          name: 'UploadManagerArticle',
          component: () => import('../views/UploadManager/ArticleView.vue'),
        },
        {
          path: 'Appeal',
          name: 'UploadManagerAppeal',
          component: () => import('../views/UploadManager/AppealView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/space',
      name: 'Space',
      component: () => import('../views/SpaceView.vue'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  console.log(to);

  const tokenStore = useTokenStore();
  console.log(!tokenStore.getToken);

  if (to.name !== 'Login' && to.name !== 'Index' && !tokenStore.getToken) {
    next({ name: 'Index' });
  } else {
    next();
  }
});

export default router;
