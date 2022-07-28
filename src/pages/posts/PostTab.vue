<template>
  <section class="post_tab">
    <div class="blog_section">
      <div class="post_item_banner">
        <!-- <img :src="'http://localhost:8000' + post.banner" alt="" /> -->
        <img
          :src="this.$store.state.gf_contracts.backend + blogPost.banner"
          alt=""
        />
      </div>
      <div class="group_text">
        <div class="group_text_top">
          <gf-reading-clock :text="blogPost.title"></gf-reading-clock>
          <img src="@/assets/icons/UI/writer.svg" alt="" /><span>{{
            blogPost.writer
          }}</span>
        </div>
        <h1>{{ blogPost.title }}</h1>
        <gf-date :date="blogPost.created"></gf-date>
        <p>{{ blogPost.description }}</p>
        <gf-tags :tags="blogPost.tags"></gf-tags>
      </div>
    </div>
  </section>
  <fut></fut>
</template>

<script>
import axios from "axios";
import fut from "@/components/Footer";
export default {
  components: {
    fut,
  },
  props: {
    postData: {},
  },
  data() {
    return {
      blogPost: {
        title: "",
        description: "",
        created: "",
        tags: null,
      },
    };
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    async getPosts() {
      let postID = this.$route.params.id;
      //let url = "http://127.0.0.1:8000/posts/";
      let url =
        this.$store.state.gf_contracts.backend + "/post/" + postID + "/";

      try {
        await axios.get(url).then((res) => {
          console.log("Response:", res);
          this.blogPost = res.data;
          this.blogPost.tags = res.data.tags.toString();
        });
      } catch (error) {
        const notification = {
          type: "error",
          message: "Sorry this post does not exist",
        };
        this.$store.dispatch("notification/add", notification, {
          root: true,
        });
      }
    },
  },
  mounted() {
    this.getPosts();
    this.scrollToTop();
  },
};
</script>

<style scoped>
.post_title {
  color: #252525;
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
}
.post_tab {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 760px;
  height: fit-content;
  margin: 100px 0px 30px 0px;
  box-sizing: border-box;
  padding: 0px 10px 0px 10px;
}
.blog_section {
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
}
.post_item_banner {
  border-radius: 16px;
  width: 100%;
  height: 50vh;
  max-height: 50vh;
}
.post_item_banner img {
  height: 50vh;
  width: 100%;
  border-radius: 16px;
  display: block;
  object-fit: cover;
}
.group_text {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 0px 50px 0px;
}
.group_text p {
  text-align: justify;
}
.group_text_top {
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
}
.group_text_top span {
  font-size: 14px;
  font-weight: 400;
  color: #6e6e73;
  margin: 0px 0px 10px 0px;
}
.group_text_top img {
  height: 13px;
  width: 13px;
  margin: 0px 7px 10px 0px;
}
@media (max-width: 764px) {
  .post_item_banner {
    max-height: 40vh;
  }
  .post_item_banner img {
    border-radius: 16px;
    width: 100%;
    height: fit-content;
    max-height: 40vh;
  }
}
</style>
