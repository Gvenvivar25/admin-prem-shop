<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button class="btn"
      :disabled="modelValue === 1"
      @click="$emit('update:modelValue', modelValue - 1)">Prev</button>
    </li>

    <li class="pagination-item" v-for="p in pages" :key="p">
      <button
          :class="['btn', {active: p === modelValue}]"
          @click="$emit('update:modelValue', p)"
      >{{ p }}</button>
    </li>

    <li class="pagination-item">
      <button
          class="btn"
          :disabled="modelValue === pages"
          @click="$emit('update:modelValue', modelValue + 1)"
      >Next</button>
    </li>
  </ul>
</template>

<script>
import {computed} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['count', 'size', 'modelValue'],

  setup(props) {
    const pages = computed(() => Math.ceil(props.count/props.size))

    return {pages}
  }
}
</script>

<style scoped>

.pagination {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-item > button {
  background: #ef8e18;
  border: solid 1px #925307;
  border-radius: 8px;
  color: white;
}

.btn:hover {
  cursor: pointer;
  opacity: 0.8;
}
.btn.active {
  background-color: white;
  color: black;
}

</style>