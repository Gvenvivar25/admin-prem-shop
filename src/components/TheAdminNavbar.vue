<template>
  <div class="navbar">
    <h3 class="header_name">Admin Premium Shop</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/products">Products</router-link>
      </li>
      <li>
        <router-link to="/items">In-game items</router-link>
      </li>
      <li>
        <router-link to="/currencies">Currencies</router-link>
      </li>
      <li>
        <router-link to="/tiers">Tiers</router-link>
      </li>
      <li>
        <router-link to="/types">Types</router-link>
      </li>
      <li>
        <router-link to="/nations">Nations</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Log out</a>
      </li>
    </ul>
  </div>

</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>