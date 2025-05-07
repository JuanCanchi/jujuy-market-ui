import UserLayout from '@/layouts/UserLayout.vue'

export default [
  {
    path: '/dashboard/products/create',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'create-product',
        component: () => import('@/modules/products/views/ProductCreateView.vue'),
      },
    ],
  },
  {
    path: '/dashboard/products/edit/:id',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'edit-product',
        component: () => import('@/modules/products/views/ProductEditView.vue'),
      },
    ],
  },
]
