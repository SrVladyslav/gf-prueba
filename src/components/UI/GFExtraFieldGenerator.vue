<template>
  <div class="generator_container">
    <div class="field" v-for="(field, key) in extra_fields" :key="key">
      <!-- GFInputField -->
      <gf-input-field
        v-if="field.type === 'GFInputField'"
        v-model="extra_fields[key].input_data"
        :showError="extra_fields[key].showError"
        :showRequired="extra_fields[key].required"
        @input="update()"
      >
        <template v-slot:title>{{ extra_fields[key].default_label }}</template>
        <template v-slot:helper>{{ extra_fields[key].helper }}</template>
      </gf-input-field>
      <!-- GFTextArea -->
      <gf-textarea
        v-if="field.type === 'GFTextArea'"
        v-model="extra_fields[key].input_data"
        :showError="extra_fields[key].showError"
        :showRequired="extra_fields[key].required"
        @input="update()"
      >
        <template v-slot:title>{{ extra_fields[key].default_label }}</template>
        <template v-slot:helper>{{ extra_fields[key].helper }}</template>
      </gf-textarea>
      <!-- GFTagInputField -->
      <gf-tag-input-field
        v-if="field.type === 'GFTagInputField'"
        v-model="extra_fields[key].input_data"
        :showError="extra_fields[key].showError"
        :showRequired="extra_fields[key].required"
        :setTags="extra_fields[key].tags"
        @input="update()"
      >
        <template v-slot:title>{{ extra_fields[key].default_label }}</template>
        <template v-slot:helper>{{ extra_fields[key].helper }}</template>
      </gf-tag-input-field>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Object,
    extra_fields_data: Object,
  },
  name: "gf-extra-field-generator",
  data() {
    return {
      extra_fields: [
        {
          type: "field1",
          default_label: "myExtraField",
          helper: "Help pls",
          required: false,
          showError: false,
          data: null, // Data which will be stored in Object form
          input_data: null, // params to send to the contract
        },
      ],
    };
  },
  methods: {
    update() {
      console.log(this.extra_fields);
      this.$emit("update:modelValue", this.extra_fields);
    },
    checkRequired() {
      for (let i = 0; i < this.extra_fields.length; i++) {
        console.log("Probando");
        if (this.extra_fields[i].required) {
          if (this.extra_fields[i].input_data) {
            if (this.extra_fields[i].input_data.length > 0)
              console.log(
                "Probando NO:",
                this.extra_fields[i].input_data.length,
                "-",
                this.extra_fields[i].input_data
              );
            this.extra_fields[i].showError = false;
          } else {
            console.log("Probando NO");
            this.extra_fields[i].showError = true;
          }
        }
      }
    },
  },
  mounted() {
    this.extra_fields = this.extra_fields_data;
  },
  watch: {
    extra_fields_data: function (newVal) {
      this.extra_fields = newVal;
    },
  },
};
</script>

<style scoped>
.generator_container {
  height: fit-content;
  width: 100%;
}
.field {
  height: fit-content;
  width: 100%;
}
</style>
