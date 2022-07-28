export const namespaced = true

export const state = {
    site: "www.grifenix.com/",
    wallet_account: {
        address: "",
        balance: 0.0,
        network: "",
        logged: false
    },
    walletConnected: null,
    defaultWallet: "metamask",
    connecting_wallet: false,
    provider: null,
}

export const getters = {
    getWalletConnected(state) {
        return state.walletConnected;
    },
    getWalletAccount(state) {
        return state.wallet_account;
    },
    getWalletAccountAddress(state) {
        return state.wallet_account.address;
    },
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
    SET_WALLET_ACCOUNT_NETWORK(state, network) {
        state.wallet_account.network = network;
    },
    SET_WALLET_ACCOUNT_BALANCE(state, balance) {
        state.wallet_account.balance = Number(balance) || 0.0;
    },
    SET_WALLET_ACCOUNT_LOGGED(state, logged) {
        state.wallet_account.logged = logged;
    },
    SET_WALLET(state, wallet) {
        state.walletConnected = wallet;
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
    LOGOUT_ACCOUNT(state) {
        state.wallet_account = {
            address: "",
            balance: 0.0,
            network: "",
            logged: false,
        }
        state.walletConnected = null
    }
}

export const actions = {
    async logMetamask({ commit }) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            commit('SET_WALLET_ACCOUNT_ADDRESS', accounts[0])

            // New with ethers

        } catch (e) {
            console.log(e)
        }
    },
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
    async getMetamaskAddress() { //{ commit }) {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            return accounts[0];
        } else {
            return null;
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
    async getBalance({ commit }, account) {
        if (window.ethereum) {
            const Web3 = require("web3");
            var web3 = new Web3(window.ethereum);
            const balance = await web3.eth.getBalance(account);
            commit("SET_WALLET_ACCOUNT_BALANCE", balance)
        } else {
            commit("SET_WALLET_ACCOUNT_BALANCE", 0.0);
        }
    },
    createWalletStorage({ commit }) {
        commit("CREATE_WALLET_STORAGE");
    },
    deleteWalletStorage({ commit }) {
        commit("DELETE_WALLET_STORAGE");
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
    logOutAccount({ commit }) {
        commit("LOGOUT_ACCOUNT");
        commit("DELETE_WALLET_STORAGE");
    },
    connectAccount({ commit, state, dispatch }, wallet) {
        state.connecting_wallet = true;
        if (!window.ethereum) {
            window.location.replace("dapp:" + this.site)
            setTimeout(() => {
                console.log("There is no wallet installed!");
                const notification = {
                    type: "success",
                    message: "There is no wallet installed!",
                };
                dispatch("notification/add", notification, {
                    root: true,
                });
                commit('SET_WALLET', 'metamask');
                return;
            }, 3000);
            state.connecting_wallet = false;
        }
        commit('SET_WALLET', "");
        if (wallet === "metamask") {
            if (
                typeof window.ethereum !== "undefined" &&
                window.ethereum.isMetaMask &&
                window.ethereum.isConnected
            ) {
                dispatch("user_account/connectMetamaskWallet", null, {
                    root: true,
                }).then(() => {
                    dispatch("user_account/getNetwork", null, {
                        root: true,
                    }).then(() => {
                        dispatch("user_account/getBalance", state.wallet_account.address, {
                            root: true,
                        }).then(() => {
                            commit('SET_WALLET_ACCOUNT_LOGGED', true);
                            commit('SET_WALLET', 'metamask');
                            commit("CREATE_WALLET_STORAGE");
                            console.log("Account logged: ", state.wallet_account);
                            state.connecting_wallet = false;
                        })
                    })
                })
            } else {
                console.log("There is no metamask installed!");
                const notification = {
                    type: "success",
                    message: "There is no wallet installed!",
                };
                dispatch("notification/add", notification, {
                    root: true,
                });
                commit('SET_WALLET', '');
                state.connecting_wallet = false;
            }
        }
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
                            commit("SET_WALLET_ACCOUNT_ADDRESS", addr)
                            if (typeof addr === "undefined") {
                                // Logged out
                                dispatch("user_account/logOutAccount", null, { root: true });
                                dispatch("user_account/deleteWalletStorage", null, { root: true });
                            } else {
                                dispatch("user_account/getBalance", addr, { root: true }).then(() => {
                                    dispatch("user_account/getNetwork", null, { root: true }).then(() => {
                                        commit('SET_WALLET_ACCOUNT_LOGGED', true);
                                        commit('SET_WALLET', 'metamask');
                                        commit("CREATE_WALLET_STORAGE");
                                        console.log("Account updated: ", state.wallet_account);
                                    })
                                })
                                dispatch("notification/add", {
                                    type: "success",
                                    message: "Account switched successfully to " + state.wallet_account.address.substring(
                                            0,
                                            6
                                        ) +
                                        "..." +
                                        state.wallet_account.address.substring(
                                            38,
                                            42
                                        ) + "!",
                                }, {
                                    root: true,
                                });
                            }
                            console.log("Account switched!")
                        }
                    })
                }
            }
        } else {
            console.log("Error: impossible to update the account!");
            const notification = {
                type: "success",
                message: "Error: impossible to update the account!",
            };
            this.$store.dispatch("notification/add", notification, {
                root: true,
            });
            commit('SET_WALLET', '');
        }
    }
}