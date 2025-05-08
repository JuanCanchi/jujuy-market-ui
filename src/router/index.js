import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import productRoutes from './routes/products'
import adminRoutes from './routes/admin'
import homeRoutes from './routes/home'
import profileRoutes from './routes/profile'
import { useAuth } from '@/modules/auth/stores/useAuth'


const routes = [
  ...homeRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...productRoutes,
  ...adminRoutes,
  ...profileRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔒 Protección global para rutas admin
router.beforeEach((to, from, next) => {
  const auth = useAuth()

  if (to.path.startsWith('/admin') && (!auth.isAuthenticated() || auth.role !== 'ADMIN')) {
    return next('/')
  }

  next()
})

export default router
