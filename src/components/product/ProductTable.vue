<template>
  <table class="table">
    <thead>
    <tr>
      <th>№</th>
      <th> Name </th>
      <th>Image</th>
      <th>Base Price, $</th>
      <th>Actual Price</th>
      <th>Category</th>
      <th>discount %</th>
      <th>discount value</th>
      <th>Priority</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(prod, idx) in products" :key="prod.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ prod.name }}</td>
      <td ><img :src="prod.image" alt="Img" class="product-list-img"></td>
      <td>{{ prod.price.toFixed(2) }}$</td>
      <td>{{ ((Number(prod.price)- Number(prod.price*prod.discPer/100)-Number(prod.discValue))*Number(actCur.multiplier))
          .toFixed(2) }}{{ actCur.sign }}</td>
      <td>{{ prod.category.toString() }}</td>
      <td>{{ prod.discPer }}</td>
      <td>{{ prod.discValue }}</td>
      <td>{{ prod.weight }}</td>
      <td>
        <button class="btn" @click="$router.push(`/products/${prod.id}`)">Open/edit</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

import {onMounted, computed} from 'vue'
import {useStore} from 'vuex'
export default {
  props: ['products'],
  setup() {
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('currency/loadActualCurrency')
    })

    const actCur = computed(() => store.getters['currency/actualCurrency'])
    return {
      actCur
    }
  }
}
</script>

<style scoped>

</style>