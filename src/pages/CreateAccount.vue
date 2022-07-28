<template>
  <section class="create__start">
    <div class="create__section">
      <div class="title__text" id="title_account_new">Create new account</div>
      <div class="account_creation_forms">
        <div class="form_section">
          <div class="progress">
            <div class="num_circle past_circle" :class="{}">1</div>
            <div
              class="progress_line"
              :class="{
                active_line: form_step === 2 || form_step === 3,
              }"
            ></div>
            <div
              class="num_circle"
              :class="{
                active_circle: form_step === 2,
                past_circle: form_step === 3,
              }"
            >
              2
            </div>
            <div
              class="progress_line"
              :class="{ active_line: form_step === 3 }"
            ></div>
            <div class="num_circle" :class="{ active_circle: form_step === 3 }">
              ✓
            </div>
          </div>
          <div class="step" v-if="form_step === 1">
            <gf-input-field v-model="nickname" :showError="nickname_error">
              <template v-slot:title>Nickname / Company name</template>
              <template v-slot:helper
                >Get your users know who are you providing some name.</template
              >
            </gf-input-field>
            <gf-textarea v-model="description" :showError="description_error">
              <template v-slot:title>Biography / Company description</template>
              <template v-slot:helper
                >Get your users know about what are you doing or some util
                information.</template
              >
            </gf-textarea>
            <gf-tag-input-field
              v-model="thematics"
              :showError="thematics_error"
              :setTags="thematics"
            >
              <template v-slot:title>Favorite Thematics</template>
              <template v-slot:helper
                >Add your favorite thematics. Eg: Nature photography.</template
              >
            </gf-tag-input-field>
            <gf-social-boxed-input
              v-model="social_links"
              :social_links="social_links_ini"
            >
            </gf-social-boxed-input>
            <div class="button-list">
              <step-button
                class="create__button"
                @click="cancel_account_creation()"
              >
                Cancel
              </step-button>
              <step-button class="create__button" @click="toStep2()">
                Next step ❯
              </step-button>
            </div>
          </div>
          <div class="step" v-else-if="form_step === 2">
            <big-toggle
              v-model="accept_commissions"
              :check="accept_commissions"
            >
              <template v-slot:positive_option>Closed to commissions</template>
              <template v-slot:negative_option>Open to commissions</template>
              <template v-slot:helper
                >If you are a content creator, you can set that you are open to
                receive commissions from some client.</template
              >
            </big-toggle>
            <big-toggle v-model="accept_analysis" :check="accept_analysis">
              <template v-slot:positive_option>Deny OnChain analytics</template>
              <template v-slot:negative_option
                >Allow OnChain analytics</template
              >
              <template v-slot:helper
                >You can allow to store some data on-chain for your analytics,
                which could cost some more gas.</template
              >
            </big-toggle>
            <div class="terms_container">
              <input
                class="input_terms"
                type="checkbox"
                name="toggle"
                id="input_terms"
                :checked="terms_and_conditions"
                @change="emitChange($event)"
              />
              <label for="input_terms" class="input_terms_label"
                ><div v-if="terms_and_conditions" class="check">✓</div></label
              >
              <div class="generic__text terms_line">
                Accept <a href="" class="terms_link"> terms, conditions</a> and
                <a href="" class="terms_link">privacy policy</a>
              </div>
            </div>
            <div class="button-list">
              <step-button class="create__button" @click="toStep1()">
                ❮ Previous step</step-button
              >
              <step-button class="create__button" @click="toStep3()">
                Next step ❯
              </step-button>
            </div>
          </div>
          <div class="step" v-else-if="form_step === 3">
            <div class="info_check">
              <div class="info_item">
                <div class="info_item_title">Nickname/Company name:</div>
                <div class="info_item_body">{{ nickname }}</div>
              </div>
              <div class="info_item_column">
                <div class="info_item_title">
                  Biography / Company description:
                </div>
                <div class="info_item_body">{{ description }}</div>
              </div>
              <div class="info_item_column">
                <div class="info_item_title">Favorite thematics:</div>
                <div class="info_item_body">{{ arrayToStr(thematics) }}</div>
              </div>
              <div class="info_item">
                <div class="info_item_title">Accept commissions:</div>
                <div class="info_item_body">
                  {{ boolToStr(accept_commissions) }}
                </div>
              </div>
              <div class="info_item">
                <div class="info_item_title">Accept OnChain alanytics:</div>
                <div class="info_item_body">
                  {{ boolToStr(accept_analysis) }}
                </div>
              </div>
              <div class="terms_container">
                <input
                  class="input_terms"
                  type="checkbox"
                  name="toggle"
                  id="input_ok"
                  :checked="information_ok"
                  @change="emitChange1($event)"
                />
                <label for="input_ok" class="input_terms_label"
                  ><div v-if="information_ok" class="check">✓</div></label
                >
                <div class="generic__text terms_line">
                  Congratulations, you are almost done! Please check if your
                  information is correct, if yes, let's create your account!
                </div>
              </div>
            </div>
            <div class="button-list">
              <step-button class="create__button" @click="toStep2()">
                ❮ Previous step</step-button
              >
              <step-button class="create__button" @click="createAccount()">
                It's ok, create
              </step-button>
            </div>
          </div>
        </div>
        <div class="info_section">
          <div class="info_alert">
            <div class="attention">!</div>
            <div class="generic__text" v-if="form_step < 3">
              All the information provided here will be stored on-chain in your
              account contract
            </div>
            <div class="generic__text" v-else-if="form_step === 3">
              You will be able to change that information later, but it will
              cost you some gas
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  //components: { SelectBox },
  data() {
    return {
      social_links_ini: [
        {
          network: "website",
          network_url: "",
        },
        {
          network: "discord",
          network_url: "",
        },
        {
          network: "opensea",
          network_url: "",
        },
        {
          network: "telegram",
          network_url: "",
        },
      ],
      social_links: [],
      nickname_helper: true,
      form_step: 1,
      nickname: "",
      description: "",
      thematics: [],
      accept_commissions: false,
      accept_analysis: false,
      terms_and_conditions: false,
      nickname_error: false,
      description_error: false,
      thematics_error: false,
      information_ok: false,
    };
  },
  props: {
    wallet_account: {
      type: Object,
    },
    wallet_connected: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    async createWeb3Contract() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = this.$store.state.gf_contracts.gfMainContractAddress;
      const abi = this.$store.state.gf_contracts.gfMainContractABI;
      const GFMainContract = new ethers.Contract(address, abi, signer);

      GFMainContract.createNewAccount(
        this.nickname,
        this.description,
        this.thematics,
        this.accept_commissions,
        this.accept_analysis,
        { gasLimit: 3000000 }
      ).then((result) => {
        console.log("Guay: ", result);
      });
    },
    createAccount() {
      if (this.information_ok) {
        //this.$router.push("/#title_account_new");
        this.createWeb3Contract();
      } else {
        const notification = {
          type: "error",
          message: "Please, check the checkbox if your information is ok.",
        };
        this.$store.dispatch("notification/add", notification, {
          root: true,
        });
      }
    },
    cancel_account_creation() {
      this.nickname = "";
      this.description = "";
      this.thematics = [];
    },
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    check_step_1() {
      // Nickname
      if (this.nickname === "") {
        this.nickname_error = true;
      } else {
        this.nickname_error = false;
      }
      // Description
      if (this.description === "") {
        this.description_error = true;
      } else {
        this.description_error = false;
      }
      // Thematics
      if (this.thematics.length === 0) {
        this.thematics_error = true;
      } else {
        this.thematics_error = false;
      }
      return (
        !this.nickname_error && !this.description_error && !this.thematics_error
      );
    },
    toStep1() {
      this.form_step = 1;
      this.scrollToTop();
    },
    toStep2() {
      if (this.check_step_1()) {
        this.form_step = 2;
        console.log("Next Step", this.check_step_1());
        this.scrollToTop();
      } else {
        const notification = {
          type: "error",
          message: "Please, enter all the required information.",
        };
        this.$store.dispatch("notification/add", notification, {
          root: true,
        });
      }
    },
    toStep3() {
      if (this.terms_and_conditions) {
        this.form_step = 3;
        this.scrollToTop();
      } else {
        const notification = {
          type: "error",
          message: "You need to accept our terms and conditions to continue.",
        };
        this.$store.dispatch("notification/add", notification, {
          root: true,
        });
      }
    },
    emitChange(ev) {
      console.log(ev.target.checked);
      this.terms_and_conditions = ev.target.checked;
    },
    emitChange1(ev) {
      console.log(ev.target.checked);
      this.information_ok = ev.target.checked;
    },
    arrayToStr(data) {
      var res = "";
      for (let i = 0; i < data.length - 1; i++) {
        res += data[i] + ",";
      }
      res += data[data.length - 1];
      return res;
    },
    boolToStr(data) {
      if (data) {
        return "Yes";
      } else {
        return "No";
      }
    },
  },
};
</script>

<style scoped>
textarea,
input {
  margin: 20px 0px 0px 0px;
}
/**Steps of creating account */
.step {
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 525px;
  height: fit-content;
}

/** Progress line*/
.progress {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  margin: 0px 0px 40px 0px;
}
.num_circle {
  display: flex;
  height: 35px;
  min-height: 35px;
  width: 35px;
  min-width: 35px;
  border: 2px solid #f2f2f2;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 16px;
  color: #f2f2f2;
  transition-duration: 0.9s;
}
.past_circle {
  border: 2px solid #0071da;
  color: #0071da;
  font-weight: 400;
  font-size: 16px;
  transition-duration: 0.9s;
}
.progress_line {
  display: flex;
  height: 2px;
  background-color: #f2f2f2;
  width: 100%;
  transition-duration: 0.9s;
}

.active_circle {
  border: 3px solid #0071da;
  color: #0071da;
  font-weight: 600;
  font-size: 16px;
  transition-duration: 0.7s;
}

.active_line {
  background-color: #0071da;
  transition-duration: 0.9s;
}

.nickname_helper {
  text-align: left;
  display: flex;
  padding: 0px;
  font-size: 14px;
  width: 100%;
  height: 0px;
  opacity: 0;
  margin: 0px 0px 0px 10px;
  color: #6e6e75;
  pointer-events: none;
  transition-duration: 0.7s;
}
.active_helper {
  height: fit-content;
  opacity: 1;
  transition-duration: 0.7s;
  margin: 0px 0px 10px 10px;
}

/** Inputs helpers */
.nickname:focus ~ .nickaname_helper {
  color: red;
}

/** */
.inactive {
  display: none !important;
  opacity: 0 !important;
  transition-duration: 0.5s;
}
.nickaname {
  display: block;
  transition-delay: 0.2s;
  transition-duration: 0.5s;
}
.button-list {
  transition-duration: 0.5s;
  margin: 50px 0px 0px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
.input__selector,
.input__textarea_selector {
  outline: none !important;
  border: 1px solid #f2f2f2 !important;
  border-radius: 10px;
  padding: 10px;
  color: #6e6e75;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.input__selector:focus,
.input__textarea_selector:focus {
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
}
.input__textarea_selector {
  resize: vertical;
}
.create__start {
  height: fit-content;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  max-width: 760px;
  padding: 0px 10px;
}
.title__text {
  text-align: left;
  margin: 0px 0px 25px 0px;
  font-size: max(2vw, 24px);
}
.generic__text {
  font-size: 14px;
  margin: 5px 0px 5px 5px;
}
.subtitle__text,
.generic__text {
  text-align: left;
  display: flex;
  padding: 0px;
}
.subtitle__text {
  margin: 30px 0px 5px 0px;
}
.check {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #76b041;
  font-weight: 600;
}
.star {
  font-weight: 700;
  color: #c70039;
  margin: 0px 4px;
  padding: 0px;
}
.create__section {
  background-color: white;
  min-width: 40%;
  height: fit-content;
  margin-top: 150px;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  transition-duration: 0.7s;
}
.account_creation_forms {
  display: flex;
  flex-direction: row;
}
.form_section {
  width: 70%;
}

.info_section {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 30%;
  height: auto;
  padding: 105px 0px 0px 20px;
}
.info_alert {
  display: flex;
  flex-direction: column;
  background: rgba(0, 113, 218, 0.05);
  border-radius: 16px;
  padding: 10px;
  width: 100%;
  max-width: 250px;
  height: fit-content;
  justify-content: center;
  align-items: center;
}
.info_alert div {
  text-align: center !important;
  padding: 20px 0px 20px 0px;
}
.attention {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 80px;
  line-height: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #0071da;
}

.terms_container {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 60px 0px 10px 0px;
}
.terms_line {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 525px;
  padding: 0px 5px;
}
.terms_link {
  padding: 0px 5px;
  text-decoration: none;
  color: #0071da;
  font-weight: 500;
}
.input_terms {
  position: relative;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background: #ffffff;
  outline: none;
  padding: 0;
  margin: 0;
  opacity: 0;
}

.input_terms_label {
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background: none;
  border: 2px solid #ebe9e9; /*#f2f2f2;*/
  border-radius: 10px;
  pointer-events: none;
}
.input_terms:focus ~ .input_terms_label {
  background: white;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
}
/**=================== */
.info_check {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
}

.info_item,
.info_item_column {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding: 15px 0px 10px 0px;
}
.info_item_column {
  flex-direction: column;
  align-items: flex-start;
  max-width: 525px;
  padding: 15px 0px 10px 0px;
}
.info_item_title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #6e6e75;
  padding: 5px 10px 0px 0px;
}

.info_item_body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: fit-content;
  font-weight: 600;
  font-size: 16px;
  padding: 5px 0px 0px 0px;
}

form:focus {
  background-color: red !important;
  border: 1px blue solid;
  color: blue;
  outline: 1px pink solid;
}

.create__button {
  margin: 30px 0px 0px 0px;
}

@media (max-width: 800px) {
  .form_section,
  .info_section {
    width: 100%;
  }
  .account_creation_forms {
    flex-direction: column-reverse;
  }
  .info_section {
    width: 100%;
    height: auto;
    padding: 0px 0px 25px 0px;
  }
  .info_alert {
    max-width: 100%;
    flex-direction: row;
  }
  .info_alert div {
    padding: 0px 0px 0px 0px;
  }
  .attention {
    font-size: 20px;
    line-height: 20px;
  }
  .create__section {
    transition-duration: 0.7s;
    width: 100%;
    min-width: 100%;
    padding: 5%;
  }
}

@media (max-width: 760px) {
  .button-list {
    align-content: center;
    justify-content: center !important;
    gap: 5px;
    transition-duration: 0.5s;
  }
}

@media (hover: hover) {
}
</style>
