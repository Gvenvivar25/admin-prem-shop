<template>
  <app-page title="Vehicle types">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>
  <div class="card">
    <types-table
        v-if="types"
        :types="types"
    ></types-table>
    <h4 class="text-center" v-else>There is no types yet</h4>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Add type" @close="modal = false">
      <type-modal @created="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import TypeModal from '@/components/type/TypeModal'
import TypesTable from '@/components/type/TypesTable'
import {onMounted, computed, ref} from 'vue'

import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)

    onMounted(async ()=> {
      await store.dispatch('type/loadTypes')
    })
    const types = computed(() => store.getters['type/types'])

    return {
      types,
      modal,
    }
  },
  components: {TypeModal, AppPage, TypesTable, AppModal}
}
</script>

<style scoped>

</style>