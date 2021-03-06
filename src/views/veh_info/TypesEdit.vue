<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="type" :title="type.name">
      <form @submit.prevent="onUpdate">
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="type.name">
        </div>

        <div class="form-control">
          <label for="full_name">Type full name</label>
          <input type="text" id="full_name" v-model.trim="type.full_name">
        </div>

        <div class="form-control">
          <label for="icon">Type icon image</label>
          <input type="text" id="icon" v-model.trim="type.icon">
        </div>

        <button class="btn danger" @click.prevent="confirm = true">Delete</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Update</button>
      </form>
  </app-page>
  <div class="card" v-else>There is no such type</div>


  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Are you sure you want to delete type?"
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
    const type = ref({})
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      initial = await store.dispatch('type/loadOne', route.params.id)
      type.value = {...initial}
      loading.value = false
    })

    const hasChanges = computed(() =>
        type.value.name !== initial.name ||
        type.value.full_name !== initial.full_name ||
        type.value.icon !== initial.icon
    )

    const remove = async () => {
      confirm.value = false
      await store.dispatch('type/delete', route.params.id)
      router.push({name: 'AdminTypes'})
    }

    const onUpdate = async () => {
      initial = await store.dispatch('type/update', type.value)
      type.value = {...initial}
    }

    return {
      type,
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