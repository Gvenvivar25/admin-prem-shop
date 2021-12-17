import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import product from './modules/product.module'
import tier from './modules/tier.module'
import cart from './modules/cart.module'
import order from './modules/order.module'
import type from './modules/type.module'

const plugins = []

if(process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message: null
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {commit('clearMessage')}, 3000)
    }
  },
  modules: {
    auth, product, tier, cart, order, type
  }
})
