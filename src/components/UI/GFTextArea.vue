<template>
  <div class="container">
    <div class="form-textarea" :class="{ show_error: showError }">
      <textarea
        class="form_input"
        type="text"
        name="description"
        rows="5"
        placeholder=" "
        id="entry"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <label for="entry" class="form_label"
        ><slot name="title">Biography / Company description</slot>
        <h4 v-if="showRequired" class="star">*</h4></label
      >
    </div>
    <div class="helper-textarea">
      <slot class="helper" name="helper"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "gf-textarea",
  props: {
    modelValue: String,
    showError: Boolean,
    showRequired: Boolean,
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
.form-textarea {
  position: relative;
  width: 100%;
  min-height: 150px;
  height: fit-content;
  padding: 0px;
  margin: 30px 0px 10px 0px;
  transition-duration: 0.7s;
}

.form_input {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  min-height: 150px;

  outline: none !important;
  border: 1px solid #ebe9e9 !important; /*#f2f2f2 !important;*/
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
  resize: vertical;
  transition-duration: 0.7s;
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
  align-items: center;
  left: 0px;
  top: 10px;
  padding: 0px 10px;
  color: #6e6e75;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  pointer-events: none;
}
/*.optional__text {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 0px 8px;
  font-size: 14px;
  text-align: left;
  font-weight: 300;
}*/

.form_input:focus ~ .form_label,
.form_input:not(:placeholder-shown).form_input:not(:focus) ~ .form_label {
  top: -1.4rem;
  font-size: 14px;
}

.helper-textarea {
  text-align: left;
  display: flex;
  padding: 0px;
  font-size: 14px;
  width: 100%;
  height: 0px;
  opacity: 0;
  margin: 0px 0px 0px 10px;
  color: #0071da; /*#6e6e75;*/
  pointer-events: none;
  transition-duration: 0.3s;
}

.form-textarea:focus-within ~ .helper-textarea {
  height: fit-content;
  opacity: 1;
  transition-duration: 1s;
  margin: 0px 0px 15px 10px;
}

.form_input::-webkit-scrollbar {
  width: 10px;
  background: white;
  cursor: pointer !important;
  border-radius: 0px 10px 10px 0px;
  border-left: 1px solid #f2f2f2;
}
.form_input::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer !important;
}

@media (hover: hover) {
}
@media (max-width: 640px) {
}
@media (max-width: 400px) {
}
</style>
