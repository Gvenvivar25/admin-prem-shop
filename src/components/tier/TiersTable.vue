<template>
  <table class="table">
    <thead>
    <tr>
      <th>№</th>
      <th> Name </th>
      <th>Tier</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(tier, idx) in tiers" :key="tier.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ tier.name }}</td>
      <td>{{ tier.tier }}</td>
      <td>
        <button class="btn" @click="$router.push(`/tiers/${tier.id}`)">Open/edit</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['tiers']
}
</script>

<style scoped>

</style>