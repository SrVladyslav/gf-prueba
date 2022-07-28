<template>
  <div class="update_container" @click.self="closeTab()">
    <div class="update_window">
      <div class="exit_button">
        <div class="exit_button_img" @click="closeTab()">
          <img src="@/assets/icons/helpers/error.svg" alt="" />
        </div>
      </div>
      <div class="scrollable_container">
        <div class="title__text">Editing group</div>
        <div class="generic__text required">
          <h4 class="star">*</h4>
          Required fields
        </div>
        <div class="generic_label">Group banner image</div>
        <gf-image-drop
          v-model="group_to_update.banner"
          :showError="errors.banner__error"
          :imageSet="group_to_update.banner"
        >
          <template v-slot:helper
            >Upload image: JPG, PNG, GIF, SVG. Max 10MB
          </template>
        </gf-image-drop>
        <gf-input-field
          v-model="group_to_update.title"
          :showError="errors.group_title_error"
          :showRequired="true"
        >
          <template v-slot:title>Title</template>
          <template v-slot:helper>e.g. "Digest week 01/02/2022"</template>
        </gf-input-field>
        <gf-textarea
          v-model="group_to_update.description"
          :showError="errors.group_description_error"
          :showRequired="true"
        >
          <template v-slot:title>Description</template>
          <template v-slot:helper
            >e.g. "This is a story aboutVitalik and ETH 2.0..."</template
          >
        </gf-textarea>
        <gf-action-button
          class="space_top"
          :label="'Update group'"
          @click="updateGroup()"
        ></gf-action-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "gf-update-digest-group",
  props: {
    show: Boolean,
    group: Object,
  },
  data() {
    return {
      // Vars
      show_window: true,
      // Errors
      errors: {
        banner__error: false,
        group_title_error: false,
        group_description_error: false,
      },
      // Data
      digest_selector: "Select the digest group",
      group_to_update: {
        id: null,
        banner: null,
        title: "",
        description: "",
      },
    };
  },
  methods: {
    closeTab() {
      this.$emit("closeTab", true);
    },
    copyInfo() {
      this.group_to_update = this.group;
    },
    async updateGroup() {
      const fd = new FormData();
      fd.append(
        "banner",
        this.group_to_update.banner,
        this.group_to_update.banner.name
      );
      fd.append("title", this.group_to_update.title);
      fd.append("description", this.group_to_update.description);
      let url = this.$store.state.gf_contracts.backend;
      await axios
        .put(url + "/digest_group/" + this.group_to_update.id + "/update", fd)
        .then(() => {
          const notification = {
            type: "success",
            message: "Your digest group was successfully updated!",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
          this.closeTab();
          this.$router.push("/digest_update/" + this.group_to_update.id);
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
  mounted() {
    this.show_window = this.show;
    try {
      this.group_to_update = this.group;
      //this.getDigestGroupsNameID();
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
  },
};
</script>

<style scoped>
.space_top {
  position: relative;
  width: 100%;
  display: flex;
  margin: 30px 0px 0px 0px !important;
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
  color: #252525;
  font-weight: 600;
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
.update_container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.7);
  z-index: 9999;
  left: 0px;
  top: 0px;
  margin: 0px;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
}
.update_window {
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
.update_window::-webkit-scrollbar {
  width: 10px;
  background: white;
  cursor: pointer;
  border-radius: 0px 16px 16px 0px;
  border-left: 1px solid #ebe9e9; /*#f2f2f2;*/
}
.update_window::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 16px 16px 0px;
  cursor: pointer;
}
.scrollable_container {
  width: 100%;
  height: fit-content;
  background: white;
  box-sizing: border-box;
  padding: 30px 30px 100px 30px;
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
@media (max-width: 450px) {
  .update_window {
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
