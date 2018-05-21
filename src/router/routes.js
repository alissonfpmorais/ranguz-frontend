import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Shopping from '@/components/Shopping'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/client/login',
    name: 'Login',
    component: Login
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
