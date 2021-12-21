<template>
  <app-loader v-if="loading" />
  <app-page title="Products">
    <template #header>
      <button class="btn primary" @click="modal = true">Add</button>
    </template>
  </app-page>
  <div class="flex_center">
    <product-filter v-model="filter"></product-filter>
    <button class="btn" v-if="checked" @click="discount = true">Set discount</button>
    <button class="btn" v-if="checked" @click="weight = true">Set weight</button>
  </div>

  <div class="card">
    <product-table
        :products="paginatedProducts"
        @checkbox="showButton"
    ></product-table>

    <app-pagination
    v-model="page"
    :count="products.length"
    :size="PAGE_SIZE"
    >
    </app-pagination>
  </div>

  <teleport to="body">
    <app-modal v-if="discount" title="Set discount" @close="discount = false">
      <discount-modal @created-disc="discount = false" :checkedProds="checkedProds" />
    </app-modal>
  </teleport>

  <teleport to="body">
    <app-modal v-if="weight" title="Set weight" @close="weight = false">
      <weight-modal @created-weight="weight = false" :checkedProds="checkedProds" />
    </app-modal>
  </teleport>

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
import DiscountModal from '@/components/product/DiscountModal'
import WeightModal from '@/components/product/WeightModal'


export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const modal = ref(false)
    const checked = ref(false)
    const weight = ref(false)
    const discount = ref(false)
    const checkedProds = ref({})
    const loading = ref(true)
    const PAGE_SIZE = 5
    const page= ref(route.query.page ? route.query.page : 1)
    const filter = ref({
      search: route.query.search,
    })

    const _setPage = () => router.replace({query: {page: page.value}})
    const showButton = (prods) => {
      checked.value = true
      checkedProds.value = prods.value
    }

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
      filter,
      showButton,
      checked,
      weight,
      discount,
      checkedProds
    }
  },
  components: {AppPage, ProductTable, AppLoader, AppModal, ProductModal, AppPagination, ProductFilter, DiscountModal,
    WeightModal}
}
</script>

<style scoped>

</style>