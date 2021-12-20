<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="nation" :title="nation.name">
      <form @submit.prevent="onUpdate">
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="nation.name">
        </div>

        <div class="form-control">
          <label for="full_name">Nation full name</label>
          <input type="text" id="full_name" v-model.trim="nation.full_name">
        </div>

        <div class="form-control">
          <label for="icon">Nation icon image</label>
          <input type="text" id="icon" v-model.trim="nation.icon">
        </div>

        <button class="btn danger" @click.prevent="confirm = true">Delete</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Update</button>
      </form>
  </app-page>
  <div class="card" v-else>There is no such nation</div>


  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Are you sure you want to delete nation?"
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
    const nation = ref({})
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      initial = await store.dispatch('nation/loadOne', route.params.id)
      nation.value = {...initial}
      loading.value = false
    })

    const hasChanges = computed(() =>
        nation.value.name !== initial.name ||
        nation.value.full_name !== initial.full_name ||
        nation.value.icon !== initial.icon
    )

    const remove = async () => {
      confirm.value = false
      await store.dispatch('nation/delete', route.params.id)
      router.push({name: 'AdminNations'})
    }

    const onUpdate = async () => {
      initial = await store.dispatch('nation/update', nation.value)
      nation.value = {...initial}
    }

    return {
      nation,
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