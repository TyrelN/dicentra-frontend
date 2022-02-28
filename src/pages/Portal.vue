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
        <div class="col q-py-xl" style="margin: auto; max-width: 400px">
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
              padding="xs xl"
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
import { ref, computed } from "vue";
import { api } from "../boot/axios.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import alert from "../utils/alert.js";
import { apiCall } from "../utils/apiFunctions.js";
import { useMeta } from "quasar";
useMeta({
  title: "Admin Login",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta: {
    description: {
      name: "description",
      content: "Log into the website as an administrator",
    },
  },
});
const store = useStore();
const router = useRouter();
const loading = computed(() => store.getters.loading);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = ref("");
const password = ref("");
const backenderrors = ref([]);

async function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  //wipe original information clean
  api.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");

  //form creation and post
  const formData = new FormData();
  formData.append("username", user.value);
  formData.append("password", password.value);
  const response = await apiCall("post", "/token/login/", formData);
  store.commit("setLoading", false);
  if (response.status == 200) {
    //store logged in token on browser
    const token = response.data.auth_token;

    store.commit("setToken", token);

    api.defaults.headers.common["Authorization"] = "Token " + token;

    localStorage.setItem("token", token);

    alert("you have logged in!", "positive", "dark");
    router.push("/");
  } else if (response.status == 400) {
    handleErrors(response);
  }
}
  function handleErrors(error) {
    for (const element in error.data) {
      backenderrors.value.push(`${element}: ${error.data[element]}`);
    }
  }

</script>
