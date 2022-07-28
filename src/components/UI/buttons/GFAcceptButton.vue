<template>
  <div class="container">{{ label }}</div>
</template>

<script>
export default {
  name: "gf-accept-button",
  props: { label: String },
  data() {
    return {};
  },
  methods: {},
  watch: {},
};
</script>

<style scoped>
.container {
  position: relative;
  height: 50px !important;
  width: fit-content;
  max-width: 300px;
  /* min-width: 150px; */
  min-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 10px;
  background-color: white;
  border: 2px solid #16a000;
  color: #16a000;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  transition-duration: 0.3s;
  margin: 0px;
}
@media (hover: hover) {
  .container:hover {
    background-color: #16a000;
    color: white;
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.1);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.1);
    transition-duration: 0.5s;
  }
}
@media (max-width: 764px) {
  .container {
    width: 100%;
    min-width: 100px;
    max-width: 100%;
    padding: 10px !important;
    height: 42px !important;
  }
}
</style>
