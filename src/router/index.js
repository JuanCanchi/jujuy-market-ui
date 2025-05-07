import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import productRoutes from './routes/products'
import adminRoutes from './routes/admin'
import homeRoutes from './routes/home' // si querés modularizar home también

const routes = [
  ...homeRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...productRoutes,
  ...adminRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
