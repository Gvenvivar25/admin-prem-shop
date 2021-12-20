import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    }
  },

  {
    path: '/products',
    name: 'AdminProducts',
    component: () => import('../views/veh_info/ProductList.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    }
  },
  {
    path: '/products/:id',
    name: 'ProductEdit',
    component: () => import('../views/veh_info/ProductEdit.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
  },
  {
    path: '/items',
    name: 'AdminItems',
    component: () => import('../views/Items.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    }
  },
  {
    path: '/items/:id',
    name: 'ItemsEdit',
    component: () => import('../views/ItemsEdit.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    props: true
  },
  {
    path: '/currencies',
    name: 'AdminCurrencies',
    component: () => import('../views/Currencies.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    }
  },

  {
    path: '/currencies/:id',
    name: 'CurrencyEdit',
    component: () => import('../views/CurrencyEdit.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    props: true
  },

  {
    path: '/tiers',
    name: 'AdminTiers',
    component: () => import('../views/veh_info/Tiers.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    }
  },
  {
    path: '/tiers/:id',
    name: 'TierEdit',
    component: () => import('../views/veh_info/TierEdit.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    props: true
  },
  {
    path: '/types',
    name: 'AdminTypes',
    component: () => import('../views/veh_info/Types.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    }
  },
  {
    path: '/types/:id',
    name: 'TypeEdit',
    component: () => import('../views/veh_info/TypesEdit'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    props: true
  },

  {
    path: '/nations',
    name: 'AdminNations',
    component: () => import('../views/veh_info/Nations.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    }
  },
  {
    path: '/nations/:id',
    name: 'NationEdit',
    component: () => import('../views/veh_info/NationsEdit.vue'),
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    props: true
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const requireAdmin = to.meta.admin

  if(requireAdmin) {
    if(store.getters['auth/isAdmin']) {
      return next()
    } else {
      return next('/auth?message=veh_info')
    }
  }

  if(requireAuth){
    if(store.getters['auth/isAuthenticated']) {
      return next()
    } else {
      return next('/auth?message=auth')
    }
  }
  next()
})

export default router
