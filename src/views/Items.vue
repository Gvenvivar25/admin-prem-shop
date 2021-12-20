<template>
  <app-page title="In-game items">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>
  <product-filter v-model="filter"></product-filter>
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
import ProductFilter from '@/components/product/ProductFilter'
import {onMounted, computed, ref} from 'vue'

import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const modal = ref(false)
    const filter = ref({
      search: route.query.search,
    })
    onMounted(async ()=> {
      await store.dispatch('item/loadItems')
    })
    const items = computed(
        () => store.getters['item/items']
            .filter(item => {
              if (filter.value.search) {
                return item.name.toLowerCase().includes(filter.value.search.toLowerCase())
              }
              return item
            })
            .sort((a, b) => b.count - a.count)
    )

    return {
      items,
      modal,
      filter
    }
  },
  components: {ItemModal, AppPage, ItemsTable, AppModal, ProductFilter}
}
</script>

<style scoped>

</style>