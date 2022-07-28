<template>
  <div class="profile_container">
    <div class="profile_elements_container">
      <div class="profile_card">
        <div class="profile_card_container">
          <gf-option-button
            class="button_opc"
            @click="profileOptions"
          ></gf-option-button>
          <div class="profile_pic_container">
            <img class="profile_pic" src="@/assets/ToDelete/woman.svg" alt="" />
            <img
              class="profile_pic_edit"
              src="@/assets/icons/UI/edit_button.png"
              alt=""
              @click="profileImgChange"
            />
          </div>
          <div class="title_text">Name Surname</div>
          <div class="generic_text profile_wallet" @click="copyAddress">
            0x123...456
          </div>
          <div class="profile_bio subtitle_text">
            This is a short description about bla bla bla...
          </div>
          <div class="profile_tags_container">
            <div class="profile_tag">Photography</div>
            <div class="profile_tag">Sun sets</div>
            <div class="profile_tag">Natural portraits</div>
          </div>
          <div class="profile_commissions generic_text">
            Open to commissions
          </div>
        </div>
      </div>
      <div class="main_elements">
        <div class="dashboard_feed">
          <div class="fast_stats_container">
            <div class="stats">
              <div class="stats_title">
                <h1>3656</h1>
                <img src="@/assets/icons/UI/profile_blue.png" alt="" />
              </div>
              <div class="subtitle_text">Followers</div>
            </div>
            <div class="stats">
              <div class="stats_title">
                <h1>32</h1>
                <img src="@/assets/icons/UI/profile_blue.png" alt="" />
              </div>
              <div class="subtitle_text">Following</div>
            </div>
            <div class="stats">
              <div class="stats_title">
                <h1>10M</h1>
                <img src="@/assets/icons/UI/profile_blue.png" alt="" />
              </div>
              <div class="subtitle_text">Minted NFTs</div>
            </div>
            <div class="stats">
              <div class="stats_title">
                <h1>350K</h1>
                <img src="@/assets/icons/UI/profile_blue.png" alt="" />
              </div>
              <div class="subtitle_text">Income</div>
            </div>
          </div>
          <div class="full_profile_container">
            <gf-option-button
              class="button_opc"
              @click="profileOptions"
            ></gf-option-button>
            <h1>Saved collections</h1>
            <p>
              Contains the newly created contracts which are saved and not
              minted to the blockchain yet
            </p>
            <div class="created_collections_container">
              <div class="created_collections_container_scroll">
                <div
                  v-if="user_collections.length === 0"
                  class="no_collections"
                >
                  You don't have stored collections!
                  <h1>Create collection</h1>
                </div>
                <div
                  class="created_collections_item"
                  v-for="(collection, key) in user_collections"
                  :key="key"
                >
                  <div class="collection_item_content">
                    <div class="collection_item_photo">
                      <!-- <img src="@/assets/ToDelete/woman.svg" alt="" /> -->
                      <img
                        :src="'http://127.0.0.1:8000' + collection.logo"
                        alt=""
                      />
                    </div>
                    <div class="created_collections_item_text">
                      <h1>{{ collection.name }}</h1>
                      <p>
                        {{ stripString(collection.description) }}
                      </p>
                      <div class="collection_network">
                        <img
                          :src="
                            require('./../' +
                              blockchain_type[collection.blockchain])
                          "
                          alt=""
                        />
                        <p>{{ collection.blockchain }}</p>
                        <img
                          class="second_img"
                          :src="
                            require('./../' +
                              payment_tokens[collection.blockchain][
                                collection.payment_token
                              ])
                          "
                          alt=""
                        />
                        <p>{{ collection.payment_token }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="created_collections_item_cta">
                    <gf-option-button
                      class="button_opcs"
                      @click="profileOptions"
                    ></gf-option-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard_fast_title">
            <div class="title_text">Statistics</div>
            <div class="subtitle_text">
              Detailed statistics about your account
            </div>
          </div>
          <div class="dashboard_fast_title">
            <div class="title_text">Created collections</div>
            <div class="subtitle_text">
              Here are the newly created collections which stay on the server
              and are not minted yet
            </div>
          </div>
          <div class="stats">
            <div class="stats_title">
              <h1>350K</h1>
              <img src="@/assets/icons/UI/profile_blue.png" alt="" />
            </div>
            <div class="subtitle_text">Income</div>
          </div>
        </div>
        <div class="history">
          <div class="history_container">
            <gf-option-button
              class="button_opc"
              @click="profileOptions"
            ></gf-option-button>
            <div class="title_text latest_movements">Latest movements</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {{ user_collections }}
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user_collections: {},
      // Image data
      blockchain_type: {
        Ethereum: "assets/icons/blockchains/ethereum.png",
        Polygon: "assets/icons/blockchains/polygon.png",
      },
      payment_tokens: {
        Ethereum: {
          ETH: "assets/icons/blockchains/tokens/ethereum_eth.png",
        },
        Polygon: {
          MATIC: "assets/icons/blockchains/tokens/polygon_matic.png",
          ETH: "assets/icons/blockchains/tokens/polygon_eth.png",
        },
      },
    };
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    profileOptions() {
      alert("Profile Options");
    },
    profileImgChange() {
      alert("Profile Image Change");
    },
    copyAddress() {
      alert("Address copied");
    },
    stripString(value) {
      if (value.length > 65) {
        return value.substring(0, 50) + "...";
      } else {
        return value;
      }
    },
    async getUserInfo() {
      await axios
        .get("http://localhost:8000/collections/0x01234")
        .then((res) => {
          console.log("Response:", res);
          this.user_collections = res.data;
        });
    },
  },
  mounted() {
    this.scrollToTop();
    this.getUserInfo();
  },
};
</script>

<style scoped>
.title_text {
  margin: 0px;
  box-sizing: border-box;
  line-height: 20px;
  padding: 0px;
  font-size: 20px;
  font-weight: 600;
  color: #252525;
}
.subtitle_text {
  font-size: 14px;
  color: #6e6e75;
}
.generic_text {
  font-size: 14px;
}
.profile_container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: fit-content;
  min-height: 100vh;
  width: 100%;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding: 110px 5% 0px 5%;
}

.profile_elements_container {
  position: relative !important;
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: 100%;
  max-width: 1500px;
}
.main_elements {
  position: relative !important;
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: 100%;
}
.profile_card,
.history {
  position: sticky;
  display: flex;
  flex-direction: column;
  max-width: 350px;
  min-width: 250px;
  width: 100%;
  height: fit-content;
  top: 110px;
}
.profile_card_container,
.history_container {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  background-color: white;
  border-radius: 16px;
  text-align: center;
}

.history_container {
  min-height: 300px;
}
.profile_pic_container {
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  box-sizing: border-box;
  padding: 40px 0px 20px 0px;
  width: 100%;
}
.profile_pic {
  height: 200px;
  width: 200px;
  transition-duration: 0.7s;
}
.profile_pic_edit {
  position: absolute;
  bottom: 10px;
  height: 30px;
  width: 30px;
  cursor: pointer;
  transition-duration: 0.3s;
}
.profile_wallet {
  position: relative;
  display: flex;
  color: #0071da;
  margin: 10px 0px 20px 0px;
  font-weight: 400;
  cursor: pointer;
}
.profile_wallet::before {
  content: "";
  background-image: url("~@/assets/icons/social_networks/link.png");
  background-size: 14px 14px;
  position: absolute;
  z-index: 200;
  height: 14px !important;
  width: 14px;
  top: 2px;
  right: -15px;
  transition-duration: 0.5s;
  opacity: 0;
}
.button_opc {
  position: absolute !important;
  top: 10px;
  right: 0px;
  cursor: pointer;
  z-index: 500;
}
.profile_bio {
  box-sizing: border-box;
  padding: 0px 40px 0px 40px;
}
.profile_tags_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  padding: 20px 40px 60px 40px;
  border-bottom: 1px solid #f2f2f2;
}
.profile_tag {
  background: rgb(0, 113, 218, 0.07);
  color: rgb(0, 113, 218);
  font-weight: 500;
  font-size: 14px;
  box-sizing: border-box;
  padding: 4px 8px;
  margin: 5px;
  border-radius: 10px;
  width: fit-content;
  cursor: pointer;
}
.profile_commissions {
  font-weight: 500;
  color: #16a000;
  margin: 15px 0px 15px 0px;
}

.dashboard_feed {
  display: flex;
  flex-direction: column;
  height: fit-content;
  height: 200vh !important;
  width: 100%;
  min-width: 600px;
  padding: 0px 30px 0px 30px;
}
.fast_stats_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
}

.stats {
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: auto;
  min-width: 160px;
  background-color: white;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 10px 15px;
}
.stats_title {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
}
.stats_title h1 {
  font-size: 2.5rem;
  line-height: 2.5rem;
  color: #0071da;
  font-weight: 600;
}
.stats_title img {
  height: 2.5rem;
  width: 2.5rem;
  padding: 3px;
}

.dashboard_fast_title {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 60px 0px 0px 0px;
}
.dashboard_fast_title .subtitle_text {
  box-sizing: border-box;
  padding: 10px 0px 10px 0px;
}
.latest_movements {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  justify-content: flex-start;
  text-align: left;
}
.full_profile_container {
  background: white;
  position: relative;
  width: 100%;
  border-radius: 16px;
  height: fit-content;
  box-sizing: border-box;
  padding: 15px;
  margin: 30px 0px 0px 0px;
}
.full_profile_container h1,
.full_profile_container h1 {
  font-size: 16px;
  font-weight: 600;
}
.full_profile_container p,
.created_collections_item p {
  font-size: 14px;
  font-weight: 400;
  color: #6e6e73;
}
.full_profile_container h1,
.full_profile_container p {
  margin: 0px 40px 5px 0px;
}
.created_collections_container {
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: 150px;
  max-height: 300px;
  box-sizing: border-box;
  padding: 0px;
  margin: 15px 0px 5px 0px;
  overflow-x: auto;
}
.created_collections_container::-webkit-scrollbar {
  width: 10px;
  background: white;
  cursor: pointer;
  border-radius: 0px 10px 10px 0px;
}
.created_collections_container::-webkit-scrollbar-thumb {
  background: #6e6e75;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
}
.created_collections_container_scroll {
  position: relative;
  width: 100%;
  height: fit-content;
}
.no_collections {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c8102e;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  height: 150px;
}
.no_collections h1 {
  font-size: 14px;
  font-weight: 400;
  color: #0071da;
  margin: 0px 0px 0px 5px;
  cursor: pointer;
  transition-duration: 0s;
}
.created_collections_item {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
  border-radius: 16px;
  padding: 10px 10px;
  margin: 10px 0px 10px 0px;
}
.collection_item_content {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  justify-content: flex-start;
}
.collection_item_photo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  min-width: 100px;
  max-width: 100px;
  box-sizing: border-box;
  padding: 0px 10px 0px 0px;
}
.collection_item_photo img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  border: 1px solid #f2f2f2;
}
.created_collections_item_text h1 {
  color: #0071da;
  font-size: 16px;
  font-weight: 400;
}
.created_collections_item_text p {
  color: #6e6e73;
  font-weight: 400;
  font-size: 14px;
}
.collection_network {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 10px 0px 5px 0px;
}
.collection_network img {
  height: 20px;
  width: 20px;
  margin: 0px 5px 0px 0px;
}
.collection_network p {
  margin: 0px 40px 0px 0px;
}
.second_img {
  margin-left: 10px !important;
}
.created_collections_item_cta {
  height: 100%;
  width: 40px;
}

@media (max-width: 1200px) {
  .main_elements {
    flex-direction: column;
  }
  .history {
    top: 0px;
    position: relative;
    max-width: 100%;
    padding: 30px 0px 30px 30px;
  }
  .dashboard_feed {
    min-width: initial !important;
  }
}

@media (max-width: 945px) {
  .profile_card,
  .history {
    position: relative;
    width: 100%;
    max-width: 100%;
    top: 0px;
    padding: 30px 0px 30px 0px;
    min-width: 100px;
  }
  .dashboard_feed {
    padding: 30px 0px 30px 0px;
    min-width: initial !important;
  }
  .profile_elements_container {
    position: relative;
    flex-direction: column;
  }
  .profile_container {
    padding: 90px 5% 0px 5%;
  }
  .collection_item_content {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .created_collections_item_text h1,
  .created_collections_item_text p {
    margin: 0px !important;
  }
  .collection_network {
    justify-content: center;
    align-items: center;
  }
}

@media (hover: hover) {
  .profile_pic_edit:hover {
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    transition-duration: 0.3s;
  }

  .profile_wallet:hover::before {
    opacity: 1;
    transition-duration: 0.5s;
  }
  .profile_tag:hover {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    transition-duration: 0.7s;
    border: 1px solid #0071da;
  }
  .no_collections h1:hover {
    font-weight: 500;
    transition-duration: 0.5s;
  }
}
</style>
