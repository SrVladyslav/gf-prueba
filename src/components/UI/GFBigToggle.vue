<template>
  <div class="toggle_container">
    <input
      class="input"
      type="checkbox"
      name="toggle"
      :checked="check"
      id="bigCheck"
      @change="emitChange($event)"
    />
    <label for="bigCheck">
      <div class="toggle_texts">
        <div class="toggle_text generic__text noselect" name="positive_option">
          <slot name="positive_option">Help</slot>
        </div>
        <div class="toggle_text generic__text noselect" name="negative_option">
          <slot name="negative_option">Closed to commissions</slot>
        </div>
      </div>
    </label>
    <div class="helper">
      <slot name="helper">Help</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "big-toggle",
  props: {
    check: Boolean,
  },
  data() {
    return {
      state: false,
    };
  },
  methods: {
    emitChange(event) {
      console.log(event);
      console.log("Value:", event.target.value);
      console.log("Checked:", event.target.checked);
      this.state = event.target.checked;
      this.$emit("update:modelValue", this.state);
    },
  },
  mounted() {
    this.state = this.check;
  },
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.toggle_container {
  border-radius: 10px;
  height: fit-content;
  width: 100%;
  padding: 0px;
  margin: 0px;
  margin: 30px 0px 10px 0px;
}
.input[type="checkbox"] {
  width: 100%;
  height: 50px;
  opacity: 0;
  position: absolute;
  /*visibility: hidden;*/
}
.input:focus ~ label {
  border-radius: 10px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
}

.input:focus ~ label .toggle_texts {
  border-radius: 10px;
  background: white;
}

label {
  width: 100%;
  height: 50px;
  display: block;
  background-color: #f2f2f2;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  z-index: 1;
  pointer-events: none;
}

label::after {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  content: "";
  width: 50%;
  height: 50px;
  background-color: white;
  position: absolute;
  border-radius: 10px;
  top: 0px;
  left: 0px;
  border: 2px solid #bb0a21;
  pointer-events: none;
}

.input:checked + label:after {
  left: calc(100%);
  transform: translateX(-100%);
  border: 2px solid #76b041;
}

.input:checked + label {
  background-color: #f2f2f2;
}

label:active:after {
  width: 160px;
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
  pointer-events: none;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.helper {
  text-align: left;
  display: flex;
  padding: 0px;
  font-size: 14px;
  width: 100%;
  max-width: 525px;
  height: fit-content;
  opacity: 1;
  margin: 10px 0px 0px 10px;
  color: #6e6e75; /**#6e6e75; */
  pointer-events: none;
  transition-duration: 0.3s;
}
</style>
