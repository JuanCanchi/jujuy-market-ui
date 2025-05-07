import VisitorLayout from '@/layouts/VisitorLayout.vue'

export default [
  {
    path: '/',
    component: VisitorLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/modules/home/views/HomeView.vue')
      }
    ]
  }
]
