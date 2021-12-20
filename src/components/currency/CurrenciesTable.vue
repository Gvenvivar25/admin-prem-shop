<template>
  <table class="table">
    <thead>
    <tr>
      <th>№</th>
      <th> Name </th>
      <th>Sign</th>
      <th>Multiplier</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(cur, idx) in currencies" :key="cur.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ cur.name }}</td>
      <td>{{ cur.sign }}</td>
      <td>{{ cur.multiplier }}</td>
      <td>
        <button class="btn" @click="$router.push(`/currencies/${cur.id}`)">Open/edit</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['currencies']
}
</script>

<style scoped>

</style>