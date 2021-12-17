import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  /*{
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      layout: 'main',
      auth: false,

    }
  },*/
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    }
  },
/*  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false,
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false,
    }
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
    meta: {
      layout: 'main',
      auth: true,
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/GateWay.vue'),
    redirect: '/account/main',
    meta: {
      layout: 'main',
      auth: false,
    },
    children: [{
      path: 'main',
      name: 'AccountMainPage',
      component: () => import('../views/account/Account.vue'),
      meta: {
        layout: 'main',
        auth: false,
      }
    },
      {
        path: 'personal',
        name: 'PersonalData',
        component: () => import('../views/account/PersonalData.vue'),
        meta: {
          layout: 'main',
          auth: true,
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/account/Orders.vue'),
        meta: {
          layout: 'main',
          auth: true,
        }
      }
    ]
  },*/
  /*{
    path: '/',
    name: 'Admin',
    component: () => import('../views/GateWay.vue'),
    redirect: '/products',
    meta: {
      layout: 'veh_info',
      auth: true,
      veh_info: true
    },
  },*/
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
