<template>
  <div class="app">
    <navbar></navbar>
    <router-view> </router-view>
    <NotificationContainer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import NotificationContainer from "@/components/NotificationContainer.vue";
export default {
  components: {
    Navbar,
    NotificationContainer,
  },
  data() {
    return {
      site: "www.grifenix.com/",
      nightMode: localStorage.getItem("nightMode") || false,
    };
  },
  methods: {
    accountsChanged() {
      /* If Account is changed we should proove
      if some account exists,if yes we will change it if not, 
      we will close the session*/
      this.$store
        .dispatch("user_account/getMetamaskAddress", null, { root: true })
        .then((addr) => {
          if (typeof addr === "undefined") {
            this.$store.dispatch("user_account/logOutAccount", null, {
              root: true,
            });
          } else {
            this.$store.dispatch(
              "user_account/updateAccount",
              this.$store.getters.getWalletConnected || "metamask",
              {
                root: true,
              }
            );
          }
        });
    },
    chainChanged(newChain) {
      console.log("New Chain is: ", newChain);
      this.$store
        .dispatch("user_account/getMetamaskAddress", null, {
          root: true,
        })
        .then(() => {
          this.$store
            .dispatch("user_account/getNetwork", null, {
              root: true,
            })
            .then((netw) => {
              if (netw != "mainnet") {
                console.log("Yo are not on the main net");
                // use the main net pls
                this.$store.dispatch(
                  "notification/add",
                  {
                    type: "error",
                    message:
                      "You are using a wrong network! Please switch to the 'Mainnet'!",
                  },
                  {
                    root: true,
                  }
                );
                this.$store.dispatch(
                  "user_account/updateAccount",
                  this.$store.state.user_account.defaultWallet,
                  { root: true }
                );
              } else {
                this.$store.dispatch(
                  "user_account/updateAccount",
                  this.$store.state.user_account.defaultWallet,
                  { root: true }
                );
              }
              console.log("Network updated to: ", netw);
            });
        });
    },
    metamaskDisconnect(error) {
      console.log("Disconnection:", error);
    },

    handleEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        alert("Ethereum successfully detected!");
        // Access the decentralized web!
      } else {
        alert("Please install MetaMask!");
      }
    },
  },
  created() {
    try {
      if (window.ethereum) {
        // Is on PC
        window.ethereum.on("accountsChanged", this.accountsChanged);
        window.ethereum.on("chainChanged", this.chainChanged);
        //window.ethereum.on("disconnect", this.metamaskDisconnect);

        const wallet_storage =
          this.$store.getters["user_account/getWalletStorage"];
        if (wallet_storage) {
          if (
            wallet_storage.wallet === "metamask" &&
            typeof window.ethereum !== "undefined" &&
            window.ethereum.isConnected
          ) {
            this.$store
              .dispatch("user_account/getMetamaskAddress", null, { root: true })
              .then((addr) => {
                if (addr === wallet_storage.address) {
                  this.$store.dispatch(
                    "user_account/connectAccount",
                    "metamask",
                    { toot: true }
                  );
                }
              });
          }
        }
      } else {
        // Possibly on mobile or some other provider overwriting
        this.$store.dispatch("user_account/logOutAccount", null, {
          root: true,
        });
        // window.location.replace("dapp:www.grifenix.com/");
        // window.location.href = "dapp:www.grifenix.com/";
      }
    } catch (e) {
      console.log("There was some Error:", e);
    }
  },
  unmounted() {
    if (window.ethereum) {
      // ON PC
      window.ethereum.removeListener("accountsChanged", this.accountsChanged);
      window.ethereum.removeListener("chainChanged", this.chainChanged);
      window.ethereum.removeListener("disconnect", this.metamaskDisconnect);
    } else {
      // On Mobile or some other provider overwriting
      console.log("Mobile unmounted");
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  outline-color: #0071da;
}
.app {
  background: white;
  margin: 0px;
  padding: 0px;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  position: relative;
  color: #252525;
}
.title__text {
  font-size: 23px;
  font-weight: 700;
  margin: 0px 10px 50px 10px;
  text-align: center;
}
.subtitle__text {
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;
  padding: 10px 0px;
  margin: 0px;
}
.generic__text {
  font-size: 16px;
  font-weight: 400 !important;
  color: #6e6e75; /*#636a70; rgb(112, 122, 131);*/
}
.line {
  background-color: white;
  height: 1px;
  width: 100%;
  margin: 40px 0px;
}
.sep {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0px 0px !important;
  border: 1px #f2f2f2 solid;
  background-color: #f2f2f2;
  border-radius: 1px;
  width: 100% !important;
  height: 1px;
}
.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.no-mobile-css {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
