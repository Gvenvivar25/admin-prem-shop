import {addNation, getAllNations, getOneNation, removeNation, updateNation} from '@/firebase/nation'


export default {
  namespaced: true,
  state() {
    return {
      nations: []
    }
  },
  mutations: {
    setNations(state, nations) {
      state.nations = nations
    },
    addNation(state, nation) {
      state.nations.push(nation)
    },
    updateNation(state, nation) {
      const idx = state.nations.findIndex(item => item.id === nation.id)
      if (idx !== -1) {
        state.nations[idx] = nation
      }
    }
  },
  actions: {
    async loadNations({commit, dispatch}) {
      try {
        const nations = await getAllNations()
        commit('setNations', nations)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        return await getOneNation(id)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        await addNation({...payload, id: payload.name})
        commit('addNation', {...payload, id: payload.name})
        dispatch('setMessage', {
          value: 'Nation is successfully added',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({commit, dispatch }, nation) {
      try {
        await updateNation(nation)
        commit('updateNation', nation)
        dispatch('setMessage', {
          value: 'Nation is successfully updated',
          type: 'primary'
        }, {root: true})
        return nation
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async delete({dispatch}, id) {
      try {
        await removeNation(id)
        dispatch('loadNations')
        dispatch('setMessage', {
          value: 'Nation is deleted',
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
    nations(state) {
      return state.nations
    }
  }
}