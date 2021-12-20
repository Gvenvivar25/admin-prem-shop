import {addTier, getAllTiers, getOneTier, removeTier, updateTier} from '@/firebase/firebase'
export default {
  namespaced: true,
  state() {
    return {
      tiers: []
    }
  },
  mutations: {
    setTiers(state, tiers) {
      state.tiers = tiers
    },
    addTier(state, tier) {
      state.tiers.push(tier)
    },
    updateTier(state, tier) {
      const idx = state.tiers.findIndex(item => item.id === tier.id)
      if (idx !== -1) {
        state.tiers[idx] = tier
      }
    }
  },
  actions: {
    async loadTiers({commit, dispatch}) {
      try {
        /*const {data} = await axios.get(url)
        console.log(data)
        const fields = []
        data.documents.forEach(doc => {
          fields.push(doc.fields)
        })
        console.log(fields)
        const tiers = FireStoreParser(fields)*/
        const tiers = await getAllTiers()
        console.log(tiers)
        commit('setTiers', tiers)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        const data = await getOneTier(id)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        await addTier({...payload, id: payload.tier})
        commit('addTier', {...payload, id: payload.tier})
        dispatch('setMessage', {
          value: 'Tier is successfully added',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({commit, dispatch }, tier) {
      try {
        await updateTier(tier)
        commit('updateTier', tier)
        dispatch('setMessage', {
          value: 'Tier is successfully updated',
          type: 'primary'
        }, {root: true})
        return tier
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async delete({dispatch}, id) {
      try {
        await removeTier(id)
        dispatch('loadTiers')
        dispatch('setMessage', {
          value: 'Tier is deleted',
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
    tiers(state) {
      return state.tiers
    }
  }
}