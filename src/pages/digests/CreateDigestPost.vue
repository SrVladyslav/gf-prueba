<template>
  <div class="create_digest_post_container">
    <div class="create__section">
      <div class="title__text">Create new digest post</div>
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
      <gf-select-box
        v-model="post.digest_group"
        :label_text="digest_selector"
        :options="digest_groups"
        @click="getDigestGroupsNameID()"
      ></gf-select-box>
      {{ post.digest_group }}-{{ this.group_to_id[this.post.digest_group] }}
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
      <gf-input-field
        v-model="post.source_link"
        :showError="source_link_error"
        :showRequired="true"
      >
        <template v-slot:title>Source link</template>
        <template v-slot:helper>e.g. "www.decrypt.co"</template>
      </gf-input-field>
      <gf-input-field
        v-model="post.source"
        :showError="source_error"
        :showRequired="true"
      >
        <template v-slot:title>Source</template>
        <template v-slot:helper>e.g. "Decrypt"</template>
      </gf-input-field>
      <gf-action-button
        class="space_top"
        :label="'Create Post'"
        @click="createPost() /*sendFile*/"
      ></gf-action-button>
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
      source_link_error: false,
      source_error: false,
      // Data
      digest_groups: [""],
      group_to_id: {},
      digest_selector: "Select the digest group",
      post: {
        id: null,
        banner: null,
        title: "",
        description: "",
        tags: [],
        source_link: "",
        source: "",
        digest_group: null,
      },
    };
  },
  methods: {
    async createPost() {
      const fd = new FormData();
      fd.append("banner", this.post.banner, this.post.banner.name);
      fd.append("title", this.post.title);
      fd.append("description", this.post.description);
      fd.append("tags", JSON.stringify(this.post.tags));
      fd.append("source_link", this.post.source_link);
      fd.append("source", this.post.source);
      let dgGroup = this.group_to_id[this.post.digest_group];
      console.log("Grupo:", dgGroup, "Type:", typeof dgGroup);
      fd.append("digest_group", dgGroup);
      //let url = "http://127.0.0.1:8000/post/create/";
      // let url = "http://172.20.10.2:8000";
      let url = this.$store.state.gf_contracts.backend;
      //let url = "https://gf-codigofacilito.herokuapp.com"; //this.$store.state.gf_contracts.backend;
      await axios.post(url + "/digest/create", fd).then((res) => {
        console.log("Response:", res);
        const notification = {
          type: "success",
          message: "Your digest post was successfully created!",
        };
        this.$store.dispatch("notification/add", notification, {
          root: true,
        });
        this.$router.push("/digests");
      });
    },
    async updatePost() {
      const fd = new FormData();
      //   fd.append("banner", this.post.banner, this.post.banner.name);
      //   fd.append("title", this.post.title);
      //   fd.append("description", this.post.description);
      //   fd.append("tags", JSON.stringify(this.post.tags));
      //   fd.append("source_link", this.post.source_link);
      //   fd.append("source", this.post.source);
      fd.append("digest_group", this.post.digest_group); //this.post.digest_group);
      let url = this.$store.state.gf_contracts.backend;
      await axios.put(url + "/digest/7/update", fd).then((res) => {
        console.log("Response:", res);
        const notification = {
          type: "success",
          message: "Your digest post was successfully updated!",
        };
        this.$store.dispatch("notification/add", notification, {
          root: true,
        });
        this.$router.push("/digests");
      });
    },
    async getDigestGroupsNameID() {
      let url = this.$store.state.gf_contracts.backend;
      this.group_to_id = {};
      await axios.get(url + "/digest_groups_ids").then((res) => {
        res.data.forEach((group) => {
          console.log("G:", group);
          this.digest_groups.push(group.title);
          this.group_to_id[this.toUpperCase(group.title)] = group.id;
        });
        this.digest_groups.reverse();
      });
    },
    toUpperCase(text) {
      if (text.length > 1) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      } else {
        return text.toUpperCase();
      }
    },
  },
  mounted() {
    this.getDigestGroupsNameID();
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
.generic_label {
  display: flex;
  padding: 0px 10px;
  color: #6e6e75;
  cursor: text;
  z-index: 90;
  font-size: 14px;
  margin: 20px 0px 5px 0px;
}
.create_digest_post_container {
  height: fit-content;
  width: 100%;
  max-width: 760px;
  background-color: white;
  display: flex;
  flex-direction: column;
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
