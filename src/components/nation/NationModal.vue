<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="name">Name</label>
      <input type="text" id="name" v-model.trim="name" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <div class="form-control" :class="{invalid: fnError}">
      <label for="full_name">Full name</label>
      <input type="text" id="full_name" v-model.trim="full_name" @blur="fnBlur">
      <small v-if="fnError">{{fnError}}</small>
    </div>

    <div class="form-control" :class="{invalid: iError}">
      <label for="icon">Icon image</label>
      <input type="text" id="icon" v-model.trim="icon" @blur="iBlur">
      <small v-if="iError">{{iError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Create</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
import {useNationForm} from '@/use/nation-form'
export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      await store.dispatch('nation/create', values)
      emit('created')
    }

    return {
      ...useNationForm(submit),
    }
  }
}
</script>

<style scoped>

</style>