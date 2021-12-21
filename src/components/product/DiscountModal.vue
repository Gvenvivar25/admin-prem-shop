<template>
  <form @submit.prevent="onSubmit">

    <div class="form-control" :class="{invalid: discError}">
      <label for="discPer">Discount, %</label>
      <input type="number" id="discPer" v-model.number="discPer" @blur="discBlur">
      <small v-if="discError">{{discError}}</small>
    </div>

    <div class="form-control" :class="{invalid: discvError}">
      <label for="discValue">Discount, $</label>
      <input type="number" step="0.001" id="discValue" v-model.number="discValue" @blur="discvBlur">
      <small v-if="discvError">{{discvError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Set discount</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
import {useForm,  useField} from 'vee-validate'
import * as yup from 'yup'


export default {
  emits: ['created-disc'],
  props: ['checkedProds'],
  setup(props, {emit}) {
    const store = useStore()

    const {isSubmitting, handleSubmit } = useForm({
      initialValues: {
        discPer: 0,
        discValue: 0,
      },
    })

    const {value: discPer, errorMessage: discError, handleBlur: discBlur} = useField(
        'discPer',
        yup.number()
            .required('Enter discount percentage')
    )
    const {value: discValue, errorMessage: discvError, handleBlur: discvBlur} = useField(
        'discValue',
        yup.number()
            .required('Enter discount value')
    )

    const onSubmit = handleSubmit( async values => {
      const prods = props.checkedProds
      for(let i = 0; i < prods.length; i++) {
        await store.dispatch('product/updateDiscount', {id: prods[i], ...values})
      }
      emit('created-disc')
    }
    )

    return {
      handleSubmit,
      discPer,
      discValue,
      discError,
      discvError,
      discvBlur,
      discBlur,
      onSubmit,
      isSubmitting
    }
  },
}
</script>

<style scoped>

</style>