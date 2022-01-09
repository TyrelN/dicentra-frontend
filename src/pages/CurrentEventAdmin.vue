<template>
  <div
    class="q-pt-xl relative-position"
    style="
      justify-content: center;
      align-items: center;
      max-width: 750px;
      margin: 0 auto;
    "
  >
    <div
      class="q-ma-lg q-pa-xl"
      style="border-radius: 25px"
      :class="`shadow-14`"
    >
      <q-form @submit="onSubmit">
        <div style="margin: auto; text-align: center">
          <div>Fill Out a Current Event for the Home Page</div>
        </div>
        <div class="col q-py-xl q-px-sm" style="margin: auto; max-width: 400px">
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
import { apiCall } from "../utils/apiFunctions.js"
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import alert from "../utils/alert";
import { useMeta } from "quasar";
useMeta({
  title: "Create Current Event",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Admin page for creating current events"}
  }
});
const store = useStore();
const loading = computed(() => store.getters.loading);
const router = useRouter();
const $q = useQuasar();
const myForm = ref(null);
const message = ref("");
const image = ref(null);
const backenderrors = ref([]);

async function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = new FormData();
  formData.append("message", message.value);
  if(image.value){
    formData.append("image", image.value);
  }
  const response = await apiCall("post", "/currentevent/", formData, true);
    store.commit("setLoading", false);
    const success =
      response.status == 200
        ? "current event updated"
        : response.status == 201
        ? "current event created"
        : "";
    if (success) {
      alert(success, "primary", "dark");
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

function onRejected(rejectedEntries) {
  alert("the image was rejected", "red-5", "primary");
}
</script>
