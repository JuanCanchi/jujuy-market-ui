import UserLayout from '@/layouts/UserLayout.vue'

export default [
  {
    path: '/dashboard/profile',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('@/modules/profile/views/ProfileView.vue'),
      },
    ],
  }
]
