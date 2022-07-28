<template>
  <div class="status_container" :class="{ status_active: s_active }">
    <h1 v-if="s_active === true">Published</h1>
    <h1 v-if="s_active === false">Unpublished</h1>
  </div>
</template>

<script>
export default {
  name: "gf-status",
  props: {
    active: Boolean,
  },
  data() {
    return {
      s_active: false,
    };
  },
  methods: {},
  mounted() {
    this.s_active = this.active;
  },
  watch: {
    active: function (val) {
      this.s_active = val;
    },
  },
};
</script>

<style scoped>
.status_container {
  position: relative;
  height: fit-content;
  width: fit-content;
  box-sizing: border-box;
  padding: 4px 8px;
  border-radius: 10px;
  margin: 8px 0px 0px 0px;
  background-color: rgba(187, 10, 33, 0.07);
  transition-duration: 0.3s;
}
.status_container h1 {
  font-size: 14px;
  font-weight: 500;
  color: #bb0a21;
  transition-duration: 0.3s;
}
.status_active {
  background-color: rgba(22, 160, 0, 0.07) !important;
  transition-duration: 0.3s;
}
.status_active h1 {
  color: #76b041 !important;
  transition-duration: 0.3s;
}
</style>
