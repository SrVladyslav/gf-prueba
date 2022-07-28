<template>
  <div class="min_red">
    <img src="@/assets/icons/UI/clock.svg" alt="" />
    <div>{{ time }}</div>
  </div>
</template>

<script>
export default {
  name: "gf-reading-clock",
  props: {
    text: String,
  },
  data() {
    return {
      time: 0,
    };
  },
  methods: {
    estimateReadingTime(text) {
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / 225);
      return time + " min";
    },
  },
  mounted() {
    this.time = this.estimateReadingTime(this.text);
  },
  watch: {
    text: function (newVal) {
      this.time = this.estimateReadingTime(newVal);
    },
  },
};
</script>

<style scoped>
.min_red {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: 80px;
  max-width: 80px;
  margin: 0px 0px 10px 0px;
}
.min_red div {
  font-size: 14px;
  color: #6e6e73;
  font-weight: 400;
  width: 100%;
}
.min_red img {
  height: 11px;
  width: 11px;
  margin: 0px 7px 2px 0px;
}
</style>
