<template>
  <div
    class="digest_section"
    :class="{
      block_scroll:
        showUpdateWindow === true ||
        showUpdateGroupWindow === true ||
        showDeleteWindow === true,
    }"
  >
    <div class="digest_filter">
      <div class="digest_filter_banner">
        <img
          :src="
            this.$store.state.gf_contracts.backend + current_digest_group.banner
          "
          alt=""
        />
      </div>
      <div class="digest_filter_title">{{ current_digest_group.title }}</div>
      <div class="general_text_menu">
        <gf-date :date="current_digest_group.created"></gf-date>
        <h2 :ref="'digest_description_filter'">
          {{ cutText(current_digest_group.description) }}
        </h2>
        <div
          v-if="
            !show_more_filter &&
            current_digest_group.description.length > MAX_LENGTH
          "
          @click="showMoreFilter(current_digest_group.description)"
          class="read_more"
        >
          Read more
        </div>
        <div
          v-if="
            show_more_filter &&
            current_digest_group.description.length > MAX_LENGTH
          "
          @click="showMoreFilter(current_digest_group.description)"
          class="read_more"
        >
          Read less
        </div>
        <gf-generic-button
          class="edit_group_btn"
          :label="'Edit group'"
          @click="updateDigestGroup(current_digest_group)"
        ></gf-generic-button>
      </div>
    </div>
    <div class="digest_posts">
      <div class="title_text title_mobile_active">Digest posts</div>
      <!-- <div class="title_text">Digest for {{ $route.params.id }}</div> -->
      <div class="digest_item" v-for="(post, key) in digestPosts" :key="key">
        <div class="digest_image" :ref="'digest_image_' + key">
          <img
            :src="this.$store.state.gf_contracts.backend + post.banner"
            alt=""
          />
        </div>
        <div class="digest_text">
          <div class="all_stuff">
            <div class="digest_text_icos">
              <gf-reading-clock :text="post.description"></gf-reading-clock>
              <gf-link
                :website="post.source"
                :website_link="post.source_link"
              ></gf-link>
            </div>
            <h1>
              {{ post.title }}
            </h1>
            <p :ref="'digest_description_' + key">
              {{ cutText(post.description) }}
            </p>
            <div
              v-if="!show_more[key] && post.description.length > MAX_LENGTH"
              @click="showMore(post, key)"
              class="read_more"
            >
              Read more
            </div>
            <div
              v-if="show_more[key] && post.description.length > MAX_LENGTH"
              @click="showMore(post, key)"
              class="read_more"
            >
              Read less
            </div>
            <gf-tags :tags="post.tags"></gf-tags>
          </div>
          <div class="post_options">
            <gf-delete-button
              :label="'Delete post'"
              @click="changeDeleteStatus(post)"
            ></gf-delete-button>
            <gf-generic-button
              :label="'Edit post'"
              @click="changeUpdateStatus(post)"
            ></gf-generic-button>
          </div>
        </div>
      </div>
      <div
        class="no-items-container"
        v-if="digestPosts.length === 0 || digestPosts === null"
      >
        <h1>
          There are no items in this digest group, consider on
          <span @click="goto('/create_digest_post')">creating a new posts</span>
          or
          <span @click="goto('/admin_panel')">migrate the already created </span
          >ones! 😉
        </h1>
      </div>
    </div>
    <gf-update-digest-post
      v-if="showUpdateWindow"
      :existing_post="postToUpdate"
      :show="showUpdateWindow"
      @closeTab.self="showUpdateStatus(false)"
    ></gf-update-digest-post>
    <gf-update-digest-group
      v-if="showUpdateGroupWindow"
      :group="current_digest_group"
      :show="showUpdateGroupWindow"
      @closeTab.self="showUpdateGroup(false)"
    >
    </gf-update-digest-group>
  </div>
  <gf-confirm-delete-dg-post
    v-if="showDeleteWindow"
    :post="postToDelete"
    :show="showDeleteWindow"
    @closePopup.self="showDeleteStatus(false)"
  >
  </gf-confirm-delete-dg-post>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // Update
      showUpdateWindow: false,
      showUpdateGroupWindow: false,
      showDeleteWindow: false,
      updateDigestPostTab: false,
      postToUpdate: null,
      postToDelete: null,
      // STRUCTURES
      current_digest_group: {
        title: "",
        description: "",
        banner: "",
        created: "",
      },
      // Data
      MAX_LENGTH: 70,
      tag: "Digest",
      show_more: {},
      show_more_filter: false,
      digestPosts: [],
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    isFullPost(key) {
      if (this.show_more[key]) {
        this.show_more[key] = false;
      } else {
        this.show_more[key] = true;
      }
    },
    showMore(post, key) {
      if (
        this.$refs["digest_description_" + key].innerHTML === post.description
      ) {
        this.$refs["digest_description_" + key].innerHTML = this.cutText(
          post.description
        );
        this.$refs["digest_image_" + key].classList.remove("show_full_img");
      } else {
        this.$refs["digest_description_" + key].innerHTML = post.description;
        this.$refs["digest_image_" + key].classList.add("show_full_img");
      }
      this.isFullPost(key);
    },
    showMoreFilter(description) {
      if (this.$refs["digest_description_filter"].innerHTML === description) {
        this.$refs["digest_description_filter"].innerHTML =
          this.cutText(description);
      } else {
        this.$refs["digest_description_filter"].innerHTML = description;
      }
      this.show_more_filter = !this.show_more_filter;
    },
    updateDigestGroup(group) {
      this.current_digest_group = group;
      this.showUpdateGroupWindow = true;
    },
    cutText(text) {
      if (text.length > this.MAX_LENGTH) {
        return text.substring(0, this.MAX_LENGTH) + "...";
      } else {
        return text;
      }
    },
    async getDigestGroupInfo() {
      let gID = this.$route.params.id;
      let url = this.$store.state.gf_contracts.backend + "/digest_group/" + gID;
      await axios.get(url).then((res) => {
        console.log("Response:", res);
        this.current_digest_group = res.data[0];

        // Updating posts
        this.digestPosts = res.data[0].digest_posts.reverse();
      });
    },
    showUpdateGroup(value) {
      if (value) {
        this.showUpdateGroupWindow = value;
      } else {
        this.showUpdateGroupWindow = false;
        this.getDigestGroupInfo();
      }
    },
    // @click="changeUpdateStatus(post)"
    showUpdateStatus(value) {
      if (value) {
        this.showUpdateWindow = value;
      } else {
        this.showUpdateWindow = false;
      }
    },
    changeUpdateStatus(post) {
      this.postToUpdate = post;
      if (post) {
        this.showUpdateStatus(true);
      } else {
        this.showUpdateStatus(false);
      }
    },
    showDeleteStatus(value) {
      if (value) {
        this.showDeleteWindow = value;
      } else {
        this.showDeleteWindow = false;
      }
    },
    changeDeleteStatus(post) {
      this.postToDelete = post;
      if (post) {
        this.showDeleteStatus(true);
      } else {
        this.showDeleteStatus(false);
      }
    },
  },
  mounted() {
    this.getDigestGroupInfo();
    //this.getDigestPosts();
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
.all_stuff {
  height: 100%;
}
.no-items-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  box-sizing: border-box;
  padding: 50px 30px 30px 30px;
  text-align: center;
}
.no-items-container h1 {
  color: #6e6e73;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
}
.no-items-container span {
  color: #0071da;
  cursor: pointer;
  transition-duration: 0.3s;
}
.block_scroll {
  z-index: 9999;
  position: fixed !important;
}
.title_text {
  text-align: left;
  font-size: 30px;
  line-height: 40px;
  margin: 50px 0px 30px 0px;
  font-weight: 600;
  color: #252525;
}
.digest_section {
  display: flex;
  height: fit-content;
  flex-direction: row;
  width: 100%;
  max-width: 80rem;
  box-sizing: border-box;
  padding: 110px 10px 200px 10px;
}
.digest_filter {
  position: sticky;
  top: 110px;
  background: white;
  height: fit-content;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
  padding: 0px 30px 0px 0px;
}
.digest_filter_banner {
  width: 100%;
  height: 150px;
  border: 1px solid #f2f2f2;
  border-radius: 16px 16px 0px 0px;
}
.digest_filter_banner img {
  width: 100%;
  height: 100%;
  max-height: 150px;
  display: block;
  object-fit: cover;
  box-sizing: border-box;
  padding: 0px;
  border-radius: 16px 16px 0px 0px;
}
.digest_posts {
  position: relative;

  width: 100%;
  height: fit-content;
}
.digest_item {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px 0px 20px 0px;
  height: fit-content;
  background: white;
  border-radius: 16px;
  border: 1px solid #f2f2f2;
  cursor: pointer;
  transition-duration: 0.3s;
  -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
}
.digest_image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  min-width: 350px;
}
.digest_image img {
  border-radius: 16px 0px 0px 16px;
  display: block;
  object-fit: cover;
  width: 350px;
  height: 100%;
  max-height: 350px;
  box-sizing: border-box;
  padding: 0px;
}
.show_full_img img {
  max-height: 100% !important;
}
.digest_text {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 20px 20px 30px;
}
.digest_text h1 {
  font-size: 18px !important;
  color: #252525;
  font-weight: 600;
  margin: 0px 0px 10px 0px;
}
.digest_text p {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
  line-height: 24px;
}
.digest_text_icos {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.digest_filter_title {
  font-size: 16px;
  color: #252525;
  font-weight: 500;
  box-sizing: border-box;
  padding: 20px 0px 0px 10px;
}
.general_text_menu {
  box-sizing: border-box;
  padding: 0px 0px 0px 10px;
  margin: 10px 0px 0px 0px;
}
.general_text_menu h2 {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
  line-height: 24px;
  margin: 10px 0px 0px 0px;
}
.tags {
  font-size: 14px;
  color: #0071da;
}
.read_more,
.update {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  box-sizing: border-box;
  padding: 10px 0px 10px 0px;
  color: #0071da;
  cursor: pointer;
}
.update {
  color: #a56700 !important;
}
.title_mobile_active {
  opacity: 0;
  display: none;
}
.post_options {
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 20px 0px 0px 0px;
}
.edit_group_btn {
  margin: 10px 0px 0px 0px;
}
@media (max-width: 950px) {
  .digest_filter {
    top: 0px;
    height: fit-content;
    position: relative;
    max-width: 100%;
    padding: 0px;
    /* opacity: 0;
    display: none; */
    border: 1px solid #ebe9e9;
    border-radius: 16px;
  }
  .digest_filter_title {
    padding: 20px 30px 0px 30px;
  }
  .general_text_menu {
    padding: 0px 30px 20px 30px;
  }
  .digest_section {
    flex-direction: column;
  }
  .title_mobile_active {
    opacity: 1;
    display: flex;
  }
}
@media (max-width: 650px) {
  .digest_item {
    flex-direction: column;
  }
  .digests_container {
    justify-content: center;
  }
  .digest_image {
    width: 100%;
    padding: 0px;
    margin: 0px;
  }
  .digest_image img {
    width: 100%;
    max-height: 250px;
    border-radius: 16px 16px 0px 0px;
  }
}

@media (hover: hover) {
  .digest_item:hover {
    -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    transition-duration: 0.3s;
  }
  .no-items-container span:hover {
    font-weight: 600;
    transition-duration: 0.5s;
  }
}
</style>
