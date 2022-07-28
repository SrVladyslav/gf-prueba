<template>
  <div class="helper">
    <slot name="helper">Help</slot>
  </div>
  <div
    class="select__box"
    v-click-away="quit__menu"
    tabindex="2"
    @keydown.enter.exact.prevent="toggle__menu"
  >
    <!-- v-on-clickaway="quit__menu" -->
    <div
      ref="options__container"
      class="options__container generic__text"
      :class="{ active: menu__active }"
    >
      <div
        class="option"
        key="none"
        @click="
          quit__menu();
          set__selected('');
        "
        tabindex="2"
        @keydown.space.exact.prevent="
          quit__menu();
          set__selected(null);
        "
      >
        <input type="radio" class="radio" id="none" name="collection" />
        <label>-</label>
      </div>
      <div
        v-for="option in options"
        :key="option"
        class="option"
        @click="
          quit__menu();
          set__selected(option);
        "
        tabindex="2"
        @keydown.space.exact.prevent="
          quit__menu();
          set__selected(option);
        "
      >
        <input type="radio" class="radio" :id="option" name="collection" />
        <label>{{ option }}</label>
      </div>
    </div>
    <div
      class="selected generic__text"
      @click="toggle__menu"
      :class="{ selected__focus: menu__active }"
    >
      <div v-if="!selected__opc && !value">{{ label_text }}</div>
      <div v-if="!selected__opc && value">{{ value }}</div>
      <div v-if="selected__opc">{{ selected__opc }}</div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 50 50"
        fill="none"
        for="sel"
        class="selector_fill"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_136_43)">
          <path
            d="M22.8064 38.7975C23.9612 39.9856 25.8605 40.0125 27.0486 38.8576L46.409 20.0381C47.5971 18.8833 47.624 16.9839 46.4691 15.7959C45.3142 14.6078 43.4149 14.5809 42.2269 15.7358L25.0176 32.4642L8.28917 15.255C7.13431 14.0669 5.23501 14.04 4.04695 15.1949C2.8589 16.3497 2.83199 18.249 3.98685 19.4371L22.8064 38.7975ZM22.0003 33.6658L21.9578 36.664L27.9572 36.749L27.9997 33.7508L22.0003 33.6658Z"
            fill="#6e6e75"
          />
        </g>
        <defs>
          <clipPath id="clip0_136_43">
            <rect
              width="50"
              height="50"
              fill="white"
              transform="translate(50) rotate(90)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
// import { mixin as clickaway } from "vue-clickaway";
import { mixin as VueClickAway } from "vue3-click-away";
export default {
  name: "gf-select-box",
  props: {
    label_text: {
      type: String,
      default: "-",
    },
    options: {
      type: Array,
      required: true,
    },
    value: [String, Number],
  },
  mixins: [VueClickAway],
  data() {
    return {
      menu__active: false,
      selected__opc: null,
      cont: 2,
    };
  },
  methods: {
    toggle__menu() {
      if (this.menu__active) {
        this.menu__active = false;
        setTimeout(() => {
          this.$refs.options__container.classList.add("hidden");
        }, 20);
      } else {
        this.$refs.options__container.classList.remove("hidden");
        setTimeout(() => {
          this.menu__active = true;
        }, 20);
      }
    },
    quit__menu() {
      this.menu__active = false;
      setTimeout(() => {
        this.$refs.options__container.classList.add("hidden");
      }, 20);
    },
    set__selected(option) {
      console.log("Opcion elegida:", option);
      if (option) {
        if (option.length > 1) {
          this.selected__opc = option.charAt(0).toUpperCase() + option.slice(1);
        } else {
          this.selected__opc = option.toUpperCase();
        }
        this.$emit("update:modelValue", this.selected__opc);
      } else {
        this.selected__opc = null;
        this.$emit("update:modelValue", this.selected__opc);
      }
    },
    created() {
      // this.$refs.options__container.classList.remove("active");
      console.log("Activo:", this.menu__active);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.select__box {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  outline: 0 !important;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0px 0px 15px 0px;
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
.select__box:focus-within ~ * > .helper {
  height: fit-content;
  opacity: 1;
  transition-duration: 1s;
  margin: 0px 0px 15px 10px;
}

.select__box:focus .selected {
  border: 1px solid #f2f2f2;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
}

.select__box .options__container {
  background-color: white;
  max-height: 150px;
  width: 100%;
  position: absolute;
  top: 55px;
  left: 0px;
  border-radius: 10px;
  transition: all 0.4s;
  order: 1;
  transition-duration: 0.3s;
  z-index: 8999; /*2*/
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0px;
}

.select__box .option,
.selected {
  padding: 5px 24px;
  cursor: pointer;
}
.select__box .option {
  padding: 15px 20px 15px 20px !important;
}

.select__box .option {
  padding: 10px;
  color: #6e6e75;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none !important;
}

.select__box label {
  cursor: pointer;
}

.select__box .option .radio {
  display: none;
}

.select__box .options__container.active {
  display: block;
  opacity: 1;
  max-height: 150px;
  width: 100%;
  position: absolute;
  overflow-y: scroll;
  border: 1px solid #ebe9e9; /*#f2f2f2;*/
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
}
.select__box .options__container + .selected svg {
  transition-delay: 0.1s;
  transition-duration: 0.5s;
}
.select__box .options__container.active + .selected svg {
  transform: rotateX(180deg);
  transition-delay: 0.1s;
  transition-duration: 0.5s;
}
.select__box .options__container::-webkit-scrollbar {
  width: 10px;
  background: white;
  cursor: pointer;
  border-radius: 0px 10px 10px 0px;
  border-left: 1px solid #ebe9e9; /*#f2f2f2;*/
}
.select__box .options__container::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
}
.selected {
  background-color: white;
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 10px;
  color: #6e6e75;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none !important;
  border: 1px solid #f2f2f2 !important;
  position: relative;
  order: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.selected__focus {
  z-index: 0;
  border: 1px blue solid;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
}

.selected svg {
  pointer-events: none;
}
.selected svg g path {
  fill: #6e6e75;
}

.select__box::focus {
  border: 1px solid #f2f2f2;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
}
.hidden {
  display: none;
}
@media (hover: hover) {
  .selected:hover svg g path {
    fill: #252525;
    transition-duration: 0.3s;
  }
  .selected:focus,
  .select__box .option:hover,
  .select__box .option:focus {
    background-color: #f2f2f2;
  }
}
</style>
