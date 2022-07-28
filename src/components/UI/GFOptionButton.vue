<template>
  <div class="option">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  name: "gf-option-button",
};
</script>

<style scoped>
.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  position: relative;
  height: 40px;
  width: 40px;
  cursor: pointer;
  border-radius: 10px;
}

.circle {
  height: 4px;
  width: 4px;
  background-color: #6e6e75;
  border-radius: 50%;
  transition-duration: 0.3s;
}

@media (hover: hover) {
  .option:hover .circle {
    background-color: #252525;
    transition-duration: 0.4s;
  }
}
</style>
