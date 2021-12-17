<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="tier" :title="tier.name">
      <form @submit.prevent="onUpdate">
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="tier.name">
        </div>

        <div class="form-control">
          <label for="tier">Tier number</label>
          <input type="text" id="tier" v-model.trim="tier.tier">
        </div>

        <button class="btn danger" @click.prevent="confirm = true">Delete</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Update</button>
      </form>
  </app-page>
  <div class="card" v-else>There is no such tier</div>


  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Are you sure you want to delete tier?"
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

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const tier = ref({})
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      initial = await store.dispatch('tier/loadOne', route.params.id)
      tier.value = {...initial}
      loading.value = false
    })

    const hasChanges = computed(() =>
        tier.value.name !== initial.name ||
        tier.value.tier !== initial.tier
    )

    const remove = async () => {
      confirm.value = false
      await store.dispatch('tier/delete', route.params.id)
      router.push({name: 'AdminTiers'})
    }

    const onUpdate = async () => {
      initial = await store.dispatch('tier/update', tier.value)
      tier.value = {...initial}
    }

    return {
      tier,
      loading,
      hasChanges,
      remove,
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