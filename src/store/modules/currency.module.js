import {
  addCurrency,
  getActualCurrency,
  getAllCurrencies,
  getOneCurrency,
  removeCurrency, updateActCurrency,
  updateCurrency
} from '@/firebase/currency'

export default {
  namespaced: true,
  state() {
    return {
      currencies: [],
      actualCurrency: {}
    }
  },
  mutations: {
    setCurrencies(state, currencies) {
      console.log(currencies)
      state.currencies = currencies
    },
    setActualCurrency(state, actCur) {
      console.log(actCur)
      state.actualCurrency = actCur
    },
    addCurrency(state, currency) {
      state.currencies.unshift(currency)
    },
    updateCurrency(state, currency) {
      const idx = state.currencies.findIndex(item => item.id === currency.id)
      if (idx !== -1) {
        state.currencies[idx] = currency
      }
    },
    updateActCurrency(state, currency) {
      state.actualCurrency = currency
    }
  },
  actions: {
    async loadCurrencies({commit, dispatch}) {
      try {
        const currencies = await getAllCurrencies()
        console.log(currencies)
        commit('setCurrencies', currencies)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        const data = await getOneCurrency(id)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },

    async loadActualCurrency({commit, dispatch}) {
      try {
        const data = await getActualCurrency()
        commit('setActualCurrency', data)
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
        console.log(payload)
        await addCurrency({...payload, id: payload.name})
        commit('addCurrency', {...payload, id: payload.id})
        dispatch('setMessage', {
          value: 'Currency is successfully added',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({commit, dispatch }, currency) {
      try {
        await updateCurrency(currency)
        commit('updateCurrency', currency)
        dispatch('setMessage', {
          value: 'Currency is successfully updated',
          type: 'primary'
        }, {root: true})
        return currency
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async updateActCur({commit, dispatch }, currency) {
      try {
        await updateActCurrency(currency)
        commit('updateActCurrency', currency)
        dispatch('setMessage', {
          value: 'Actual currency is successfully updated',
          type: 'primary'
        }, {root: true})
        return currency
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async delete({dispatch}, id) {
      try {
        await removeCurrency(id)
        dispatch('loadCurrencies')
        dispatch('setMessage', {
          value: 'Currency is deleted',
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
    currencies(state) {
      return state.currencies
    },
    actualCurrency(state) {
      return state.actualCurrency
    }
  }
}