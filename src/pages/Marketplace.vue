<template>
  <section class="marketplace">
    <div>
      <div style="margin-top: 10em"></div>
      Marketplace
      <div>Ethereum: {{ w_a }}</div>
      <div>
        Cartera: {{ this.$store.state.user_account.wallet_account.address }}
      </div>
      <div>{{ solucion }}</div>
      <div>{{ cartera }}</div>
      <div>{{ json }}</div>
      <div @click="gFethers" class="boton">Grifenix proove</div>
      <div @click="update" class="boton">Update proove</div>
      <div @click="send" class="boton">Send Ether</div>
      <div @click="testB" class="boton">TestB</div>
      <div @click="testGanache" class="boton">Test on Ganache</div>
      <div @click="testGenerator" class="boton">Test Generator</div>
      <div @click="testMumbaiCreation" class="boton">
        Test on Mumbai Creation
      </div>
      <div @click="testGanacheManager" class="boton">
        Test on Ganache manager
      </div>
      <div @click="testGanacheCreation" class="boton">
        Test on Ganache Creation
      </div>
      <div>
        Balance:
        {{ this.$store.state.user_account.wallet_account.balance / 10 ** 18 }}
        <br />
        Networks:
        {{ this.$store.state.networks }}
      </div>
      <div @click="uss" class="boton">Provider</div>

      <div class="send">
        <div class="subtitle__text">TO: {{ sendToAddress }}</div>
        <input type="input" v-model="sendToAddress" />

        <div class="subtitle__text">Amount ETH: {{ amountETH }}</div>
        <input type="input" v-model="amountETH" />
        <my-button @click="send" class="boton">Send ETH</my-button>
      </div>
      <div @click="login()">LogIn</div>
      <div @click="logout()">LogOut</div>
      <div @click="logoutall()">LogOut all</div>
      <div @click="getUser()">getUser</div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      solucion: "Hola",
      cartera: "Nada",
      sendToAddress: "0x26Bb6eF9f5C89aa41907c8CfA266e7b78C8e5de2",
      amountETH: "",
      json: "",
      w_a: "x",
      test_ganache: "0xAd93d348Df61A0f3323437aaBb3850967b721664", //"0xf5840ffe554415eD0A7A868c35aB755eC63Dd4da",
    };
  },
  beforeCreate() {
    this.$store.commit("user_auth_w2/initializeStore");
    const token = this.$store.state.user_auth_w2.token;
    console.log("Token: ", token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  methods: {
    async getUser() {
      const token = this.$store.state.user_auth_w2.token;
      let url = this.$store.state.gf_contracts.backend + "/posts/"; //"/user/";
      // axios.defaults.headers.common["Authorization"] = "Token " + token;
      console.log("Token:", token);
      axios.get(url).then(console.log).catch(console.log);
    },
    login() {
      const formData = {
        username: "admin",
        password: "admin",
      };
      axios.defaults.headers.common["Authorization"] = "";
      axios
        .post(this.$store.state.gf_contracts.backend + "/login/", formData)
        .then((response) => {
          console.log("Response:", response.data);
          const token = response.data.token;
          this.$store.commit("user_auth_w2/setToken", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      const token = this.$store.state.user_auth_w2.token;
      let url = this.$store.state.gf_contracts.backend + "/logout/";
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      this.$store.commit("user_auth_w2/removeToken");
      axios.post(url).then(console.log).catch(console.log);
    },
    logoutall() {
      const token = this.$store.state.user_auth_w2.token;
      let url = this.$store.state.gf_contracts.backend + "/logoutall/";
      //axios.defaults.headers.common["Authorization"] = "Token " + token;
      console.log("Token:", token);
      axios.post(url).then(console.log).catch(console.log);
    },
    async gFethers() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(0);
      const address = "0x4e07f4A5126dC2927Ca8126609a5CED2fc25224f";
      const abi = []; //this.$store.state.gf_contracts.gfMainContractABI;
      const GFMainContract = new ethers.Contract(address, abi, signer);
      // GFMainContract.isGFCollection(
      //   "0x26Bb6eF9f5C89aa41907c8CfA266e7b78C8e5de2"
      // ).then((result) => {
      //   console.log("Guay: ", result);
      // });
      GFMainContract.createNewAccount(
        "Nickname",
        "Description",
        ["Nature", "Moon"],
        true,
        false,
        { gasLimit: 2000000 }
      ).then((result) => {
        console.log("Guay: ", result);
      });
    },
    async testGanache() {
      const ethers = require("ethers");
      const url = "http://localhost:7545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const signer = provider.getSigner(0);
      const address = "0xdAa24719eaEac676C2b93d3EaAc00c2eAdDcD3E9"; //"0x0E51e0C1A8752eABe80d2F6c019921B5631719c9"; //"0x6efa0eCCf302191f9c0aB842A411b45756618953"; //"0x1622DE0c4DDB729b270C0Ee2E12f89E61A35Cc17";
      const abi = [
        {
          inputs: [
            {
              internalType: "address",
              name: "_gfCollectionManagerContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_coOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "collection",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "collectionType",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "NewCollectionCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_newGenerator",
              type: "address",
            },
          ],
          name: "addGeneratorToAllowanceList",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_sender",
              type: "address",
            },
            {
              internalType: "address",
              name: "_newUserCollection",
              type: "address",
            },
            {
              internalType: "string",
              name: "_collectionType",
              type: "string",
            },
          ],
          name: "addNewUserCollection",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "coOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "getUserCollectionAmount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_collectionID",
              type: "uint256",
            },
          ],
          name: "getUserCollectionData",
          outputs: [
            {
              internalType: "address",
              name: "collectionAddr",
              type: "address",
            },
            {
              internalType: "string",
              name: "collectionType",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "createdAt",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_generatorToRemove",
              type: "address",
            },
          ],
          name: "removeGeneratorFromAllowanceList",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_gfNewCollectionManagerContract",
              type: "address",
            },
          ],
          name: "updateCollectionManagerContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const TestG = new ethers.Contract(address, abi, signer);
      TestG.getUserCollectionData(
        "0x304749a869D65b5B134B555Eb78A3b57c843C918",
        1,
        {
          gasLimit: 20000000,
        }
      ).then((result, e) => {
        console.log("Original is: ", result);
        console.log("Error:", e);
      });
      // TestG.getUserAccount("0xEB9Dd49D95188D393a7cF65bf3c1C99602d97d6B").then(
      //   (result) => {
      //     console.log("User account: ", result);
      //     TestG.isGFAccount(result).then((resul) => {
      //       console.log("Is account: ", resul);
      //     });
      //   }
      // );
    },
    async testGanacheCreation() {
      const ethers = require("ethers");
      const url = "http://localhost:7545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const signer = provider.getSigner(0);
      const address = "0x910DBf703F9Db803f3d1Fc98dE653D6430f98017"; //"0x0E51e0C1A8752eABe80d2F6c019921B5631719c9"; //"0x6efa0eCCf302191f9c0aB842A411b45756618953"; //"0x1622DE0c4DDB729b270C0Ee2E12f89E61A35Cc17";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_nickname",
              type: "string",
            },
            {
              internalType: "string",
              name: "_bio",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "_favoriteThematics",
              type: "string[]",
            },
            {
              internalType: "bool",
              name: "_doCommissions",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "_analyticsStatus",
              type: "bool",
            },
          ],
          name: "createNewAccount",
          outputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bool",
              name: "_resolution",
              type: "bool",
            },
          ],
          name: "decideRequest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_coOwner",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfAccountManagerContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfCollectionManagerContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfUtilityManagerContract",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "GFMainContractUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bool",
              name: "resolution",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "GFMainContractsChangeRequestStatusChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "GFAnalyticsContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "GFEconomyContract",
              type: "address",
            },
          ],
          name: "GFMainContractsChangeRequested",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "NewAccountCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "gfAccountManagerContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "gfCollectionManagerContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "gfUtilityManagerContract",
              type: "address",
            },
          ],
          name: "NewManagereContractsUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_GFAnalyticsContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_GFEconomyContract",
              type: "address",
            },
          ],
          name: "requestMainContractsChange",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_newImageManagerContract",
              type: "address",
            },
          ],
          name: "setImageManagerContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "setMainContractsChange",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_newCashCreator",
              type: "address",
            },
          ],
          name: "setNewCashCreator",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_socialNetworkCOntract",
              type: "address",
            },
          ],
          name: "setSocialNetworkContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_gfAccountManagerContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfCollectionManagerContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfUtilityManagerContract",
              type: "address",
            },
          ],
          name: "updateManagerContracts",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "coOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getImageManagerContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_type",
              type: "string",
            },
          ],
          name: "getMainContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_type",
              type: "string",
            },
          ],
          name: "getManagerContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getNewGFMainContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getSocialNetworkContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_type",
              type: "string",
            },
          ],
          name: "getStorageContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "gfCashCreator",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "newGFMainContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      const TestG = new ethers.Contract(address, abi, signer);
      // TestG.createNewAccount("Name", "Description", ["Nature"], true, false, {
      //   gasLimit: 2000000,
      // }).then((result, e) => {
      //   console.log("Original is: ", result);
      //   console.log("Error:", e);
      // });
      TestG.createNewAccount(
        "Account1",
        "Description1",
        ["Natural Portraits"],
        "true",
        "false",
        {
          gasLimit: 4000000,
        }
      ).then((result) => {
        console.log("Original is: ", result);
      });
      // TestG.createCollection(
      //   "abc",
      //   "funciona esta mierda ueee",

      //   {
      //     gasLimit: 2000000,
      //   }
      // ).then((result) => {
      //   console.log("Original is: ", result);
      // });
    },
    async testGanacheManager() {
      const ethers = require("ethers");
      const url = "http://localhost:7545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const signer = provider.getSigner(0);
      const address = "0x05C6c5ADb501f3fd3FAa629B02f9A29728d4E1F5"; //"0x0E51e0C1A8752eABe80d2F6c019921B5631719c9"; //"0x6efa0eCCf302191f9c0aB842A411b45756618953"; //"0x1622DE0c4DDB729b270C0Ee2E12f89E61A35Cc17";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_link",
              type: "string",
            },
          ],
          name: "createCollection",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_gfCollectionStorageContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfAccountStorageContract",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "NewABIUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "RequiredFieldsUpdated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newABI",
              type: "string",
            },
          ],
          name: "setABI",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_fieldsJSON",
              type: "string",
            },
          ],
          name: "setRequiredFieldsJSON",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getABI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRequiredFieldsJSON",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "gfAccountStorageContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "gfCollectionStorageContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      const TestG = new ethers.Contract(address, abi, signer);
      // TestG.addNewGenerator(
      //   "Nick",
      //   "0x6717059F4C4FaF7B4c9523D40Ff88255ac4dddB6",
      //   {
      //     gasLimit: 2000000,
      //   }
      // ).then((result) => {
      //   console.log("Original is: ", result);
      // });
      // TestG.removeGenerator(0, {
      //   gasLimit: 2000000,
      // }).then((result) => {
      //   console.log("Original is: ", result);
      // });
      TestG.createCollection("Nombre de la coleccion", "Link al canal", {
        gasLimit: 3000000,
      }).then((result) => {
        console.log("Original is: ", result);
      });
    },
    async testMumbaiCreation() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = "0xa07F1d7B453fFE6AaB8d98b11323B74fC563eB05";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_nickname",
              type: "string",
            },
            {
              internalType: "string",
              name: "_bio",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "_favoriteThematics",
              type: "string[]",
            },
            {
              internalType: "bool",
              name: "_doCommissions",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "_analyticsStatus",
              type: "bool",
            },
          ],
          name: "createNewAccount",
          outputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bool",
              name: "_resolution",
              type: "bool",
            },
          ],
          name: "decideRequest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_coOwner",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfAccountManagerContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfCollectionManagerContract",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "GFMainContractUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bool",
              name: "resolution",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "GFMainContractsChangeRequestStatusChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "GFLogicContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "GFAnalyticsContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "GFEconomyContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "GFUtilityLogicContract",
              type: "address",
            },
          ],
          name: "GFMainContractsChangeRequested",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "NewAccountCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_GFLogicContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_GFAnalyticsContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_GFEconomyContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_GFUtilityLogicContract",
              type: "address",
            },
          ],
          name: "requestMainContractsChange",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_newCashCreator",
              type: "address",
            },
          ],
          name: "setNewCashCreator",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "coOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAccountStorageContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getCollectionStorageContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_type",
              type: "string",
            },
          ],
          name: "getMainContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getNewGFMainContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "gfCashCreator",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "newGFMainContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      const GFMainContract = new ethers.Contract(address, abi, signer);
      // GFMainContract.getAccountStorageContract({ gasLimit: 3000000 }).then(
      //   (result) => {
      //     console.log("Guay: ", result);
      //   }
      // );
      GFMainContract.createNewAccount(
        "Nickname",
        "Description",
        ["Nature", "Moon"],
        true,
        false,
        { gasLimit: 20000000 }
      ).then((result) => {
        console.log("Guay: ", result);
      });
    },
    async testGenerator() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(0);
      const address = "0x26FF57eA92Ba4306c3c13bae061FeabB6DBB00A2";
      console.log(address);
      const abi = [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "newGeneratorAddress",
              type: "address",
            },
            {
              indexed: true,
              internalType: "string",
              name: "generatorType",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "CollectionGeneratorRemoved",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "newGeneratorAddress",
              type: "address",
            },
            {
              indexed: true,
              internalType: "string",
              name: "generatorType",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "NewCollectionGeneratorAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_generatorType",
              type: "string",
            },
            {
              internalType: "address",
              name: "_newGFCollectionGeneratorContract",
              type: "address",
            },
          ],
          name: "addNewGenerator",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getCollectionTypes",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getGFContractTypes",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_generatorID",
              type: "uint256",
            },
          ],
          name: "getGenerator",
          outputs: [
            {
              internalType: "string",
              name: "_generatorType",
              type: "string",
            },
            {
              internalType: "address",
              name: "_generatorAddress",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_type",
              type: "string",
            },
          ],
          name: "getGeneratorByType",
          outputs: [
            {
              internalType: "string",
              name: "_generatorType",
              type: "string",
            },
            {
              internalType: "address",
              name: "_generatorAddress",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_generatorID",
              type: "uint256",
            },
          ],
          name: "removeGenerator",
          outputs: [
            {
              internalType: "string",
              name: "_type",
              type: "string",
            },
            {
              internalType: "address",
              name: "_generatorAddress",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_gfMainContract",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfCollectionStorageContract",
              type: "address",
            },
          ],
          name: "setGFMainContracts",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "typeExists",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "typeToID",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      console.log(abi);
      const GFCollectionManager = new ethers.Contract(address, abi, signer);
      GFCollectionManager.getGenerator(0, { gasLimit: 3000000 }).then(
        (result) => {
          console.log("Guay: ", result);
        }
      );
    },
    async testB() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = "0x73312eC7Bb8594B74CF8720080fC05d7C55Aa4Ae"; //"0x0E51e0C1A8752eABe80d2F6c019921B5631719c9"; //"0x6efa0eCCf302191f9c0aB842A411b45756618953"; //"0x1622DE0c4DDB729b270C0Ee2E12f89E61A35Cc17";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_nickname",
              type: "string",
            },
            {
              internalType: "string",
              name: "_bio",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "_favoriteThematics",
              type: "string[]",
            },
          ],
          name: "createNewAccount",
          outputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_coOwner",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfAccountHandlerContract",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "NewAccountCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "coOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getStorageContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      const TestB = new ethers.Contract(address, abi, signer);
      // TestB.isGFAccount("0x0ee0597a2E1a1874aF1d1Ea71F04223A20cE10de").then(
      //   (result) => {
      //     console.log("Original is: ", result);
      //     console.log("Number is: ", Number(result));
      //   }
      // );
      TestB.createNewAccount("Nick", "Bio", ["Natural portraits"], {
        gasLimit: 2000000,
      }).then((result) => {
        console.log("Original is: ", result);
      });
      // TestB.getUserAccount("0x26Bb6eF9f5C89aa41907c8CfA266e7b78C8e5de2").then(
      //   (result) => {
      //     console.log("Original is: ", result);
      //     TestB.isGFAccount(result).then((resul) => {
      //       console.log("Original is: ", resul);
      //     });
      //   }
      // );
    },
    async update() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = "0xbc86fBe2693363345FFf43Fb03bA50B2a4Ce727a";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_nickname",
              type: "string",
            },
            {
              internalType: "string",
              name: "_bio",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "_favoriteThematics",
              type: "string[]",
            },
          ],
          name: "createNewAccount",
          outputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_coOwner",
              type: "address",
            },
            {
              internalType: "address",
              name: "_gfAccountHandlerContract",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "account",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "NewAccountCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "coOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getStorageContract",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      const TestB = new ethers.Contract(address, abi, signer);
      // TestB.isGFAccount("0x0ee0597a2E1a1874aF1d1Ea71F04223A20cE10de").then(
      //   (result) => {
      //     console.log("Original is: ", result);
      //     console.log("Number is: ", Number(result));
      //   }
      // );
      TestB.createNewAccount("Nick", "Bio", ["Natural portraits"], {
        gasLimit: 2000000,
      }).then((result) => {
        console.log("Original is: ", result);
      });
      // TestB.getUserAccount("0x26Bb6eF9f5C89aa41907c8CfA266e7b78C8e5de2").then(
      //   (result) => {
      //     console.log("Original is: ", result);
      //     TestB.isGFAccount(result).then((resul) => {
      //       console.log("Original is: ", resul);
      //     });
      //   }
      // );
    },
    async polyEthers() {
      const ethers = require("ethers");

      //  "https://rpc-mumbai.matic.today"
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = "0x3D8c744Fe38cEF561C4B0049A5Aa5D86A9f9a0f1"; //this.$store.state.gf_contracts.gfMainContractAddress;
      const abi = [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          inputs: [],
          name: "getNumber",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getOwner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "_n", type: "uint256" }],
          name: "setNumber",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ]; //this.$store.state.gf_contracts.gfMainContractABI;
      const GFMainContract = new ethers.Contract(address, abi, signer);
      GFMainContract.getOwner().then((result) => {
        console.log("Guay: ", result);
      });

      GFMainContract.getNumber().then((result) => {
        console.log("Guay: ", result);
      });

      // GFMainContract.setNumber(666).then((result) => {
      //   console.log("Guay: ", result);
      // });

      GFMainContract.getNumber().then((result) => {
        console.log("Guay: ", Number(result));
      });
    },
    async send() {
      if (!this.amountETH || this.amountETH === 0 || this.amountETH === "") {
        const notification = {
          type: "error",
          message: "Please, set some amount of ETH to send bruh.",
        };
        this.$store.dispatch("notification/add", notification, { root: true });
        return;
      }
      let Web3 = require("web3");
      let rpc = "https://rpc-mumbai.matic.today";
      const provider = new Web3.providers.HttpProvider(rpc);
      const web3 = new Web3(provider);
      let value_eth = web3.utils.toWei(this.amountETH, "ether");
      console.log("Weth:", value_eth);
      let value = web3.utils.toHex(value_eth);
      const transactionParameters = {
        gas: "0x5208",
        //gasPrice: gas_price, //"0x09184e72a000", // customizable by user during MetaMask confirmation.
        to: this.sendToAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: value, //"0x16345785D8A0000", //web3.utils.toWei("0.1", "ether"), // Only required to send ether to the recipient from the initiating external account.
        chainId: "0x13881", //"80001", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log("TxHash:", txHash);
      this.amountETH = 0;
    },
    uss() {
      this.$store.dispatch("user_account/connectAccount", "metamask", {
        root: true,
      });
    },
    async pruebaJSON() {
      //const fs = require("fs");
      //var jsonFile = "$/assets/abi/gfMainContract.json";
      //var f = [{ name: "Peter", age: 22, country: "United States" }];
      // var f = this.$store.state.gf_contracts.gfMainContractABI;
      // console.log(f);

      // this.json = JSON.parse(JSON.stringify(f)); //fs.readFileSync(jsonFile, "utf8"));

      var Contract = require("web3-eth-contract");
      console.log("Creating contract");
      const rpc = this.$store.state.gf_contracts.rpc; //"https://rpc-mumbai.matic.today";
      Contract.setProvider(rpc);
      // const contract_abi = JSON.parse(
      //   JSON.stringify(this.$store.state.gfContracts.gfMainContractABI)
      // );

      const contract_abi = JSON.parse(
        JSON.stringify(this.$store.state.gf_contracts.gfMainContractABI)
      );

      const contract_address =
        this.$store.state.gf_contracts.gfMainContractAddress;
      const GFMainContract = new Contract(contract_abi, contract_address);

      // const accountInfo = GFMainContract.methods
      //   .createAccount("Nickname", "bio", ["Nature", "animals"], true, false)
      //   .send();
      GFMainContract.methods
        .createNewAccount("Nickname", "bio", ["Nature", "animals"], true, false)
        .send({ from: window.ethereum.selectedAddress })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      console.log("Account created:");
    },
    async prueba() {
      let Web3 = require("web3");
      // Replace value of rpc with https://rpc-mumbai.matic.today for Mumbai
      let rpc = "https://rpc-mumbai.matic.today";
      // let rpc = "https://polygon-rpc.com";
      const provider = new Web3.providers.HttpProvider(rpc);
      const web3 = new Web3(provider);

      /*
      web3.eth.accounts.wallet.add(
        "41e47b20e7039a6044777a422afb0b224d60994199b7807d466e2bc3ac617216"
      );
      web3.eth
        .sendTransaction({
          from: "0x8a6e9a75f3C5c755111601855cfdC4e04EA6A386",
          to: "0xD658789B3786ace1a8aeD00BC3a54dAdE2aaA239",
          value: web3.utils.toWei("0.1", "ether"),
          gas: 8000000,
        })
        .then(function (receipt) {
          console.log(receipt);
        });*/
      /*web3.eth
        .getBalance("0xF0245F6251Bef9447A08766b9DA2B07b28aD80B0")
        .then((a) => {
          console.log("Dinero:", a);
        });*/

      //const Web3 = require("web3");
      // var web3 = new Web3(window.ethereum);

      // 1000000000000000000
      console.log("Matic:", web3.utils.toWei("1", "ether"));
      let value_eth = web3.utils.toWei("0.1", "ether");
      let value = web3.utils.toHex(value_eth);

      /*let price__eth = web3.utils.toWei("0.000001", "ether");
      console.log("Price Gas:", price__eth);
      let gas_price = web3.utils.toHex(price__eth);*/
      const transactionParameters = {
        gas: "0x5208",
        //gasPrice: gas_price, //"0x09184e72a000", // customizable by user during MetaMask confirmation.
        to: "0xD658789B3786ace1a8aeD00BC3a54dAdE2aaA239", // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: value, //"0x16345785D8A0000", //web3.utils.toWei("0.1", "ether"), // Only required to send ether to the recipient from the initiating external account.
        chainId: "0x13881", //"80001", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };

      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log("Probando:", txHash);
    },
    async provider() {
      const Web3 = require("web3");
      var web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(
        "0xD658789B3786ace1a8aeD00BC3a54dAdE2aaA239"
      );
      console.log("Balance:", balance);
    },
  },
};
</script>
<style>
.marketplace {
  width: 100%;
  background-color: #f2f2f2;
  height: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.boton {
  height: 80px;
  width: 300px;
  background-color: darkgoldenrod;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
}
.boton:hover {
  background-color: darkorange;
}
.send {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 25px;
  margin-top: 50px;
  background-color: white;
  border: 1px solid #f2f2f2;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
}
.send input {
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  width: 80%;
}
.send div {
  margin: 5px;
}
</style>
