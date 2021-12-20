import {addItem, getAllItems, getOneItem, removeItem, updateItem} from '@/firebase/item'

export default {
  namespaced: true,
  state() {
    return {
      items: []
    }
  },
  mutations: {
    setItems(state, items) {
      state.items = items
    },
    addItem(state, item) {
      state.items.unshift(item)
    },
    updateItem(state, item) {
      const idx = state.items.findIndex(it => it.id === item.id)
      if (idx !== -1) {
        state.items[idx] = item
      }
    }
  },
  actions: {
    async loadItems({commit, dispatch}) {
      try {
        const items = await getAllItems()
        commit('setItems', items)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        return await getOneItem(id)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        await addItem(payload)
        commit('addItem', payload)
        dispatch('setMessage', {
          value: 'Item is successfully added',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({commit, dispatch }, item) {
      try {
        await updateItem(item)
        commit('updateItem', item)
        dispatch('setMessage', {
          value: 'Item is successfully updated',
          type: 'primary'
        }, {root: true})
        return item
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async delete({dispatch}, id) {
      try {
        await removeItem(id)
        dispatch('loadItems')
        dispatch('setMessage', {
          value: 'Item is deleted',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  },
  getters: {
    items(state) {
      return state.items
    }
  }
}