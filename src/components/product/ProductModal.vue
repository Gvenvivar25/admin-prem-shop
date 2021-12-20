<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>
    <div class="form-control" :class="{invalid: iError}">
      <label for="image">Image</label>
      <input type="url" id="image" v-model.trim="image" @blur="iBlur">
      <small v-if="iError">{{iError}}</small>
    </div>

    <div class="form-control" :class="{invalid: iError}">
      <label for="card_image">Image for product page</label>
      <input type="url" id="card_image" v-model.trim="card_image" @blur="iBlur">
      <small v-if="iError">{{iError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="price">Price</label>
      <input type="number" step="0.001" id="price" v-model.number="price" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <div class="form-control" :class="{invalid: dError}">
      <label for="description">Product description</label>
      <textarea cols="5" rows="5" id="description" v-model="description" @blur="dBlur"></textarea>
      <small v-if="dError">{{dError}}</small>
    </div>

    <div class="form-control" :class="{invalid: aError}">
      <div class="input_flex">
        <label for="isActive" style="flex: 3 0 auto">Active for sales</label>
        <input type="checkbox" id="isActive" v-model.number="isActive" @blur="aBlur">
      </div>
      <small v-if="aError">{{aError}}</small>
    </div>

    <div class="form-control" :class="{invalid: stError}">
      <label for="startDate">Start sales date</label>
      <input type="date" id="startDate" v-model="startDate" @blur="stBlur">
      <small v-if="stError">{{stError}}</small>
    </div>

    <div class="form-control" :class="{invalid: edError}">
      <label for="endDate">End sales date</label>
      <input type="date" id="endDate" v-model="endDate" @blur="edBlur">
      <small v-if="edError">{{edError}}</small>
    </div>

    <label for="name">Category (click add button to add category)</label>
    <div class="form-control" v-for="(field, idx) in fields" :key="idx">

      <div class="input_flex">
        <Field :name="`category[${idx}]`" type="text" />
        <button class="btn" type="button" @click="remove(idx)">Remove</button>
      </div>
    </div>
    <div style="margin: 5px 0">
      <button type="button" class="btn primary" @click="push('')">Add</button>
    </div>

    <label for="name">Items (click add button to add item and it's quantity in product)</label>
    <div class="form-control" v-for="(field, idx) in fields2" :key="idx">

      <div class="input_flex">
        <Field style="margin-right: 10px" :id="`id_${idx}`" :name="`items[${idx}].id`" type="text" />
        <Field :id="`value_${idx}`" :name="`items[${idx}].value`" type="text" />
        <button class="btn" type="button" @click="remove2(idx)">Remove</button>
      </div>
    </div>
    <div style="margin: 5px 0">
      <button type="button" class="btn primary" @click="push2({id: '', value: ''})">Add</button>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="weight">Priority (1- low, ... 1000 - high)</label>
      <input type="number" id="weight" v-model.number="weight" @blur="wBlur">
      <small v-if="wError">{{wError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="discPer">Discount, %</label>
      <input type="number" id="discPer" v-model.number="discPer" @blur="discBlur">
      <small v-if="discError">{{discError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="discValue">Discount, $</label>
      <input type="number" step="0.001" id="discValue" v-model.number="discValue" @blur="discvBlur">
      <small v-if="discvError">{{discvError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Create</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
/*import {onMounted} from 'vue'*/
import {Field} from 'vee-validate'
import {Timestamp} from 'firebase/firestore'
import {useProductForm} from '@/use/product-form'

export default {
  emits: ['created-prod'],
  setup(_, {emit}) {
    const store = useStore()

    /*onMounted(() => {
      store.dispatch('tier/loadCategories')
    })*/


    const submit = async values => {
      values.startDate = Timestamp.fromDate(new Date(values.startDate))
      values.endDate = Timestamp.fromDate(new Date(values.endDate))
      const obj = {}
      for(let i = 0; i < values.items.length; i++) {
        let item = Object.values(values.items[i])
        obj[item[0]] = Number(item[1])
      }
      values.items = obj
      console.log(values)
      await store.dispatch('product/create', values)
      emit('created-prod')
    }

    return {
      ...useProductForm(submit),
    }
  },
  components: {Field}
}
</script>

<style scoped>

</style>