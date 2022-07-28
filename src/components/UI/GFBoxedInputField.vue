<template>
  <div class="property_item" v-for="(input, k) in inputs" :key="k">
    <!-- <div class="property_container">
      <input
        type="text"
        id="name"
        class="property_input"
        placeholder="Prop. name"
        @input="setName($event.target.value)"
      />
      <div class="helper">
        <slot name="helper_name">Help</slot>
      </div>
    </div>
    <div class="property_container">
      <input
        type="text"
        id="value"
        class="property_input"
        placeholder="Prop. value"
        :v-bind="value"
        @input="setValue($event.target.value)"
      />
      <div class="helper">
        <slot name="helper_value">Help</slot>
      </div>
    </div> -->
    <div class="property_container">
      <input
        tabindex="1"
        type="text"
        class="property_input"
        placeholder="Prop. name"
        v-model="input.name"
        @input="update()"
      />
      <div class="helper">
        <slot name="helper_name">Help</slot>
      </div>
    </div>
    <div class="property_container">
      <input
        tabindex="1"
        type="text"
        class="property_input"
        placeholder="Prop. value"
        v-model="input.value"
        @input="update()"
      />
      <div class="helper">
        <slot name="helper_value">Help</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gf-boxed-input-field",
  props: {
    modelValue: String,
    showError: Boolean,
  },
  data() {
    return {
      error: false,
      name: "",
      value: "",
      inputs: [
        {
          name: "",
          value: "",
          type: "",
        },
      ],
      full: false,
    };
  },
  methods: {
    add() {
      this.inputs.push({ name: "", value: "", type: "" });
    },
    remove(index) {
      if (this.inputs.length > 1) {
        this.inputs.splice(index, 1);
      }
      this.update();
    },
    checkFull() {
      this.full = true;
      this.inputs.forEach((input) => {
        if (input.name.length === 0 || input.value.length === 0) {
          this.full = false;
        }
        console.log(input.name, input.value, this.full);
      });
    },
    checkEmpty() {
      for (let i = 0; i < this.inputs.length; i++) {
        if (
          this.inputs[i].name.length === 0 &&
          this.inputs[i].value.length === 0
        ) {
          this.remove(i);
        }
      }
    },
    quitLastAndSend() {
      if (
        this.inputs.length > 1 &&
        this.inputs[this.inputs.length - 1].name.length > 0
      ) {
        if (this.inputs.length > 1) {
          this.inputs.splice(this.inputs.length - 1, 1);
        }
      }
    },
    update() {
      this.checkFull();
      if (this.full) {
        this.add();
      } else {
        this.checkEmpty();
      }
      this.$emit("update:modelValue", this.inputs);
    },
  },
};
</script>

<style scoped>
.property_item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin: 15px 0px 0px 0px;
  gap: 15px;
}
.property_container {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: none;
  width: 100%;
  height: fit-content;
}
.property_input {
  position: relative;
  padding: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  outline: none !important;
  border: 1px solid #ebe9e9 !important;
  border-radius: 10px;
  padding: 10px;
  /*color: #6e6e75;*/
  color: #252525;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: inherit;
  background: white;
  transition-duration: 0.7s;
}

.property_input:focus {
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
}
.helper {
  text-align: left;
  display: flex;
  padding: 0px;
  font-size: 14px;
  width: 100%;
  height: 0px;
  opacity: 0;
  margin: 0px 0px 0px 10px;
  color: #0071da; /**#6e6e75; */
  pointer-events: none;
  transition-duration: 0.3s;
}
.property_input:focus-within ~ .helper {
  height: fit-content;
  opacity: 1;
  transition-duration: 1s;
  margin: 5px 0px 0px 10px;
}

@media (hover: hover) {
  .property_input:hover {
    border: 1px solid #f2f2f2 !important;
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    transition-duration: 0.3s;
  }
}

@media (max-width: 545px) {
  /* .property_item {
    display: flex;
    flex-direction: column;
    height: fit-content;
  } */
}
</style>
