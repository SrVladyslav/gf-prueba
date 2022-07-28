import { createStore } from 'vuex'
import * as notification from '@/store/modules/notification.js'
import * as user_account from '@/store/modules/user_account.js'
import * as gf_contracts from '@/store/modules/constants.js'
import * as user_auth_w2 from '@/store/modules/user_auth_w2.js'
import * as navbar_state from '@/store/modules/navbar_state.js'
export default createStore({
    state: {
        networks: {
            1: "mainnet",
            3: "ropsten",
            4: "rinkeby",
            42: "kovan",
            5: "goerli",
            80001: "mumbai"
        }
    },
    mutations: {},
    actions: {},
    getters: {
        isEthereum() {
            if (window.ethereum) {
                return true;
            } else {
                return false;
            }
        },
        currentAccount() {
            if (window.ethereum) {
                return window.ethereum.selectedAddress;
            } else {
                return null;
            }
        },

    },
    modules: {
        notification,
        user_account,
        gf_contracts,
        user_auth_w2,
        navbar_state
    }
})