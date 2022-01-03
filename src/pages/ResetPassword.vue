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
          <div class="text-h5">Password Reset</div>
        </div>
        <div class="col q-pa-xl" style="margin: auto; max-width: 400px">
          <q-input
            class="q-mb-lg"
            v-model="newPassword"
            color="positive"
            outlined
            dense
            type="password"
            hint="New Password"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />
          <q-input
            class="q-mb-lg"
            v-model="reNewPassword"
            color="positive"
            outlined
            dense
            type="password"
            hint="Re-Enter New Password"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />

          <div
            class="col-xs-12 col-md-12 flex flex-center"
            style="margin: auto; width: 50%"
          >
            <q-btn
              label="Finalize Reset"
              type="submit"
              :loading="loading"
              color="positive"
              text-color="dark"
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
import { useRoute } from "vue-router";
import alert from "../utils/alert.js";
import { useMeta } from "quasar";
useMeta({
  title: "Password Reset",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Reset page for admin passwords"}
  }
});
const $q = useQuasar();
const store = useStore();
const loading = computed(() => store.getters.loading);
const router = useRouter();
const newPassword = ref("");
const reNewPassword = ref("");
const backenderrors = ref([]);
const route = useRoute();

const props = defineProps({
  uid: String,
  token: String,
});
function onSubmit() {
  //resets password using djoser url, then logs out user
  store.commit("setLoading", true);
  backenderrors.value = [];
  api
    .post("/api/v1/users/reset_password_confirm/", {
      uid: route.params.uid,
      token: route.params.token,
      new_password: newPassword.value,
      re_new_password: reNewPassword.value,
    })
    .then((response) => {
      store.commit("setLoading", false);
      //logout user on client side
      api.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      store.commit("removeToken");

      alert("password has been reset!", "positive", "dark");

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
        alert(error.message, "red-5", "primary");
      }
    });
}
</script>
