<template>
  <table class="table">
    <thead>
    <tr>
      <th>№</th>
      <th>Name</th>
      <th>Full name</th>
      <th>Icon</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(nation, idx) in nations" :key="idx">
      <td>{{ idx + 1 }}</td>
      <td>{{ nation.name }}</td>
      <td>{{ nation.full_name }}</td>
      <td><span class="icon_img" :style="{backgroundImage:'url('+nation.icon+')'}"></span></td>
      <td>
        <button class="btn" @click="$router.push(`/nations/${nation.id}`)">Open/edit</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['nations']
}
</script>

<style scoped>

</style>