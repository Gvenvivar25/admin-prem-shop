<template>

  <div class="card">

    <h3 >Actual shop currency</h3>
    <div class="form-control">
      <label for="nation">Choose currency from list to set new currency in shop</label>
      <select id="nation" v-model="actCur.name" name="actCur">
        <option disabled>Choose currency</option>
        <option v-for="(cur, idx) in currencies" :key="idx" :value="cur.name">{{ cur.name}}</option>
      </select>

    </div>
    <button class="btn primary" @click.prevent="confirm = true">Set</button>

  </div>
  <app-page title="Currencies">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>

  <div class="card">
    <currencies-table
        v-if="currencies"
        :currencies="currencies"
    ></currencies-table>
    <h4 class="text-center" v-else>There is no any currency yet</h4>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Add currency" @close="modal = false">
      <currency-modal @created="modal = false" />
    </app-modal>
  </teleport>

  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Are you sure you want to set new currency?"
        @reject="confirm = false"
        @confirm="setCurrency"
    ></app-confirm>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import AppConfirm from '@/components/ui/AppConfirm'
import CurrencyModal from '@/components/currency/CurrencyModal'
import CurrenciesTable from '@/components/currency/CurrenciesTable'
import {onMounted, computed, ref} from 'vue'

import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const confirm = ref(false)

    onMounted(async ()=> {
      await store.dispatch('currency/loadCurrencies')
      await store.dispatch('currency/loadActualCurrency')
    })
    const currencies = computed(() => store.getters['currency/currencies'])
    const actCur = computed(() => store.getters['currency/actualCurrency'])
    const setCurrency = async () => {
      confirm.value = false
      const newCur = {...currencies.value.find(cur => cur.name === actCur.value.name)}
      await store.dispatch('currency/updateActCur', newCur)
    }

    return {
      setCurrency,
      currencies,
      actCur,
      modal,
      confirm
    }
  },
  components: {CurrencyModal, AppPage, CurrenciesTable, AppModal, AppConfirm}
}
</script>

<style scoped>

</style>