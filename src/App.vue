<template>
  <component :is="layout + '-layout'" v-if="layout"></component>
</template>
<script>

import AuthLayout from '@/layout/AuthLayout'
import AdminLayout from '@/layout/AdminLayout'
import {useRoute} from 'vue-router'
import {computed} from 'vue'

export default {
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: { AuthLayout, AdminLayout}
}
</script>
<style lang="scss">

</style>
