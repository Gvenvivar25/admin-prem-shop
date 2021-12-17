<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="name">Name</label>
      <input type="text" id="name" v-model.trim="name" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <div class="form-control" :class="{invalid: tpError}">
      <label for="tier">Tier number</label>
      <input type="text" id="tier" v-model.trim="tier" @blur="tpBlur">
      <small v-if="tpError">{{tpError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Create</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
import {useTierForm} from '@/use/tier-form'
export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      await store.dispatch('tier/create', values)
      emit('created')
    }

    return {
      ...useTierForm(submit),
    }
  }
}
</script>

<style scoped>

</style>