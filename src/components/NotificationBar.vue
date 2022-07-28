<template>
  <div
    class="notification generic__text"
    :class="notificationTypeClass"
    v-if="show"
  >
    <div class="notification__symbol">
      <svg
        v-if="notification.type === 'success'"
        width="16"
        height="16"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_205_144)">
          <rect
            x="23.2639"
            y="48.3257"
            width="51.4271"
            height="5"
            rx="2.5"
            transform="rotate(-70 23.2639 48.3257)"
            fill="#16A000"
          />
          <rect
            x="23.2639"
            y="48.3257"
            width="51.4271"
            height="5"
            rx="2.5"
            transform="rotate(-70 23.2639 48.3257)"
            fill="#16A000"
          />
          <rect
            x="23.2639"
            y="48.3257"
            width="51.4271"
            height="5"
            rx="2.5"
            transform="rotate(-70 23.2639 48.3257)"
            fill="#16A000"
          />
          <rect
            x="6.86792"
            y="30.0809"
            width="27.7344"
            height="5"
            rx="2.5"
            transform="rotate(35 6.86792 30.0809)"
            fill="#16A000"
          />
          <rect
            x="6.86792"
            y="30.0809"
            width="27.7344"
            height="5"
            rx="2.5"
            transform="rotate(35 6.86792 30.0809)"
            fill="#16A000"
          />
          <rect
            x="6.86792"
            y="30.0809"
            width="27.7344"
            height="5"
            rx="2.5"
            transform="rotate(35 6.86792 30.0809)"
            fill="#16A000"
          />
        </g>
        <defs>
          <clipPath id="clip0_205_144">
            <rect
              width="50"
              height="50"
              fill="white"
              transform="translate(50) rotate(90)"
            />
          </clipPath>
        </defs>
      </svg>
      <svg
        v-if="notification.type === 'error'"
        width="16"
        height="16"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_205_146)">
          <rect
            x="4.53552"
            y="1"
            width="64.3109"
            height="5"
            rx="2.5"
            transform="rotate(45 4.53552 1)"
            fill="#B50000"
          />
          <rect
            x="1"
            y="46.4747"
            width="64.3109"
            height="5"
            rx="2.5"
            transform="rotate(-45 1 46.4747)"
            fill="#B50000"
          />
        </g>
        <defs>
          <clipPath id="clip0_205_146">
            <rect
              width="50"
              height="50"
              fill="white"
              transform="translate(50) rotate(90)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="notification__bar">
      <div class="notification__title subtitle__text">{{ title }}</div>
      <div class="notification__text">
        {{ notification.message }}
      </div>
    </div>
    <div class="delete__button">
      <div class="nft__delete__file" @click="show = false">
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
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
      show: true,
      title: "",
    };
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification);
    }, 6000);
    let errorMSG = this.notification.type;
    if (errorMSG.length > 1) {
      this.title = errorMSG.charAt(0).toUpperCase() + errorMSG.slice(1) + "!";
    } else {
      this.title = errorMSG.toUpperCase() + "!";
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    },
  },
  methods: mapActions("notification", ["remove"]),
};
</script>

<style scoped>
.subtitle__text {
  padding: 0px;
  margin: 0px;
}
.notification {
  z-index: 999;
  position: relative;
  margin: 10px 0px;
  max-width: 100%;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: white;
  animation: appear 6s;
  transition-duration: 0.3s;
}
@keyframes appear {
  0% {
    transform: translateX(500px);
  }
  10% {
    transform: translateX(0px);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.notification__symbol {
  margin: -1px;
  border-radius: 7px 0px 0px 7px;
  padding: 15px;
  display: flex;
  align-items: center;
}
.notification__symbol svg {
  margin: 0 auto !important;
}
.delete__button {
  border-radius: 7px;
  padding: 5px;
  background-color: white;
  display: flex;
  align-items: center;
}
.nft__delete__file {
  position: relative;
  margin: 0 auto;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  border: 1px white solid;
}
.notification__bar {
  background-color: white;
  width: -webkit-fill-available;
  max-width: 350px;
  padding: 10px;
}
.notification__text {
  color: #6e6e75;
}
.-text-success {
  color: #16a000 !important;
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(29, 85, 15, 0.17);
  box-shadow: 0px 0px 25px 10px rgba(29, 85, 15, 0.17);
  transition-duration: 0.3s;
}
.-text-error {
  color: #b50000 !important;
  border: 1px solid #f2f2f2 !important;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(128, 5, 5, 0.07);
  box-shadow: 0px 0px 25px 10px rgba(128, 5, 5, 0.07);
  transition-duration: 0.3s;
}
.-text-success .notification__symbol {
  background-color: rgba(22, 160, 0, 0.03);
}
.-text-error .notification__symbol {
  background-color: rgba(181, 0, 0, 0.03);
}
@media (hover: hover) {
  .nft__delete__file:hover {
    border: 1px solid #f2f2f2 !important;
    -webkit-box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    box-shadow: 0px 0px 25px 10px rgba(37, 37, 37, 0.07);
    transition-duration: 0.5s;
  }
}
</style>