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
import { api } from "../boot/axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import alert from "../utils/alert";
import { useStore } from "vuex";
import { useMeta } from "quasar";
useMeta({
  title: "Help Wanted Create",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Page for creating and updating Help Wanted Posts"}
  }
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

function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = new FormData();
  formData.append("title", adData.value.title);
  formData.append("description", adData.value.description);
  if (route.params.slug) {
    api
      .put("/api/v1/wantedads/" + route.params.slug + "/", formData)
      .then((response) => {
        store.commit("setLoading", false);
        alert("wanted ad updated", "primary", "dark");
        router.push("/helpwanted");
      })
      .catch((error) => {
        store.commit("setLoading", false);
        handleErrors(error);
      });
  } else {
    api
      .post("/api/v1/wantedads/", formData)
      .then((response) => {
        store.commit("setLoading", false);
        alert("ad submitted", "primary", "dark");
        router.push("/helpwanted");
      })
      .catch((error) => {
        store.commit("setLoading", false);
        handleErrors(error);
      });
  }
}

function handleErrors(error) {
  if (error.response) {
    if (error.response.status == 400) {
      for (const element in error.response.data) {
        backenderrors.value.push(`${element}: ${error.response.data[element]}`);
      }
    }
  } else if (error.message) {
    backenderrors.value.push(`${error.message}`);
  }
}

async function loadData() {
  if (route.params.slug) {
    api
      .get("/api/v1/wantedads/" + route.params.slug)
      .then((response) => {
        adData.value = response.data;
      })
      .catch((error) => {
        alert(error.message, "red-5", "white");
      });
  }
}

onMounted(loadData);
</script>
