import UserLayout from '@/layouts/UserLayout.vue'
import { useAuth } from '@/modules/auth/stores/useAuth.js'

export default [
  {
    path: '/dashboard',
    component: UserLayout,
    beforeEnter: (to, from, next) => {
      const auth = useAuth()
      if (auth.isAuthenticated()) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/modules/dashboard/views/DashboardHome.vue')
      }
    ]
  }
]
