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
import { apiCall } from "../utils/apiFunctions.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import alert from "../utils/alert.js";
import { useMeta } from "quasar";
useMeta({
  title: "Password Reset",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta: {
    description: {
      name: "description",
      content: "Reset page for admin passwords",
    },
  },
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
async function onSubmit() {
  //resets password using djoser url, then logs out user
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = {
    uid: route.params.uid,
    token: route.params.token,
    new_password: newPassword.value,
    re_new_password: reNewPassword.value,
  };
  const response = await apiCall(
    "post",
    "/users/reset_password_confirm/",
    formData
  );
  store.commit("setLoading", false);
  if (response.status == 200) {
    //logout user on client side
    api.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    store.commit("removeToken");
    alert("Your password has been reset!", "primary", "dark");
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
