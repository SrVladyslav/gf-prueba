<template>
  <div>
    <div class="tag-input" :class="{ show_error: showError }">
      <input
        type="text"
        placeholder=" "
        class="tag_input__text"
        @keypress.enter="addTag"
        @keypress.,="addTag"
        @keypress="checkNone"
        @keyup.delete="removeLastTag($event)"
        id="tagInput"
        @input="$emit('update:modelValue', tags)"
      />
      <label for="tagInput" class="form_label"
        ><slot name="title">Biography / Company description</slot></label
      >
      <div class="tags_container">
        <div v-for="(tag, index) in tags" :key="tag" class="tag_input__tag">
          {{ tag }}
          <span @click="removeTag(index)">x</span>
        </div>
      </div>
    </div>
    <div class="helper">
      <slot name="helper">Help</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "gf-tag-input-field",
  props: {
    showError: Boolean,
    setTags: String,
  },
  data() {
    return {
      tags: [],
      lastValue: 0,
    };
  },
  methods: {
    addTag(event) {
      event.preventDefault();
      var val = event.target.value.trim();
      console.log(val);
      if (val.length > 0) {
        if (!this.tags.includes(val)) {
          this.tags.push(val);
        }
        event.target.value = "";
      }
      this.$emit("update:modelValue", this.tags);
    },
    removeTag(index) {
      console.log("Antes:", this.tags);
      this.tags.splice(index, 1);
      console.log("Despues:", this.tags);
      this.$emit("update:modelValue", this.tags);
    },
    removeLastTag(event) {
      event.preventDefault();
      if (event.target.value.length === 0) {
        if (this.lastValue === 0) {
          this.removeTag(this.tags.length - 1);
        } else {
          this.lastValue = 0;
        }
      } else {
        this.lastValue = 1;
      }
    },
  },
  mounted() {
    console.log("Tags:", this.setTags);
    this.tags = this.setTags;
    this.$emit("update:modelValue", this.tags);
  },
  watch: {
    setTags: function (val) {
      console.log("Reset Tags:", typeof val);
      if (typeof val === "string") {
        this.tags = JSON.parse(val);
      } else {
        this.tags = val;
      }
      this.$emit("update:modelValue", this.tags);
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
.tag-input {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid #ebe9e9;
  border-radius: 10px;
  font-size: 0.9em;
  min-height: 50px;
  height: fit-content;
  box-sizing: border-box;
  margin: 30px 0px 10px 0px;
  transition-duration: 0.7s;
}

.tag-input:focus-within,
.tag-input:hover {
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
}

.tags_container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 525px;
  height: fit-content;
  flex-direction: row;
  transition-duration: 0.7s;
}

.tag_input__tag {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 30px;
  float: left;
  /*background-color: rgba(0, 113, 218, 0.05);*/
  /*border: 1px solid rgba(0, 113, 218, 0.09);*/
  border: 2px solid #ebe9e9; /*#f2f2f2;*/
  line-height: 30px;
  border-radius: 5px;
  color: #6e6e75;
  margin: 10px 0px 5px 10px;
  padding: 5px 10px;
  transition-duration: 0.5s;
}

.tag_input__tag > span {
  cursor: pointer;
  opacity: 0.5;
  color: #bb0a21;
  padding: 0px 0px 0px 5px;
  transition-duration: 0.5s;
}
.tag_input__tag:hover > span {
  cursor: pointer;
  opacity: 1;
  color: #bb0a21;
  transition-duration: 0.5s;
}

.tag_input__tag:hover {
  border: 2px solid #bb0a21;
  color: #252525;
  transition-duration: 0.5s;
}

.tag_input__text {
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
  outline: none !important;
  border: none;
}

.form_label {
  position: absolute;
  left: 0px;
  top: 10px;
  padding: 0px 10px;
  color: #6e6e75;
  font-weight: 400;
  font-size: 16px;
  cursor: text;
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  pointer-events: none;
}

.tag_input__text:focus ~ .form_label,
.tag_input__text:not(:placeholder-shown).tag_input__text:not(:focus)
  ~ .form_label {
  top: -1.4rem;
  font-size: 14px;
}

.show_error.tag-input {
  border: 1px solid #bb0a21 !important;
}

.tag_input:focus,
.tag_input:hover {
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

.tag-input:focus-within ~ .helper {
  height: fit-content;
  opacity: 1;
  transition-duration: 1s;
  margin: 0px 0px 15px 10px;
}
</style>
