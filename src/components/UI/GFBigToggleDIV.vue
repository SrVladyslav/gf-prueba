<template>
  <div
    class="toggle_container"
    @keypress.enter="changeState"
    tabindex="1"
    @click="changeState"
  >
    <div class="toggle" :class="{ toggle_active: !state }"></div>
    <div class="toggle_texts">
      <div class="toggle_text generic__text">Open to commissions</div>
      <div class="toggle_text generic__text">Closed to commissions</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "big-toggle",
  data() {
    return {
      state: false,
    };
  },
  methods: {
    changeState() {
      this.state = !this.state;
    },
  },
};
</script>

<style scoped>
.toggle_container {
  display: flex;
  width: 100%;
  height: 50px;
  position: relative;
  background: #f2f2f2;
  border-radius: 10px;
  font-weight: 500;
  font-size: max(1vw, 18px);
  cursor: pointer;
  padding: 0px;
}
.toggle_texts {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 5px;
  pointer-events: none;
}
.toggle_text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 15px;
  z-index: 3;
}
.toggle {
  position: absolute;
  top: 0;
  width: 50%;
  height: 50px;
  background: white;
  border-radius: 10px;
  border: 2px solid #76b041;
  z-index: 2;
  transition-duration: 0.7s;
}
.toggle_active {
  border: 2px solid #bb0a21;
  left: none;
  right: 0 !important;
  transition-duration: 0.7s;
}

.toggle_container:focus,
.toggle_container:hover {
  outline: none;
  /**border: 1px solid #6e6e75 !important;
  border: none;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
  **/
}
</style>
