<template>
  <app-loader v-if="loading" />
  <app-page title="Products">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>
  <product-filter v-model="filter"></product-filter>

  <div class="card">
    <product-table
        :products="paginatedProducts"
    ></product-table>

    <app-pagination
    v-model="page"
    :count="products.length"
    :size="PAGE_SIZE"
    >
    </app-pagination>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Add product" @close="modal = false">
      <product-modal @created-prod="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import ProductTable from '@/components/product/ProductTable'
import ProductFilter from '@/components/product/ProductFilter'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import ProductModal from '@/components/product/ProductModal'
import AppPagination from '@/components/ui/AppPagination'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {onMounted, computed, ref, watch} from 'vue'
import {chunk} from 'lodash'


export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const modal = ref(false)
    const loading = ref(true)
    const PAGE_SIZE = 50
    const page= ref(route.query.page ? route.query.page : 1)
    const filter = ref({
      search: route.query.search,
    })

    const _setPage = () => router.replace({query: {page: page.value}})

    watch(page, _setPage)

    onMounted(() => _setPage())

    onMounted(async () => {
      await store.dispatch('product/loadProducts')
      loading.value = false
    })

    const products = computed(
        () => store.getters['product/products']
            .filter(product => {
              if (filter.value.search) {
                return product.name.toLowerCase().includes(filter.value.search.toLowerCase())
              }
              return product
            })
            .sort((a, b) => b.count - a.count)
    )

    const paginatedProducts = computed(() => chunk(products.value, PAGE_SIZE)[page.value-1])

    return {
      products,
      modal,
      loading,
      PAGE_SIZE,
      paginatedProducts,
      page,
      filter
    }
  },
  components: {AppPage, ProductTable, AppLoader, AppModal, ProductModal, AppPagination, ProductFilter}
}
</script>

<style scoped>

</style>