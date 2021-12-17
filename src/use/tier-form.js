import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useTierForm(fn) {
  const {isSubmitting, handleSubmit} = useForm()

  const {value: name, errorMessage: tError, handleBlur: tBlur} = useField(
    'name',
    yup.string()
      .trim()
      .required('Enter tier name')
  )
  const {value: tier, errorMessage: tpError, handleBlur: tpBlur} = useField(
    'tier',
    yup.string()
      .required('Enter tier number')
  )
  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    name,
    tBlur,
    tError,
    tier,
    tpError,
    tpBlur
  }
}