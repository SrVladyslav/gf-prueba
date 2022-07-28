<template>
  <section class="my__accont">
    <div class="my__account__banner_wrapper">
      <div class="my__account__banner">
      </div>
    </div>
    <div class="my__accont__section">
      <div class="account_container">
        <div class="account_photo" id="account_photo">
        </div>
        <div class="account_info">
          <h3 class="title__text__card">Garfield</h3>
          <h3 class="generic__text blue">{{
                this.$store.state.user_account.wallet_account.address.substring(
                  0,
                  6
                ) +
                "..." +
                this.$store.state.user_account.wallet_account.address.substring(
                  38,
                  42
                )
              }}
          </h3>
          <h3 class="generic__text bio">
            This is a short biography about that fucking cat omg xD, that’s it,  i’m very lazy, so bye bye.
          </h3>
          <div class="stats_account_info">
              <div class="account_stat_item">
                <h3 class="generic__text">
                  Claimed
                </h3>
                <h3 class="title__text__card">15</h3>
              </div>
              <div class="account_stat_item">
                <h3 class="generic__text">
                  Created
                </h3>
                <h3 class="title__text__card">65</h3>
              </div>
              <div class="account_stat_item">
                <h3 class="generic__text">
                  Followers
                </h3>
                <h3 class="title__text__card">255</h3>
              </div>
              <div class="account_stat_item">
                <h3 class="generic__text">
                  Followed
                </h3>
                <h3 class="title__text__card">0</h3>
              </div>
          </div>
          <my-button
          class="create__button"
          @click="f();"
        >
          Show more
        </my-button>
        </div>
      </div>
      <div class="created_collections">
        <h3 class="title__text__generic">Created collections</h3>
        <h3 class="generic__text">The list of the last posted collections </h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.my__accont {
  position: relative;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
}

.my__account__banner_wrapper {
  clear: both;
  position: relative;
  width: 100%;
  display: flex;
  height: fit-content;
  max-height: 400px;
  box-sizing: border-box;
  margin: 0;
  padding: 70px 0px 0px 0px;
}
.my__account__banner {
  background-image: url("https://images.unsplash.com/photo-1614586125858-e695dd97d1b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNjZW5lcnl8ZW58MHx8MHx8&w=1000&q=80");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.my__accont__section {
  position: relative;
  height: 400px;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  padding: 0px 20% 0px 20%;
  top: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.account_container {
  position: relative;
  width: 100%;
  min-width: 470px;
  height: fit-content;
  background: #FFFFFF;
  box-shadow: 5px 5px 40px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: -100px;
  bottom: 0px;
  padding: 100px 10% 30px 10%;
}

.account_photo {
  position: absolute;
  height: 180px;
  width: 180px;
  background: url("https://s.w-x.co/in-cat_in_glasses.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center;
  background-size: cover;
  border: 5px solid #FFFFFF;
  border-radius: 50%;
  box-sizing: border-box;
  top: -90px;
}

.account_info {
  width: 100%;
  min-width: 470px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stats_account_info {
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  background: rgba(0, 113, 218, 0.05);
  border-radius: 16px;
  margin-bottom: 30px;
}

.account_stat_item {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.title__text{
  text-align: left;
  margin: 0px 0px 25px 0px;
  font-size: max(2vw, 24px);
}
.title__text__generic {
  font-size: 30px;
  margin: 0px 0px 15px 0px;
}
.title__text__card {
  display: flex;
  flex: wrap;
  font-size: 30px;
  margin: 0px;
}
.created_collections {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.generic__text,
.generic__text__stat {
  font-size: 14px;
  margin: 0px 0px 5px 0px;
}
.generic__text__stat {
  margin: 0px;
}
.subtitle__text,
.generic__text {
  text-align: left;
  display: flex;
  padding: 0px;
}
.subtitle__text {
  margin: 30px 0px 5px 0px;
}

.blue {
  color:#0071DA;
  cursor: pointer;
}

.bio {
  padding: 30px 0px 35px 0px;
}

</style>