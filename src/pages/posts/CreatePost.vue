<template>
  <div class="create_post_container">
    <div class="create__section">
      <div class="title__text">Create new post</div>
      <div class="generic__text required">
        <h4 class="star">*</h4>
        Required fields
      </div>
      <div class="generic_label">Post banner image</div>
      <gf-image-drop v-model="post.banner" :showError="banner__error">
        <template v-slot:helper
          >Upload image: JPG, PNG, GIF, SVG. Max 10MB
        </template>
      </gf-image-drop>
      <gf-input-field
        v-model="post.title"
        :showError="post_title_error"
        :showRequired="true"
      >
        <template v-slot:title>Title</template>
        <template v-slot:helper>e.g. "My beautiful post"</template>
      </gf-input-field>
      <gf-textarea
        v-model="post.description"
        :showError="post_description_error"
        :showRequired="true"
      >
        <template v-slot:title>Description</template>
        <template v-slot:helper
          >e.g. "This is a story about how once upon a time in..."</template
        >
      </gf-textarea>
      <gf-tag-input-field
        v-model="post.tags"
        :showError="tags_error"
        :setTags="post.tags"
      >
        <template v-slot:title>Post tags</template>
        <template v-slot:helper
          >Add some post tags so users can get with it faster. Eg:
          NFT.</template
        >
      </gf-tag-input-field>
      <gf-action-button
        class="space_top"
        :label="'Create post'"
        @click="createPost() /*sendFile*/"
      >
      </gf-action-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // Errors
      banner__error: false,
      post_title_error: false,
      post_short_description_error: false,
      post_description_error: false,
      tags_error: false,
      // Data
      post: {
        writer: "",
        banner: null,
        title: "",
        short_description: "",
        description: "",
        tags: [],
      },
    };
  },
  methods: {
    async createPost() {
      const fd = new FormData();
      fd.append("writer", "admin");
      fd.append("banner", this.post.banner, this.post.banner.name);
      fd.append("title", this.post.title);
      fd.append("short_description", this.post.short_description);
      fd.append("description", this.post.description);
      fd.append("tags", JSON.stringify(this.post.tags));
      //let url = "http://127.0.0.1:8000/post/create/";
      // let url = "http://172.20.10.2:8000";
      let url = this.$store.state.gf_contracts.backend;
      const token = this.$store.state.user_auth_w2.token;
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      await axios.post(url + "/post/create", fd).then((res) => {
        console.log("Response:", res);
        this.$router.push("/blog");
      });
    },
  },
  beforeCreate() {
    this.$store.commit("user_auth_w2/initializeStore");
    const token = this.$store.state.user_auth_w2.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
      this.$store.commit("user_auth_w2/removeToken");
      const notification = {
        type: "error",
        message: "Your session has expired",
      };
      this.$store.dispatch("notification/add", notification, {
        root: true,
      });
      this.$router.push("/admin-log-in");
    }
  },
};
</script>

<style scoped>
.space_top {
  margin: 30px 0px 0px 0px;
}
.star {
  font-weight: 700;
  color: #c70039;
  margin: 0px 4px;
  padding: 0px;
}
.required {
  margin: 0px 0px 20px 0px !important;
}
.generic_label {
  display: flex;
  padding: 0px 10px;
  color: #6e6e75;
  cursor: text;
  z-index: 90;
  font-size: 14px;
  margin: 20px 0px 5px 0px;
}
.title__text {
  text-align: left;
  margin: 0px 0px 50px 0px;
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  color: #252525;
}
.generic__text {
  font-size: 14px;
  margin: 0px 0px 5px 0px;
}
.subtitle__text,
.generic__text {
  text-align: left;
  display: flex;
  padding: 0px;
}
.subtitle__text {
  margin: 30px 0px 5px 0px;
  align-items: center;
}
.create_post_container {
  height: fit-content;
  width: 100%;
  max-width: 760px;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 0px 10px;
}
.create__section {
  background-color: white;
  width: 100%;
  min-width: 40%;
  height: fit-content;
  margin-top: 150px;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
@media (max-width: 450px) {
  .create__section {
    width: 100%;
    min-width: 100%;
    padding: 5%;
  }
}
</style>
