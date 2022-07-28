<template>
  <section class="create__start">
    <div class="create__section">
      <div>hola</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    wallet_account: {
      type: Object,
    },
    wallet_connected: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.create__start {
  height: 110vh;
  width: 100%;
  background-color: #f2f2f2;
}
.create__section {
  background-color: royalblue;
  width: 100%;
  height: fit-content;
  margin-top: 80px;
  padding: 0px 30%;
}
</style>