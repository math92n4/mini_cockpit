import { createRouter, createWebHistory } from 'vue-router'
import UserForm from '../components/UserForm.vue'
import EmailVerification from '../components/EmailVerification.vue'
import Cockpit from '../components/Cockpit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: UserForm,
      props: { mode: 'Login' }
    },
    {
      path: '/verify',
      name: 'EmailVerification',
      component: EmailVerification,
    },
    {
      path: '/register',
      name: 'Register',
      component: UserForm,
      props: { mode: 'Register' }
    },
    {
      path: '/cockpit',
      name: 'Cockpit',
      component: Cockpit,
    },
  ],
})

export default router
