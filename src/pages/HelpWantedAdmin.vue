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
          <div>Create a Help Wanted Post</div>
        </div>
        <div class="col q-py-xl q-px-sm" style="margin: auto; max-width: 400px">
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            v-model="adData.title"
            hint="volunteer job title"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            type="textarea"
            v-model="adData.description"
            hint="A short description of the job required"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />

          <div
            class="col-xs-12 col-md-12 q-px-md q-pt-md flex flex-center"
            style="margin: auto; width: 50%"
          >
            <q-btn
              :label="route.params.slug ? 'Update' : 'Create'"
              :loading="loading"
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
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { apiCall } from "../utils/apiFunctions.js";
import alert from "../utils/alert";
import { useStore } from "vuex";
import { useMeta } from "quasar";
useMeta({
  title: "Help Wanted Create",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta: {
    description: {
      name: "description",
      content: "Page for creating and updating Help Wanted Posts",
    },
  },
});
const store = useStore();
const loading = computed(() => store.getters.loading);
const route = useRoute();
const props = defineProps({
  slug: String,
});

const router = useRouter();
const $q = useQuasar();
const adData = ref({
  title: "",
  description: "",
});
const backenderrors = ref([]);

async function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = new FormData();
  formData.append("title", adData.value.title);
  formData.append("description", adData.value.description);
  //if (route.params.slug) {
  const response = route.params.slug
    ? await apiCall("put", "/wantedads/" + route.params.slug + "/", formData)
    : await apiCall("post", "/wantedads/", formData);
  store.commit("setLoading", false);
  const success =
    response.status == 200
      ? "wanted ad updated"
      : response.status == 201
      ? "wanted ad created"
      : "";
  if (success) {
    alert(success, "positive", "dark");
    router.push("/helpwanted");
  } else if (response.status == 400) {
    handleErrors(response);
  }
}

function handleErrors(error) {
  for (const element in error.data) {
    backenderrors.value.push(`${element}: ${error.data[element]}`);
  }
}

async function loadData() {
  if (route.params.slug) {
    const response = await apiCall("get", "/wantedads/" + route.params.slug);
    if (response.status == 200) {
      adData.value = response.data;
    }
  }
}

onMounted(loadData);
</script>
