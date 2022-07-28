<template>
  <div class="container" v-if="posts.length > 0">
    <div
      class="scroller_container"
      ref="scroller_container"
      @wheel.prevent="scrollHorizontal($event, 'scroller_container')"
    >
      <div class="scroller_slider">
        <div class="digest_post_info" v-for="(post, key) in posts" :key="key">
          <div class="digest_info_container">
            <div class="digest_post_img">
              <img
                :src="this.$store.state.gf_contracts.backend + post.banner"
                alt=""
              />
            </div>
            <div class="digest_text">
              <h1>{{ cutText(post.title, 70) }}</h1>
              <gf-date :date="post.created"></gf-date>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <div class="digest_text_f">This digest does not contain any posts yet.</div>
  </div>
</template>

<script>
export default {
  name: "gf-digest-post-scroller",
  props: {
    digest_posts: Array,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    cutText(text, max_len) {
      if (text.length > max_len) {
        return text.substring(0, max_len) + "...";
      } else {
        return text;
      }
    },
    scrollHorizontal(e, a) {
      if (e.deltaY > 0) this.$refs[a].scrollLeft += 50;
      else this.$refs[a].scrollLeft -= 50;
    },
  },
  mounted() {
    this.posts = this.digest_posts;
  },
  watch: {
    digest_posts: function (newVal) {
      this.posts = newVal;
      console.log(newVal);
    },
  },
};
</script>

<style scoped>
.container {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  margin: 10px 0px 10px 0px;
}
.scroller_container {
  position: relative;
  width: 100%;
  height: fit-content;
  overflow-x: scroll;
}
.scroller_container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: white;
  cursor: pointer;
  border-radius: 0px 16px 16px 0px;
  border-left: 1px solid #ebe9e9; /*#f2f2f2;*/
}
.scroller_container::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 0px 16px 16px;
  cursor: pointer;
}
.scroller_slider {
  position: relative;
  display: flex;
  gap: 30px;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 350px;
  width: fit-content;
  box-sizing: border-box;
  margin: 10px;
}
.digest_info_container {
  height: 350px;
  width: 250px;
  transition-duration: 0.3s;
  border-radius: 16px;
  -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
}
.digest_text_f {
  color: #6e6e75;
  font-size: 16px;
  font-weight: 500;
}
.digest_text {
  box-sizing: border-box;
  padding: 10px;
}
.digest_text h1 {
  color: #252525;
  font-size: 18px;
  font-weight: 600;
}
.digest_post_info {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  height: 300px;
  width: 250px;
  background: white;
  box-sizing: border-box;
  padding: 3px 0px 0px 0px;
  transition-duration: 0.3s;
}
.digest_post_img {
  width: 100%;
  height: 110px;
  border: 1px solid #f2f2f2;
  border-radius: 16px 16px 0px 0px;
}
.digest_post_img img {
  width: 100%;
  height: 100%;
  max-height: 110px;
  display: block;
  object-fit: cover;
  box-sizing: border-box;
  padding: 0px;
  border-radius: 16px 16px 0px 0px;
}
@media (hover: hover) {
  .digest_post_info:hover {
    padding: 0px 0px 3px 0px;
  }
  .digest_info_container:hover {
    -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    transition-duration: 0.3s;
  }
}
</style>
