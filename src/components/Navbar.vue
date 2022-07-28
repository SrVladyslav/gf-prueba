<template>
  <nav>
    <div class="nav" ref="nav">
      <div class="logo__div">
        <img
          src="@/assets/logo.svg"
          alt="Grifenix"
          @click="
            $router.push('/');
            change__active('');
          "
          class="logo"
          tabindex="1"
        />
      </div>
      <div class="nav__links">
        <div class="nav__links__middle">
          <div
            @click="
              $router.push('/blog');
              change__active('nav_blog');
            "
            tabindex="1"
            class="border__focus__text"
            ref="nav_blog"
          >
            Blog
          </div>
          <div
            @click="
              $router.push('/digests');
              change__active('nav_digests');
            "
            tabindex="1"
            class="border__focus__text"
            ref="nav_digests"
          >
            Digests
          </div>
          <div
            tabindex="1"
            class="border__focus__text comming_soon"
            ref="nav_create"
          >
            Create
          </div>
        </div>
        <div class="nav__links__right">
          <div class="lang__selector">
            <svg
              @click="toggleLangPC"
              @keydown.space.exact.prevent="toggleLangPC"
              @keydown.enter.exact.prevent="toggleLangPC"
              class="lang_flag border__focus__img"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              tabindex="1"
            >
              <path
                d="M21 14C21 12.3431 22.3431 11 24 11H46C47.6569 11 49 12.3431 49 14V46C49 47.6569 47.6569 49 46 49H24C22.3431 49 21 47.6569 21 46V14Z"
                fill="white"
                stroke="#252525"
                stroke-width="2"
              />
              <path
                d="M30.36 23.94L28.92 24.38C31.36 31.56 35.76 36.6 43.22 38.64C43.44 38.22 43.92 37.56 44.26 37.22C37.02 35.44 32.52 30.54 30.36 23.94ZM26.88 22.2V23.68H40.96V22.2H26.88ZM40.46 22.2V22.52C38.34 30.58 32.54 35.18 25.7 37.26C26.04 37.58 26.54 38.28 26.7 38.68C33.66 36.4 39.7 31.42 42.1 22.64L41.02 22.12L40.76 22.2H40.46Z"
                fill="#252525"
              />
              <path
                d="M1 4C1 2.34315 2.34315 1 4 1H19.4353C20.8866 1 22.1297 2.0388 22.3876 3.46695L28.1654 35.4669C28.4977 37.3074 27.0833 39 25.2131 39H4C2.34315 39 1 37.6569 1 36V4Z"
                fill="white"
                stroke="#252525"
                stroke-width="2"
              />
              <path
                d="M16.5417 23.9H10.4617L9.34172 27H7.42172L12.4617 13.14H14.5617L19.5817 27H17.6617L16.5417 23.9ZM16.0217 22.42L13.5017 15.38L10.9817 22.42H16.0217Z"
                fill="#252525"
              />
              <rect
                x="22.6206"
                y="48.5937"
                width="12.7822"
                height="2.03703"
                rx="1"
                transform="rotate(-70 22.6206 48.5937)"
                fill="#252525"
              />
            </svg>
            <transition name="dropdown-fade">
              <div
                v-click-away="toggleLangPC"
                @keydown.space.exact.prevent="toggleLangPC"
                class="lang__drop"
                ref="lang__drop"
                v-if="langDropVisible"
              >
                <!-- v-on-clickaway="toggleLangPC" -->
                <div class="nav__links__mobile">
                  <div
                    @click="
                      $router.push('/');
                      toggleLangPC();
                    "
                    tabindex="1"
                  >
                    <div>
                      <img src="@/assets/icons/lang/english.svg" alt="" />
                      <h4>English</h4>
                    </div>
                    <img
                      src="@/assets/icons/navbar/go_arrow.svg"
                      alt=""
                      class="go_arrow"
                    />
                  </div>
                  <div class="menu_description">
                    More languages comming soon
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="profile__selector">
            <svg
              @click="toggleProfilePC"
              @keydown.space.exact.prevent="toggleProfilePC"
              @keydown.enter.exact.prevent="toggleProfilePC"
              class="lang_flag border__focus__img"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              tabindex="1"
            >
              <g clip-path="url(#clip0_701_724)">
                <circle
                  cx="24.5"
                  cy="16.5"
                  r="12.5"
                  stroke="#252525"
                  stroke-width="2"
                />
                <mask id="path-2-inside-1_701_724" fill="white">
                  <path
                    d="M45 47.5C45 45.7272 44.4698 43.9717 43.4395 42.3338C42.4093 40.6959 40.8993 39.2076 38.9957 37.9541C37.0921 36.7005 34.8322 35.7061 32.345 35.0276C29.8578 34.3492 27.1921 34 24.5 34C21.8079 34 19.1422 34.3492 16.655 35.0276C14.1678 35.7061 11.9079 36.7005 10.0043 37.9541C8.10071 39.2077 6.59069 40.6959 5.56047 42.3338C4.53025 43.9717 4 45.7272 4 47.5L24.5 47.5H45Z"
                  />
                </mask>
                <path
                  d="M45 47.5C45 45.7272 44.4698 43.9717 43.4395 42.3338C42.4093 40.6959 40.8993 39.2076 38.9957 37.9541C37.0921 36.7005 34.8322 35.7061 32.345 35.0276C29.8578 34.3492 27.1921 34 24.5 34C21.8079 34 19.1422 34.3492 16.655 35.0276C14.1678 35.7061 11.9079 36.7005 10.0043 37.9541C8.10071 39.2077 6.59069 40.6959 5.56047 42.3338C4.53025 43.9717 4 45.7272 4 47.5L24.5 47.5H45Z"
                  stroke="#252525"
                  stroke-width="4"
                  mask="url(#path-2-inside-1_701_724)"
                />
              </g>
              <defs>
                <clipPath id="clip0_701_724">
                  <rect
                    width="50"
                    height="50"
                    fill="white"
                    transform="translate(50 50) rotate(-180)"
                  />
                </clipPath>
              </defs>
            </svg>
            <transition name="dropdown-fade">
              <div
                v-click-away="toggleProfilePC"
                @keydown.space.exact.prevent="toggleProfilePC"
                class="profile__drop"
                ref="profile__drop"
                v-if="profileDropVisible"
              >
                <!-- v-on-clickaway="toggleProfilePC" -->
                <div class="nav__links__mobile">
                  <div
                    v-if="
                      this.$store.state.user_auth_w2.isAuthentificated === true
                    "
                    @click="
                      $router.push('/admin_panel');
                      toggleProfilePC();
                      change__active('');
                    "
                    tabindex="1"
                  >
                    <div>
                      <img src="@/assets/icons/navbar/profile.svg" alt="" />
                      <h4>Admin panel</h4>
                    </div>
                    <img
                      src="@/assets/icons/navbar/go_arrow.svg"
                      alt=""
                      class="go_arrow"
                    />
                  </div>
                  <div
                    v-if="
                      this.$store.state.user_auth_w2.isAuthentificated === false
                    "
                    @click="
                      $router.push('/admin-log-in');
                      toggleProfilePC();
                      change__active('');
                    "
                    tabindex="1"
                  >
                    <div>
                      <img src="@/assets/icons/navbar/profile.svg" alt="" />
                      <h4>Log In</h4>
                    </div>
                    <img
                      src="@/assets/icons/navbar/go_arrow.svg"
                      alt=""
                      class="go_arrow"
                    />
                  </div>
                  <div
                    v-if="
                      this.$store.state.user_auth_w2.isAuthentificated === true
                    "
                    @click="
                      logout_admin();
                      toggleProfilePC();
                    "
                    tabindex="1"
                  >
                    <div>
                      <img src="@/assets/icons/navbar/profile.svg" alt="" />
                      <h4>Log Out</h4>
                    </div>
                    <img
                      src="@/assets/icons/navbar/go_arrow.svg"
                      alt=""
                      class="go_arrow"
                    />
                  </div>

                  <div tabindex="1">
                    <div>
                      <img src="@/assets/icons/navbar/mode.svg" alt="" />
                      <h4>Night mode</h4>
                    </div>
                    <label class="switch">
                      <input type="checkbox" v-model="night_mode" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div class="sep"></div>
                  <div class="social__icons">
                    <svg
                      @click="
                        goToLink('https://www.instagram.com/grifenix/');
                        toggleMenu();
                      "
                      viewBox="0 0 52 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="52" height="52" rx="17" fill="white" />
                      <circle cx="40" cy="12" r="3" fill="#0071DA" />
                      <circle cx="26" cy="26" r="13" fill="#0071DA" />
                      <circle cx="26" cy="26" r="8" fill="white" /></svg
                    ><svg
                      @click="
                        goToLink('https://www.linkedin.com/company/grifenix/');
                        toggleMenu();
                      "
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 10.3372V16.6222H13.3563V10.7581C13.3563 9.285 12.8293 8.27967 11.5105 8.27967C10.5037 8.27967 9.90451 8.95719 9.64092 9.61258C9.5448 9.84688 9.52006 10.173 9.52006 10.501V16.6222H5.87518C5.87518 16.6222 5.92427 6.69036 5.87518 5.66135H9.5197V7.215C9.51231 7.22662 9.50271 7.23915 9.49575 7.25042H9.5197V7.215C10.0039 6.46922 10.8687 5.40385 12.8042 5.40385C15.2023 5.40381 17 6.97043 17 10.3372ZM2.06249 0.377686C0.81558 0.377686 0 1.19556 0 2.27109C0 3.32318 0.791985 4.16588 2.01411 4.16588H2.03846C3.30951 4.16588 4.1 3.32334 4.1 2.27109C4.07604 1.19556 3.30951 0.377686 2.06249 0.377686ZM0.216474 16.6222H3.85997V5.66135H0.216474V16.6222Z"
                        fill="white"
                      />
                    </svg>
                    <svg
                      @click="
                        $router.push('/');
                        toggleMenu();
                      "
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 1.65642C17.3375 1.93751 16.6266 2.12814 15.8798 2.21324C16.6424 1.77597 17.2261 1.08239 17.5028 0.258473C16.7875 0.663419 15.9978 0.957461 15.1565 1.11686C14.4828 0.428658 13.5244 0 12.4615 0C10.4223 0 8.76881 1.5832 8.76881 3.53473C8.76881 3.81151 8.80142 4.08184 8.86443 4.34034C5.79601 4.19277 3.07515 2.78514 1.25412 0.646183C0.935796 1.16747 0.754707 1.77487 0.754707 2.42325C0.754707 3.64997 1.40709 4.73236 2.39692 5.36562C1.79177 5.34624 1.22262 5.18684 0.724354 4.92189V4.96605C0.724354 6.67849 1.99762 8.10766 3.68592 8.43294C3.37659 8.51264 3.05042 8.5568 2.71297 8.5568C2.47453 8.5568 2.24394 8.53418 2.01786 8.49109C2.488 9.89659 3.85127 10.9187 5.46648 10.9467C4.20333 11.8944 2.61062 12.4577 0.880707 12.4577C0.582648 12.4577 0.289059 12.4405 0 12.4093C1.63433 13.4141 3.57459 14 5.65995 14C12.4525 14 16.1655 8.61281 16.1655 3.94077L16.1531 3.48305C16.8786 2.98759 17.5062 2.3651 18 1.65642Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div
            v-if="!this.$store.state.user_account.wallet_account.logged"
            class="cta"
            tabindex="1"
            @click="$router.push('/wallet')"
          >
            <img src="@/assets/wallet.svg" alt="Wallet" />
            <div>Connect wallet</div>
          </div>
          <div
            v-if="this.$store.state.user_account.wallet_account.logged"
            class="cta"
            tabindex="1"
            @click="toggleWalletMenu()"
          >
            <img src="@/assets/wallet.svg" alt="Wallet" />
            <div>My wallet</div>
          </div>
        </div>
      </div>
      <div class="nav__toggle" @click="toggleMenu()" ref="nav__toggle">
        <div class="burger"></div>
      </div>
    </div>
    <div class="nav__mobile" ref="nav__mobile" id="nav_links_mobile_main">
      <div class="nav__links__mobile">
        <div
          v-if="this.$store.state.user_auth_w2.isAuthentificated === true"
          @click="
            $router.push('/admin_panel');
            toggleMenu();
          "
        >
          <div>
            <img src="@/assets/icons/navbar/profile.svg" alt="" />
            <h4>Admin panel</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          v-if="this.$store.state.user_auth_w2.isAuthentificated === false"
          @click="
            $router.push('/admin-log-in');
            toggleMenu();
          "
        >
          <div>
            <img src="@/assets/icons/navbar/profile.svg" alt="" />
            <h4>Log in</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          v-if="this.$store.state.user_auth_w2.isAuthentificated === true"
          @click="
            logout_admin();
            toggleProfilePC();
          "
        >
          <div>
            <img src="@/assets/icons/navbar/profile.svg" alt="" />
            <h4>Log out</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>

        <div
          @click="
            $router.push('/blog');
            toggleMenu();
            change__active('nav_blog');
          "
        >
          <div>
            <img src="@/assets/icons/navbar/blog.svg" alt="" />
            <h4>Blog</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          @click="
            $router.push('/digests');
            toggleMenu();
            change__active('nav_link_0');
          "
        >
          <div>
            <img src="@/assets/icons/navbar/blog.svg" alt="" />
            <h4>Digests</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          @click="
            $router.push('/');
            toggleMenu();
            change__active('nav_link_1');
          "
        >
          <div>
            <img src="@/assets/icons/navbar/learn_more.svg" alt="" />
            <h4>Learn more</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div class="comming_soon">
          <div>
            <img src="@/assets/icons/navbar/create.svg" alt="" />
            <h4>Create</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>

        <div @click="toggleAccountMenu()">
          <div>
            <img src="@/assets/icons/navbar/settings.svg" alt="" />
            <h4>Settings</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div
          v-if="!this.$store.state.user_account.wallet_account.logged"
          class="cta__mobile"
          @click="
            $router.push('/wallet');
            toggleMenu();
          "
        >
          <img src="@/assets/wallet_mobile.svg" alt="Wallet" />
          <div>Connect wallet</div>
        </div>
        <div
          v-if="this.$store.state.user_account.wallet_account.logged"
          class="cta__mobile"
          @click="toggleWalletMenu()"
        >
          <img src="@/assets/wallet_mobile.svg" alt="Wallet" />
          <div>My wallet</div>
        </div>
        <div class="sep"></div>
        <div class="social__icons">
          <svg
            @click="
              goToLink('https://www.instagram.com/grifenix/');
              toggleMenu();
            "
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="17" fill="white" />
            <circle cx="40" cy="12" r="3" fill="#0071DA" />
            <circle cx="26" cy="26" r="13" fill="#0071DA" />
            <circle cx="26" cy="26" r="8" fill="white" /></svg
          ><svg
            @click="
              goToLink('https://www.linkedin.com/company/grifenix/');
              toggleMenu();
            "
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10.3372V16.6222H13.3563V10.7581C13.3563 9.285 12.8293 8.27967 11.5105 8.27967C10.5037 8.27967 9.90451 8.95719 9.64092 9.61258C9.5448 9.84688 9.52006 10.173 9.52006 10.501V16.6222H5.87518C5.87518 16.6222 5.92427 6.69036 5.87518 5.66135H9.5197V7.215C9.51231 7.22662 9.50271 7.23915 9.49575 7.25042H9.5197V7.215C10.0039 6.46922 10.8687 5.40385 12.8042 5.40385C15.2023 5.40381 17 6.97043 17 10.3372ZM2.06249 0.377686C0.81558 0.377686 0 1.19556 0 2.27109C0 3.32318 0.791985 4.16588 2.01411 4.16588H2.03846C3.30951 4.16588 4.1 3.32334 4.1 2.27109C4.07604 1.19556 3.30951 0.377686 2.06249 0.377686ZM0.216474 16.6222H3.85997V5.66135H0.216474V16.6222Z"
              fill="white"
            />
          </svg>
          <svg
            @click="
              $router.push('/');
              toggleMenu();
            "
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 1.65642C17.3375 1.93751 16.6266 2.12814 15.8798 2.21324C16.6424 1.77597 17.2261 1.08239 17.5028 0.258473C16.7875 0.663419 15.9978 0.957461 15.1565 1.11686C14.4828 0.428658 13.5244 0 12.4615 0C10.4223 0 8.76881 1.5832 8.76881 3.53473C8.76881 3.81151 8.80142 4.08184 8.86443 4.34034C5.79601 4.19277 3.07515 2.78514 1.25412 0.646183C0.935796 1.16747 0.754707 1.77487 0.754707 2.42325C0.754707 3.64997 1.40709 4.73236 2.39692 5.36562C1.79177 5.34624 1.22262 5.18684 0.724354 4.92189V4.96605C0.724354 6.67849 1.99762 8.10766 3.68592 8.43294C3.37659 8.51264 3.05042 8.5568 2.71297 8.5568C2.47453 8.5568 2.24394 8.53418 2.01786 8.49109C2.488 9.89659 3.85127 10.9187 5.46648 10.9467C4.20333 11.8944 2.61062 12.4577 0.880707 12.4577C0.582648 12.4577 0.289059 12.4405 0 12.4093C1.63433 13.4141 3.57459 14 5.65995 14C12.4525 14 16.1655 8.61281 16.1655 3.94077L16.1531 3.48305C16.8786 2.98759 17.5062 2.3651 18 1.65642Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>

    <div
      class="nav__mobile"
      ref="nav__mobile__profile"
      id="nav_links_mobile_profile"
    >
      <div class="nav__links__mobile">
        <div @click="toggleAccountMenu()">
          <div>
            <img src="@/assets/icons/navbar/settings.svg" alt="" />
            <h4>Settings</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow_left.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div class="sep"></div>
        <div @click="toggleLangMenu()">
          <div>
            <img src="@/assets/icons/navbar/lang.svg" alt="" />
            <h4>Language</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div>
          <div>
            <img src="@/assets/icons/navbar/mode.svg" alt="" />
            <h4>Night mode</h4>
          </div>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="sep"></div>
        <div class="social__icons">
          <svg
            @click="
              goToLink('https://www.instagram.com/grifenix/');
              toggleMenu();
            "
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="17" fill="white" />
            <circle cx="40" cy="12" r="3" fill="#0071DA" />
            <circle cx="26" cy="26" r="13" fill="#0071DA" />
            <circle cx="26" cy="26" r="8" fill="white" /></svg
          ><svg
            @click="
              goToLink('https://www.linkedin.com/company/grifenix/');
              toggleMenu();
            "
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10.3372V16.6222H13.3563V10.7581C13.3563 9.285 12.8293 8.27967 11.5105 8.27967C10.5037 8.27967 9.90451 8.95719 9.64092 9.61258C9.5448 9.84688 9.52006 10.173 9.52006 10.501V16.6222H5.87518C5.87518 16.6222 5.92427 6.69036 5.87518 5.66135H9.5197V7.215C9.51231 7.22662 9.50271 7.23915 9.49575 7.25042H9.5197V7.215C10.0039 6.46922 10.8687 5.40385 12.8042 5.40385C15.2023 5.40381 17 6.97043 17 10.3372ZM2.06249 0.377686C0.81558 0.377686 0 1.19556 0 2.27109C0 3.32318 0.791985 4.16588 2.01411 4.16588H2.03846C3.30951 4.16588 4.1 3.32334 4.1 2.27109C4.07604 1.19556 3.30951 0.377686 2.06249 0.377686ZM0.216474 16.6222H3.85997V5.66135H0.216474V16.6222Z"
              fill="white"
            />
          </svg>
          <svg
            @click="
              $router.push('/');
              toggleMenu();
            "
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 1.65642C17.3375 1.93751 16.6266 2.12814 15.8798 2.21324C16.6424 1.77597 17.2261 1.08239 17.5028 0.258473C16.7875 0.663419 15.9978 0.957461 15.1565 1.11686C14.4828 0.428658 13.5244 0 12.4615 0C10.4223 0 8.76881 1.5832 8.76881 3.53473C8.76881 3.81151 8.80142 4.08184 8.86443 4.34034C5.79601 4.19277 3.07515 2.78514 1.25412 0.646183C0.935796 1.16747 0.754707 1.77487 0.754707 2.42325C0.754707 3.64997 1.40709 4.73236 2.39692 5.36562C1.79177 5.34624 1.22262 5.18684 0.724354 4.92189V4.96605C0.724354 6.67849 1.99762 8.10766 3.68592 8.43294C3.37659 8.51264 3.05042 8.5568 2.71297 8.5568C2.47453 8.5568 2.24394 8.53418 2.01786 8.49109C2.488 9.89659 3.85127 10.9187 5.46648 10.9467C4.20333 11.8944 2.61062 12.4577 0.880707 12.4577C0.582648 12.4577 0.289059 12.4405 0 12.4093C1.63433 13.4141 3.57459 14 5.65995 14C12.4525 14 16.1655 8.61281 16.1655 3.94077L16.1531 3.48305C16.8786 2.98759 17.5062 2.3651 18 1.65642Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
    <!--Lang drop down-->
    <div class="nav__mobile" ref="nav__mobile__lang" id="nav_links_mobile_lang">
      <div class="nav__links__mobile">
        <div @click="toggleLangMenu()">
          <div>
            <img src="@/assets/icons/navbar/lang.svg" alt="" />
            <h4>Select language</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow_left.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div class="sep"></div>
        <div
          @click="
            $router.push('/');
            toggleMenu();
          "
        >
          <div>
            <img src="@/assets/icons/lang/english.svg" alt="" />
            <h4>English</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div class="menu_description">More languages comming soon</div>
        <div class="sep"></div>
        <div class="social__icons">
          <svg
            @click="
              goToLink('https://www.instagram.com/grifenix/');
              toggleMenu();
            "
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="17" fill="white" />
            <circle cx="40" cy="12" r="3" fill="#0071DA" />
            <circle cx="26" cy="26" r="13" fill="#0071DA" />
            <circle cx="26" cy="26" r="8" fill="white" /></svg
          ><svg
            @click="
              goToLink('https://www.linkedin.com/company/grifenix/');
              toggleMenu();
            "
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 10.3372V16.6222H13.3563V10.7581C13.3563 9.285 12.8293 8.27967 11.5105 8.27967C10.5037 8.27967 9.90451 8.95719 9.64092 9.61258C9.5448 9.84688 9.52006 10.173 9.52006 10.501V16.6222H5.87518C5.87518 16.6222 5.92427 6.69036 5.87518 5.66135H9.5197V7.215C9.51231 7.22662 9.50271 7.23915 9.49575 7.25042H9.5197V7.215C10.0039 6.46922 10.8687 5.40385 12.8042 5.40385C15.2023 5.40381 17 6.97043 17 10.3372ZM2.06249 0.377686C0.81558 0.377686 0 1.19556 0 2.27109C0 3.32318 0.791985 4.16588 2.01411 4.16588H2.03846C3.30951 4.16588 4.1 3.32334 4.1 2.27109C4.07604 1.19556 3.30951 0.377686 2.06249 0.377686ZM0.216474 16.6222H3.85997V5.66135H0.216474V16.6222Z"
              fill="white"
            />
          </svg>
          <svg
            @click="
              $router.push('/');
              toggleMenu();
            "
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 1.65642C17.3375 1.93751 16.6266 2.12814 15.8798 2.21324C16.6424 1.77597 17.2261 1.08239 17.5028 0.258473C16.7875 0.663419 15.9978 0.957461 15.1565 1.11686C14.4828 0.428658 13.5244 0 12.4615 0C10.4223 0 8.76881 1.5832 8.76881 3.53473C8.76881 3.81151 8.80142 4.08184 8.86443 4.34034C5.79601 4.19277 3.07515 2.78514 1.25412 0.646183C0.935796 1.16747 0.754707 1.77487 0.754707 2.42325C0.754707 3.64997 1.40709 4.73236 2.39692 5.36562C1.79177 5.34624 1.22262 5.18684 0.724354 4.92189V4.96605C0.724354 6.67849 1.99762 8.10766 3.68592 8.43294C3.37659 8.51264 3.05042 8.5568 2.71297 8.5568C2.47453 8.5568 2.24394 8.53418 2.01786 8.49109C2.488 9.89659 3.85127 10.9187 5.46648 10.9467C4.20333 11.8944 2.61062 12.4577 0.880707 12.4577C0.582648 12.4577 0.289059 12.4405 0 12.4093C1.63433 13.4141 3.57459 14 5.65995 14C12.4525 14 16.1655 8.61281 16.1655 3.94077L16.1531 3.48305C16.8786 2.98759 17.5062 2.3651 18 1.65642Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
    <!-- Nav links related to the wallet-->
    <div
      class="nav__mobile"
      ref="nav__mobile__wallet"
      id="nav_links_mobile_wallet"
    >
      <div class="nav__links__mobile">
        <div @click="toggleWalletMenu()">
          <div>
            <img src="@/assets/wallet_ico.svg" alt="" />
            <h4 class="subtitle__text">My wallet</h4>
          </div>
          <img
            src="@/assets/icons/navbar/go_arrow_left.svg"
            alt=""
            class="go_arrow"
          />
        </div>
        <div class="sep"></div>
        <div class="account__section">
          <div class="account__text">
            <div class="">Wallet address</div>
            <h4
              class="generic__text account__text__addr"
              @click="copy__address()"
              ref="account__text__address"
              v-if="copied === false"
            >
              {{
                this.$store.state.user_account.wallet_account.address.substring(
                  0,
                  6
                ) +
                "..." +
                this.$store.state.user_account.wallet_account.address.substring(
                  38,
                  42
                )
              }}
            </h4>
            <h4
              class="generic__text account__text__addr"
              ref="account__text__address"
              v-if="copied === true"
            >
              Copied!
            </h4>
          </div>
          <div>
            <img
              src="@/assets/icons/navbar/options.svg"
              alt=""
              class="go_arrow account__opts"
              @click="toggleAccountPC"
            />
          </div>
          <transition name="dropdown-fade">
            <div
              v-click-away="toggleAccountPC"
              @keydown.space.exact.prevent="console.log('OK')"
              class="account__drop"
              ref="account__drop"
              v-if="accountDropVisible"
            >
              <!-- v-on-clickaway="toggleAccountPC" -->
              <div class="nav__links__mobile">
                <div @click="logOutWallet()" tabindex="1">
                  <div>
                    <img src="@/assets/icons/navbar/logout.svg" alt="" />
                    <h4>Log out</h4>
                  </div>
                  <img
                    src="@/assets/icons/navbar/go_arrow.svg"
                    alt=""
                    class="go_arrow"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="wallet__section">
          <div class="wallet__section__text">
            <h4 class="subtitle__text">Total balance</h4>
            <div class="balance__text">
              {{
                (
                  this.$store.state.user_account.wallet_account.balance /
                  10 ** 18
                ).toFixed(4)
              }}
              ETH
            </div>
          </div>
          <!-- <div class="wallet__add__funds" @click="toggleMenu()">Add funds</div> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
// import { mixin as clickaway } from "vue3-click-away"; //"vue-clickaway";
import { mixin as VueClickAway } from "vue3-click-away";
export default {
  mixins: [VueClickAway],
  data() {
    return {
      night_mode: false,
      toggle_button: false,
      langDropVisible: false,
      profileDropVisible: false,
      accountDropVisible: false,
      nav_pc_balance: "Balance: 0.0",
      address: "-",
      full__address: "",
      copied: false,
      navbar__refs: ["nav_link_0", "nav_link_1", "nav_link_2"],
    };
  },
  created() {
    window.addEventListener("scroll", this.nav_scroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.nav_scroll);
  },
  mounted() {
    this.night_mode = localStorage.getItem("nightMode") || false;
  },
  methods: {
    goToLink(path) {
      window.open(path, "_blank");
    },
    copy__address() {
      try {
        navigator.clipboard
          .writeText(this.$store.state.user_account.wallet_account.address)
          .then(
            () => {
              this.copied = true;
              setTimeout(() => {
                this.copied = false;
              }, 2000);
            },
            () => {
              this.copied = false;
            }
          );
      } catch (e) {
        this.copied = false;
        let v =
          "Your address is: \n" +
          this.$store.state.user_account.wallet_account.address;
        alert(v);
      }
    },
    capitalize(word) {
      const lower = word.toLowerCase();
      return word.charAt(0).toUpperCase() + lower.slice(1);
    },
    change__active(link) {
      // this.navbar__refs
      this.$store.state.navbar_state.navbar_positions.forEach((element) => {
        this.$refs[element].classList.remove("nav__links__active");
        // this.$refs[element + "_mobile"].classList.remove("nav__links__active");
      });
      if (link != "") {
        this.$refs[link].classList.add("nav__links__active");
        // this.$refs[link + "_mobile"].classList.add("nav__links__active");
      }
    },
    toggleMenu() {
      this.$refs.nav__mobile.classList.toggle("active");
      if (this.toggle_button) {
        this.toggle_button = false;
        this.$refs.nav__toggle.classList.remove("active__toggle");
        this.$refs.nav__mobile__lang.classList.remove("active");
        this.$refs.nav__mobile__profile.classList.remove("active");
        this.$refs.nav__mobile__wallet.classList.remove("active");
      } else {
        this.toggle_button = true;
        this.$refs.nav__toggle.classList.add("active__toggle");
        this.$refs.nav__mobile__lang.classList.remove("active");
        this.$refs.nav__mobile__profile.classList.remove("active");
        this.$refs.nav__mobile__wallet.classList.remove("active");
      }
    },
    toggleLangMenu() {
      this.$refs.nav__mobile__lang.classList.toggle("active");
    },
    toggleLangPC() {
      this.langDropVisible = !this.langDropVisible;
    },
    toggleProfilePC() {
      this.profileDropVisible = !this.profileDropVisible;
    },
    toggleAccountPC() {
      this.accountDropVisible = !this.accountDropVisible;
    },
    toggleAccountMenu() {
      this.$refs.nav__mobile__profile.classList.toggle("active");
    },
    toggleWalletMenu() {
      this.$refs.nav__mobile__wallet.classList.toggle("active");
      // Update account (to update balance)
      this.$store.dispatch("user_account/updateAccount", "metamask", {
        root: true,
      });
    },
    nav_scroll() {
      if (window.scrollY > 50) {
        this.$refs.nav.classList.add("nav__active");
      } else {
        this.$refs.nav.classList.remove("nav__active");
      }
    },
    logOutWallet() {
      this.$refs.nav__mobile__wallet.classList.toggle("active");
      this.accountDropVisible = false;
      this.$store.dispatch("user_account/logOutWallet", null, { root: true });
    },
    logout_admin() {
      const token = this.$store.state.user_auth_w2.token;
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        axios
          .post(this.$store.state.gf_contracts.backend + "/logoutall/")
          .then(() => {
            const notification = {
              type: "success",
              message: "Logged out successfully",
            };
            this.$store.dispatch("notification/add", notification, {
              root: true,
            });
            this.$store.commit("user_auth_w2/removeToken");
            this.$router.go(0);
          })
          .catch(() => {
            const notification = {
              type: "error",
              message: "Something went wrong",
            };
            this.$store.dispatch("notification/add", notification, {
              root: true,
            });
          });
      }
    },
  },
  beforeCreate() {
    const nav_selected = this.$store.state.navbar_state.navbar_dir;
    console.log("Nav:", nav_selected);
  },
  watch: {
    night_mode: function (val) {
      localStorage.setItem("nightMode", val);
    },
  },
};
</script>

<style scoped>
* {
  z-index: 888;
}

nav {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #252525;
  /*color: #6e6e73;*/
  text-decoration: none;
  position: fixed;
  width: 100%;
  z-index: 9980;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.comming_soon {
  color: #6e6e73;
  pointer-events: none !important;
}
.menu_description {
  color: #252525;
  font-size: 14px;
  font-weight: 400;
}
.generic__text {
  color: #252525;
}
.subtitle__text {
  margin: 5px 0px 5px 0px;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  /*
  padding: 16px 10%;
*/
  padding: 0px 10%;

  background-color: rgb(255, 255, 255, 100%);
  width: 100%;
  z-index: 666 !important;
  transition-duration: 0.4s;
  position: relative;
}

.nav__active {
  background-color: rgb(255, 255, 255, 100%) !important;
  -webkit-box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.08);
  transition-duration: 0.4s;
}

.logo {
  max-height: 40px;
  max-width: 100%;
  cursor: pointer;
}
.logo__div {
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  max-width: 80%;
  height: 70px;
}
.nav__links {
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.nav__links__middle,
.nav__links__right {
  display: inline-block;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
}
.nav__links__middle div,
.nav__links__right div {
  padding: 0px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
}
.nav__links__right div {
  padding: 0px 10px;
}
.nav__links__middle {
  transition-duration: 0.2s;
  margin-right: 5px;
}
.nav__links__middle div {
  justify-content: center;
}

.nav__mobile {
  position: fixed;
  transition-duration: 0.8s;
  width: 100%;
  max-width: 500px;
  bottom: 0%;
  right: 0%;
  top: 0%;
  /* z-index: -1;*/
  transform: translateX(550px);
}
#nav_links_mobile_main {
  z-index: -4;
}
#nav_links_mobile_profile {
  z-index: -3;
}
#nav_links_mobile_lang {
  z-index: -2 !important;
}
#nav_links_mobile_wallet {
  z-index: -1 !important;
}
.nav__links__mobile {
  width: 100%;
  display: flex;
  padding: 120px 15px;
  flex-direction: column;
  background-color: #f2f2f2;

  overflow-y: scroll;
  height: 100%;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
}
.nav__links__mobile div {
  padding: 20px 15px;
  width: 100%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.nav__links__mobile div img,
.lang_flag {
  height: 25px; /*32px*/
}
.border__focus__text,
.border__focus__img {
  outline: 0 !important;
  position: relative;
  transition-duration: 0.3s;
}
.border__focus__text,
.border__focus__img::-moz-focus-inner {
  border: 0 !important;
}
.border__focus__img:focus {
  outline: 0;
  padding: 3px;
  transition-duration: 0.3s;
}
.border__focus__text:focus {
  outline: 0;
  color: #0071da;
  transition-duration: 0.3s;
}
.nav__links__active {
  /*color: #252525 !important;*/
  color: #0071da !important;
  position: relative;
}
.nav__links__active::before {
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background-color: #0071da;
  bottom: 0px;
  border-radius: 4px;
}
.nav__links__mobile div h4 {
  font-size: 16px;
  font-weight: 500;
  padding: 0px 15px;
}
.nav__links__mobile div div {
  margin: 0;
  padding: 0;
}
.go_arrow {
  height: 16px !important;
}
.lang__selector,
.profile__selector {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.lang__selector svg:hover {
  box-shadow: #252525;
}
.lang__selector svg path:nth-child(1),
.lang__selector svg path:nth-child(3) {
  fill: white; /*#252525;*/
  stroke: #252525; /*#f2f2f2;*/
  transition-duration: 0.7s;
}
.lang__selector svg path:nth-child(2),
.lang__selector svg path:nth-child(4),
.lang__selector svg rect {
  fill: #252525; /*#f2f2f2;*/
  transition-duration: 0.7s;
}
.lang__drop,
.profile__drop,
.account__drop {
  position: absolute;
  top: 65px; /*-10px; 40;*/
  right: -5px;
  border-radius: 10px !important;
  height: fit-content !important;
  width: 350px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  z-index: 1;
  -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
  box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.3);
}
.profile__drop {
  /*top: 60px;*/
  right: -5px;
}
.account__drop {
  /*top: 60px;*/
  z-index: 999 !important;
  max-width: 300px;
}
.lang__drop h3,
.profile__drop,
.account__drop {
  color: #252525;
  font-weight: 300;
  font-size: 16px;
  line-height: 32px;
  padding: 10px 0px;
}
.lang__drop .nav__links__mobile,
.profile__drop .nav__links__mobile,
.account__drop .nav__links__mobile {
  background-color: #f2f2f2;
  color: #252525;
  -webkit-box-shadow: none;
  box-shadow: none;
  padding: 15px 0px 15px 0px;
  overflow-y: auto;
}
.account__drop {
  padding: 5px !important;
}
.lang__drop__title img,
.account__drop img {
  height: 25px; /*32px*/
  margin: 10px 15px;
}
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s !important;
}
.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
}

.nav__toggle {
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  height: 40px; /*40px */
  width: 40px;
  cursor: pointer;
}
.burger,
.burger::before,
.burger::after {
  content: "";
  position: absolute;
  height: 3px; /*4px*/
  width: 30px; /**35px */
  border-radius: 10px;
  background: #252525;
  transition-duration: 0.4s;
}

.burger::before {
  transform: translateY(-8px); /**-10px*/
}
.burger::after {
  transform: translateY(8px); /**10px */
}

.active__toggle {
}

.nav__toggle.active__toggle .burger {
  background: transparent;
  box-shadow: none;
}

.nav__toggle.active__toggle .burger::before {
  transform: rotate(45deg);
}

.nav__toggle.active__toggle .burger::after {
  transform: rotate(-45deg);
}

.cta {
  display: flex;
  flex-direction: row;

  background: white;
  border: 2px rgb(0, 113, 218) solid;
  /**
  color: white;
  background: rgb(0, 113, 218);
  background: linear-gradient(
    90deg,
    rgba(0, 113, 218, 1) 0%,
    rgba(0, 113, 218, 0.7038165608040091) 100%
  );**/
  border-radius: 10px;
  align-items: center;
  height: 50px !important;
  margin-left: 5px;
  transition-duration: 0.5s;
}
.cta img,
.cta__mobile {
  height: 30px; /**32px */
}
.cta__mobile img {
  height: 30px !important; /**32px */
}
.cta div {
  padding: 10px 10px 10px 15px;
  /*color: white !important;*/
  color: rgb(0, 113, 218);
}

.cta__mobile {
  display: flex;
  flex-direction: row;

  color: #0071da;
  background: #f2f2f2;
  border: 2px rgb(0, 113, 218) solid;
  /**
  color: white;
  background: rgb(0, 113, 218);
  background: linear-gradient(
    90deg,
    rgba(0, 113, 218, 1) 0%,
    rgba(0, 113, 218, 0.7038165608040091) 100%
  );**/
  border-radius: 10px;
  height: fit-content;
  margin-top: 15px;
}

.cta__mobile div {
  color: #0071da;
  padding: 0px 0px 0px 15px !important;
  display: flex;
  align-items: center;
}

/* Toggle button*/
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6e6e73; /**#ccc */
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: #f2f2f2; /**white */
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: #0071da;
}
input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
/* Toggle button end*/

.social__icons {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.social__icons svg {
  height: 45px;
  padding: 10px 15px;
  cursor: pointer;
}
.social__icons svg path,
.social__icons svg rect {
  fill: #252525;
}
.social__icons svg circle {
  fill: #f2f2f2;
}
.social__icons svg circle:nth-child(4n) {
  fill: #252525;
}
.account__section {
  display: flex;
  flex-direction: row;
  position: relative;
}
.account__text {
  flex-direction: column;
  align-items: flex-start !important;
  padding: 0px !important;
  margin: 0px;
  width: 100%;
}
.account__text div {
  color: #252525 !important;
}
.account__text h4 {
  padding: 0px !important;
}
.account__text__addr {
  color: #252525;
}
.account__opts {
  position: absolute;
  right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.wallet__section {
  /* z-index: 3;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 10px 20px 10px !important;
  cursor: default !important; */
  z-index: 3;
  display: flex;
  flex-direction: column;
  margin: 20px 0px 20px 0px !important;
  cursor: default !important;
  background: #0071da;
  border-radius: 16px !important;
}
.wallet__section__text {
  /* display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  height: fit-content;
  align-items: center;
  border: 2px solid #0071da;
  border-radius: 10px 10px 0px 0px;
  margin: -2px !important;
  cursor: pointer;
  font-size: 16px;
  padding: 15px !important;
  cursor: default !important; */
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding: 15px !important;
  color: white !important;
}
.balance__text {
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  color: white !important;
}
.wallet__section__text div {
  width: 100%;
  margin-top: 5px !important;
  justify-content: center;
  cursor: default !important;
}
.wallet__add__funds {
  border: 2px solid #0071da;
  margin: -2px;
  border-radius: 0px 0px 10px 10px;
  justify-content: center;
  padding: 15px 15px !important;
  padding: 15px;
  background: rgb(0, 113, 218);
  background: linear-gradient(
    180deg,
    rgba(0, 113, 218, 1) 0%,
    rgba(0, 113, 218, 0.7) 100%
  );
  color: white !important;
  border: none;
}

@media (max-width: 1330px) {
  .nav__toggle {
    display: flex;
  }
  .nav__links__right {
    display: none;
  }
}

@media (max-width: 1000px) {
  .nav__links__middle {
    display: none;
  }
}

@media (hover: hover) {
  .nav__links__middle div:hover,
  .nav__links__mobile div:hover,
  .nav__links__right div:hover {
    color: #0071da;
    border-radius: 10px;
    transition-duration: 0.2s;
  }
  .cta__mobile div {
    color: white !important;
  }
  .cta__mobile:hover,
  .cta:hover {
    color: white !important;
    background: rgb(0, 113, 218);
    background: linear-gradient(
      90deg,
      rgba(0, 113, 218, 1) 0%,
      rgba(0, 113, 218, 0.8) 100%
    );
    transition-duration: 0.5s;
  }
  .cta:hover div {
    color: white !important;
  }
  .nav__toggle:hover .burger,
  .burger::before:hover {
    background: #0071da;
    background-color: #0071da;
    color: #0071da;
  }
  .lang__drop .nav__links__mobile:hover,
  .profile__drop .nav__links__mobile:hover {
    color: #252525 !important;
  }
  .wallet__add__funds:hover {
    border-radius: 0px 0px 10px 10px !important;
    color: white !important;
    -webkit-box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
    box-shadow: -7px 8px 31px -7px rgba(37, 37, 37, 0.2);
  }
}
.img_margin_left {
  margin-left: 10px;
}
.sep {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0px 0px !important;
  border: 1px #e2e2e2 solid;
  background-color: #e2e2e2;
  border-radius: 1px;
  width: 100% !important;
  height: 1px;
}

.active {
  transform: translateX(0px);
  transition-duration: 0.8s;
}
</style>
