<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" >
      <label for="id">Id</label>
      <input type="number" id="id" v-model.trim="id" @blur="iBlur">
      <small v-if="iError">{{iError}}</small>
    </div>
    <div class="form-control" >
      <label for="name">Item name</label>
      <input type="text" id="name" v-model.trim="name" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>
    <div class="form-control" >
      <label for="item_type">Item type</label>
      <input type="text" id="item_type" v-model.trim="item_type" @blur="itBlur">
      <small v-if="itError">{{itError}}</small>
    </div>
    <div>
      <div class="form-control" >
        <p>Vehicle info</p>
        <div class="input_flex">
          <div>
            <label for="nation">Vehicle nation</label>
            <select id="nation" v-model="nation" name="Nation">
              <option disabled>{{optionNation}}</option>
              <option v-for="(nation, idx) in nations" :key="idx" :value="nation.name">{{ nation.full_name }}</option>
            </select>
          </div>
          <div>
            <label for="tier">Vehicle tier</label>
            <select id="tier" v-model="tier" name="Tier">
              <option disabled>{{optionTier}}</option>
              <option v-for="(tier, idx) in tiers" :key="idx" :value="tier.id">{{ tier.name }}</option>
            </select>
          </div>
          <div>
            <label for="type">Vehicle type</label>
            <select id="type" v-model="type" name="Type">
              <option disabled>{{optionType}}</option>
              <option v-for="(type, idx) in types" :key="idx" :value="type.name">{{ type.full_name }}</option>
            </select>
          </div>
        </div>

      </div>
    </div>

    <label for="name">Gallery (click add button to add image url)</label>
    <div class="form-control" v-for="(field, idx) in fields" :key="idx">

      <div class="input_flex">
        <Field :name="`gallery[${idx}]`" type="url" />
        <button class="btn" type="button" @click="remove(idx)">Remove</button>
      </div>
    </div>
    <div style="margin: 5px 0">
      <button type="button" class="btn primary" @click="push('')">Add</button>
    </div>
    <div style="margin: 10px 0">
      <button class="btn">Submit</button>
    </div>
  </form>
</template>
<script>
import {Field, useForm, useFieldArray, useField} from 'vee-validate'
import {useStore} from 'vuex'
import {onMounted, computed} from 'vue'
import * as yup from 'yup'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()
    onMounted(async () => {
      if(!store.getters['nation/nations'].length) {
        await store.dispatch('nation/loadNations')
      }
      if(!store.getters['tier/tiers'].length) {
        await store.dispatch('tier/loadTiers')
      }
      if(!store.getters['type/types'].length) {
        await store.dispatch('type/loadTypes')
      }
    })
    const nations = computed(() => store.getters['nation/nations'])
    const tiers = computed(() => store.getters['tier/tiers'])
    const types = computed(() => store.getters['type/types'])
    const optionNation = 'Choose nation'
    const optionType = 'Choose type'
    const optionTier = 'Choose tier'
    const { handleSubmit } = useForm({
      initialValues: {
        name: '',
        item_type: '',
      },
    })

    const {value: id, errorMessage: iError, handleBlur: iBlur} = useField(
        'id',
        yup.number()
            .required('Enter item id')
    )
    const {value: name, errorMessage: tError, handleBlur: tBlur} = useField(
        'name',
        yup.string()
            .trim()
            .required('Enter item name')
    )
    const {value: item_type, errorMessage: itError, handleBlur: itBlur} = useField(
        'item_type',
        yup.string()
            .trim()
            .required('Enter item type')
    )
    const {value: nation, errorMessage: nError, handleBlur: nBlur} = useField(
        'nation'
    )
    const {value: tier, errorMessage: tiError, handleBlur: tiBlur} = useField(
        'tier'
    )
    const {value: type, errorMessage: tyError, handleBlur: tyBlur} = useField(
        'type'
    )

    const { remove, push, fields } = useFieldArray('gallery')

    const onSubmit = handleSubmit(async values => {
      values.id = Number(values.id)
      if(values.tier) {
        values.tier = Number(values.tier)
      }
      console.log(values)
      const payload = JSON.parse(JSON.stringify(values, null, 2))
      await store.dispatch('item/create', payload)
      emit('created')
    })

    return {
      tier,
      tiBlur,
      tiError,
      type,
      tyError,
      tyBlur,
      nError,
      nBlur,
      types,
      tiers,
      nation,
      optionNation,
      optionType,
      optionTier,
      nations,
      id,
      iBlur,
      iError,
      tError,
      tBlur,
      item_type,
      itError,
      itBlur,
      name,
      fields,
      push,
      remove,
      onSubmit,
    }
  },
  components: {Field},
}
</script>
