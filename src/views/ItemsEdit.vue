<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="item" :title="item.name">
      <form @submit.prevent="onUpdate">

        <div class="form-control" >
          <label for="name">Item name</label>
          <input type="text" id="name" v-model="item.name">
        </div>
        <div class="form-control" >
          <label for="item_type">Item type</label>
          <input type="text" id="item_type" v-model="item.item_type">
        </div>
        <div>
          <div class="form-control" >
            <p>Vehicle info</p>
            <div class="input_flex">
              <div>
                <label for="nation">Vehicle nation</label>
                <select id="nation" v-model="item.nation" name="Nation">
                  <option disabled>{{optionNation}}</option>
                  <option v-for="(nation, idx) in nations" :key="idx" :value="nation.name">{{ nation.full_name }}</option>
                </select>
              </div>
              <div>
                <label for="tier">Vehicle tier</label>
                <select id="tier" v-model="item.tier" name="Tier">
                  <option disabled>{{optionTier}}</option>
                  <option v-for="(tier, idx) in tiers" :key="idx" :value="tier.id">{{ tier.name }}</option>
                </select>
              </div>
              <div>
                <label for="type">Vehicle type</label>
                <select id="type" v-model="item.type" name="Type">
                  <option disabled>{{optionType}}</option>
                  <option v-for="(type, idx) in types" :key="idx" :value="type.name">{{ type.full_name }}</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <label for="name">Gallery (click add button to add image url)</label>
        <div class="form-control" v-for="(gal, idx) in item.gallery" :key="idx">

          <div class="input_flex">
            <input type="text" id="gallery[idx]" v-model="item.gallery[idx]">
            <button class="btn" type="button" @click="removeURL(idx)">Remove</button>
          </div>
        </div>
        <div style="margin: 5px 0">
          <button type="button" class="btn primary" @click="push()">Add</button>
        </div>

        <button class="btn danger" @click.prevent="confirm = true">Delete</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Update</button>
      </form>
  </app-page>
  <div class="card" v-else>There is no such type</div>


  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Are you sure you want to delete item?"
        @reject="confirm = false"
        @confirm="remove"
    ></app-confirm>
  </teleport>

  <teleport to="body">
    <app-confirm
        v-if="saveChanges"
        title="The changes were not saved. Changes will be lost during the transition. Leave the page?"
        @reject="saveChanges = false"
        @confirm="navigate"
    ></app-confirm>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppConfirm from '@/components/ui/AppConfirm'
import {useLeaveGuard} from '@/use/leave-guard'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref, onMounted, computed} from 'vue'
import {array_compare} from '@/utils/compare'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const item = ref({})
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      if(!store.getters['nation/nations'].length) {
        await store.dispatch('nation/loadNations')
      }
      if(!store.getters['tier/tiers'].length) {
        await store.dispatch('tier/loadTiers')
      }
      if(!store.getters['type/types'].length) {
        await store.dispatch('type/loadTypes')
      }
      initial = await store.dispatch('item/loadOne', route.params.id)
      item.value = JSON.parse(JSON.stringify(initial))
      loading.value = false
    })


    const nations = computed(() => store.getters['nation/nations'])
    const tiers = computed(() => store.getters['tier/tiers'])
    const types = computed(() => store.getters['type/types'])
    const optionNation = 'Choose nation'
    const optionType = 'Choose type'
    const optionTier = 'Choose tier'


    const hasChanges = computed(() =>
        item.value.name !== initial.name ||
        item.value.item_type !== initial.item_type ||
        item.value.nation !== initial.nation ||
        item.value.type !== initial.type ||
        item.value.tier !== initial.tier ||
        !array_compare(item.value.gallery, initial.gallery)
    )

    const removeURL = (idx) => {
      item.value.gallery.pop(idx)
    }
    const push = () => {
      if(item.value.gallery) {
        item.value.gallery.push('')
      } else {
        item.value.gallery = []
        item.value.gallery.push('')
      }
    }

    const remove = async () => {
      confirm.value = false
      await store.dispatch('item/delete', route.params.id)
      router.push({name: 'AdminItems'})
    }

    const onUpdate = async () => {
      console.log(JSON.stringify(item.value, null, 2));
      if(item.value.tier) {
        item.value.tier = Number(item.value.tier)
      }
      initial = await store.dispatch('item/update', item.value)
      item.value = {...initial}
    }

    return {
      item,
      types,
      tiers,
      optionNation,
      optionType,
      optionTier,
      nations,
      loading,
      hasChanges,
      push,
      remove,
      removeURL,
      confirm,
      onUpdate,
      ...useLeaveGuard(hasChanges)
    }
  },
components: {AppPage, AppLoader, AppConfirm}
}
</script>

<style scoped>

</style>