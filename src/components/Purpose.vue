<template>
  <div class="purpose">
    <div class="title__text">Some of our functionality</div>
    <div class="purpose__items">
      <div class="purpose__item">
        <img src="@/assets/icons/wallet.svg" alt="IMAGEN" />
        <h2 class="subtitle__text">Connect your wallet</h2>
        <p class="generic__text">
          Enter the Web3 world and discover the new ways to power your community
          or business
        </p>
      </div>
      <div class="purpose__item">
        <img src="@/assets/icons/collection.svg" alt="IMAGEN" />
        <h2 class="subtitle__text">Create your utilities</h2>
        <p class="generic__text">
          Think how you can add new value to your products and create that
          specific utility
        </p>
      </div>
      <div class="purpose__item">
        <img src="@/assets/icons/personalize__NFT.svg" alt="IMAGEN" />
        <h2 class="subtitle__text">Personalize your NFTs</h2>
        <p class="generic__text">
          Feel free to create what NFTs you need, and make them valuable by
          adding some utilities
        </p>
      </div>
      <div class="purpose__item">
        <img src="@/assets/icons/share__NFT.svg" alt="IMAGEN" />
        <h2 class="subtitle__text">Share it with your community</h2>
        <p class="generic__text">
          Is all about community! Share your new products and improve them with
          data analytics
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title__text {
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  color: #252525;
}
.purpose {
  position: relative;
  width: 100%;
  padding: 100px 10%;
  background-color: rgb(0, 113, 218, 0.02);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.purpose__items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}
.purpose__item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  max-width: 300px;
  padding: 15px;
}
.purpose__item img {
  height: 45px;
}
.generic__text {
  font-size: 16px !important;
  line-height: 21px !important;
  font-weight: 400 !important;
  color: #6e6e73 !important;
}

@media (max-width: 400px) {
  .purpose__item {
    padding: 20px;
  }
}
</style>
