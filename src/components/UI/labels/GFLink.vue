<template>
  <div class="link_container">
    <img src="@/assets/icons/UI/link.png" alt="" />
    <h2 @click="goto(web_link)">{{ web }}</h2>
  </div>
</template>

<script>
export default {
  name: "gf-link",
  props: {
    website: String,
    website_link: String,
  },
  data() {
    return {
      web: "",
      web_link: "",
    };
  },
  methods: {
    goto(link) {
      window.open(link, "_blank");
    },
  },
  mounted() {
    this.web = this.website;
    this.web_link = this.website_link;
    console.log;
  },
  watch: {
    website: function (newValue) {
      this.web = newValue;
    },
    website_link: function (newValue) {
      this.web_link = newValue;
    },
  },
};
</script>

<style scoped>
.link_container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  width: 100%;
  margin: 0px 0px 10px 0px;
}
.link_container h2 {
  font-size: 14px;
  color: #6e6e73;
  font-weight: 400;
  box-sizing: border-box;
  padding: 0px 0px 0px 0px;
  transition-duration: 0.3s;
}
.link_container img {
  height: 13px;
  width: 13px;
  margin: 0px 7px 2px 0px;
}
@media (hover: hover) {
  .link_container:hover h2 {
    color: #0071da;
    transition-duration: 0.5s;
  }
}
</style>
