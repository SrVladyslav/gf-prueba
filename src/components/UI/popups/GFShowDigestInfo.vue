<template>
  <div class="show_container" @click.self="closeTab()">
    <div class="show_window">
      <div class="exit_button">
        <div class="exit_button_img" @click="closeTab()">
          <img src="@/assets/icons/helpers/error.svg" alt="" />
        </div>
      </div>
      <div class="scrollable_container">
        <div class="show_image_container">
          <img
            :src="
              this.$store.state.gf_contracts.backend + digest_to_show.banner
            "
            alt=""
          />
        </div>
        <div class="row_data">
          <gf-status :active="digest_to_show.published"></gf-status>
          <gf-reading-clock :text="getAllDGDescriptions()"></gf-reading-clock>
        </div>
        <div class="title__text">{{ digest_to_show.title }} info</div>
        <gf-date :date="digest_to_show.created"></gf-date>
        <p class="description__text" ref="digest_description">
          {{ cutText(digest_to_show.description) }}
        </p>
        <div
          v-if="!show_more && digest_to_show.description.length > 70"
          @click="showMore(digest_to_show)"
          class="read_more"
        >
          Read more
        </div>
        <div
          v-if="show_more"
          @click.prevent="showMore(digest_to_show)"
          class="read_more"
        >
          Read less
        </div>
        <div class="sep"></div>
        <div class="title__text">{{ digest_to_show.title }} posts</div>
        <gf-digest-post-scroller
          :digest_posts="digest_to_show.digest_posts"
        ></gf-digest-post-scroller>
        <div class="option_buttons">
          <gf-delete-button
            class="no-mobil"
            :label="'Delete digest'"
            @click.prevent="showConfirmDeletePopup(true)"
          ></gf-delete-button>
          <gf-generic-button
            :label="'Edit digest posts'"
            @click.prevent="goto('/digest_update/' + digest_to_show.id)"
          ></gf-generic-button>
          <gf-action-button
            v-if="digest_to_show.published === false"
            :label="'Publish digest'"
            @click.prevent="changePublishTo(true)"
          ></gf-action-button>
          <gf-action-button
            v-if="digest_to_show.published === true"
            :label="'Unpublish digest'"
            @click.prevent="changePublishTo(false)"
          ></gf-action-button>
          <gf-delete-button
            class="mobil"
            :label="'Delete digest'"
            @click.prevent="showConfirmDeletePopup(true)"
          ></gf-delete-button>
        </div>
      </div>
    </div>
    <gf-confirm-delete-dg
      :show="show_confirm_popup"
      :post="digest_to_show"
      @closePopup="showConfirmDeletePopup($event)"
      @closePopupDeleted="closeConfirmDeletePopup($event)"
    ></gf-confirm-delete-dg>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "gf-show-digest",
  props: {
    show: Boolean,
    existing_digest: Object,
  },
  data() {
    return {
      // Vars
      show_window: false,
      show_more: false,
      show_confirm_popup: false,
      MAX_LENGTH: 50,
      // Data
      digest_to_show: {
        id: null,
        banner: null,
        title: "",
        description: "",
        source_link: "",
        source: "",
        created: "",
        digest_group: null,
        published: false,
      },
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    closeTab() {
      console.log("Cerrando tab");
      this.$emit("closeTab", true);
    },
    showConfirmDeletePopup(val) {
      if (val === true) {
        this.show_confirm_popup = true;
      } else {
        this.show_confirm_popup = false;
      }
    },
    closeConfirmDeletePopup(val) {
      console.log("Cerrando: ", val);
      if (val === true) {
        this.showConfirmDeletePopup(false);
        this.closeTab();
      }
    },
    isFullPost() {
      if (this.show_more) {
        this.show_more = false;
      } else {
        this.show_more = true;
      }
    },
    showMore(post, key) {
      if (this.$refs.digest_description.innerHTML === post.description) {
        this.$refs.digest_description.innerHTML = this.cutText(
          post.description
        );
      } else {
        this.$refs.digest_description.innerHTML = post.description;
      }
      this.isFullPost(key);
    },
    cutText(text) {
      if (text.length > this.MAX_LENGTH) {
        return text.substring(0, this.MAX_LENGTH) + "...";
      } else {
        return text;
      }
    },
    copyInfo() {
      this.digest_to_show = this.existing_digest;
    },
    getAllDGDescriptions() {
      let fDescription = "";
      try {
        for (let i = 0; i < this.digest_to_show.digest_posts.length; i++) {
          fDescription =
            fDescription + this.digest_to_show.digest_posts[i].description;
        }
      } catch (error) {
        fDescription = "";
      }
      return fDescription;
    },
    async updatePost() {
      const fd = new FormData();
      fd.append(
        "banner",
        this.post_to_update.banner,
        this.post_to_update.banner.name
      );
      let url = this.$store.state.gf_contracts.backend;
      await axios
        .put(url + "/digest/" + this.post_to_update.id + "/update", fd)
        .then(() => {
          const notification = {
            type: "success",
            message: "Your post was successfully updated!",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
          this.$router.push("/digests");
          this.closeTab();
        });
    },
    async getDigestGroup() {
      let url = this.$store.state.gf_contracts.backend;
      let id = this.digest_to_show.id;
      await axios.get(url + "/digest_group/" + id).then((res) => {
        this.digest_to_show = res.data;
      });
    },
    async changePublishTo(publish) {
      if (publish) {
        this.digest_to_show.published = true;
      } else {
        this.digest_to_show.published = false;
      }
      const fd = new FormData();
      fd.append("published", publish);
      let url = this.$store.state.gf_contracts.backend;
      let id = this.digest_to_show.id;
      await axios
        .put(url + "/digest_group_status/" + id + "/update", fd)
        .then((res) => {
          if (this.digest_to_show.published === true) {
            const notification = {
              type: "success",
              message: "Your post was successfully published!",
            };
            this.$store.dispatch("notification/add", notification, {
              root: true,
            });
          } else {
            const notification = {
              type: "success",
              message: "Your post was successfully unpublished!",
            };
            this.$store.dispatch("notification/add", notification, {
              root: true,
            });
          }
          this.digest_to_show = res.data;
          this.closeTab();
        });
    },
  },
  mounted() {
    this.show_window = this.show;
    try {
      this.digest_to_show = this.existing_digest;
      // Setting the digest group options
      //this.getDigestGroup();
    } catch (error) {
      this.closeTab();
    }
  },
  watch: {
    show: function (newVal) {
      try {
        this.show_window = newVal;
      } catch (error) {
        this.closeTab();
      }
    },
    existing_digest: function (newVal) {
      this.digest_to_show = newVal;
      console.log("Edited:", this.digest_to_show);
    },
  },
};
</script>

<style scoped>
.star {
  font-weight: 700;
  color: #c70039;
  margin: 0px 4px;
  padding: 0px;
}
.sep {
  height: 30px;
  width: 100%;
  background-color: transparent;
  border: none;
}
.read_more {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  box-sizing: border-box;
  padding: 10px 0px 10px 0px;
  color: #0071da;
  cursor: pointer;
}
.row_data {
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: row;
  align-content: center;
  align-items: center;
}
.row_data .status_container,
.row_data .min_red {
  margin: 0px 10px 0px 0px;
}
.required {
  margin: 0px 0px 20px 0px !important;
}
.title__text {
  text-align: left;
  margin: 10px 0px 0px 0px;
  font-size: 18px;
  font-weight: 600;
  color: #252525;
}
.description__text {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
  line-height: 24px;
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
.show_container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.7);
  z-index: 9995;
  left: 0px;
  top: 0px;
  margin: 0px;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
}
.show_window {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  box-sizing: border-box;
  padding: 30px;
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 60rem;
  height: 100%;
  max-height: 70vh;
  overflow-y: auto;
  z-index: 9999;
}
.show_window::-webkit-scrollbar {
  width: 10px;
  background: white;
  cursor: pointer;
  border-radius: 0px 16px 16px 0px;
  border-left: 1px solid #ebe9e9; /*#f2f2f2;*/
}
.show_window::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 16px 16px 0px;
  cursor: pointer;
}
.scrollable_container {
  width: 100%;
  height: fit-content;
  background: white;
  box-sizing: border-box;
  padding: 30px 30px 50px 30px;
}
.exit_button {
  display: flex;
  justify-content: flex-end;
  position: sticky;
  right: 30px !important;
  top: 0px;
  font-size: 21px;
  font-weight: 500;
  z-index: 9998;
}
.exit_button_img {
  position: relative;
  display: flex;
  height: 31px;
  width: 31px;
  justify-content: center;
  align-content: center;
  color: #c70039;
  cursor: pointer;
  border-radius: 50%;
  transition-duration: 0.3s;
  background-color: white;
}
.exit_button_img img {
  position: relative;
  top: 4px;
  left: 1px;
  height: 24px;
  width: 24px;
}
.show_image_container {
  border-radius: 16px;
  width: 100%;
  height: 300px;
  margin: 0px 0px 20px 0px;
}
.show_image_container img {
  height: 300px;
  border-radius: 16px;
  display: block;
  object-fit: cover;
  width: 100%;
}
.option_buttons {
  position: relative;
  width: 100%;
  display: flex;
  height: fit-content;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 40px 0px 0px 0px;
}
.no-mobil {
  opacity: 1;
  display: block;
}
.mobil {
  opacity: 0;
  display: none;
}

@media (max-width: 764px) {
  .show_image_container,
  .show_image_container img {
    height: 150px;
  }
  .option_buttons {
    flex-direction: column;
    justify-content: center !important;
    align-content: center;
    align-items: center;
  }
  .no-mobil {
    opacity: 0;
    display: none !important;
  }
  .mobil {
    opacity: 1;
    display: flex !important;
  }
}

@media (max-width: 450px) {
  .show_window {
    padding: 0px;
  }
  .exit_button {
    box-sizing: border-box;
    padding: 10px 10px 0px 0px;
  }
}
@media (hover: hover) {
  .exit_button:hover {
    font-weight: 500;
  }
  .exit_button_img:hover {
    color: #bb0a21;
    transition-duration: 0.5s;
  }
}
</style>
