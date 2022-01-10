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
          <div class="text">
            Enter the email of the user you wish to reset the password for
          </div>
        </div>
        <div class="col q-pa-xl" style="margin: auto; max-width: 400px">
          <q-input
            v-model="email"
            color="positive"
            outlined
            dense
            type="email"
            hint="email"
            lazy-rules="ondemand"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Must be a valid email address',
            ]"
          />
        </div>
        <div
          class="col-xs-12 col-md-12 q-px-md q-pt-md flex flex-center"
          style="margin: auto; width: 50%"
        >
          <q-btn
            label="Submit"
            type="submit"
            :loading="loading"
            color="positive"
            text-color="dark"
          />
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
import { apiCall } from "../utils/apiFunctions.js"
import { useRouter } from "vue-router";
import alert from "../utils/alert.js";
import { useStore } from "vuex";
import { useMeta } from "quasar";
useMeta({
  title: "Send Reset Email",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Page for sending a reset password email to verify user"}
  }
});
const store = useStore();
const loading = computed(() => store.getters.loading);
const $q = useQuasar();
const router = useRouter();
const email = ref("");
const backenderrors = ref([]);

async function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = new FormData();
  formData.append("email", email.value);
  const response = await apiCall(
    "post",
    "/users/reset_password/",
    formData
  );
  store.commit("setLoading", false);
  if (response.status == 204) {
    alert("Check the email submitted for further instructions!", "positive", "dark");
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
