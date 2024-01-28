import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: { requireGuest: true }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/UserView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: () => import('../views/auth/DepositView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('../views/auth/WithdrawView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../views/auth/TransferView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/auth/HistoryView.vue'),
      meta: { requireAuth: true }
    }
  ]
})

//navigation guard 
router.beforeEach((to, from) => {

  const store = useAuthStore()

  if (to.meta.requireAuth && !store.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  } else if (to.meta.requireGuest && store.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
