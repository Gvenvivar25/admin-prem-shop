import {useField, useFieldArray, useForm} from 'vee-validate'
import * as yup from 'yup'
/*import {useStore} from 'vuex'
import { computed} from 'vue'*/

export function useProductForm(fn) {
  /*let date= new Date()
  date = date.toISOString().split('T')[0]*/
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      //startDate: date,
      isActive: true,
      items: [{id: '', value: ''}],
      weight: 1,
      discPer: 0,
      discValue: 0.00
    }
  })
  /*const store = useStore()

  const categories = computed (() => store.getters['tier/categories'])*/

  const {value: name, errorMessage: tError, handleBlur: tBlur} = useField(
    'name',
    yup.string()
      .trim()
      .required('Enter product name')
  )
  const {value: image, errorMessage: iError, handleBlur: iBlur} = useField(
    'image',
    yup.string()
      .required('Enter image url')
  )
  const {value: card_image} = useField(
    'card_image',
    yup.string()
      .required('Enter image url')
  )
  const {value: price, errorMessage: pError, handleBlur: pBlur} = useField(
    'price',
    yup.number()
      .required('Enter price')
  )
  const {value: description, errorMessage: dError, handleBlur: dBlur} = useField(
    'description',
    yup.string()
      .required('Enter description text')
  )
  const {value: isActive, errorMessage: aError, handleBlur: aBlur} = useField(
    'isActive',
    yup.boolean()
  )
  const {value: startDate, errorMessage: stError, handleBlur: stBlur} = useField(
    'startDate',
    yup.string()
      .required('Choose start sale date')
  )
  const {value: endDate, errorMessage: edError, handleBlur: edBlur} = useField(
    'endDate',
    yup.string()
      .required('Choose end sale date')
  )
  const {value: weight, errorMessage: wError, handleBlur: wBlur} = useField(
    'weight',
    yup.number()
      .required('Enter weight from 1 to ...')
  )

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

  const { remove, push, fields } = useFieldArray('category')
  const { remove: remove2, push: push2, fields: fields2 } = useFieldArray('items')

  /*const {value: category} = useField('category')*/

  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    name,
    image,
    card_image,
    iError,
    iBlur,
    tBlur,
    tError,
    price,
    pError,
    pBlur,
    description,
    dBlur,
    dError,
    isActive,
    aError,
    aBlur,
    startDate,
    stBlur,
    stError,
    endDate,
    edError,
    edBlur,
    remove,
    push,
    fields,
    remove2,
    push2,
    fields2,
    weight,
    wBlur,
    wError,
    discPer,
    discError,
    discBlur,
    discValue,
    discvBlur,
    discvError
  }
}