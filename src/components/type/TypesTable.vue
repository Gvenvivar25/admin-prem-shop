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
    <tr v-for="(type, idx) in types" :key="idx">
      <td>{{ idx + 1 }}</td>
      <td>{{ type.name }}</td>
      <td>{{ type.full_name }}</td>
      <td><span class="icon_img" :style="{backgroundImage:'url('+type.icon+')'}"></span></td>
      <td>
        <button class="btn" @click="$router.push(`/types/${type.id}`)">Open/edit</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['types']
}
</script>

<style scoped>

</style>