export const namespaced = true

export const state = {
    collection_details: {},
    items: {}
}

export const getters = {
    isWalletAccountLogged(state) {
        return state.wallet_account.logged;
    },
    getWalletStorage() {
        const wallet_storage = JSON.parse(window.localStorage.getItem("grifenix__account"));
        if (wallet_storage) {
            return wallet_storage[0]
        } else {
            return null
        }
    },
    isWalletStorage() {
        if (
            typeof window.localStorage.getItem("grifenix__account") === "undefined"
        ) {
            return false;
        } else {
            return true;
        }
    },
}

export const mutations = {
    SET_WALLET_ACCOUNT_ADDRESS(state, address) {
        state.wallet_account.address = address || "";
    },
    CREATE_WALLET_STORAGE(state) {
        // Saves the new values of the account to the local storage
        const account = [{
            address: state.wallet_account.address,
            network: state.wallet_account.network,
            logged: state.wallet_account.logged,
            wallet: state.walletConnected,
        }, ];
        window.localStorage.setItem("grifenix__account", JSON.stringify(account));
    },
    DELETE_WALLET_STORAGE() {
        // We just should delete the storage with account info
        window.localStorage.removeItem("grifenix__account");
    },
}

export const actions = {
    async connectMetamaskWallet({ dispatch, commit, state }) {
        /* Connecting to Metamask, this will 
          open the MetaMask UI, we should disable the button 
          while the request is pending
          
          MUST BE TRIGGERED BY BUTTON BY USER
          
          Returns the accounts array*/
        console.log("Connecting metamask wallet...")
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                commit('SET_WALLET', 'metamask');
                commit('SET_WALLET_ACCOUNT_ADDRESS', accounts[0]);
            } catch (e) {
                commit('SET_WALLET', "")
                const notification = {
                    type: "error",
                    message: "Unable to connect to Metamask! 😢",
                };
                dispatch("notification/add", notification, {
                    root: true,
                });
                state.connecting_wallet = false;
            }
        } else {
            window.location.replace("dapp:" + this.site);
            commit('SET_WALLET', "")
            setTimeout(() => {
                window.href = "https://metamask.io/download.html";
                state.connecting_wallet = false;
            }, 3000);
        }
    },
    async getNetwork({ rootState, commit }) {
        if (window.ethereum) {
            const networkID = await window.ethereum.networkVersion;
            //const network = this.$storage.state.networks
            commit('SET_WALLET_ACCOUNT_NETWORK', rootState.networks[networkID]);
            return rootState.networks[networkID];
        } else {
            commit('SET_WALLET_ACCOUNT_NETWORK', "");
            return "";
        }
    },
    createWalletStorage({ commit }) {
        commit("CREATE_WALLET_STORAGE");
    },
    logOutWallet({ dispatch, commit }) {
        commit("LOGOUT_ACCOUNT");
        commit("DELETE_WALLET_STORAGE");
        const notification = {
            type: "success",
            message: "Disconnected successfully from the wallet!",
        };
        dispatch("notification/add", notification, {
            root: true,
        });
    },
    updateAccount({ state, getters, commit, dispatch }, wallet) {
        if (window.ethereum) {
            if (wallet === "metamask") {
                if (
                    typeof window.ethereum !== "undefined" &&
                    window.ethereum.isMetaMask &&
                    window.ethereum.isConnected()
                ) {
                    dispatch("user_account/getMetamaskAddress", null, { root: true }).then((addr) => {
                        if (addr === getters.getWalletAccountAddress) {
                            // In case of changing the view
                            dispatch("user_account/getBalance", addr, { root: true }).then(() => {
                                dispatch("user_account/getNetwork", null, { root: true }).then(() => {
                                    commit('SET_WALLET_ACCOUNT_LOGGED', true);
                                    commit('SET_WALLET', 'metamask');
                                    commit("CREATE_WALLET_STORAGE");
                                    console.log("Account updated: ", state.wallet_account);
                                })
                            })
                        } else {

                            console.log("Account switched!")
                        }
                    })
                }
            }
        }
    }
}