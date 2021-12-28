<template>
  <div
    class="q-pt-xl relative-position"
    style="
      justify-content: center;
      align-items: center;
      max-width: 600px;
      margin: 0 auto;
    "
  >
    <div
      class="q-ma-xl q-pa-xl"
      style="border-radius: 25px"
      :class="`shadow-14`"
    >
      <q-form @submit="onSubmit">
        <div style="margin: auto; text-align: center">
          <div class="text-h5">Admin Portal</div>
        </div>
        <div class="col q-pa-xl" style="margin: auto; max-width: 400px">
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            v-model="user"
            hint="Username"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />

          <q-input
            v-model="password"
            color="positive"
            outlined
            dense
            type="password"
            hint="Password"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />

          <div
            class="col-xs-12 col-md-12 q-px-md q-pt-md flex flex-center"
            style="margin: auto; width: 50%"
          >
            <q-btn
              label="Log in"
              type="submit"
              color="positive"
              text-color="dark"
            />
            <q-btn
              label="Reset Password"
              class="q-mt-lg"
              v-if="isAuthenticated"
              color="positive"
              text-color="dark"
              @click="router.push('/sendreset')"
            />
          </div>
        </div>
      </q-form>
      <div class="backend-errors text-negative" v-if="backenderrors.length">
        <p v-for="error in backenderrors" v-bind:key="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { api } from "../boot/axios.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import alert from "../components/alert.js"
const $q = useQuasar();
const store = useStore();
const router = useRouter();
const loading = computed(() => store.getters.loading);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = ref("");
const password = ref("");
const backenderrors = ref([]);

function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  //wipe original information clean
  api.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");

  //form creation and post
  const formData = new FormData();
  formData.append("username", user.value);
  formData.append("password", password.value);
  api
    .post("/api/v1/token/login/", formData) //djoser url
    .then((response) => {
      //store logged in token on browser
      store.commit("setLoading", false);
      const token = response.data.auth_token;

      store.commit("setToken", token);

      api.defaults.headers.common["Authorization"] = "Token " + token;

      localStorage.setItem("token", token);

      alert("you have logged in!", "positive", "dark")

      router.push("/");
    })
    .catch((error) => {
      store.commit("setLoading", false);
      if (error.response) {
        if (error.response.status == 400) {
          for (const element in error.response.data) {
            backenderrors.value.push(
              `${element}: ${error.response.data[element]}`
            );
          }
        }
      } else if (error.message) {
        alert(error.message, "red-5", "primary")
      }
    });
}
</script>
