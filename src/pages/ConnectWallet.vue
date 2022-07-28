<template>
  <section class="wallet__page">
    <div
      class="loading"
      v-if="this.$store.state.user_account.connecting_wallet"
    >
      <svg
        width="400"
        height="400"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_154_2)" class="loading_cube">
          <rect
            width="54.4319"
            height="54.4319"
            rx="4"
            transform="matrix(-2.05939e-05 1 -0.866015 0.500018 297.709 216.607)"
            fill="url(#paint0_linear_154_2)"
          />
          <rect
            width="54.4319"
            height="54.4319"
            rx="4"
            transform="matrix(0.866036 0.499982 -0.866036 0.499982 249.14 188)"
            fill="url(#paint1_linear_154_2)"
          />
          <rect
            width="54.4319"
            height="54.4319"
            rx="4"
            transform="matrix(-2.05939e-05 -1 0.866015 0.500018 201.57 271.039)"
            fill="url(#paint2_linear_154_2)"
          />
        </g>
        <rect
          width="148.451"
          height="148.451"
          rx="7"
          transform="matrix(0.866036 0.499982 -0.866036 0.499982 250.563 215)"
          fill="#0071DA"
          fill-opacity="0.07"
        />
        <defs>
          <filter
            id="filter0_d_154_2"
            x="194.569"
            y="186.171"
            width="110.14"
            height="121.558"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.145098 0 0 0 0 0.145098 0 0 0 0 0.145098 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_154_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_154_2"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_154_2"
            x1="27.216"
            y1="0"
            x2="27.216"
            y2="54.4319"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1" stop-color="#003C74" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_154_2"
            x1="27.216"
            y1="0"
            x2="27.216"
            y2="54.4319"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0071DA" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_154_2"
            x1="54.4319"
            y1="0"
            x2="3.8147e-06"
            y2="54.4319"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.227486" stop-color="#0071DA" />
            <stop offset="1" stop-color="#003C74" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="wallet__section">
      <div class="title__text">Choose your wallet</div>
      <div class="description__text">
        Connect with one of our available wallet providers and start creating.
      </div>
      <div class="wallets">
        <div class="wallet__div__top" @click="connectWallet('metamask')">
          <div class="wallet">
            <img src="@/assets/icons/wallets/metamask.png" alt="" />
            <div class="subtitle__text" ref="metamask_wallet">Metamask</div>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div class="wallet__more">
          <div class="description__text">More options coming soon</div>
        </div>
      </div>
    </div>
  </section>
  <fut></fut>
</template>

<script>
import fut from "@/components/Footer";
export default {
  emits: ["setAccount"],
  components: { fut },
  data() {
    return {};
  },
  methods: {
    connectWallet(wallet) {
      if (wallet === "metamask") {
        // Connect to the metamask
        // connectAccount(wallet)
        //this.$emit("setAccount", "metamask");
        this.$store.dispatch("user_account/connectAccount", "metamask", {
          root: true,
        });
      }
      if (wallet === "coinbase") {
        console.log("Connecting Coinbase wallet");
      }
    },
  },
};
</script>

<style scoped>
.subtitle__text {
  margin: 5px 0px 5px 0px;
}
.wallet__page {
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 0px;
}
.wallet__section {
  margin-left: auto;
  margin-right: auto;
  height: fit-content;
  /*background-color: rgb(0, 113, 218, 0.02);*/
  background-color: white;
  text-align: center;
  padding: 100px 10%;
}
.wallets {
  width: 100%;
  height: fit-content;
  margin-top: 50px;
  background-color: white;
  border-radius: 10px solid black;
}
.wallet__div__top,
.wallet__div__middle,
.wallet__more {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #0071da; /** #ebe9e90071da */
  border-radius: 0px 0px 0px 0px;
  margin: -1px;
  padding: 13px 15px;
  cursor: pointer;
  font-size: 16px;
}
.wallet__div__top {
  border-radius: 10px 10px 0px 0px;
}
.wallet__more {
  border-radius: 0px 0px 10px 10px;
  justify-content: center;
}
.wallet {
  display: flex;
  flex-direction: row;
}
.wallet div {
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wallet img {
  height: 45px;
}

.go_arrow {
  height: 16px !important;
}
@media (hover: hover) {
  .wallet__div__top:hover,
  .wallet__div__middle:hover,
  .wallet__more:hover {
    -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
    box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
  }
}

.loading {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: 0.2s;
}

.loading_cube {
  position: absolute;
  animation: loading linear 0.7s infinite;
}

@keyframes loading {
  0% {
    transform: translate(0px, 0px);
  }
  60% {
    transform: translate(0px, -50px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
