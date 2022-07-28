<template>
  <div class="container_img">
    <form
      @submit.prevent="sendFile"
      :class="[
        'nft__img__selector',
        isOver ? 'bg' : '',
        { show_error: showError },
      ]"
      enctype="multipart/form-data"
      @dragover="dragover"
      @dragleave="dragleave"
    >
      <div v-if="!file" class="select__nft__img" tabindex="2">
        <input
          type="file"
          id="nft__file"
          ref="nft__file"
          @change="selectFile"
          class="nft__file__input"
        />
        <div v-if="!isOver" class="upload_ico">
          <img
            src="@/assets/icons/navbar/profile.svg"
            for="nft_file"
            alt="Photo"
          />
          <div class="generic__text upload_ico_text">Choose File</div>
        </div>
        <h2 v-if="isOver" class="nft_file generic__text">
          Drop your file here
        </h2>
      </div>
      <div v-if="file" class="nft__container">
        <div class="nft__delete__file" @click="deleteFile">
          <svg
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4.68628"
              y="24.4852"
              width="28"
              height="4"
              rx="2"
              transform="rotate(-45 4.68628 24.4852)"
              fill="#6e6e75"
            />
            <rect
              x="7.51465"
              y="4.68628"
              width="28"
              height="4"
              rx="2"
              transform="rotate(45 7.51465 4.68628)"
              fill="#6e6e75"
            />
          </svg>
        </div>
        <div class="nft__container__selected">
          <img v-bind:src="nft__loaded" class="nft__img__loaded" alt="IMG" />
        </div>
      </div>
    </form>
    <div class="helper">
      <slot name="helper">Post your image here</slot>
    </div>
    {{ nft__loaded }}
  </div>
</template>

<script>
export default {
  name: "gf-image-drop",
  props: {
    showError: Boolean,
    imageSet: String,
  },
  data() {
    return {
      isOver: false,
      file: null,
      nft__loaded: "",
    };
  },
  methods: {
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
    deleteFile() {
      this.file = null;
      this.$emit("update:modelValue", this.file);
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
    async selectFile(e) {
      console.log("File:");
      console.log(e.target.files[0]);
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
        //this.$emit("update:modelValue", this.nft__loaded);
        this.$emit("update:modelValue", this.file);

        console.log("OBJ:", this.nft__loaded);

        // Creating the base64 encoding of the files
        if (this.file.type === "image/gisf") {
          // Create the gif strategy
        } else {
          await this.getBase64(file).then((data) => {
            //console.log("Data:", data);
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
  },
  mounted() {
    console.log(this.imageSet);
  },
  watch: {
    imageSet: function (newVal) {
      console.log(newVal);
      let url = this.$store.state.gf_contracts.backend + newVal;
      console.log(url);
      // fetch(this.$store.state.gf_contracts.backend + newVal).then((res) => {
      //   this.nft__loaded = res.blob();
      // });
    },
  },
};
</script>

<style scoped>
.upload_ico {
  display: flex;
  flex-direction: column;
}
.upload_ico_text {
  padding: 5px 0px 0px 0px !important;
}

.upload_ico img {
  max-height: 45px;
  width: auto;
}
.generic__text {
  font-size: 14px;
  margin: 0px 0px 5px 0px;
  text-align: left;
  display: flex;
}
.container_img {
  width: 100%;
  height: fit-content;
}
.nft__img__selector {
  position: relative;
  cursor: pointer;
  border: 2px dashed #ebe9e9; /*#f2f2f2;*/
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
.show_error {
  border: 2px dashed #bb0a21;
  transition-duration: 0.7s;
}
.bg {
  border: 2px dashed #6e6e75;
  transition-duration: 0.3s;
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
.nft__file__input {
  opacity: 0;
  width: 100%;
  height: 250px;
  position: absolute;
  cursor: pointer;
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
  border: 2px solid #ebe9e9; /*#f2f2f2;*/
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
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
.helper {
  text-align: left;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 14px;
  width: 100%;
  height: 0px;
  opacity: 1;
  padding: 20px 0px 35px 10px;
  color: #0071da;
  pointer-events: none;
  transition-duration: 0.3s;
}
@media (hover: hover) {
  .select__nft__img:hover {
    background-color: #f2f2f2;
    transition-duration: 0.5s;
  }
  .nft__delete__file:hover {
    border: 1px solid #f2f2f2 !important;
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 30px 10px rgba(37, 37, 37, 0.07);
    transition-duration: 0.5s;
  }
}
</style>
