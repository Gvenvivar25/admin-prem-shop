import {addType, getAllTypes, getOneType, removeType, updateType} from '@/firebase/type'

export default {
  namespaced: true,
  state() {
    return {
      types: []
    }
  },
  mutations: {
    setTypes(state, types) {
      state.types = types
    },
    addType(state, type) {
      state.types.push(type)
    },
    updateType(state, type) {
      const idx = state.types.findIndex(item => item.id === type.id)
      if (idx !== -1) {
        state.types[idx] = type
      }
    }
  },
  actions: {
    async loadTypes({commit, dispatch}) {
      try {
        const types = await getAllTypes()
        commit('setTypes', types)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        return await getOneType(id)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        await addType({...payload, id: payload.name})
        commit('addType', {...payload, id: payload.name})
        dispatch('setMessage', {
          value: 'Type is successfully added',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({commit, dispatch }, type) {
      try {
        await updateType(type)
        commit('updateType', type)
        dispatch('setMessage', {
          value: 'Type is successfully updated',
          type: 'primary'
        }, {root: true})
        return type
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async delete({dispatch}, id) {
      try {
        await removeType(id)
        dispatch('loadTypes')
        dispatch('setMessage', {
          value: 'Type is deleted',
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
    types(state) {
      return state.types
    }
  }
}