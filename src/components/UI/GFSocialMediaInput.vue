<template>
  <div class="social_container">
    <div
      class="social_item"
      v-for="(network, key) in social_networks"
      :key="key"
      tabindex="1"
    >
      <div
        class="select__box"
        @keydown.enter.exact.prevent="toggle__menu(key)"
        @click.prevent="toggle__menu(key)"
        @focusout="quit__menu(key)"
      >
        <div
          :id="'options_container_' + key"
          :ref="'options_container_' + key"
          class="options__container generic__text"
          :key="key"
          tabindex="2"
        >
          <div class="option" @click.prevent="set__selected(key, null, '2')">
            <input
              type="radio"
              class="radio"
              id="none_social"
              name="collection"
            />
            <!-- @input="update()" -->
            <label for="none_social">-</label>
          </div>
          <div
            v-for="option in options"
            :key="option.network"
            class="option"
            :id="key"
            @click.prevent="set__selected(key, option, '3')"
            @keydown.space.exact.prevent="set__selected(key, option, '4')"
          >
            <div class="option_img">
              <img
                :src="require('./../../' + network_icons[option.network].url)"
              />
            </div>
            <div class="generic__text pp" :for="key">
              {{ option.network }}
            </div>
          </div>
        </div>
        <div class="selected">
          <div
            class="default_label"
            v-if="!social_networks[key].network.length > 0 && !value"
          >
            {{ label_text }}
          </div>
          <div v-if="!social_networks[key].network.length > 0 && value">
            {{ value }}
          </div>
          <img
            v-if="social_networks[key].network"
            class="selected_icon"
            :src="
              require('./../../' +
                network_icons[social_networks[key].network].url)
            "
          />
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
      <div class="social_input_container">
        <input
          type="text"
          class="social_input"
          placeholder="www"
          :ref="'input' + key"
          @input="
            setValue($event.target.value, key);
            update();
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { mixin as clickaway } from "vue-clickaway";
import { mixin as VueClickAway } from "vue3-click-away";
export default {
  name: "gf-social-boxed-input",
  props: {
    modelValue: Object,
    label_text: {
      type: String,
      default: "-",
    },
    social_links: {
      type: Array,
      default: () => [
        {
          network: "website",
          network_url: "",
        },
        {
          network: "discord",
          network_url: "",
        },
        {
          network: "instagram",
          network_url: "",
        },
        {
          network: "telegram",
          network_url: "",
        },
      ],
    },
    value: [String, Number],
  },
  mixins: [VueClickAway],
  data() {
    return {
      options: {
        0: {
          network: "opensea",
        },
        1: {
          network: "rarible",
        },
        2: {
          network: "instagram",
        },
        3: {
          network: "twitter",
        },
        4: {
          network: "linkedin",
        },
        5: {
          network: "website",
        },
        6: {
          network: "discord",
        },
        7: {
          network: "telegram",
        },
        8: {
          network: "medium",
        },
        9: {
          network: "reddit",
        },
        10: {
          network: "looksrare",
        },
        11: {
          network: "link",
        },
      },
      network_icons: {
        instagram: {
          url: "assets/icons/social_networks/instagram.png",
          url_text: "@YourAccount",
        },
        twitter: {
          url: "assets/icons/social_networks/twitter.png",
          url_text: "@YourAccount",
        },
        linkedin: {
          url: "assets/icons/social_networks/linkedin.png",
          url_text: "linkedin.com/in/YourAccount",
        },
        website: {
          url: "assets/icons/social_networks/website.png",
          url_text: "www.YourWebsite.com",
        },
        discord: {
          url: "assets/icons/social_networks/discord.png",
          url_text: "gg/YourCommunity",
        },
        telegram: {
          url: "assets/icons/social_networks/telegram.png",
          url_text: "t.me/YourCommunity",
        },
        medium: {
          url: "assets/icons/social_networks/medium.png",
          url_text: "/@YourCommunity",
        },
        reddit: {
          url: "assets/icons/social_networks/reddit.png",
          url_text: "r/YourCommunity",
        },
        link: {
          url: "assets/icons/social_networks/link.png",
          url_text: "another link",
        },
        opensea: {
          url: "assets/icons/social_networks/opensea.png",
          url_text: "@Opensea",
        },
        rarible: {
          url: "assets/icons/social_networks/rarible.png",
          url_text: "@Rarible",
        },
        looksrare: {
          url: "assets/icons/social_networks/looksrare.png",
          url_text: "@Look",
        },
      },
      // Values which will be passed to the parent
      social_networks: [
        {
          network: "website",
          network_url: "",
        },
        {
          network: "discord",
          network_url: "",
        },
        {
          network: "instagram",
          network_url: "",
        },
        {
          network: "telegram",
          network_url: "",
        },
      ],
      error: false,
      full: false,
      menu__active: false,
      cont: 2,
    };
  },
  methods: {
    setValue(values, key) {
      console.log("setValue:", values);
      this.social_networks[key].network_url = values;
    },
    updateInputPlaceholders() {
      for (let i = 0; i < this.social_networks.length; i++) {
        this.updateInput(i);
      }
    },
    updateInput(key) {
      if (this.social_networks[key].network.length > 0) {
        this.$refs["input" + key].placeholder =
          this.network_icons[this.social_networks[key].network].url_text;
      } else if (this.$refs["input" + key]) {
        this.$refs["input" + key].placeholder = "www";
      }
    },
    toggle__menu(ev) {
      console.log("Toogle_menu:", ev);
      const container = this.$refs["options_container_" + ev];

      if (
        container &&
        Array.from(this.$refs["options_container_" + ev].classList).includes(
          "active"
        )
      ) {
        container.classList.remove("active");
      } else {
        container.classList.add("active");
      }

      // Change placeholder (To 1uit)
      this.updateInput(ev);
    },
    quit__menu(key) {
      const container = this.$refs["options_container_" + key];
      console.log("quit__menu:", container, "- With Key:", key);
      try {
        if (Array.from(container.classList).includes("active")) {
          setTimeout(() => {
            this.$refs["options_container_" + key].classList.remove("active");
          }, 50);
        }
      } catch (error) {
        console.log("F");
      }

      //   this.menu__active = false;
      //   setTimeout(() => {
      //     this.$refs.options__container.classList.add("hidden");
      //   }, 20);
    },
    updateInputValues() {
      for (let i = 0; i < this.social_networks.length; i++) {
        if (this.$refs["input" + i]) {
          this.$refs["input" + i].value = this.social_networks[i].network_url;
        }
      }
    },
    set__selected(key, option, a) {
      //alert("set__selected:" + option.network + "-Hmm: " + a + " Key: " + key);
      console.log("set__selected:", option, "-Hmm:", a, "Key:", key);
      if (option) {
        if (option.network.length > 1) {
          this.social_networks[key] = {
            network: option.network,
            network_url: this.$refs["input" + key].value,
          };
        }
        //this.$refs["input" + key].value = this.$refs["input" + key].value; // Resetting the URL Value
        this.$emit("update:modelValue", this.social_networks);
      } else {
        this.social_networks[key] = {
          network: "",
          network_url: "",
        };
        //this.$refs["input" + key].value = ""; // Resetting the URL Value
        this.$emit("update:modelValue", this.social_networks);
      }
      this.update();
      this.quit__menu(key);
    },
    // OLD METHODS
    add() {
      this.social_networks.push({ network: "", network_url: "" });
      this.updateInput(this.social_networks.length - 1);
    },
    remove(index) {
      if (this.social_networks.length > 1) {
        this.social_networks.splice(index, 1);
      }
      console.log("Remove:", this.social_networks.length);
      this.update();
    },
    checkFull() {
      this.full = true;
      this.social_networks.forEach((input) => {
        console.log("CheckFull 1:", input.network);
        if (input.network.length === 0 || input.network_url.length === 0) {
          this.full = false;
        }
        console.log(
          "CheckFull 2:",
          input.network,
          input.network_url,
          this.full
        );
      });
    },
    checkEmpty() {
      for (let i = 0; i < this.social_networks.length; i++) {
        if (
          this.social_networks[i].network.length === 0 &&
          this.social_networks[i].network_url.length === 0
        ) {
          if (this.social_networks.length > 1) {
            this.remove(i);
          }
        }
        this.updateInput(i);
      }
    },
    quitLastAndSend() {
      if (
        this.social_networks.length > 1 &&
        this.social_networks[this.social_networks.length - 1].network != "-"
      ) {
        this.social_networks.splice(this.social_networks.length - 1, 1);
      }
    },
    update() {
      this.checkFull();
      if (this.full) {
        this.add();
      } else {
        this.checkEmpty();
      }
      this.updateInputValues();
      this.$emit("update:modelValue", this.social_networks);
    },
  },
  created() {
    this.$emit("update:modelValue", this.social_networks);
  },
  mounted() {
    this.updateInputPlaceholders();
    this.social_networks = this.social_links;
  },
};
</script>

<style scoped>
.pp {
  z-index: 9999;
}
.select__box .option .radio {
  display: block;
}
.option img,
.selected_icon {
  height: 25px;
  width: auto;
}
.social_container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  padding: 0px 0px 15px 0px;
}
.social_item {
  display: flex;
  align-content: space-between;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  margin: 15px 0px 0px 0px;
}
.social_selector {
  display: flex;
  align-content: flex-start;
  gap: 5px;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  height: 45px;
  width: fit-content;
  min-width: 70px;
  outline: none !important;
  border: 1px solid #ebe9e9 !important;
  border-radius: 10px 0px 0px 10px;
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
.social_selector img {
  height: 25px;
  width: auto;
}
.social_input_container {
  box-sizing: border-box;
  padding: 0px 0px 0px 5px;
  height: auto;
  width: 100%;
}
.social_input {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  outline: none !important;
  border: 1px solid #ebe9e9 !important;
  border-radius: 0px 10px 10px 0px;
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
.social_input:focus,
.social_selector:focus {
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
}

@media (hover: hover) {
  .social_input:hover,
  .social_selector:hover {
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
/* New desplegable*/
* {
  margin: 0;
  box-sizing: border-box;
}
.select__box {
  position: relative;
  display: flex;
  flex-direction: column;
  outline: 0 !important;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.select__box:focus .selected {
  border: 1px solid #f2f2f2;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
}
.select__box .options__container {
  position: absolute;
  background-color: white;
  max-height: 150px;
  width: fit-content;
  top: 55px;
  left: 0px;
  border-radius: 10px;
  transition: all 0.4s;
  order: 1;
  transition-duration: 0.3s;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0px;
}
.select__box .options__container {
  z-index: 8999 !important; /*2*/
}
.select__box .option {
  padding: 5px 24px;
  width: 100%;
  cursor: pointer;
}
.select__box .option {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 15px 20px 15px 20px;
  color: #6e6e75;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none !important;
}
.select__box .option label {
  width: 100%;
  text-align: center;
}
.default_label {
  width: 25px;
  text-align: center;
}
.option_img {
  display: flex;
  min-width: 30px;
  align-items: center;
}

.select__box label {
  cursor: pointer;
}

.select__box .options__container.active {
  display: block;
  opacity: 1;
  height: fit-content;
  max-height: 200px;
  padding: 0px;
  width: fit-content;
  position: absolute;
  overflow-y: scroll !important;
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
.select__box .option .radio {
  display: none;
}
.selected {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center !important;
  background-color: white;
  border-radius: 10px 0px 0px 10px;
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
  height: 45px;
  width: auto;
  min-width: 70px;
  z-index: 800;
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
