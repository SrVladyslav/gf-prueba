<template>
  <div class="digest_section">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // Update
      showUpdateWindow: false,
      updateDigestPostTab: false,
      postToUpdate: null,
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
    cutText(text) {
      if (text.length > this.MAX_LENGTH) {
        return text.substring(0, this.MAX_LENGTH) + "...";
      } else {
        return text;
      }
    },
    async getDigestGroupInfo() {
      let gID = this.$route.params.id;
      let url =
        this.$store.state.gf_contracts.backend +
        "/digest_published_group/" +
        gID;
      await axios.get(url).then((res) => {
        if (res.data && res.data.length > 0) {
          this.current_digest_group = res.data[0];
          // Updating posts
          this.digestPosts = res.data[0].digest_posts.reverse();
        } else {
          const notification = {
            type: "error",
            message: "This path does not exist!",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
          this.goto("/digests");
        }
      });
    },
  },
  mounted() {
    this.getDigestGroupInfo();
    //this.getDigestPosts();
  },
};
</script>

<style scoped>
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
  max-height: 300px;
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
.digest_text_icos {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.digest_text h1 {
  font-size: 18px !important;
  line-height: 27px;
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
}
</style>
