import {useStore} from 'vuex'

export async function useLoad() {
  const store = useStore()

  if(!store.getters['tier/categories'].length) {
    await store.dispatch('tier/loadCategories')
  }

  if(!store.getters['product/products'].length) {
    await store.dispatch('product/loadProducts')
  }
}