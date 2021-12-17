import {useStore} from 'vuex'

export async function useCategories() {
  const store = useStore()

  if(store.getters['tier/categories'].length === 0) {
    await store.dispatch('tier/loadCategories')
  }
}