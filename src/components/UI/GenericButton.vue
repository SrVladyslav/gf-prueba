<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button", // Le decimos como nuestro componente se llamara
};
</script>

<style scoped>
.btn {
  padding: 15px;
  background: rgb(0, 113, 218);
  background: linear-gradient(
    90deg,
    rgba(0, 113, 218, 1) 0%,
    rgba(0, 113, 218, 0.7) 100%
  );
  border-radius: 10px;
  border: none;
  color: white !important;
  font-weight: 500;
  font-size: max(1vw, 18px);
  width: max(140px, 9vw);
  cursor: pointer;
  transition-duration: 0.3s;
}
@media (hover: hover) {
  .btn:hover {
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    transition-duration: 0.3s;
  }
}
@media (max-width: 640px) {
  .btn {
    font-size: 16px;
  }
}
@media (max-width: 400px) {
  .btn {
    margin: 2px;
  }
}
</style>