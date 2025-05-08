import AdminLayout from '@/layouts/AdminLayout.vue'

export default [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('@/modules/admin/views/AdminPendingProducts.vue')
      }
    ]
  }
]
