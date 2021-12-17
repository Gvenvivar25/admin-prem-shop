<template>
  <app-page title="Vehicle tiers">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>
  <div class="card">
    <tiers-table
        v-if="tiers"
        :tiers="tiers"
    ></tiers-table>
    <h4 class="text-center" v-else>There is no tiers yet</h4>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Add tier" @close="modal = false">
      <tier-modal @created="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import TierModal from '@/components/tier/TierModal'
import TiersTable from '@/components/tier/TiersTable'
import {onMounted, computed, ref} from 'vue'

import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)

    onMounted(async ()=> {
      await store.dispatch('tier/loadTiers')
    })
    const tiers = computed(() => store.getters['tier/tiers'])

    return {
      tiers,
      modal,
    }
  },
  components: {TierModal, AppPage, TiersTable, AppModal}
}
</script>

<style scoped>

</style>