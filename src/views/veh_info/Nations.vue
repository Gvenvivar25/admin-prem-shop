<template>
  <app-page title="Vehicle nations">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>
  <div class="card">
    <nations-table
        v-if="nations"
        :nations="nations"
    ></nations-table>
    <h4 class="text-center" v-else>There is no nations yet</h4>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Add nation" @close="modal = false">
      <nation-modal @created="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import NationModal from '@/components/nation/NationModal'
import NationsTable from '@/components/nation/NationsTable'
import {onMounted, computed, ref} from 'vue'

import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)

    onMounted(async ()=> {
      await store.dispatch('nation/loadNations')
    })
    const nations = computed(() => store.getters['nation/nations'])

    return {
      nations,
      modal,
    }
  },
  components: {NationModal, AppPage, NationsTable, AppModal}
}
</script>

<style scoped>

</style>