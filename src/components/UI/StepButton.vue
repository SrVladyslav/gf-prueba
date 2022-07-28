<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "step-button", // Le decimos como nuestro componente se llamara
};
</script>

<style scoped>
.btn {
  position: relative;
  padding: 15px;
  background: white;
  border-radius: 10px;
  border: none;
  color: #0071da !important;
  font-weight: 500;
  font-size: max(1vw, 18px);
  width: max(180px, 9vw);
  cursor: pointer;
  transition-duration: 0.3s;
}

.btn:before {
  content: "";
  position: absolute;
  width: auto;
  height: auto;
  inset: 0;
  border-radius: 10px;
  padding: 2px;
  background: linear-gradient(
    to right,
    rgb(0, 113, 218),
    rgb(0, 113, 218, 0.7)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
@media (hover: hover) {
  .btn:hover {
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.08);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.08);
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
    width: max(150px, 9vw);
  }
}
</style>
