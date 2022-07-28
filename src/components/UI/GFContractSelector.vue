<template>
  <div
    ref="selector_container"
    class="scroll_container"
    @wheel.prevent="scrollHorizontal($event)"
  >
    <div class="contract_selector_container">
      <div
        class="contract_type_element"
        v-for="(collention_type, key) in collection_types"
        :key="key"
        @click="selectContractType(key)"
      >
        <input
          type="radio"
          id="{{collention_type}}"
          name="collection_type"
          value="{{collention_type}}"
        />
        <div class="contract_type_element_card">
          <div class="subtitle__text">{{ collention_type.generatorType }}</div>
          <div class="description__text">
            {{
              formatGeneratorDescription(collention_type.generatorDescription)
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="generator_label">
    Choose contract type
    <h4 class="star">*</h4>
  </div>
  <div class="selected_generator_container" :class="{ show_error: showError }">
    <div
      class="selected_generator_text"
      v-if="selected_contract_type.generatorType.length > 0"
    >
      <b>{{ selected_contract_type.generatorType }}:</b>
      {{ selected_contract_type.generatorDescription }}
    </div>
    <div class="selected_generator_text_void" v-else>
      Pick one type of the above!
    </div>
  </div>
</template>

<script>
export default {
  name: "gf-contract-selector",
  props: {
    showError: Boolean,
    generator_types: {
      generatorType: "",
      generatorAddress: "",
      generatorDescription: "",
    },
    modelValue: {},
  },
  data() {
    return {
      selected_contract_type: {
        generatorID: "",
        generatorType: "",
        generatorAddress: "",
        generatorDescription: "",
      },
      collection_types: {
        0: {
          generatorType: "SimpleCollection",
          generatorAddress: "0x123123",
          generatorDescription:
            "Simple collection which contains the name, the description, and the image of your NFTs",
        },
        1: {
          generatorType: "SimpleCollection 1",
          generatorAddress: "0x123123",
          generatorDescription:
            "Simple collection which contains the name, the description, and the image of your NFTs, and finally implements the bid functionality",
        },
        2: {
          generatorType: "Simple Bid Collection",
          generatorAddress: "0x123123",
          generatorDescription:
            "Used to create bids collections where the users can push their money and play to win",
        },
        3: {
          generatorType: "Simple Bid Collection",
          generatorAddress: "0x123123",
          generatorDescription:
            "Used to create bids collections where the users can push their money and play to win Used to create bids collections where the users can push their money and play to win Used to create bids collections where the users can push their money and play to win",
        },
      },
    };
  },
  methods: {
    scrollHorizontal(e) {
      console.log(e.deltaY);
      if (e.deltaY > 0) this.$refs.selector_container.scrollLeft += 50;
      else this.$refs.selector_container.scrollLeft -= 50;
    },
    formatGeneratorDescription(fullDescription) {
      return fullDescription.substring(0, 60) + "...";
    },
    selectContractType(key) {
      console.log(key);
      console.log(this.collection_types[key]);
      this.selected_contract_type.generatorID = key;
      this.selected_contract_type.generatorType =
        this.collection_types[key].generatorType;
      this.selected_contract_type.generatorDescription =
        this.collection_types[key].generatorDescription;
      this.selected_contract_type.generatorAddress =
        this.collection_types[key].generatorAddress;
      this.$emit("update:modelValue", this.selected_contract_type);
    },
  },
  mounted() {
    this.collection_types = this.generator_types;
  },
};
</script>

<style scoped>
.star {
  font-weight: 700;
  color: #c70039;
  margin: 0px 4px;
  padding: 0px;
}
.subtitle__text {
  margin: 0px 0px 5px 0px;
  font-size: 16px;
  font-weight: 400;
  padding: 5px 0px 5px 0px;
  color: #0071da;
  align-items: center;
}
.description__text {
  color: #6e6e73;
  font-weight: 400;
  font-size: 14px;
  align-items: center;
}
.selected_generator_text,
.selected_generator_text_void {
  color: #252525;
  font-weight: 400;
  font-size: 16px;
  height: fit-content;
  align-items: center;
}
.selected_generator_text b {
  font-weight: 600;
  color: #252525;
}
.selected_generator_text_void {
  color: #6e6e73 !important;
}
.generator_label {
  display: flex;
  padding: 0px 10px;
  color: #6e6e75;
  cursor: text;
  z-index: 90;
  font-size: 14px;
  margin: 20px 0px 5px 0px;
}
.scroll_container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  border-radius: 10px;
  margin: 25px 0px 0px 0px;
}
.scroll_container::-webkit-scrollbar {
  height: 10px;
  width: auto;
  background: white;
  cursor: pointer !important;
  border-radius: 10px !important;
  border-left: 1px solid #f2f2f2;
}
.scroll_container::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 0px 10px 10px;
  cursor: pointer !important;
}
.contract_selector_container {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  justify-content: flex-start;
  height: fit-content;
  width: auto;
  max-width: 100%;
  margin: 10px 0px 5px -5px;
}

.contract_type_element {
  position: relative;
  height: fit-content;
  width: fit-content;
  box-sizing: border-box;
  align-content: stretch;
  padding: 5px;
}

.contract_type_element_card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-width: 250px;
  max-width: 250px;
  height: 130px;
  border: 1px solid #ebe9e9 !important;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  z-index: 10;
  cursor: pointer !important;
}

.contract_type_element input {
  opacity: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 20;
  cursor: pointer !important;
}

.contract_type_element input:checked ~ .contract_type_element_card {
  /* border: 1px solid #76b041 !important;;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07); */
  /*border: 1px solid #f2f2f2 !important;*/
  border: 1px solid #0071da !important;
  transition-duration: 0.3s;
}

.contract_type_element input:hover ~ .contract_type_element_card {
  border: 1px solid #f2f2f2;
  -webkit-box-shadow: 0px 0px 5px 5px rgba(37, 37, 37, 0.05);
  box-shadow: 0px 0px 5px 5px rgba(37, 37, 37, 0.05);
}
.selected_generator_container {
  border: 1px solid #f2f2f2;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}
.show_error {
  border: 1px solid #bb0a21 !important; /**#BD4740 */
  transition-duration: 0.7s;
}

@media (max-width: 460px) {
  .scroll_container::-webkit-scrollbar {
    display: none;
  }
  .scroll_container::-webkit-scrollbar-thumb {
    display: none;
  }
}
</style>
