<template>
  <div
    class="container"
    v-if="show_delete_confirm === true"
    @click="closeTab()"
  >
    <div class="confirm_container">
      <div class="confirm_image">
        <img src="@/assets/icons/helpers/sure.svg" alt="" />
      </div>
      <div class="confirm_text">
        Are you sure you want to delete
        <span>'{{ post_to_delete.title }} '</span>?
      </div>
      <div class="confirm_container_cta">
        <gf-delete-button
          :label="'No, return'"
          @click="closeTab()"
        ></gf-delete-button>
        <gf-accept-button
          :label="'Yes, delete'"
          @click="deletePost()"
        ></gf-accept-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "gf-confirm-delete-post",
  props: {
    show: Boolean,
    post: Object,
  },
  data() {
    return {
      show_delete_confirm: true,
      post_to_delete: {
        title: "",
      },
    };
  },
  methods: {
    closeTab() {
      console.log("Cerrando tab");
      this.$emit("closePopup", false);
    },
    async deletePost() {
      let url = this.$store.state.gf_contracts.backend;
      await axios
        .delete(url + "/post/" + this.post_to_delete.id + "/delete")
        .then(() => {
          const notification = {
            type: "success",
            message: "Your post was successfully deleted!",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
          this.closeTab();
          this.$router.push("/admin_panel/");
        })
        .catch(() => {
          const notification = {
            type: "error",
            message: "Ohh, something went wrong!",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
        });
    },
  },
  mounted() {
    this.show_delete_confirm = this.show;
    this.post_to_delete = this.post;
  },
  watch: {
    show: function (v) {
      this.show_delete_confirm = v;
    },
    post: function (v) {
      this.post_to_delete = v;
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm_container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 400px;
  height: fit-content;
  background: white;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 30px;
  margin: 10px;
}
.confirm_image {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
}
.confirm_image img {
  height: 80px;
  width: 80px;
}
.confirm_text,
.confirm_text h1 {
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #6e6e73;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0px 10px 0px;
  flex-wrap: wrap;
}
.confirm_text span {
  color: #0071da;
  font-weight: 600;
  cursor: pointer;
}
.confirm_container_cta {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 10px 0px 0px 0px;
}
</style>
