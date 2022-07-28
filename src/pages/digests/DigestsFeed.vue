<template>
  <section class="digests_vue">
    <div class="digest_filter_close" @click="showFilter()">
      <img src="@/assets/icons/navbar/filter.svg" alt="" />
      <h2 v-if="!filter_active">Show filter</h2>
      <h2 v-else class="red">Hide filter</h2>
    </div>
    <div class="digest_filter" :class="{ filter_show: filter_active }">
      <div class="general_text_title_main filter_link active">
        Propose post for digest
      </div>
      <div class="line_sep"></div>
      <div class="general_text_title">Popular sources</div>
      <div class="general_text_menu">
        <h2 class="filter_link" @click="goto('https://cointelegraph.com/')">
          Cointelegraph
        </h2>
        <h2 class="filter_link" @click="goto('https://thedefiant.io/')">
          The Defiant
        </h2>
        <h2 class="filter_link" @click="goto('https://nftplazas.com/')">
          NFT plazas
        </h2>
        <h2 class="filter_link" @click="goto('https://www.coindesk.com/')">
          Coindesk
        </h2>
        <h2 class="filter_link" @click="goto('https://decrypt.co/')">
          Decrypt
        </h2>
      </div>
    </div>
    <div class="digest_posts">
      <div class="digests_explanation">
        <div class="title_text_vanilla max_text_1">Stay up to date!</div>
        <div class="digests_explanation_description">
          There are a lot of different news in the Web3 world, by yourself it
          could be very difficult to follow all of them. For that reason we
        </div>
        <div
          class="digests_explanation_discord"
          @click="goto('https://discord.gg/9fasjMC2M7')"
        >
          <svg
            width="71"
            height="55"
            viewBox="0 0 71 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                fill="#ffffff"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="71" height="55" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h1>Join our news chanel</h1>
        </div>
      </div>
      <div class="title_text">Last digests</div>
      <div class="digests_container">
        <div
          class="digest_item_container"
          v-for="(post, key) in sliceLatestPosts()"
          :key="key"
        >
          <div class="digest_item" @click="gotodigest(post.id)">
            <div class="digest_item_banner">
              <img
                :src="this.$store.state.gf_contracts.backend + post.banner"
                alt=""
              />
            </div>
            <div class="digest_item_text">
              <gf-reading-clock
                :text="getAllDGDescriptions(key)"
              ></gf-reading-clock>
              <h1>{{ post.title }}</h1>
              <gf-date :date="post.created"></gf-date>
              <!-- <gf-tags :tags="post.tags"></gf-tags> -->
              <gf-topics :topics="getAllDGTitles(key)"></gf-topics>
            </div>
          </div>
        </div>
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
  data() {
    return {
      filter_active: false,
      // Constants
      posts: [],
      digestsByDate: [],
    };
  },
  methods: {
    showFilter() {
      console.log("Hi");
      this.filter_active = !this.filter_active;
    },
    gotodigest(id) {
      //let url = this.$store.state.gf_contracts.backend + "/digest/" + id;
      this.$router.push("/digest/" + id);
    },
    goto(link) {
      //window.location.href = link;
      window.open(link, "_blank");
    },
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    sliceLatestPosts() {
      let LAST_POSTS_SLICE = 10;
      let data = [];
      for (const id in this.posts) {
        data.push(this.posts[id]);
      }
      return data.slice(0, LAST_POSTS_SLICE);
    },
    async getDigestGroups() {
      let url =
        this.$store.state.gf_contracts.backend + "/digest_published_groups/";
      await axios.get(url).then((res) => {
        console.log("Response:", res);
        this.posts = res.data.reverse();
      });
    },
    getAllDGDescriptions(digest_group_id) {
      let fDescription = "";
      try {
        let digestGroup = this.posts[digest_group_id];
        for (let i = 0; i < digestGroup.digest_posts.length; i++) {
          fDescription =
            fDescription +
            this.posts[digest_group_id].digest_posts[i].description;
        }
      } catch (error) {
        fDescription = "";
      }
      return fDescription;
    },
    getAllDGTitles(digest_group_id) {
      let titles = [];
      try {
        let digestGroup = this.posts[digest_group_id];
        for (let i = 0; i < digestGroup.digest_posts.length; i++) {
          titles.push(this.posts[digest_group_id].digest_posts[i].title);
        }
      } catch (error) {
        titles = [];
      }
      return titles;
    },
    setPostToUpdate(post) {
      this.postToUpdate = post;
    },
  },
  mounted() {
    // this.getPosts();
    this.getDigestGroups();
    this.scrollToTop();
  },
  beforeCreate() {
    this.$store.commit("user_auth_w2/initializeStore");
    const token = this.$store.state.user_auth_w2.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style scoped>
.red {
  color: #bb0a21;
}
.line_sep {
  height: 1px;
  width: 100%;
  background-color: #ebe9e9;
  margin: 20px 0px 20px 0px;
}
.general_text_title_main,
.general_text_title {
  font-size: 16px;
  color: #252525;
  font-weight: 500;
  box-sizing: border-box;
  padding: 0px 0px 0px 10px;
}
.general_text_title_main {
  font-weight: 600;
  cursor: pointer;
}
.general_text_menu {
  box-sizing: border-box;
  padding: 0px 0px 0px 10px;
  margin: 20px 0px 0px 0px;
}
.general_text_menu h2 {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
  line-height: 45px;
}
.title_text_vanilla,
.title_text {
  text-align: left;
  font-size: 30px;
  line-height: 40px;
  margin: 50px 0px 30px 0px;
  font-weight: 600;
  color: #252525;
}
.title_text_vanilla {
  margin: 0px;
}
.max_text_1 {
  max-width: 450px;
}
.digests_vue {
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
  max-height: 80vh;
  max-width: 300px;
  box-sizing: border-box;
  padding: 0px 30px 0px 0px;
  overflow-y: auto;
}
.digest_filter_close {
  z-index: 9999;
  margin: 0px 0px 10px 0px;
  opacity: 0;
  display: none;
}
.filter_show {
  opacity: 1 !important;
  display: block !important;
}
.digest_scrollable {
  position: relative;
  width: 100%;
  height: fit-content;
  height: 300px;
}
.digest_posts {
  position: relative;

  width: 100%;
  height: fit-content;
}
.digests_explanation_description {
  margin: 20px 0px 20px 0px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  max-width: 600px;
  color: #ebe9e9;
}
.digests_explanation {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  height: fit-content;
  background-color: #a56700; /**#d9c83d #f09500 #f0c918*/
  color: #252525;
  background-image: url("~@/assets/background/dark_contract.svg");
  background-size: contain;
  background-position-x: 450%;
  background-position-y: 80%;
  background-size: 90% 90%;
  background-repeat: no-repeat;
  transition-duration: 0.7s;
}
.digests_explanation div {
  color: white;
}
.digests_explanation_description {
  margin: 20px 0px 20px 0px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  max-width: 600px;
  color: white;
}
.digests_explanation_discord {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 50px;
  background-color: #6b4200;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 16px;
  cursor: pointer;
  transition-duration: 0.3s;
}
.digests_explanation_discord svg {
  height: 24px;
  width: 24px;
  margin: 0px 10px 0px 0px;
  transition-duration: 0.3s;
}
.digests_explanation_discord h1 {
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
  color: white;
  transition-duration: 0.3s;
}

.digests_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
}
.digests_container_button {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 20px 0px 10px 0px;
}
.digest_item_container {
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
.digest_item {
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
.digest_item_banner {
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  /* height: 160px; */
  height: 110px;
  transition-duration: 0.7s;
}
.digest_item_banner img {
  height: 110px;
  border-radius: 16px 16px 0px 0px;
  display: block;
  object-fit: cover;
  width: 100%;
  transition-duration: 0.7s;
}
.digest_item_text {
  padding: 20px 30px;
}
.digest_item_text h1 {
  font-size: 18px;
  color: #252525;
  font-weight: 600;
}
.digest_item_text h2 {
  font-size: 16px;
  color: #6e6e73;
  font-weight: 500;
}
@media (max-width: 950px) {
  /* .digest_filter {
    top: 0px;
    height: fit-content;
    position: relative;
    max-width: 100%;
    opacity: 0;
    display: none;
  } */
  .digest_filter {
    position: relative;
    z-index: 999;
    top: 0px;
    left: 0px;
    height: fit-content;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 5px 10px 5px !important;
    max-width: 100%;
    opacity: 0;
    display: none;
    border: 1px solid #f2f2f2;
    padding: 5px;
    border-radius: 16px;
    margin: 0px 0px 20px 0px;
  }
  .digest_filter_close {
    opacity: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 10px;
    left: 0px;
    top: 0px;
    z-index: 999;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }
  .digest_filter_close h2 {
    font-size: 16px;
    font-weight: 500;
    margin: 0px 0px 0px 10px;
  }
  .digest_filter_close img {
    margin: 0px 0px 0px 0px;
    height: 21px;
    width: 21px;
  }
  .digests_vue {
    flex-direction: column;
  }
}
@media (max-width: 650px) {
  .digests_explanation {
    background-position-x: 190%;
    background-position-y: -45%;
    background-size: 70% 70%;
    transition-duration: 0.7s;
  }

  .digests_container {
    justify-content: center;
    max-width: 100%;
  }
  .digest_item_container {
    max-width: 100%;
  }
  .digest_item_banner,
  .digest_item_banner img {
    height: 150px;
    width: 100%;
    transition-duration: 0.7s;
  }
}
@media (hover: hover) {
  .general_text_title_main:hover,
  .general_text_menu h2:hover {
    font-weight: 600;
    color: #0071da;
    cursor: pointer;
  }
  .digests_explanation_discord:hover {
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    -webkit-box-shadow: 0px 0px 25px 10px rgba(255, 255, 255 0.07);
    box-shadow: 0px 0px 25px 10px rgba(255, 255, 255, 0.07);

    transition-duration: 0.7s;
    background: white;
  }
  .digests_explanation_discord:hover h1 {
    transition-duration: 0.7s;
    color: #a56700;
  }
  .digests_explanation_discord:hover svg g path,
  .digests_explanation_discord:hover svg defs clipPath rect {
    transition-duration: 0.7s;
    fill: #a56700;
  }
  .digest_item_container:hover {
    padding: 0px 0px 3px 0px;
    transition-duration: 0.2s;
  }
  .digest_filter_close:hover h2 {
    color: #0071da;
  }
}
</style>
