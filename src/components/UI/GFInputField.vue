<template>
  <div class="container">
    <div class="form" :class="{ show_error: showError }">
      <input
        tabindex="1"
        :type="text_type"
        id="entrada"
        class="form_input"
        placeholder=" "
        :value="modelValue"
        @input="checkAndSend($event.target.value)"
        @keypress="onlyNumber"
      />
      <!-- @input="$emit('update:modelValue', $event.target.value)" -->
      <label for="entrada" class="form_label"
        ><slot name="title">Nickname / Company name</slot>
        <h4 v-if="showRequired" class="star">*</h4></label
      >
    </div>
    <div class="helper">
      <slot name="helper">Help</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "gf-input-field",
  props: {
    modelValue: String,
    showError: Boolean,
    showRequired: Boolean,
    onlyNumbers: Boolean,
    text_type: { type: String, default: "text" },
  },
  data() {
    return {
      error: false,
    };
  },
  methods: {
    checkAndSend(value) {
      this.$emit("update:modelValue", value);
    },
    onlyNumber($event) {
      if (this.onlyNumbers) {
        let keyCode = $event.keyCode ? $event.keyCode : $event.which;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
          // 46 is dot
          $event.preventDefault();
        }
      }
    },
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
.star {
  font-weight: 700;
  color: #c70039;
  margin: 0px 4px;
  padding: 0px;
}
.form {
  position: relative;
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 30px 0px 10px 0px;
  transition-duration: 0.7s;
}
.isError {
  border: 1px solid red;
}
.form_input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;

  outline: none !important;
  /*border: 1px solid #f2f2f2 !important;*/
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
  background: none;
  transition-duration: 0.7s;
  z-index: 100;
}
.form_input:focus,
.form_input:hover {
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
}

.show_error .form_input {
  border: 1px solid #bb0a21 !important; /**#BD4740 */
  transition-duration: 0.7s;
}

.form_label {
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 0px;
  top: 10px;
  padding: 0px 10px;
  color: #6e6e75;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  pointer-events: none;
  z-index: 200;
}

.form_input:focus ~ .form_label,
.form_input:not(:placeholder-shown).form_input:not(:focus) ~ .form_label {
  top: -1.4rem;
  font-size: 14px;
  z-index: 0;
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

.form:focus-within ~ .helper {
  height: fit-content;
  opacity: 1;
  transition-duration: 1s;
  margin: 0px 0px 15px 10px;
}

@media (hover: hover) {
}
@media (max-width: 640px) {
}
@media (max-width: 400px) {
}
</style>
