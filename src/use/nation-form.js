import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useNationForm(fn) {
  const {isSubmitting, handleSubmit} = useForm()

  const {value: name, errorMessage: tError, handleBlur: tBlur} = useField(
    'name',
    yup.string()
      .trim()
      .required('Enter nation name')
  )
  const {value: full_name, errorMessage: fnError, handleBlur: fnBlur} = useField(
    'full_name',
    yup.string()
      .required('Enter nation full name')
  )

  const {value: icon, errorMessage: iError, handleBlur: iBlur} = useField(
    'icon',
    yup.string()
      .required('Enter url image icon flag nation')
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