<template>
  <footer class="footer">
    <div class="footer__logo">
      <img src="@/assets/logo_vertical_white.svg" alt="Logo" />
      <div>
        Powering new experiences for the digital communities with blockchain
        technology. Create, personalize, add utility and grow your community
        following your rules!
      </div>
      <div class="social__icons">
        <img
          src="@/assets/icons/instagram.svg"
          alt="Instagram"
          @click="goto('https://www.instagram.com/grifenix/')"
        />
        <img
          src="@/assets/icons/linkedin.svg"
          alt="Linkedin"
          @click="goto('https://www.linkedin.com/company/grifenix/')"
        />
        <img src="@/assets/icons/twitter.svg" alt="Twitter" />
      </div>
    </div>
    <div class="footer__column">
      <div class="subtitle__text">Navbar</div>
      <div class="generic__text" @click="$router.push('/blog')">Blog</div>
      <div class="generic__text" @click="$router.push('/digests')">Digests</div>
      <div class="subtitle__text">Create</div>
      <div class="generic__text no-events" @click="$router.push('/')">
        New collection
      </div>
      <div class="generic__text no-events" @click="$router.push('/')">
        Personalize NFT
      </div>
      <div class="generic__text no-events" @click="$router.push('/')">
        Create utility
      </div>
    </div>

    <div class="footer__column">
      <div class="subtitle__text">My Profile</div>
      <div class="generic__text no-events" @click="$router.push('/')">
        My collections
      </div>
      <div class="generic__text no-events" @click="$router.push('/')">
        Dashboard
      </div>
      <div class="generic__text no-events" @click="$router.push('/')">
        Profile
      </div>
      <div class="generic__text no-events" @click="$router.push('/')">
        Log in
      </div>
    </div>
    <div class="footer__column">
      <div class="subtitle__text">Company</div>
      <div
        class="generic__text"
        @click="goto('https://www.linkedin.com/company/grifenix/')"
      >
        Careers
      </div>
      <div
        class="generic__text"
        @click="goto('https://www.linkedin.com/company/grifenix/')"
      >
        About
      </div>
    </div>
    <div class="line"></div>
    <div class="footer__line">
      <div class="footer__text">© 2021-2022 Grifenix</div>
      <div class="footer__text">
        <div class="footer__link" @click="$router.push('/')">
          Privacy Policy
        </div>
        <div
          class="footer__link"
          @click="
            $router.push('/');
            change__active('');
          "
        >
          Terms of Service
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goto(path) {
      window.open(path, "_blank");
    },
  },
};
</script>

<style scoped>
.generic__text {
  color: white;
}
.no-events {
  pointer-events: none;
}
.footer {
  width: 100%;
  position: relative;
  padding: 60px 10%;
  background-color: #0071da;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 30px;
}
.footer__logo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer__logo div {
  width: 100%;
  max-width: 350px;
  text-align: justify;
  align-self: center;
}
.footer__logo img {
  margin: 0px;
  width: 40%;
  max-width: 80%;
}
.footer__column {
  text-align: left;
  line-height: 2;
  padding: 20px;
}
.footer__column .generic__text,
.footer__text .footer__link {
  cursor: pointer;
  position: relative;
}
.footer__column .generic__text:before,
.footer__text .footer__link:before {
  cursor: pointer;
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  top: 12px;
  left: -10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0);
  transition-duration: 0.2s;
}
.footer__text .footer__link:before {
  top: 7px;
  left: 3px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0);
}

.footer__text {
  font-size: 13px;
  font-weight: 300;
  display: flex;
}
.footer__link {
  padding: 0px 15px;
}
.footer__line {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.social__icons {
  padding: 15px 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.social__icons img {
  height: 45px;
  padding: 10px 5px;
  cursor: pointer;
}

@media (hover: hover) {
  .footer__column .generic__text:hover:before,
  .footer__text .footer__link:hover:before {
    background-color: rgba(255, 255, 255, 1);
    transition-duration: 0.3s;
  }
  .footer__column .generic__text:hover {
    color: rgba(255, 255, 254, 1);
  }
}

@media (max-width: 640px) {
  .footer__line {
    justify-content: center;
  }
  .footer__link {
    padding: 30px 20px;
  }
  .footer {
    justify-content: center;
  }
}
</style>
