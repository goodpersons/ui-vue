import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Layout,
      path: '/',
      children: [

      ]
    },
    {
      component: ()=> import('../views/signin.vue'),
      path: '/signin',
    },
    {
      component: ()=> import('../views/signup.vue'),
      path: '/signup',
    }
  ]
})

export default router
