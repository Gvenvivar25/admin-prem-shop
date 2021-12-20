<template>
  <table class="table">
    <thead>
    <tr>
      <th>№</th>
      <th>ID</th>
      <th>Name</th>
      <th>Item type</th>
      <th>Nation</th>
      <th>Tier</th>
      <th>Type</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, idx) in items" :key="idx">
      <td>{{ idx + 1 }}</td>
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.item_type }}</td>
      <td>{{ item.nation || '-' }}</td>
      <td>{{ item.tier || '-' }}</td>
      <td>{{ item.type || '-' }}</td>
      <td>
        <button class="btn" @click="$router.push(`/items/${item.id}`)">Open/edit</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['items']
}
</script>

<style scoped>

</style>