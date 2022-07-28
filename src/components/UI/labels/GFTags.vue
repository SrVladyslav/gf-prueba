<template>
  <div class="tags_container">
    <div class="tag" v-for="(tag, key) in formatted_tags" :key="key">
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  name: "gf-tags",
  props: {
    tags: String,
    links: Array, // String array
  },
  data() {
    return {
      MAX_TAGS: 5,
      formatted_tags: [],
    };
  },
  methods: {
    formateTags(tags) {
      try {
        return JSON.parse(tags).slice(0, this.MAX_TAGS);
      } catch (e) {
        return [];
      }
    },
  },
  mounted() {
    this.formatted_tags = this.formateTags(this.tags);
  },
  watch: {
    tags: function (newVal) {
      this.formatted_tags = this.formateTags(newVal);
    },
  },
};
</script>

<style scoped>
.tags_container {
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0px 0px 0px;
}
.tag {
  width: fit-content;
  font-size: 14px;
  color: rgb(0, 113, 218, 1);
  font-weight: 500;
  background-color: rgb(0, 113, 218, 0.07);
  box-sizing: border-box;
  padding: 4px 8px;
  border-radius: 10px;
  transition-duration: 0.3s;
}
@media (hover: hover) {
  .tag:hover {
    color: white;
    background-color: #003c74;
    transition-duration: 0.7s;
  }
}
</style>
