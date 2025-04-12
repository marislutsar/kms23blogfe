import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  // Protect both admin routes and tag management routes
  if (to.path.startsWith('/admin') || to.path.startsWith('/tags/create') || to.path.startsWith('/tags/edit')) {
    if (!userStore.user) {
      return navigateTo('/login')
    }
  }
})
