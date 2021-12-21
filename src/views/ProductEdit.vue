<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="product" :title="product.name">
      <div>
        <img class="cart-img" :src="product.image" :alt="product.name">
      </div>
      <form @submit.prevent="onUpdate">
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="product.name">
        </div>

        <div class="form-control">
          <label for="image">Image</label>
          <input type="url" id="image" v-model="product.image">
        </div>

        <div class="form-control">
          <label for="card_image">Image for product page</label>
          <input type="url" id="card_image" v-model="product.card_image">
        </div>

        <div class="form-control">
          <label for="price">Price</label>
          <input type="number" step="0.001" id="price" v-model.number="product.price">
        </div>

        <div class="form-control">
          <label for="description">Product description</label>
          <textarea cols="5" rows="5" id="description" v-model="product.description"></textarea>
        </div>

        <div class="form-control">
          <div class="input_flex">
            <label for="isActive" style="flex: 3 0 auto">Active for sales</label>
            <input type="checkbox" id="isActive" v-model.number="product.isActive">
          </div>
        </div>

        <div class="form-control">
          <label for="startDate">Start sales date</label>
          <input type="date" id="startDate" v-model="product.startDate">
        </div>

        <div class="form-control">
          <label for="endDate">End sales date</label>
          <input type="date" id="endDate" v-model="product.endDate">
        </div>

        <label for="name">Category (click add button to add category)</label>
        <div class="form-control" v-for="(cat, idx) in product.category" :key="idx">

          <div class="input_flex">
            <input type="text" id="category[idx]" v-model="product.category[idx]">
            <button class="btn" type="button" @click="removeCategory(idx)">Remove</button>
          </div>
        </div>
        <div style="margin: 5px 0">
          <button type="button" class="btn primary" @click="pushCategory()">Add</button>
        </div>

        <label for="name">Items (click add/remove button to add/remove item and it's quantity in product)</label>
        <div class="form-control" v-for="(item, idx) in items" :key="idx">

          <div class="input_flex">
            <input type="text" style="margin-right: 10px" id="items[idx].id" v-model="items[idx].id">
            <input type="text" id="items[idx].value" v-model="items[idx].value">
            <button class="btn" type="button" @click="removeItem(idx)">Remove</button>
          </div>
        </div>
        <div style="margin: 5px 0">
          <button type="button" class="btn primary" @click="pushItem()">Add</button>
        </div>
        <div class="form-control">
          <label for="weight">Priority (1- low, ... 1000 - high)</label>
          <input type="number" id="weight" v-model="product.weight">
        </div>

        <div class="form-control">
          <label for="discPer">Discount, %</label>
          <input type="number" id="discPer" v-model="product.discPer">
        </div>

        <div class="form-control">
          <label for="discValue">Discount, $</label>
          <input type="number" step="0.001" id="discValue" v-model="product.discValue">
        </div>

        <button class="btn danger" @click="confirm = true">Delete</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Update</button>
      </form>
  </app-page>
  <div class="card" v-else>There is no such product</div>

  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Are you sure you want to delete product?"
        @reject="confirm = false"
        @confirm="removeProduct"
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
import {array_compare} from '@/utils/compare'
import {Timestamp} from 'firebase/firestore'

export default {

  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const product = ref({})
    const items = ref([])
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      initial = await store.dispatch('product/loadOne', route.params.id)
      product.value = JSON.parse(JSON.stringify(initial))

      product.value.startDate = new Timestamp(product.value.startDate.seconds+86400, product.value.startDate.nanoseconds)
          .toDate().toISOString().split('T')[0]
      product.value.endDate = new Timestamp(product.value.endDate.seconds+86400, product.value.endDate.nanoseconds)
          .toDate().toISOString().split('T')[0]
      Object.entries(product.value.items).map(([key, value]) => {

        items.value.push({id: key, value: value})
      })
      loading.value = false
    })

    /*const categories = computed( () => store.getters['tier/categories'])*/

    const hasChanges = computed(() =>
        product.value.name !== initial.name ||
        product.value.description !== initial.description ||
        product.value.price !== initial.price ||
        product.value.image !== initial.image ||
        product.value.card_image !== initial.card_image ||
        product.value.discPer !== initial.discPer ||
        product.value.discValue !== initial.discValue ||
        product.value.weight !== initial.weight ||
        product.value.isActive !== initial.isActive ||
        product.value.startDate !== initial.startDate ||
        product.value.endDate !== initial.endDate ||
        !array_compare(product.value.category, initial.category) ||
        JSON.stringify(product.value.items) !== JSON.stringify(initial.items)
    )
    const removeCategory = (idx) => {
      if (idx > -1) {
        product.value.category.splice(idx, 1)
      }
    }
    const removeItem = (idx) => {
      if (idx > -1) {
        items.value.splice(idx, 1)
      }
      const obj = {}
      for(let i = 0; i < items.value.length; i++) {
        let item = Object.values(items.value[i])
        obj[item[0]] = Number(item[1])
      }
      product.value.items = obj
    }
    const pushCategory = () => {
      if(product.value.category) {
        product.value.category.push('')
      } else {
        product.value.category = []
        product.value.category.push('')
      }
    }

    const pushItem = () => {
      if(items.value) {
        items.value.push({id: '', value: ''})
      } else {
        items.value = []
        items.value.push({id: '', value: ''})
      }
    }
    const removeProduct = async () => {
      confirm.value = false
      await store.dispatch('product/delete', route.params.id)
      router.push({name: 'AdminProducts'})
    }

    const onUpdate = async () => {
      const obj = {}
      for(let i = 0; i < items.value.length; i++) {
        let item = Object.values(items.value[i])
        obj[item[0]] = Number(item[1])
      }
      product.value.items = obj
      product.value.weight = Number( product.value.weight)

      product.value.startDate = Timestamp.fromDate(new Date(product.value.startDate))
      product.value.endDate = Timestamp.fromDate(new Date(product.value.endDate))

      initial = await store.dispatch('product/update', product.value)
      initial.startDate = new Timestamp(initial.startDate.seconds+86400, initial.startDate.nanoseconds)
          .toDate().toISOString().split('T')[0]
      initial.endDate = new Timestamp(initial.endDate.seconds+86400, initial.endDate.nanoseconds)
          .toDate().toISOString().split('T')[0]

      product.value = JSON.parse(JSON.stringify(initial))
    }

    return {
      loading,
      product,
      items,
      hasChanges,
      removeProduct,
      removeItem,
      removeCategory,
      pushCategory,
      pushItem,
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