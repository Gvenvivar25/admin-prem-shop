import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useCurrencyForm(fn) {
  const {isSubmitting, handleSubmit} = useForm()

  const {value: name, errorMessage: tError, handleBlur: tBlur} = useField(
    'name',
    yup.string()
      .trim()
      .required('Enter currency name')
  )
  const {value: sign, errorMessage: sError, handleBlur: sBlur} = useField(
    'sign',
    yup.string()
      .required('Enter currency sign')
  )

  const {value: multiplier, errorMessage: mError, handleBlur: mBlur} = useField(
    'multiplier',
    yup.number()
      .required('Enter currency multiplier')
  )
  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    name,
    tBlur,
    tError,
    sign,
    sError,
    sBlur,
    multiplier,
    mBlur,
    mError
  }
}