<template>
  <app-modal :title="title" @close="$emit('reject')">
    <button class="btn primary" @click="$emit('confirm')">Yes</button>
    <button class="btn danger" @click="$emit('reject')">No</button>
  </app-modal>

</template>

<script>
import AppModal from '@/components/ui/AppModal'
export default {
props: ['title'],
  emits: ['confirm', 'reject'],
  components: {AppModal}
}
</script>

<style scoped>

</style>