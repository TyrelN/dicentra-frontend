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
          <div class="text-h5">Pet Post Admin Page</div>
          <div class="text-subtitle2 q-mt-lg">
            Only a name is required to save or publish a post, however a picture
            is always wanted!
          </div>
        </div>
        <div class="col q-py-xl q-px-sm" style="margin: auto; max-width: 400px">
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="pet name"
            v-model="petData.name"
            hint="eg: Lucky"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />

          <q-file
            style="max-width: 300px"
            v-model="image"
            filled
            label="Pet Profile Picture"
            accept=".jpg, .png, image/*"
            class="q-mb-md"
            @rejected="onRejected"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="age"
            v-model.number="petData.age"
            hint="number of years (eg: 1 yr-old, kitten, 2-4 yrs)"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="color"
            v-model="petData.color"
            hint="eg: calico"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="Description"
            type="textarea"
            v-model="petData.description"
            hint="pet description/story"
          />
          <q-select
            class="q-mb-md"
            dense
            color="positive"
            outlined
            v-model="petData.sex"
            :options="sexTypes"
            hint="gender"
          />
          <q-select
            class="q-mb-md"
            dense
            color="positive"
            outlined
            v-model="petData.available"
            default="available"
            :options="availableOptions"
            hint="availability"
          />
          <div class="">Spayed/Neutered Date (Optional)</div>
          <q-input
            filled
            v-model="petData.spayed"
            mask="####-##-##"
            label="yyyy-mm-dd"
            hint="the date this cat was spayed/neutered"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    text-color="dark"
                    v-model="petData.spayed"
                    mask="YYYY-MM-DD"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="dark" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div
            class="col-12 q-pt-md flex flex-center"
            style="margin: auto; width: 100%"
          >
            <q-toggle
              color="positive"
              v-model="petData.is_published"
              label="Publish this post?"
            />
          </div>
          <div
            class="col-xs-12 col-md-12 q-px-md q-pt-md flex flex-center"
            style="margin: auto; width: 50%"
          >
            <q-btn
              :label="route.params.slug ? 'Update' : 'Create'"
              type="submit"
              :loading="loading"
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
import alert from "../utils/alert.js";
import { useStore } from "vuex";
import { useMeta } from "quasar";
useMeta({
  title: "Pet Post Create Page",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta: {
    description: {
      name: "description",
      content: "Page for creating and updating pet posts",
    },
  },
});
const route = useRoute();
const store = useStore();
const loading = computed(() => store.getters.loading);
const props = defineProps({
  slug: String,
});
const router = useRouter();
const $q = useQuasar();
const image = ref(null);
const petData = ref({
  name: "",
  age: "",
  color: "",
  description: "",
  sex: "",
  available: "",
  spayed: "",
  is_published: false,
});
const availableOptions = ["available", "not available", "adopted"];
const sexTypes = ["male", "female"];
const backenderrors = ref([]);

async function onSubmit() {
  store.commit("setLoading", true);
  backenderrors.value = [];
  const formData = new FormData();
  formData.append("name", petData.value.name);
  if (image.value) {
    formData.append("image", image.value);
  }
  formData.append("age", petData.value.age);
  formData.append("color", petData.value.color);
  formData.append("description", petData.value.description);
  formData.append("sex", petData.value.sex);
  formData.append(
    "available",
    petData.value.available ? petData.value.available : ""
  );
  formData.append("spayed", petData.value.spayed);
  formData.append("is_published", petData.value.is_published);
  const response = route.params.slug
    ? await apiCall(
        "put",
        "/petposts/" + route.params.slug + "/",
        formData,
        true
      )
    : await apiCall("post", "/petposts/", formData, true);
  store.commit("setLoading", false);
  const success =
    response.status == 200
      ? "pet post updated"
      : response.status == 201
      ? "pet post created"
      : "";
  if (success) {
    alert(success, "positive", "dark");
    router.push("/petposts");
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
  alert(
    "this image was rejected. Perhaps it was too large?",
    "red-5",
    "primary"
  );
}

async function loadData() {
  if (route.params.slug) {
    const response = await apiCall("get", "/petposts/" + route.params.slug);
    if (response.status == 200) {
      for (const [key, value] of Object.entries(petData.value)) {
        petData.value[key] = response.data[key];
      }
    }
  }
}

onMounted(loadData);
</script>
