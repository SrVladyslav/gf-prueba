<template>
  <input
        class="input__selector"
        type="text"
        name="name"
        placeholder="Item name"
        required
        v-model="nft__name"
        tabindex="2"
      />
</template>

<script>
export default {
    name: "gf-input",
}
</script>

<style scoped>

</style>