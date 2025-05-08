import UserLayout from '@/layouts/UserLayout.vue'
import VisitorLayout from '@/layouts/VisitorLayout.vue'

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
  {
    path: '/products',
    component: VisitorLayout,
    children: [
      {
        path: '',
        name: 'public-products',
        component: () => import('@/modules/products/views/PublicProductList.vue')
      }
    ]
  },
  {
    path: '/products/:id',
    component: VisitorLayout,
    children: [
      {
        path: '',
        name: 'product-detail',
        component: () => import('@/modules/products/views/ProductDetailView.vue')
      }
    ]
  }
]
