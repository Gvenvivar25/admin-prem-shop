<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="name">Name</label>
      <input type="text" id="name" v-model.trim="name" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <div class="form-control" :class="{invalid: sError}">
      <label for="sign">Currency sign</label>
      <input type="text" id="sign" v-model.trim="sign" @blur="sBlur">
      <small v-if="sError">{{sError}}</small>
    </div>

    <div class="form-control" :class="{invalid: mError}">
      <label for="multiplier">Currency multiplier</label>
      <input type="number"  step="0.0000001" id="multiplier" v-model.trim="multiplier" @blur="mBlur">
      <small v-if="mError">{{mError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Create</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
import {useCurrencyForm} from '@/use/currency-form'
export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      values.multiplier = Number(values.multiplier)
      await store.dispatch('currency/create', values)
      emit('created')
    }

    return {
      ...useCurrencyForm(submit),
    }
  }
}
</script>

<style scoped>

</style>