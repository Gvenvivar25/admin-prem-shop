import {addProduct, getAllProducts, getOneProduct, removeProduct, updateProduct} from '@/firebase/product'

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  getters: {
    products(state) {
      return state.products
    }
  },
  mutations: {
    setProducts(state, prods) {
      state.products = prods
    },
    addProduct(state, product) {
      state.products.unshift(product)
    },
    updateProductDiscount(state, {id, discPer, discValue}) {
      const product = state.products.find(p => p.id === id)
      product.discPer = discPer
      product.discValue = discValue
    },
    updateProductWeight(state, {id, weight}) {
      const product = state.products.find(p => p.id === id)
      product.weight = weight
    },
    updateProduct(state, product) {
      const idx = state.products.findIndex(item => item.id === product.id)
      if (idx !== -1) {
        state.products[idx] = product
      }
    }
  },
  actions: {
    async loadProducts({commit, dispatch}) {
      try {
        const products = await getAllProducts()
        commit('setProducts', products)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        return await getOneProduct(id)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        const id = await addProduct(payload)
        commit('addProduct', {...payload, id: id})
        dispatch('setMessage', {
          value: 'Product is successfully added',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({commit, dispatch }, product) {
      try {
        await updateProduct(product)
        commit('updateProduct', product)
        dispatch('setMessage', {
          value: 'Product is successfully updated',
          type: 'primary'
        }, {root: true})
        return product
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },

    async updateDiscount({commit, dispatch }, product) {
      try {
        await updateProduct(product)
        commit('updateProductDiscount', product)
        dispatch('setMessage', {
          value: 'Discounts are successfully updated',
          type: 'primary'
        }, {root: true})
        return product
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async updateWeight({commit, dispatch }, product) {
      try {
        await updateProduct(product)
        commit('updateProductWeight', product)
        dispatch('setMessage', {
          value: 'Priority for products is successfully updated',
          type: 'primary'
        }, {root: true})
        return product
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },

    async delete({dispatch}, id) {
      try {
        await removeProduct(id)
        dispatch('loadProducts')
        dispatch('setMessage', {
          value: 'Product is deleted',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  }
}