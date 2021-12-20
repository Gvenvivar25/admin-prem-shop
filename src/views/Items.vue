<template>
  <app-page title="In-game items">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>
  <div class="card">
    <items-table
        v-if="items"
        :items="items"
    ></items-table>
    <h4 class="text-center" v-else>There is no items yet</h4>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Add item" @close="modal = false">
      <item-modal @created="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import ItemModal from '@/components/item/ItemModal'
import ItemsTable from '@/components/item/ItemsTable'
import {onMounted, computed, ref} from 'vue'

import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)

    onMounted(async ()=> {
      await store.dispatch('item/loadItems')
    })
    const items = computed(() => store.getters['item/items'])

    return {
      items,
      modal,
    }
  },
  components: {ItemModal, AppPage, ItemsTable, AppModal}
}
</script>

<style scoped>

</style>