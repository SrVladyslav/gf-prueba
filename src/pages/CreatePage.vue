<template>
  <section class="create__start">
    <div class="create__section">
      <div class="title__text">Create new item</div>
      <div class="generic__text required">
        <h4 class="star">*</h4>
        Required fields
      </div>
      <div class="generic_label">Add to collection</div>
      <gf-select-box
        v-model="nftItem.collection"
        :label_text="collection_label"
        :options="options"
      ></gf-select-box>
      <div class="generic_label">
        Item image
        <h4 class="star">*</h4>
      </div>
      <gf-image-drop v-model="nftItem.image" :showError="image__error">
        <template v-slot:helper
          >Upload image: JPG, PNG, GIF, SVG. Max 10MB
          <h4 class="star">*</h4></template
        >
      </gf-image-drop>
      <gf-input-field
        v-model="nftItem.itemName"
        :showError="item_name_error"
        :showRequired="true"
      >
        <template v-slot:title>Item name</template>
        <template v-slot:helper>e.g. "Business pass for the summit"</template>
      </gf-input-field>
      <gf-textarea
        v-model="nftItem.description"
        :showError="item_description_error"
        :showRequired="true"
      >
        <template v-slot:title>Description</template>
        <template v-slot:helper
          >e.g. "After purchasing you'll be able to enter the VIP area and get a
          T-Shirt"</template
        >
      </gf-textarea>
      <gf-input-field
        v-model="nftItem.externalLink"
        :showError="item_link_error"
        :showRequired="false"
      >
        <template v-slot:title>External link</template>
        <template v-slot:helper
          >e.g. "mySite.com/NFT" Provide the owner some extra info about your
          NFT</template
        >
      </gf-input-field>
      <div class="properties">
        <div class="subtitle__text">
          Advanced properties
          <img
            src="@/assets/icons/question.svg"
            v-if="!properties_help"
            @click="togglePropsHelp"
          />
          <img
            src="@/assets/icons/question_cancel.svg"
            v-if="properties_help"
            @click="togglePropsHelp"
          />
        </div>
        <div class="generic__text help_props" v-if="properties_help">
          Create your own properties for your NFT which can be used in many ways
          to add more functionalities.
        </div>
        <div class="properties_container" ref="property_container">
          <gf-boxed-input-field v-model="nftItem.properties">
            <template v-slot:helper_name>e.g. Reserved seat</template>
            <template v-slot:helper_value>e.g. Row B, seat 3</template>
          </gf-boxed-input-field>
        </div>
      </div>

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
      file__64encoded: null,
      fileLoaded: false,
      nft__loaded: "hola",
      nft__file: null,
      nft__name: "",
      nft__description: "",
      nft__collection: null,
      nft__link: "",
      options: [
        "Collection 1",
        "Collection 2",
        "Collection 3",
        "Collection 4",
        "Collection 5",
        "Collection 6",
        "Collection 7",
      ],
      collection_label: "Select the collection",
      //selected__image__blob: "",
      //item_name: "",
      //item_description: "",
      properties_help: false,
      image__error: false,
      item_name_error: false,
      item_link_error: false,
      item_description_error: false,
      properties: [],
      propertyID: 0,
      prop: "a",
      nftItem: {
        image: null,
        itemName: "",
        description: "",
        externalLink: "",
        properties: [],
        collection: null,
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
  },
  methods: {
    togglePropsHelp() {
      this.properties_help = !this.properties_help;
    },
    async upload() {
      // let formData = new FormData();
      // formData.append("itemPhoto", this.nftItem.image);
      // await axios.post("http://127.0.0.1:8000/upload/, formData", {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     // 'X-CSRFToken':
      //   },
      // });
    },
    async createNFTItem() {
      console.log("NFT Image");
      console.log(this.nftItem.image);
      this.upload();
      /*if (this.nftItem.properties.length > 1) {
        this.nftItem.properties.pop(this.nftItem.properties.length - 1);

        this.nftItem.properties = JSON.stringify(
          this.nftItem.properties
        ).replaceAll('"', "'");
        console.log("Publicando");
        var response = await fetch("http://127.0.0.1:8000/add/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.nftItem),
        });
        this.data.push(await response.json());
      }*/
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
    this.setColectionOptions();
  },
};
</script>

<style scoped>
.generic_label {
  display: flex;
  padding: 0px 10px;
  color: #6e6e75;
  cursor: text;
  z-index: 90;
  font-size: 14px;
  margin: 20px 0px 5px 0px;
}
.create__start {
  height: fit-content;
  width: 100%;
  max-width: 760px;
  background-color: white;
  display: flex;
  justify-content: center;
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
.help_props {
  margin: 5px 0px 5px 0px;
  color: #0071da;
}
.subtitle__text {
  margin: 30px 0px 5px 0px;
  align-items: center;
}

.subtitle__text img {
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
  width: 100%;
  min-width: 40%;
  height: fit-content;
  margin-top: 150px;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0px 10px;
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
