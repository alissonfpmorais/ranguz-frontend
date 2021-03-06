import Main from '@/components/Main'
import Login from '@/components/Login'
import Store from '@/components/Store'
import Register from '@/components/Register'
import Shopping from '@/components/Shopping'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/client/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/client/shopping',
    name: 'Shopping',
    component: Shopping
  }
]

export default routes
