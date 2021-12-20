import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useTypeForm(fn) {
  const {isSubmitting, handleSubmit} = useForm()

  const {value: name, errorMessage: tError, handleBlur: tBlur} = useField(
    'name',
    yup.string()
      .trim()
      .required('Enter type name')
  )
  const {value: full_name, errorMessage: fnError, handleBlur: fnBlur} = useField(
    'full_name',
    yup.string()
      .required('Enter type full name')
  )

  const {value: icon, errorMessage: iError, handleBlur: iBlur} = useField(
    'icon',
    yup.string()
      .required('Enter url image icon type')
  )
  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    name,
    tBlur,
    tError,
    full_name,
    fnError,
    fnBlur,
    icon,
    iError,
    iBlur
  }
}