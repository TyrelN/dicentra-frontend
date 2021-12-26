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
          <div>Fill Out a Current Event for the Home Page</div>
        </div>
        <div class="col q-pa-xl" style="margin: auto; max-width: 400px">
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            autogrow
            v-model="message"
            hint="message for current event"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />
          <q-file
            style="max-width: 300px"
            v-model="image"
            filled
            label="post image"
            accept=".jpg, image/*"
            @rejected="onRejected"
          />

          <div
            class="col-xs-12 col-md-12 q-px-md q-pt-md flex flex-center"
            style="margin: auto; width: 50%"
          >
            <q-btn
              :loading="loading"
              label="Create"
              type="submit"
              color="positive"
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
import { api } from "../boot/axios";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import alert from "../components/alert";
const store = useStore();
const loading = computed(() => store.getters.loading);
const router = useRouter();
const $q = useQuasar();
const myForm = ref(null);
const message = ref("");
const image = ref(null);
const backenderrors = ref([]);

function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = new FormData();
  formData.append("message", message.value);
  if(image.value){
    formData.append("image", image.value);
  }
  api
    .post("/api/v1/currentevent/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      store.commit("setLoading", false);
      alert("current event created", "dark", "primary");

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
        backenderrors.value.push(`${error.message}`);
      }
    });
}

function onRejected(rejectedEntries) {
  alert("the image was rejected", "red-5", "primary");
}
</script>
