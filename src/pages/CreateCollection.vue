<template>
  <section class="create__start">
    <div class="create__section">
      <div class="title__text">Create new collection</div>
      <div class="generic__text required">
        <h4 class="star">*</h4>
        Required fields
      </div>
      <!-- <div class="subtitle__text">Choose contract type</div> -->
      <div class="generic_label">
        Logo image
        <h4 class="star">*</h4>
      </div>
      <gf-image-drop v-model="collection.logo" :showError="logo__error">
        <template v-slot:helper
          >Upload image: JPG, PNG, GIF, SVG. Max 10MB
          <h4 class="star">*</h4></template
        >
      </gf-image-drop>
      <div class="generic_label">Banner image</div>
      <gf-image-drop v-model="collection.banner" :showError="banner__error">
        <template v-slot:helper
          >Upload image: JPG, PNG, GIF, SVG. Max 10MB
        </template>
      </gf-image-drop>
      <gf-input-field
        v-model="collection.name"
        :showError="collection_name_error"
        :showRequired="true"
      >
        <template v-slot:title>Collection name</template>
        <template v-slot:helper>e.g. "Business summit"</template>
      </gf-input-field>
      <gf-textarea
        v-model="collection.description"
        :showError="collection_description_error"
        :showRequired="true"
      >
        <template v-slot:title>Description</template>
        <template v-slot:helper
          >e.g. "Contains the tickets for the summit with added
          utilities"</template
        >
      </gf-textarea>
      <div class="generic_label">
        Blockchain
        <h4 class="star">*</h4>
      </div>
      <gf-select-box-img
        v-model="collection.blockchain"
        :label_text="collection_label"
        :showError="collection_blockchain_error"
        :options="blockchain_type"
      ></gf-select-box-img>
      <div v-if="collection.blockchain">
        <div class="generic_label">
          Payment tokens
          <img
            src="@/assets/icons/question.svg"
            class="help_icon"
            v-if="!payment_help"
            @click="togglePaymentHelp"
          />
          <img
            src="@/assets/icons/question_cancel.svg"
            class="help_icon"
            v-if="payment_help"
            @click="togglePaymentHelp"
          />
        </div>
        <div class="generic__text payment_props" v-if="payment_help">
          e.g. "ETH". These tokens can be used to buy and sell your items
        </div>
        <gf-select-box-img
          v-model="collection.paymentToken"
          :label_text="payment_label"
          :options="payment_tokens[collection.blockchain]"
          :showError="payment_token_error"
        ></gf-select-box-img>
      </div>
      <gf-input-field
        v-model="collection.creatorFee"
        :showError="creator_fee_error"
        :showRequired="true"
        :onlyNumbers="true"
      >
        <template v-slot:title>Creator percentage fee earning</template>
        <template v-slot:helper
          >e.g. "2.5". Collect a fee when some user re-sells the item you
          created. The amount is obtained from the final sale price and will be
          paid monthly to a payout address you had chosen</template
        >
      </gf-input-field>
      <div class="properties">
        <div class="subtitle__text">
          Social links
          <img
            src="@/assets/icons/question.svg"
            v-if="!links_help"
            @click="togglePropsHelp"
          />
          <img
            src="@/assets/icons/question_cancel.svg"
            v-if="links_help"
            @click="togglePropsHelp"
          />
        </div>
        <div class="generic__text help_props" v-if="links_help">
          Add all the social links you want so the NFT owners can stay tuned
          with you. New empty fields will be added when the current ones will be
          full.
        </div>
        <div class="properties_container" ref="property_container">
          <gf-social-boxed-input
            v-model="collection.links"
            :social_links="social_links"
          >
          </gf-social-boxed-input>
        </div>
      </div>
      <gf-contract-selector
        :generator_types="collection_generators"
        v-model="collection.selected_generator"
        :showError="contract_type_error"
      >
      </gf-contract-selector>
      <gf-extra-field-generator
        :extra_fields_data="
          contract_types_fields[collection.selected_generator.generatorType]
        "
        v-model="collection.extra_fields"
      ></gf-extra-field-generator>
      <div class="sep"></div>
      <my-button class="create__button" @click="createNFTItem() /*sendFile*/">
        Create
      </my-button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
// import "@/assets/contracts/ImageCollectionOnChainABI";
export default {
  data() {
    return {
      // To delete
      contract_types_fields: {
        // Will be sent from server in the future
        "": [],
        "Simple Collection": [
          {
            type: "GFInputField",
            default_label: "Starting token price",
            helper:
              "That will be the price of the token which every user can buy it",
            tags: [],
            required: true,
            showError: false,
            data: null, // Data which will be stored in Object form
            input_data: "", // params to send to the contract
          },
          {
            type: "GFTextArea",
            default_label: "Terms under which the owner will be working",
            helper: "This data will be stored onchain",
            tags: [],
            required: true,
            showError: false,
            data: null, // Data which will be stored in Object form
            input_data: null, // params to send to the contract
          },
          {
            type: "GFTagInputField",
            default_label: "Owner responsibilities",
            helper:
              "A list of owner responsibilities which will be stored on chain",
            tags: [],
            required: true,
            showError: false,
            data: null, // Data which will be stored in Object form
            input_data: null, // params to send to the contract
          },
        ],
        "Simple Bid Collection": [
          {
            type: "GFTagInputField",
            default_label: "Bid tags",
            helper:
              "Stored onchain, represents the different tags which will be added to each account depending on the quantity of money they spent",
            tags: [],
            required: true,
            showError: false,
            data: null, // Data which will be stored in Object form
            input_data: null, // params to send to the contract
          },
        ],
      },

      // good
      contract_type_error: false,
      logo__error: false,
      banner__error: false,
      collection_name_error: false,
      collection_description_error: false,
      collection_blockchain_error: false,
      payment_token_error: false,
      creator_fee_error: false,
      links_help: false,
      payment_help: false,
      // Generators and available types
      collection_generators: {
        // Will be sent from server in the future
        0: {
          generatorType: "Simple Collection",
          generatorAddress: "0x123123",
          generatorDescription:
            "Simple collection which contains the name, the description, and the image of your NFTs",
        },
        1: {
          generatorType: "SimpleCollection 1",
          generatorAddress: "0x123123",
          generatorDescription:
            "Simple collection which contains the name, the description, and the image of your NFTs, and finally implements the bid functionality",
        },
        2: {
          generatorType: "Simple Bid Collection",
          generatorAddress: "0x123123",
          generatorDescription:
            "Used to create bids collections where the users can push their money and play to win",
        },
        3: {
          generatorType: "Simple Bid Collection",
          generatorAddress: "0x123123",
          generatorDescription:
            "Used to create bids collections where the users can push their money and play to win Used to create bids collections where the users can push their money and play to win Used to create bids collections where the users can push their money and play to win",
        },
      },
      generator_types: {},
      blockchain_type: {
        0: {
          network: "Ethereum",
          url: "assets/icons/blockchains/ethereum.png",
        },
        1: { network: "Polygon", url: "assets/icons/blockchains/polygon.png" },
      },
      payment_tokens: {
        Ethereum: {
          0: {
            network: "ETH",
            url: "assets/icons/blockchains/tokens/ethereum_eth.png",
          },
        },
        Polygon: {
          0: {
            network: "MATIC",
            url: "assets/icons/blockchains/tokens/polygon_matic.png",
          },
          1: {
            network: "ETH",
            url: "assets/icons/blockchains/tokens/polygon_eth.png",
          },
        },
      },
      social_links: [
        {
          network: "website",
          network_url: "",
        },
        {
          network: "discord",
          network_url: "",
        },
        {
          network: "instagram",
          network_url: "",
        },
        {
          network: "telegram",
          network_url: "",
        },
      ],
      // Data
      collection_type_label: "Select the contract type",
      collection_label: "Choose where to upload",
      payment_label: "Choose the payment token",
      // Special fields data
      extra_fields_data: [
        {
          field_type: "field1",
          field_label: "myExtraField",
          field_default: "defaultData",
          field_data: null, // Data which will be stored in Object form
          field_param_send: null, // params to send to the contract
        },
      ],
      // Data which should be sent to the server to save
      collection: {
        selected_generator: {
          generatorID: "",
          generatorType: "",
          generatorAddress: "",
          generatorDescription: "",
        },
        logo: "",
        banner: "",
        name: "",
        description: "",
        blockchain: "", // Blochain where it will be posted
        paymentToken: "",
        creatorFee: 0,
        links: [],
        extra_fields: [],
      },
      nft_image: null,
      data: [],
    };
  },
  props: {
    wallet_account: {
      type: Object,
    },
    wallet_connected: {
      type: Boolean,
      default: true,
    },
  },
  async created() {
    var response = await fetch("http://127.0.0.1:8000/");
    this.data = await response.json();
    this.setGeneratorOptions();
  },
  methods: {
    togglePropsHelp() {
      this.links_help = !this.links_help;
    },
    togglePaymentHelp() {
      this.payment_help = !this.payment_help;
    },
    async createNFTItem() {
      console.log("NFT Image Uploading");
      const fd = new FormData();
      fd.append("user", "0x01234");
      fd.append("name", this.collection.name);
      fd.append("description", this.collection.description);
      fd.append("blockchain", this.collection.blockchain);
      fd.append("payment_token", this.collection.paymentToken);
      fd.append("creator_fee", this.collection.creatorFee);
      fd.append("social_links", this.collection.links);
      fd.append("specific_collection", this.collection.extra_fields);
      fd.append("logo", this.collection.logo, this.collection.logo.name);
      // Extra
      fd.append("social_links", JSON.stringify(this.collection.links));
      fd.append(
        "specific_collection",
        JSON.stringify(this.collection.extra_fields)
      );
      fd.append("banner", this.collection.banner, this.collection.banner.name);
      await axios
        .post("http://127.0.0.1:8000/store_collection/", fd)
        .then((res) => {
          console.log("Response:", res);
        });
      console.log("F");
    },
    // prueba() {
    //   let a = [{ a: "b" }];
    //   console.log("A:", a);
    //   let b = JSON.stringify(a);
    //   console.log("A Parsed:", b);
    //   console.log("Again: ", JSON.parse(b));
    // },
    async setGeneratorOptions() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(0);
      const address = this.$store.state.gf_contracts.gfCollectionManager;
      console.log(address);
      const abi = this.$store.state.gf_contracts.gfCollectionManagerABI;
      console.log(abi);
      const GFCollectionManager = new ethers.Contract(address, abi, signer);
      GFCollectionManager.getGeneratorByType("SimpleCollection", {
        gasLimit: 3000000,
      }).then((result) => {
        console.log("Available Collection Types: ");
        console.log(result[1]);
        this.generator_types = result;
        // JSON.parse(result);
      });
    },
    async setColectionOptions() {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(0);
      const address = this.$store.state.gf_contracts.gfCollectionManager;
      console.log(address);
      const abi = this.$store.state.gf_contracts.gfCollectionManagerABI;
      console.log(abi);
      const GFCollectionManager = new ethers.Contract(address, abi, signer);
      GFCollectionManager.getGFContractTypes({ gasLimit: 3000000 }).then(
        (result) => {
          console.log("Available Collection Types: ", result);
          this.options = JSON.parse(result);
        }
      );
    },
    checkForm() {
      if (this.file) {
        if (typeof this.nft__name === "string" && this.nft__name != "") {
          return true;
        } else {
          console.log("Wrong name");
          return false;
        }
      } else {
        console.log("File not selected");
        return false;
      }
    },
    resetForm() {
      this.file = null;
      this.nft__name = "";
      this.nft__description = "";
      this.nft__collection = "";
      this.nft__link = "";
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          return resolve(reader.result);
        };
        reader.onerror = () => {
          return reject("F");
        };
      });
    },
    async selectFile() {
      this.isOver = false;
      const file = this.$refs.nft__file.files[0];
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      const MAX_FILE_SIZE = 10000000; // KB
      const tooLarge = file.size > MAX_FILE_SIZE;

      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        this.nft__loaded = URL.createObjectURL(this.file);

        console.log("OBJ:", this.nft__loaded);

        // Creating the base64 encoding of the files
        if (this.file.type === "image/gisf") {
          // Create the gif strategy
        } else {
          await this.getBase64(file).then((data) => {
            console.log("Data:", data);
            this.nft__file = data;
          });
        }
      } else {
        if (tooLarge) {
          const msg = `File is too large. Max size is ${
            MAX_FILE_SIZE / 1000000
          }MB`;
          const notification = {
            type: "error",
            message: msg,
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
        } else {
          const notification = {
            type: "error",
            message: "Only images are allowed",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
        }
      }
    },
    createNFT() {
      const ImageCollectionOnChainABI = [];

      const adr = "0xe249CCe913164919fbcBFcA87a6Fb9926CB78DC8";
      // const account = '0xe0152a69CF154f447b05bCAe1938a8465E8e6901';
      // 0xe0152a69cf154f447b05bcae1938a8465e8e6901;

      const Web3 = require("web3");
      const web3 = new Web3(window.ethereum);
      const addr = web3.utils.toChecksumAddress(adr);
      console.log("ES valid??: ", addr);
      console.log("Account 0: ", window.web3.currentProvider.selectedAddress);
      console.log("Wallet account:", this.wallet_account.address);
      const MyContract = new web3.eth.Contract(ImageCollectionOnChainABI, adr);

      //const gasEstimate = web3.eth.estimateGas({ data: this.nft__file });
      //console.log("Gas estimation:", gasEstimate);
      MyContract.methods
        .safeMint(this.nft__name, this.nft__description, this.nft__file, "link")
        .send(
          {
            from: "0xe0152a69CF154f447b05bCAe1938a8465E8e6901",
            //gas: gasEstimate,
          },
          (err, res) => {
            if (err) {
              console.log("Me cago en la puta...", err);
              return;
            } else {
              console.log("The transaction hash is: ", res);
            }
          }
        );
    },
    sendFile() {
      if (this.checkForm()) {
        // Adding the file to send
        const nftFormData = new FormData();
        nftFormData.append("file", this.file);
        nftFormData.append("name", this.nft__name);
        nftFormData.append("description", this.nft__description);
        nftFormData.append("collection", this.nft__collection);
        nftFormData.append("link", this.nft__link);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        try {
          axios
            .post("/upload", nftFormData, config)
            .then((res) => {
              console.log("Res:", res);
              // File sent, resetting all + feedback
              if (res.data.received === "ok") this.resetForm();
              // File uploaded successfully
              const notification = {
                type: "success",
                message: "Your NFT has been created successfully!",
              };
              this.$store.dispatch("notification/add", notification, {
                root: true,
              });
            })
            .catch((error) => {
              if (error.response.status === 500) {
                console.log("Network error");
                const notification = {
                  type: "error",
                  message: "Server is currently down!",
                };
                this.$store.dispatch("notification/add", notification, {
                  root: true,
                });
              } else {
                console.log("Some error");
              }
            });
        } catch (err) {
          const notification = {
            type: "error",
            message: "Something was a problem during creating your NFT!",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
        }
        // updating the file
      } else {
        // alert("select file");
        const notification = {
          type: "error",
          message: "Please, select an image file for the NFT.",
        };
        this.$store.dispatch("notification/add", notification, { root: true });
      }
    },
    deleteFile() {
      this.file = null;
    },
    dragover(event) {
      this.isOver = true;
      event.stopPropagation(); // might not be necessary
      event.preventDefault();
    },
    dragleave(event) {
      this.isOver = false;
      event.stopPropagation(); // might not be necessary
      event.preventDefault();
    },
    setCollection(collection) {
      this.nft__collection = collection;
      console.log("Set:", this.nft__collection);
    },
  },
  mounted() {
    // Setting the collections
    // this.setColectionOptions();
  },
};
</script>

<style scoped>
.create__start {
  height: fit-content;
  width: 100%;
  max-width: 760px;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 0px 10px;
}
.generic_label {
  display: flex;
  padding: 0px 10px;
  color: #6e6e75;
  cursor: text;
  z-index: 90;
  font-size: 14px;
  margin: 20px 0px 5px 0px;
}
.title__text {
  text-align: left;
  margin: 0px 0px 50px 0px;
  font-size: max(2vw, 24px);
}
.required {
  margin: 0px 0px 20px 0px !important;
}
.generic__text {
  font-size: 14px;
  margin: 0px 0px 5px 0px;
}
.subtitle__text,
.generic__text {
  text-align: left;
  display: flex;
  padding: 0px;
}
.help_props,
.payment_props {
  margin: 5px 0px 5px 0px;
  color: #0071da;
}
.payment_props {
  margin: 5px 0px 10px 10px;
}
.subtitle__text {
  margin: 30px 0px 5px 0px;
  align-items: center;
}

.subtitle__text img,
.help_icon {
  padding: 0px 0px 0px 10px;
  height: 18px;
  widows: 18px;
  cursor: pointer;
}
.star {
  font-weight: 700;
  color: #c70039;
  margin: 0px 4px;
  padding: 0px;
}
.create__section {
  background-color: white;
  min-width: 40%;
  height: fit-content;
  margin-top: 150px;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.nft__img__selector {
  position: relative;
  cursor: pointer;
  border: 2px dashed #f2f2f2;
  border-radius: 16px;
  min-height: 250px;
  width: min(100%, 450px);
  max-width: 450px;
  margin: 5px 0px 5px 0px;
  padding: 7px;

  flex-basis: auto;
  display: flex;
  -webkit-box-align: stretch;
  align-items: center;
  justify-content: center;
}
.select__nft__img {
  position: relative;
  height: 250px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition-duration: 0.3s;
}
form:focus {
  background-color: red !important;
  border: 1px blue solid;
  color: blue;
  outline: 1px pink solid;
}
.nft__photo__bg {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  cursor: pointer;
}
.nft__photo__bg img {
  height: 45px;
  position: absolute;
  margin: 0 auto;
}

.nft__container {
  margin: 0px;
  padding: 0px;
  flex-basis: auto;
}

.nft__container__selected {
  position: relative;
  max-height: 100%;
  max-width: 100%;
  padding: 32px 45px;
  flex-shrink: 0;

  justify-content: center;
  flex-direction: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  display: flex;

  box-sizing: border-box;
}

.nft__file__input {
  opacity: 0;
  width: 100%;
  height: 250px;
  position: absolute;
  cursor: pointer;
}

.bg {
  border: 2px dashed #6e6e75;
  transition-duration: 0.3s;
}

.nft__delete__file {
  position: absolute;
  z-index: 9;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  right: 10px;
  top: 10px;
  background-color: white;
  border: 2px solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.nft__img__loaded {
  position: relative;
  z-index: 6;
  height: auto;
  max-height: 450px;
  max-width: 100%;
  transition: opacity 0.3 ease-in-out;
  box-sizing: border-box;
  border-radius: 7px;
}
.input__selector,
.input__textarea_selector {
  outline: none !important;
  border: 1px solid #f2f2f2 !important;
  border-radius: 10px;
  padding: 10px;
  color: #6e6e75;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.input__selector:focus,
.input__textarea_selector:focus {
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
}
.input__textarea_selector {
  resize: vertical;
}

.select-items div,
.select-selected {
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
}
.create__button {
  margin: 30px 0px 0px 0px;
}
.properties {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f7fbff;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  margin: 30px 0px 10px 0px;
  padding: 20px;
}
.properties .subtitle__text {
  margin: 5px 0px 0px 0px;
}
.properties_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: fit-content;
}

.property_item {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin: 15px 0px 0px 0px;
  gap: 15px;
}
.property_container {
  position: relative;
  background-color: #c70039;
  width: 100%;
  height: fit-content;
}
.property_input {
  position: absolute;
  padding: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  outline: none !important;
  border: 1px solid #ebe9e9 !important;
  border-radius: 10px;
  padding: 10px;
  /*color: #6e6e75;*/
  color: #252525;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: inherit;
  background: white;
  transition-duration: 0.7s;
}

@media (max-width: 450px) {
  .create__section {
    width: 100%;
    min-width: 100%;
    padding: 5%;
  }
}

.nft__collection__selector {
  position: relative;
  display: flex;
  width: 100%;
  outline: none !important;
  border: 1px solid #f2f2f2 !important;
  border-radius: 10px;
  color: #6e6e75;
  font-weight: 400;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  justify-content: center;
  align-items: center;
}
.nft__collection__selector:focus {
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
  transition-duration: 0.3s;
}
.nft__collection__selector svg {
  position: absolute;
  right: 10px;
  cursor: pointer;
  pointer-events: none;
  transition: 0.25s all ease;
}

.nft__collection__selector svg g path {
  fill: #6e6e75;
}
@media (hover: hover) {
  .select__nft__img:hover {
    background-color: #f2f2f2;
    transition-duration: 0.5s;
  }
  .nft__delete__file:hover {
    border: 1px solid #f2f2f2 !important;
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    transition-duration: 0.5s;
  }
  .nft__collection__selector:hover svg g path {
    fill: #252525;
  }
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  border-radius: 10px;
  padding: 10px !important;
  background: white;
  background-image: none;

  flex: 1;
  padding: 0 0.5em;
  color: #6e6e75;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
}

select:focus {
  outline: none !important;
  border-radius: 10px;
}

select::-ms-expand {
  display: none;
}
</style>
