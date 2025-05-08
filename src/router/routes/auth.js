import VisitorLayout from '@/layouts/VisitorLayout.vue'

export default [
  {
    path: '/login',
    component: VisitorLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/modules/auth/views/LoginView.vue')
      }
    ]
  },
  {
    path: '/register',
    component: VisitorLayout,
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('@/modules/auth/views/RegisterView.vue')
      }
    ]
  }
]
