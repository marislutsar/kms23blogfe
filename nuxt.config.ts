// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css' }]
    }
  },
  modules: ['@pinia/nuxt'],
  hooks: {
    'app:created': (app) => {
      app.middleware.push({
        name: 'auth',
        path: '/tags/create',
        handler: 'auth'
      })
      app.middleware.push({
        name: 'auth',
        path: '/tags/edit',
        handler: 'auth'
      })
    }
  },
  routeRules: {
    '/api/**': {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  },
  runtimeConfig: {
    public: {
      api: {
        baseUrl: 'http://localhost:8000/api',
      }
    }
  }
});
