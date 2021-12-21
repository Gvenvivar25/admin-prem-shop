<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Search..." v-model="search">
      <span class="form-control-clear" @click="search = '' ">&times;</span>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, {emit}) {
    const router = useRouter()
    const search = ref(props.modelValue.search || '')

    watch([search], values => {
      const query = {}
      if (values[0]) {
        query.search = values[0]
      }
      router.push({query: query})
      emit('update:modelValue', {search})
    })

    return {
      search,
    }
  }

}
</script>

<style scoped>

</style>