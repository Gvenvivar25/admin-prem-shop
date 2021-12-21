<template>
  <form @submit.prevent="onSubmit">

    <div class="form-control" :class="{invalid: wError}">
      <label for="weight">Priority</label>
      <input type="number" id="weight" v-model.number="weight" @blur="wBlur">
      <small v-if="wError">{{wError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Set priority</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
import {useForm,  useField} from 'vee-validate'
import * as yup from 'yup'


export default {
  emits: ['created-weight'],
  props: ['checkedProds'],
  setup(props, {emit}) {
    const store = useStore()

    const {isSubmitting, handleSubmit } = useForm({
      initialValues: {
        weight: 1
      },
    })

    const {value: weight, errorMessage: wError, handleBlur: wBlur} = useField(
        'weight',
        yup.number()
            .required('Enter priority number from 1 to ...')
    )

    const onSubmit = handleSubmit( async values => {
      const prods = props.checkedProds
      values.weight= Number(values.weight)
      for(let i = 0; i < prods.length; i++) {
        await store.dispatch('product/updateWeight', {id: prods[i], ...values})
      }
      emit('created-weight')
    }
    )

    return {
      handleSubmit,
      weight,
      wError,
      wBlur,
      onSubmit,
      isSubmitting
    }
  },
}
</script>

<style scoped>

</style>