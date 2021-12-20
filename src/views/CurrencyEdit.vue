<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="currency" :title="currency.name">
      <form @submit.prevent="onUpdate">
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="currency.name">
        </div>

        <div class="form-control">
          <label for="sign">Currency sign</label>
          <input type="text" id="sign" v-model.trim="currency.sign">
        </div>

        <div class="form-control">
          <label for="multiplier">Currency multiplier</label>
          <input type="number" step="0.0000001" id="multiplier" v-model.trim="currency.multiplier">
        </div>

        <button class="btn danger" @click.prevent="confirm = true">Delete</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Update</button>
      </form>
  </app-page>
  <div class="card" v-else>There is no such currency</div>


  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Are you sure you want to delete currency?"
        @reject="confirm = false"
        @confirm="remove"
    ></app-confirm>
  </teleport>

  <teleport to="body">
    <app-confirm
        v-if="saveChanges"
        title="The changes were not saved. Changes will be lost during the transition. Leave the page?"
        @reject="saveChanges = false"
        @confirm="navigate"
    ></app-confirm>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppConfirm from '@/components/ui/AppConfirm'
import {useLeaveGuard} from '@/use/leave-guard'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref, onMounted, computed} from 'vue'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const currency = ref({})
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      initial = await store.dispatch('currency/loadOne', route.params.id)
      currency.value = {...initial}
      loading.value = false
    })

    const hasChanges = computed(() =>
        currency.value.name !== initial.name ||
        currency.value.sign !== initial.sign ||
        currency.value.multiplier !== initial.multiplier
    )

    const remove = async () => {
      confirm.value = false
      await store.dispatch('currency/delete', route.params.id)
      router.push({name: 'AdminCurrencies'})
    }

    const onUpdate = async () => {
      currency.value.multiplier = Number(currency.value.multiplier)
      initial = await store.dispatch('currency/update', currency.value)
      currency.value = {...initial}
    }

    return {
      currency,
      loading,
      hasChanges,
      remove,
      confirm,
      onUpdate,
      ...useLeaveGuard(hasChanges)
    }
  },
components: {AppPage, AppLoader, AppConfirm}
}
</script>

<style scoped>

</style>