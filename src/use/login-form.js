import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()

  const {handleSubmit, isSubmitting, submitCount} = useForm()
  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField('email',
    yup
      .string()
      .trim()
      .required('Заполните email')
      .email('необходимо ввести корректный email')
  )
  const MIN_LENGTH = 6
  const tooManyAttempts = computed(() => submitCount.value >= 3)
  watch(tooManyAttempts, val => {
    if(val) {
      setTimeout(() => submitCount.value = 0, 1500)
    }
  })
  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
    yup
      .string()
      .trim()
      .required('Введите пароль')
      .min(MIN_LENGTH, `Минимальный длина пароля ${MIN_LENGTH} символов`)
  )

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      const user = store.getters['auth/user']
      if(user.role === 'admin') {
        router.push('/products')
      } else {
        router.push(router.currentRoute.value)
      }
      /*else if(user.role === 'customer') {
        if(router.currentRoute.value.path === '/auth') {
          router.push({name: 'Shop'})
        } else {
          router.push(router.currentRoute.value)
        }
      }*/
    } catch (e) {
      console.log(e)
    }
  })

  const onSignUp = handleSubmit(async values => {
    try {
      await store.dispatch('auth/signUp', values)
    } catch (e) {
      console.log(e)
    }
  })

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    onSubmit,
    isSubmitting,
    tooManyAttempts,
    onSignUp
  }
}