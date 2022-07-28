<template>
  <div class="posting_external_container">
    <div
      class="posting_container"
      :class="{
        block_scroll:
          show_digest_popup === true ||
          showDeleteWindow === true ||
          showPostDeleteWindow === true ||
          showPostUpdateWindow === true,
      }"
    >
      <div class="posting_fast_links_container">
        <div class="posting_fast_links">
          <h1 class="main_title">Fast actions</h1>
          <div class="line_sep"></div>
          <h1>Digest actions (NEWS)</h1>
          <div class="option_container">
            <h2 @click="$router.push('/create_digest_group')">
              Create new digest group
            </h2>
            <h2 @click="$router.push('/create_digest_post')">
              Create new digest post
            </h2>
          </div>
          <div class="line_sep"></div>
          <h1>Post actions</h1>
          <div class="option_container">
            <h2 @click="$router.push('/create_post')">Create new post</h2>
          </div>
        </div>
      </div>
      <div class="posting_list">
        <div class="posting_options">
          <div
            class="posting_option"
            :class="{ active_option: active_tab == 'digests' }"
            @click="setTab('digests')"
          >
            Digests
          </div>
          <div
            class="posting_option"
            :class="{ active_option: active_tab == 'posts' }"
            @click="setTab('posts')"
          >
            Posts
          </div>
        </div>
        <div class="option_section" v-if="active_tab == 'digests'">
          <div class="title_text">Published digests</div>
          <div class="scrollab">
            <div
              class="unpublished_groups"
              ref="pg_container"
              @wheel.prevent="scrollHorizontal($event, 'pg_container')"
            >
              <div class="unpublished_grups_scroller">
                <div
                  class="unpublished_group_container"
                  v-for="(digest, key) in posted_digest_groups"
                  :key="key"
                >
                  <div class="post_item_container">
                    <div @click="showInfo(digest)">
                      <div class="ugc_image">
                        <img
                          :src="
                            this.$store.state.gf_contracts.backend +
                            digest.banner
                          "
                          alt=""
                        />
                      </div>
                      <div class="group_text">
                        <gf-reading-clock
                          :text="getAllDGDescriptions(key)"
                        ></gf-reading-clock>
                        <h1>{{ digest.title }}</h1>
                        <gf-date :date="digest.created"></gf-date>
                        <gf-status :active="digest.published"></gf-status>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="title_text">Unpublished digests</div>
          <div class="scrollab">
            <div
              class="unpublished_groups"
              ref="upg_container"
              @wheel.prevent="scrollHorizontal($event, 'upg_container')"
            >
              <div class="unpublished_grups_scroller">
                <div
                  class="unpublished_group_container"
                  v-for="(digest, key) in unposted_digest_groups"
                  :key="key"
                >
                  <div class="post_item_container">
                    <div @click="showInfo(digest)">
                      <div class="ugc_image">
                        <img
                          :src="
                            this.$store.state.gf_contracts.backend +
                            digest.banner
                          "
                          alt=""
                        />
                      </div>
                      <div class="group_text">
                        <gf-reading-clock
                          :text="getAllDGDescriptions(key)"
                        ></gf-reading-clock>
                        <h1>{{ digest.title }}</h1>
                        <gf-date :date="digest.created"></gf-date>
                        <gf-status :active="digest.published"></gf-status>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="title_text" v-if="zombie_digest_posts.length > 0">
            Zombie digest posts
          </div>
          <div class="zombie_container" v-if="zombie_digest_posts.length > 0">
            <div
              class="zombie_item"
              v-for="(post, key) in zombie_digest_posts"
              :key="key"
            >
              <div class="zombie_image" :ref="'digest_image_' + key">
                <img
                  :src="this.$store.state.gf_contracts.backend + post.banner"
                  alt=""
                />
              </div>
              <div class="zombie_text">
                <div class="all_stuff">
                  <div class="zombie_text_icos">
                    <gf-reading-clock
                      :text="post.description"
                    ></gf-reading-clock>
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
                    v-if="
                      !show_more[key] && post.description.length > MAX_LENGTH
                    "
                    @click="showMore(post, key)"
                    class="read_more"
                  >
                    Read more
                  </div>
                  <div
                    v-if="
                      show_more[key] && post.description.length > MAX_LENGTH
                    "
                    @click="showMore(post, key)"
                    class="read_more"
                  >
                    Read less
                  </div>
                  <gf-tags :tags="post.tags"></gf-tags>
                </div>
                <div class="zombie_options">
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
          </div>
        </div>
        <div class="option_section" v-if="active_tab == 'posts'">
          <div class="title_text">Published posts</div>
          <div class="posts_container">
            <div
              class="post_container_item"
              v-for="(post, key) in posts_to_show"
              :key="key"
            >
              <div class="post_container_item_">
                <div class="post_item_banner">
                  <!-- <img :src="'http://localhost:8000' + post.banner" alt="" /> -->
                  <img
                    :src="this.$store.state.gf_contracts.backend + post.banner"
                    alt=""
                  />
                </div>
                <div class="post_item_text">
                  <gf-reading-clock :text="post.description"></gf-reading-clock>
                  <h1>{{ post.title }}</h1>
                  <gf-date :date="post.created"></gf-date>
                  <gf-tags :tags="post.tags"></gf-tags>
                  <div class="zombie_options">
                    <gf-delete-button
                      :label="'Delete'"
                      @click="changeDeletePostStatus(post)"
                    ></gf-delete-button>
                    <gf-generic-button
                      :label="'Edit'"
                      @click="changeUpdatePostStatus(post)"
                    ></gf-generic-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="show_all" v-if="posts.length > LAST_POSTS_SLICE">
            <div
              class="read_more"
              v-if="posts_to_show.length < posts.length"
              @click="setAllPosts(true)"
            >
              Show all
            </div>
            <div class="read_more" v-else @click="setAllPosts(false)">
              Show less
            </div>
          </div>
        </div>
      </div>
      <gf-show-digest
        v-if="show_digest_popup"
        :show="show_digest_popup"
        :existing_digest="group_to_show"
        @closeTab.self="showInfoDigest()"
      ></gf-show-digest>
      <gf-update-digest-post
        v-if="showUpdateWindow"
        :existing_post="postToUpdate"
        :show="showUpdateWindow"
        @closeTab.self="showUpdateStatus(false)"
      ></gf-update-digest-post>
      <gf-update-post
        v-if="showPostUpdateWindow"
        :existing_post="publishedPostToUpdate"
        :show="showPostUpdateWindow"
        @closeTab.self="showPostUpdateStatus(false)"
      ></gf-update-post>
    </div>
    <gf-confirm-delete-dg-post
      v-if="showDeleteWindow"
      :post="zombieToDelete"
      :show="showDeleteWindow"
      @closePopup.self="showDeleteStatus(false)"
    >
    </gf-confirm-delete-dg-post>
    <gf-confirm-delete-post
      v-if="showPostDeleteWindow"
      :post="publishedPostToDelete"
      :show="showPostDeleteWindow"
      @closePopup.self="showPostDeleteStatus(false)"
    >
    </gf-confirm-delete-post>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // Constants
      MAX_LENGTH: 70,
      LAST_POSTS_SLICE: 3,
      // Data
      active_tab: "digests",
      unposted_digest_groups: [],
      posted_digest_groups: [],
      zombie_digest_posts: [],
      show_digest_popup: false,
      group_to_show: null,
      digest_id_to_show: null,
      // Zombie posts
      show_more: {},
      zombieToDelete: null,
      postToUpdate: null,
      showDeleteWindow: false,
      showUpdateWindow: true,
      // Posts
      posts: [],
      posts_to_show: [],
      publishedPostToDelete: null,
      publishedPostToUpdate: null,
      showPostDeleteWindow: false,
      showPostUpdateWindow: true,
    };
  },
  methods: {
    setTab(tab) {
      this.active_tab = tab;
    },
    scrollHorizontal(e, a) {
      if (e.deltaY > 0) this.$refs[a].scrollLeft += 50;
      else this.$refs[a].scrollLeft -= 50;
    },
    async getDigests() {
      let url = this.$store.state.gf_contracts.backend + "/digest_groups/";
      const token = this.$store.state.user_auth_w2.token;
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      await axios.get(url).then((res) => {
        console.log("Response:", res);
        this.unposted_digest_groups = [];
        this.posted_digest_groups = []; //= res.data.reverse();
        res.data.reverse().forEach((post) => {
          if (post.published === true) {
            this.posted_digest_groups.push(post);
          } else {
            this.unposted_digest_groups.push(post);
          }
        });
      });
    },
    async getZombiePosts() {
      let url = this.$store.state.gf_contracts.backend + "/digests/zombie/";
      const token = this.$store.state.user_auth_w2.token;
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      await axios.get(url).then((res) => {
        console.log("Response:", res);
        if (res.data.length > 0) {
          this.zombie_digest_posts = res.data.reverse();
        } else {
          this.zombie_digest_posts = [];
        }
      });
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
    getAllDGDescriptions(digest_group_id, published) {
      let fDescription = "";
      try {
        let digestGroup = [];
        if (published) {
          digestGroup = this.posted_digest_groups[digest_group_id];
        } else {
          digestGroup = this.unposted_digest_groups[digest_group_id];
        }
        for (let i = 0; i < digestGroup.digest_posts.length; i++) {
          fDescription =
            fDescription +
            this.unposted_digest_groups[digest_group_id].digest_posts[i]
              .description;
        }
      } catch (error) {
        fDescription = "";
      }
      return fDescription;
    },
    showInfo(digest) {
      console.log("Info:", digest);
      this.group_to_show = digest;
      this.show_digest_popup = true;
    },
    showInfoDigest(value) {
      if (value) {
        this.show_digest_popup = value;
      } else {
        this.show_digest_popup = false;
      }
      this.getDigests();
      this.getZombiePosts();
    },
    cutText(text) {
      if (text.length > this.MAX_LENGTH) {
        return text.substring(0, this.MAX_LENGTH) + "...";
      } else {
        return text;
      }
    },
    showDeleteStatus(value) {
      if (value) {
        this.showDeleteWindow = value;
      } else {
        this.showDeleteWindow = false;
        this.getZombiePosts();
      }
    },
    showUpdateStatus(value) {
      if (value) {
        this.showUpdateWindow = value;
      } else {
        this.showUpdateWindow = false;
        this.getDigests();
      }
    },
    showPostUpdateStatus(value) {
      if (value) {
        this.showPostUpdateWindow = value;
      } else {
        this.showPostUpdateWindow = false;
        this.getPosts();
      }
    },
    changeUpdatePostStatus(post) {
      this.publishedPostToUpdate = post;
      if (post) {
        this.showPostUpdateStatus(true);
      } else {
        this.showPostUpdateStatus(false);
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
    showPostDeleteStatus(status) {
      if (status) {
        this.showPostDeleteWindow = status;
      } else {
        this.showPostDeleteWindow = false;
        this.getPosts();
      }
    },
    changeDeletePostStatus(post) {
      this.publishedPostToDelete = post;
      console.log(this.publishedPostToDelete);
      if (post) {
        this.showPostDeleteStatus(true);
      } else {
        this.showPostDeleteStatus(false);
      }
    },
    changeDeleteStatus(post) {
      this.zombieToDelete = post;
      if (post) {
        this.showDeleteStatus(true);
      } else {
        this.showDeleteStatus(false);
      }
    },
    // sliceLatestPosts() {
    //   let data = [];
    //   for (const id in this.posts) {
    //     data.push(this.posts[id]);
    //   }
    //   return data.slice(0, this.LAST_POSTS_SLICE);
    // },
    async getPosts() {
      //let url = "http://127.0.0.1:8000/posts/";
      let url = this.$store.state.gf_contracts.backend + "/posts/";
      await axios.get(url).then((res) => {
        try {
          this.posts = res.data.reverse();
          this.setAllPosts(false);
          console.log(this.posts_to_show);
        } catch (e) {
          this.posts = [];
          const notification = {
            type: "error",
            message: "Ohh, something went wrong! Maybe server is GLU GLU GLU",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
        }
      });
    },
    setAllPosts(allPosts) {
      if (allPosts) {
        this.posts_to_show = this.posts;
      } else {
        this.posts_to_show = this.posts.slice(0, this.LAST_POSTS_SLICE);
      }
    },
  },
  mounted() {
    this.getDigests();
    this.getZombiePosts();
    this.getPosts();
  },
  beforeCreate() {
    this.$store.commit("user_auth_w2/initializeStore");
    const token = this.$store.state.user_auth_w2.token;
    console.log("Token: ", token);
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
.block_scroll {
  z-index: 9999;
  position: fixed !important;
}
.show_all {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line_sep {
  height: 1px;
  width: 100%;
  background-color: #ebe9e9;
  margin: 20px 0px 20px 0px;
}
.main_title {
  font-weight: 600 !important;
}
.title_text {
  text-align: left;
  font-size: 30px;
  line-height: 30px;
  margin: 60px 0px 0px 0px;
  font-weight: 600;
  color: #252525;
}
.posting_external_container {
  position: relative;
  display: flex;
  justify-content: center;
  height: fit-content;
  width: 100%;
  height: fit-content;
}
.posting_container {
  position: relative;
  display: flex;
  height: fit-content;
  flex-direction: row;
  width: 100%;
  max-width: 80rem;
  box-sizing: border-box;
  padding: 110px 10px 200px 10px;
}
.posting_fast_links_container {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 300px;
  height: fit-content;
  box-sizing: border-box;
  padding: 0px 30px 0px 0px;
}
.posting_fast_links h1 {
  font-size: 16px;
  color: #252525;
  font-weight: 500;
}
.option_container h2 {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
  line-height: 45px;
  cursor: pointer;
  transition-duration: 0.3s;
}
.posting_fast_links h1 {
  box-sizing: border-box;
  padding: 0px 0px 0px 10px;
}
.posting_fast_links {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 200px;
  height: fit-content;
}
.posting_list {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* max-width: 900px; */
  height: fit-content;
}
.posting_options {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: fit-content;
}
.posting_option {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 46px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ebe9e9;
  border-radius: 10px 10px 0px 0px;
}
.active_option {
  border: 2px solid #0071da;
  color: #0071da;
}
.option_container {
  box-sizing: border-box;
  padding: 0px 0px 0px 10px;
  margin: 20px 0px 0px 0px;
}
.option_section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* max-width: 900px; */
  height: fit-content;
}
.scrollab {
  width: 100% !important;
}
.unpublished_groups {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  height: fit-content;
  overflow-x: scroll;
  border-radius: 10px;
  margin: 25px 0px 0px 0px;
  height: 350px;
}
.unpublished_groups::-webkit-scrollbar {
  height: 10px;
  width: auto;
  background: white;
  cursor: pointer !important;
  border-radius: 10px !important;
  border-left: 1px solid #f2f2f2;
}
.unpublished_groups::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 0px 10px 10px;
  cursor: pointer !important;
}
.unpublished_grups_scroller {
  position: absolute;
  display: flex;
  gap: 30px;
  flex-direction: row;
  align-content: stretch;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 10px 20px 10px;
  margin: 0px 0px 5px 0px;
  top: 0;
  left: 0;
}
.unpublished_group_container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  border-radius: 16px;
  cursor: pointer;
  transition-duration: 0.3s;
}
.post_item_container {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 3px 0px 0px 0px;
  transition-duration: 0.2s;
  -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
}
.ugc_image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  max-width: 300px;
  min-width: 50px;
}
.ugc_image img {
  border-radius: 16px 16px 0px 0px;
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 110px;
  box-sizing: border-box;
  padding: 0px;
}
.group_text {
  position: relative;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
}
.group_text h1 {
  font-size: 18px;
  color: #252525;
  font-weight: 600;
}
.group_text h2 {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
}
/* Zombie container */
.zombie_container {
  position: relative;
  width: 100%;
  height: fit-content;
  margin: 40px 0px 0px 0px;
}
.zombie_item {
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
.zombie_image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  min-width: 350px;
}
.zombie_image img {
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
.zombie_text {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 20px 20px 30px;
}
.zombie_text h1 {
  font-size: 18px !important;
  color: #252525;
  font-weight: 600;
  margin: 0px 0px 10px 0px;
}
.zombie_text p {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
  line-height: 24px;
}
.zombie_text_icos {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.all_stuff {
  height: 100%;
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
.zombie_options {
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 20px 0px 0px 0px;
}
.posts_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 25px 0px 50px 0px;
}
.post_container_item {
  position: relative;
  width: 100%;
  min-width: 200px;
  max-width: 300px;
  height: fit-content;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 3px 0px 0px 0px;
  transition-duration: 0.2s;
}
.post_container_item_ {
  position: relative;
  width: 100%;
  height: fit-content;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
  box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.08);
}
.post_item_banner {
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  height: 160px;
}
.post_item_banner img {
  height: 160px;
  border-radius: 16px 16px 0px 0px;
  display: block;
  object-fit: cover;
  width: 100%;
}
.post_item_text {
  padding: 20px 30px;
}
.post_item_text h1 {
  font-size: 18px;
  color: #252525;
  font-weight: 600;
}

.post_item_text h2 {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
}
.zombie_options {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px 0px 0px 0px;
}
@media (max-width: 764px) {
  .posting_container {
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 100%;
  }
  .posting_fast_links {
    max-width: 100%;
  }
  .posting_options {
    margin: 80px 0px 0px 0px;
  }
  .unpublished_group_container {
    width: 100%;
  }
  .posting_fast_links_container {
    width: 100%;
    padding: 20px 10px 20px 10px;
    max-width: 100%;
    border: 1px solid #ebe9e9;
    border-radius: 16px;
  }
}
@media (max-width: 650px) {
  .zombie_item {
    flex-direction: column;
  }
  .zombie_image {
    width: 100%;
    padding: 0px;
    margin: 0px;
  }
  .zombie_image img {
    width: 100%;
    max-height: 250px;
    border-radius: 16px 16px 0px 0px;
  }
  .posts_container {
    justify-content: center;
  }
  .post_container_item {
    justify-content: center;
    max-width: 100%;
  }
}
@media (hover: hover) {
  .posting_fast_links h2:hover {
    color: #0071da;
    transition-duration: 0.5s;
  }
  .posting_option:hover {
    background: #6e6e73;
    transition-duration: 0.5s;
  }
  .posting_option:hover {
    color: white !important;
    background: rgb(0, 113, 218);
    background: linear-gradient(
      90deg,
      rgba(0, 113, 218, 1) 0%,
      rgba(0, 113, 218, 0.8) 100%
    );
    transition-duration: 0.5s;
  }
  .cta_del:hover {
    background: #bb0a21;
    color: white;
    transition-duration: 0.5s;
  }
  .cta_publish:hover {
    background: #0071da;
    color: white;
  }
  .post_item_container:hover {
    -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    padding: 0px 0px 3px 0px;
    transition-duration: 0.2s;
  }
  /* Zombie posts */
  .zombie_item:hover {
    -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    transition-duration: 0.3s;
  }
  .post_container_item:hover {
    padding: 0px 0px 3px 0px;
    transition-duration: 0.2s;
  }
  .post_container_item:hover .post_container_item_ {
    -webkit-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    -moz-box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
    box-shadow: 5px 5px 10px 3px rgba(110, 110, 115, 0.15);
  }
}
</style>
