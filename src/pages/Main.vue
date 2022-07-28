<template>
  <section class="landing__page">
    <div class="landing" id="landing__page">
      <div class="circle_bg"></div>
      <!-- <div class="landing_img">
        <img src="@/assets/background/landing_bg.svg" alt="" />
      </div> -->
      <div class="landing__items">
        <div class="landing__title">
          Improve your <b>community</b><br />
          experience with <b>NFTs</b>
        </div>
        <div class="landing__description">
          Create personalized NFTs, add a unique utility and take advantage of
          analytics on open data to know better your community
        </div>
        <div class="landing__cta">
          <button class="learn__more__btn" @click="this.$router.push('/blog')">
            Learn more
          </button>
          <button class="create__btn" @click="$router.push('/digests')">
            Our digests
          </button>
        </div>
      </div>
    </div>
    <purpose></purpose>
    <div class="roadmap_container">
      <div class="roadmap_title">Roadmap</div>
      <div class="road_map">
        <div class="step_right">
          <div class="step_text">
            <h1>Blog (MVP)</h1>
            <p>
              One of our core values is people, that's why we want to teach them
              everything about Web3
            </p>
            <div class="circle"><h1>1</h1></div>
          </div>
        </div>
        <div class="step_left">
          <div class="step_text">
            <h1>Digests (MVP)</h1>
            <div class="aa">
              <p>
                We will provide different news digests regurarly about the most
                important topics so you can save your time searching for them
              </p>
            </div>
            <div class="circle"><h1>2</h1></div>
          </div>
        </div>
        <div class="step_right">
          <div class="step_text">
            <h1>NFT & Utility creator</h1>
            <p>Comming soon...</p>
            <div class="circle"><h1>3</h1></div>
          </div>
        </div>
        <div class="step_left">
          <div class="step_text">
            <h1>Personalized Marketplace</h1>
            <div class="aa">
              <p>Comming soon...</p>
            </div>
            <div class="circle"><h1>4</h1></div>
          </div>
        </div>
        <div class="step_right">
          <div class="step_text">
            <h1>NFT Analytics</h1>
            <p>Comming soon...</p>
            <div class="circle"><h1>5</h1></div>
          </div>
        </div>
        <div
          class="comming_soon"
          @click="window.open('https://discord.gg/9fasjMC2M7')"
        >
          <div class="cs">Stay tuned</div>
        </div>
      </div>
    </div>
  </section>
  <fut></fut>
</template>

<script>
import Purpose from "@/components/Purpose";
import fut from "@/components/Footer";
export default {
  emits: ["setAccount"],
  components: {
    Purpose,
    fut,
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
};
</script>

<style scoped>
.landing__page {
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0px;
}
.landing {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  z-index: 2000;
}

.landing.div {
  vertical-align: middle;
  height: 100%;
  margin: auto;
}

.landing__bg {
  position: absolute;
  z-index: 0;
  width: 100%;
  bottom: 10%;

  background-color: white;
}

.landing__items {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  z-index: 3000;
}

.landing__title {
  font-size: max(3.3vw, 23px);
  font-weight: 500;
  z-index: 100;
}

.landing__title b {
  font-weight: 600;
  background: -webkit-linear-gradient(
    0deg,
    rgba(0, 113, 218, 1) 0%,
    rgba(0, 113, 218, 0.7) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.landing__description,
.subtitle {
  padding: 30px 0px;
  font-weight: normal;
  font-size: 18px;
  z-index: 100;
  transition-duration: 0.7s;
}
.landing__description {
  width: 100%;
  max-width: 550px;
  transition-duration: 0.7s;
  box-sizing: border-box;
  padding: 30px 10px;
}
.landing__cta {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  width: 100%;
  z-index: 100;
}

.learn__more__btn {
  padding: 15px;
  background: rgb(0, 113, 218);
  background: linear-gradient(
    90deg,
    rgba(0, 113, 218, 1) 0%,
    rgba(0, 113, 218, 0.7) 100%
  );
  border-radius: 10px;
  border: none;
  color: white !important;
  font-weight: 500;
}

.create__btn {
  padding: 13px;
  font-weight: 500;
  border-radius: 10px;
  border: #0071da solid 2px;
  background: white;
}

.learn__more__btn,
.create__btn {
  font-size: max(1vw, 18px);
  width: max(140px, 9vw);
  margin: 10px;
  cursor: pointer;
  transition-duration: 0.3s;
}

.circle_bg {
  -webkit-box-shadow: inset -1px 3px 8px 5px #1f87ff, 2px 5px 16px 0px #0b325e,
    0px 0px 150px 200px rgba(0, 113, 218, 0.09);
  box-shadow: inset -1px 3px 8px 5px #1f87ff, 2px 5px 16px 0px #0b325e,
    0px 0px 150px 200px rgba(0, 113, 218, 0.09);
  position: absolute;
  z-index: 2;
}

.landing_img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 0;
  box-sizing: border-box;
  padding: 20px 0px 0px 0px;
  justify-content: flex-start;
}
.landing_img img {
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: block;
  object-fit: cover;
  bottom: 0px;
}
.roadmap_container {
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 50px 10px 150px 10px;
}
.roadmap_title {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  color: #252525;
  margin: 50px 0px 70px 0px;
}
.road_map {
  position: relative;
  width: 100%;
  height: fit-content;
}
.step_right,
.step_left {
  position: relative;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 0px 0px 0px 50%;
}
.step_left {
  padding: 0px 50% 0px 0px;
}
.step_right .step_text,
.step_left .step_text {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  justify-content: flex-end;
  text-align: right;
  padding: 2px 50px 50px 10px;
}
.step_right .step_text {
  justify-content: flex-start;
  text-align: left;
  padding: 2px 10px 50px 50px;
}
.step_right .step_text:before {
  content: "";
  position: absolute;
  height: 100%;
  top: 0px;
  left: -2px;
  width: 4px;
  background: #0071da;
  z-index: 2;
}
.step_left .step_text:after {
  content: "";
  position: absolute;
  height: 100%;
  top: 0px;
  right: -2px;
  width: 4px;
  background: #0071da;
  z-index: 2;
}
.step_left .step_text h1,
.step_right .step_text h1 {
  color: #252525;
  font-size: 16px;
  font-weight: 600;
  line-height: 27px;
}
.step_left .step_text p,
.step_right .step_text p {
  position: relative;
  display: flex;
  justify-content: flex-start;
  color: #6e6e73;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  max-width: 350px;
}
.step_left .step_text {
  justify-content: flex-end;
}
.aa {
  display: flex;
  justify-content: flex-end;
}
.step_right .circle {
  position: absolute;
  height: 34px;
  width: 34px;
  top: 0px;
  bottom: 0px;
  left: -17px;
  border-radius: 50%;
  background: white;
  border: 3px solid #0071da;
  z-index: 4;
}
.step_left .circle {
  position: absolute;
  height: 34px;
  width: 34px;
  top: 0px;
  bottom: 0px;
  right: -17px;
  border-radius: 50%;
  background: white;
  border: 3px solid #0071da;
  z-index: 4;
}
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle h1 {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #252525 !important;
}
.comming_soon {
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 0px 10px 0px 10px;
  justify-content: center;
}
.cs {
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px;
  border: 3px solid #0071da;
  border-radius: 16px;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #252525 !important;
}
@media (hover: hover) {
  .learn__more__btn:hover,
  .create__btn:hover {
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    transition-duration: 0.3s;
  }
}

@media (max-width: 640px) {
  .learn__more__btn,
  .create__btn {
    font-size: 16px;
  }
  .landing__description {
    font-size: 14px !important;
    transition-duration: 0.7s;
  }
  .step_left .step_text h1,
  .step_right .step_text h1,
  .step_left .step_text p,
  .step_right .step_text p {
    font-size: 14px !important;
  }
}

@media (max-width: 400px) {
  .landing__cta {
    padding: 0px 2px;
  }
  .learn__more__btn,
  .create__btn {
    margin: 2px;
  }
}

@media screen and (orientation: landscape) and (max-width: 900px) {
  .landing__title {
    margin-top: 80px;
  }
}

/** Animations for the background */
.cube_1_circle {
  position: absolute;
  animation: cube_1_circle linear 20s infinite;
}
@keyframes cube_1_circle {
  0% {
    transform: translate(0px, 0px);
  }
  4% {
    transform: translate(-37px, 0px);
  }
  8% {
    transform: translate(-75px, -10px);
  }
  12% {
    transform: translate(-112.5px, -20px);
  }
  16% {
    transform: translate(-150px, -40px);
  }
  20% {
    transform: translate(-150px, -60px);
  }
  24% {
    transform: translate(-150px, -80px);
  }
  28% {
    transform: translate(-150px, -100px);
  }
  36% {
    transform: translate(-112.5px, -120px);
  }
  40% {
    transform: translate(-75px, -140px);
  }
  44% {
    transform: translate(-37px, -160px);
  }
  49% {
    transform: translate(0px, -165px);
  }
  53% {
    transform: translate(37px, -160px);
  }
  57% {
    transform: translate(75px, -140px);
  }
  61% {
    transform: translate(112.5px, -120px);
  }
  65% {
    transform: translate(150px, -100px);
  }
  69% {
    transform: translate(150px, -80px);
  }
  74% {
    transform: translate(150px, -60px);
  }
  79% {
    transform: translate(150px, -40px);
  }
  84% {
    transform: translate(112.5px, -20px);
  }
  90% {
    transform: translate(75px, -10px);
  }
  95% {
    transform: translate(37px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
.cube_2_circle {
  position: absolute;
  animation: cube_2_circle linear 20s infinite;
}
@keyframes cube_2_circle {
  0% {
    transform: translate(0px, 0px);
  }
  4% {
    transform: translate(37px, 0px);
  }
  8% {
    transform: translate(75px, 10px);
  }
  12% {
    transform: translate(112.5px, 20px);
  }
  16% {
    transform: translate(150px, 40px);
  }
  20% {
    transform: translate(150px, 60px);
  }
  24% {
    transform: translate(150px, 80px);
  }
  28% {
    transform: translate(150px, 100px);
  }
  36% {
    transform: translate(112.5px, 120px);
  }
  40% {
    transform: translate(75px, 140px);
  }
  44% {
    transform: translate(37px, 160px);
  }
  49% {
    transform: translate(0px, 165px);
  }
  53% {
    transform: translate(-37px, 160px);
  }
  57% {
    transform: translate(-75px, 140px);
  }
  61% {
    transform: translate(-112.5px, 120px);
  }
  65% {
    transform: translate(-150px, 100px);
  }
  69% {
    transform: translate(-150px, 80px);
  }
  74% {
    transform: translate(-150px, 60px);
  }
  79% {
    transform: translate(-150px, 40px);
  }
  84% {
    transform: translate(-112.5px, 20px);
  }
  90% {
    transform: translate(-75px, 10px);
  }
  95% {
    transform: translate(-37px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
.cube_1_platform {
  position: absolute;
  animation: cube_1_platform linear 10s infinite;
}
@keyframes cube_1_platform {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-25px);
  }
  100% {
    transform: translateY(0px);
  }
}
.cube_2_platform {
  position: absolute;
  animation: cube_2_platform linear 10s infinite;
}
@keyframes cube_2_platform {
  0% {
    transform: translateY(0px);
  }
  40% {
    transform: translateY(-34px);
  }
  60% {
    transform: translateY(-10px);
  }
  80% {
    transform: translateY(-17px);
  }
  100% {
    transform: translateY(0px);
  }
}
/** ============================= */
</style>
