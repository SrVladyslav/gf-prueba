<template>
  <div class="create_digest_post_container">
    <div class="create__section">
      <div class="title__text">Create new digest group</div>
      <div class="generic__text required">
        <h4 class="star">*</h4>
        Required fields
      </div>
      <div class="generic_label">Post banner image</div>
      <gf-image-drop v-model="group.banner" :showError="banner__error">
        <template v-slot:helper
          >Upload image: JPG, PNG, GIF, SVG. Max 10MB
        </template>
      </gf-image-drop>

      <gf-input-field
        v-model="group.title"
        :showError="group_title_error"
        :showRequired="true"
      >
        <template v-slot:title>Title</template>
        <template v-slot:helper>e.g. "Digest week 01/02/2022"</template>
      </gf-input-field>
      <gf-textarea
        v-model="group.description"
        :showError="group_description_error"
        :showRequired="true"
      >
        <template v-slot:title>Description</template>
        <template v-slot:helper
          >e.g. "This week Vitalik said again that this week we will be on
          Ethereum 2.0!"</template
        >
      </gf-textarea>
      <gf-action-button
        class="space_top"
        :label="'Create group'"
        @click="createDigestGroup()"
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
      group_title_error: false,

      group_description_error: false,
      // Data
      group: {
        id: null,
        banner: null,
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async createDigestGroup() {
      const fd = new FormData();
      fd.append("banner", this.group.banner, this.group.banner.name);
      fd.append("title", this.group.title);
      fd.append("published", false);
      fd.append("description", this.group.description);
      //let url = "http://127.0.0.1:8000/post/create/";
      let url = this.$store.state.gf_contracts.backend;
      //let url = "https://gf-codigofacilito.herokuapp.com"; //this.$store.state.gf_contracts.backend;
      await axios
        .post(url + "/digest_group/create", fd)
        .then((res) => {
          console.log("Response:", res);
          const notification = {
            type: "success",
            message: "Your digest group was created successfully!",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
          this.$router.push("/admin_panel");
        })
        .catch(() => {
          const notification = {
            type: "error",
            message:
              "Ohh, something went wrong! Please, make sure that all the data is provided",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
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
