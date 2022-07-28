<template>
  <div class="topics_container">
    <div class="topic" v-for="(topic, key) in topics" :key="key">
      {{ topic }}
    </div>
  </div>
</template>

<script>
export default {
  name: "gf-topics",
  props: {
    topics: Array,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.topics_container {
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  margin: 5px 0px 0px 0px;
}
.topic {
  position: relative;
  width: fit-content;
  font-size: 14px;
  line-height: 20px;
  color: #6e6e73;
  box-sizing: border-box;
  padding: 0px 0px 0px 10px;
}
.topic::before {
  position: absolute;
  content: "";
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: #6e6e73;
  top: 8px;
  left: 0px;
}
</style>
