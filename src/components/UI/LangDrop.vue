<template>
  <div class="bg_lang">
    <div class="n-lang__drop" v-if="show" @click.stop="hideDialog">
      <div class="n-nav__links__mobile">
        <div class="sep"></div>
        <div
          @click="
            $router.push('/');
            toggleLangPC();
          "
        >
          <div>
            <img src="@/assets/icons/lang/english.svg" alt="" />
            <h4>English</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          @click="
            $router.push('/');
            toggleLangPC();
          "
        >
          <div>
            <img src="@/assets/icons/lang/spanish.svg" alt="" />
            <h4>Spanish</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          @click="
            $router.push('/');
            toggleLangPC();
          "
        >
          <div>
            <img src="@/assets/icons/lang/catalonian.svg" alt="" />
            <h4>Catalonian</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          @click="
            $router.push('/');
            toggleLangPC();
          "
        >
          <div>
            <img src="@/assets/icons/lang/ukrainian.svg" alt="" />
            <h4>Ukrainian</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          @click="
            $router.push('/');
            toggleLangPC();
          "
        >
          <div>
            <img src="@/assets/icons/lang/russian.svg" alt="" />
            <h4>Russian</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lang-drop",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.n-nav__links__mobile {
  width: 100%;
  display: flex;
  padding: 120px 15px;
  flex-direction: column;
  background-color: #f2f2f2;

  overflow-y: scroll;
  height: 100%;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
}
.n-nav__links__mobile div {
  padding: 20px 15px;
  width: 100%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.n-nav__links__mobile div img,
.lang_flag {
  height: 32px;
}
.n-nav__links__mobile div h4 {
  font-size: 16px;
  font-weight: 500;
  padding: 0px 15px;
}
.n-nav__links__mobile div div {
  margin: 0;
  padding: 0;
}

.bg_lang {
  position: absolute;
  background-color: rgb(0, 0, 0, 0.5);
  width: 100%;
}

.n-lang__drop {
  position: absolute;
  top: -10px;
  right: -5px;
  border-radius: 10px;
  height: fit-content;
  min-width: 300px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  z-index: 1;
  transition-duration: 0.3s;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
}
.n-lang__drop h3 {
  color: #252525;
  font-weight: 300;
  font-size: 16px;
  line-height: 32px;
  padding: 10px 0px;
}
.n-lang__drop .n-nav__links__mobile {
  background-color: #f2f2f2;
  color: #252525;
  -webkit-box-shadow: none;
  box-shadow: none;
  padding: 35px 0px 0px 0px;
  overflow-y: auto;
}
.lang__drop__title img {
  height: 32px;
  margin: 10px 15px;
}

.sep {
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 0px 0px !important;
  border: 1px #e2e2e2 solid;
  background-color: #e2e2e2;
  border-radius: 1px;
  width: 100% !important;
  height: 1px;
}
.go_arrow {
  height: 16px !important;
}
</style>