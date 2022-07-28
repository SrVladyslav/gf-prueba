<template>
  <section class="log_in_container">
    <div class="login_container">
      <div class="logo_img">
        <img src="@/assets/logo_cube.svg" alt="" />
      </div>
      <h1>Log In</h1>
      <gf-input-field v-model="username" :showError="u_error" @input="reset()">
        <template v-slot:title>Username</template>
        <template v-slot:helper>e.g. "Your Web 2.0 account username"</template>
      </gf-input-field>
      <gf-input-field
        v-model="password"
        :text_type="'password'"
        :showError="p_error"
        @input="reset()"
      >
        <template v-slot:title>Password</template>
        <template v-slot:helper>Hopefully is not 1234</template>
      </gf-input-field>
      <div class="cta">
        <gf-action-button
          class="login"
          @click="login()"
          :label="'Log In'"
        ></gf-action-button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      u_error: false,
      p_error: false,
    };
  },
  methods: {
    login() {
      const formData = {
        username: this.username,
        password: this.password,
      };
      axios.defaults.headers.common["Authorization"] = "";
      axios
        .post(this.$store.state.gf_contracts.backend + "/login/", formData)
        .then((response) => {
          const token = response.data.token;
          this.$store.commit("user_auth_w2/setToken", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          this.$router.push("/admin_panel");
        })
        .catch(() => {
          const notification = {
            type: "error",
            message: "Incorrect username and/or password",
          };
          this.$store.dispatch("notification/add", notification, {
            root: true,
          });
          this.u_error = true;
          this.p_error = true;
        });
    },
    reset() {
      this.u_error = false;
      this.p_error = false;
    },
  },
  beforeCreate() {
    this.$store.commit("user_auth_w2/initializeStore");
    const token = this.$store.state.user_auth_w2.token;
    console.log("Token: ", token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
      this.$store.commit("user_auth_w2/removeToken");
    }
  },
};
</script>

<style scoped>
.log_in_container {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 100px 10px 100px 10px;
}
.login_container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: fit-content;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.login_container h1 {
  font-size: 30px;
  line-height: 40px;
  font-weight: 600px;
  color: #252525;
  margin: 10px 0px 10px 0px;
}
.logo_img {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
}
.logo_img img {
  height: 100%;
  width: 150px;
  display: block;
  object-fit: cover;
}
.login {
  margin: 20px 0px 0px 0px;
}
.cta {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
