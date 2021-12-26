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
import { api } from "../boot/axios.js";
import { useRouter } from "vue-router";
import alert from "../components/alert.js";
import { useStore } from "vuex";
const store = useStore();
const loading = computed(() => store.getters.loading);
const $q = useQuasar();
const router = useRouter();
const email = ref("");
const backenderrors = ref([]);

function onSubmit() {
  //form creation and post
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = new FormData();
  formData.append("email", email.value);
  api
    .post("/api/v1/users/reset_password/", formData) //djoser url
    .then((response) => {
      store.commit("setLoading", false);
      alert(
        "Submitted! Check your email for further instructions",
        "positive",
        "dark"
      );
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
