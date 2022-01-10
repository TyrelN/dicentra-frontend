<template>
  <div
    class="q-pt-xl relative-position"
    style="max-width: 750px; margin: 0 auto"
  >
    <div
      class="q-ma-lg q-py-xl q-px-sm"
      style="border-radius: 25px"
      :class="`shadow-14`"
    >
      <q-form @submit="onSubmit">
        <div style="text-align: center">
          <div>Create an Article</div>
        </div>
        <div class="col q-pa-xl" style="margin: auto; max-width: 600px">
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            v-model="article.title"
            hint="article title"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Field required']"
          />
          <q-select
            class="q-mb-md"
            dense
            color="positive"
            outlined
            v-model="article.category"
            :options="categories"
            label="category"
          />
          <q-file
            style="max-width: 300px"
            v-model="headerImage"
            filled
            label="Upload a header image"
            accept=".jpg, image/*"
            @rejected="onRejected"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            type="textarea"
            v-model="article.content"
            hint="Article Content"
          />
          <q-file
            style="max-width: 300px"
            v-model="contentImage"
            filled
            label="Content Image (Optional)"
            accept=".jpg, image/*"
            @rejected="onRejected"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="optional"
            v-model="article.caption"
            hint="caption for first content image"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="optional"
            type="textarea"
            v-model="article.content_second"
            hint="Optional body of text"
          />
          <q-file
            style="max-width: 300px"
            v-model="contentImageSecond"
            filled
            label="Second Content Image (Optional)"
            accept=".jpg, image/*"
            @rejected="onRejected"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="optional"
            v-model="article.caption_second"
            hint="caption for second content image"
          />
          <q-input
            class="q-mb-lg"
            dense
            color="positive"
            outlined
            label="optional"
            type="textarea"
            v-model="article.content_third"
            hint="Optional body of text"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="optional"
            v-model="article.url1"
            hint="Link 1"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="optional"
            v-model="article.url2"
            hint="Link 2"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="optional"
            v-model="article.url3"
            hint="Link 3"
          />
          <q-input
            class="q-mb-md"
            dense
            color="positive"
            outlined
            label="optional"
            v-model="article.url4"
            hint="Link 4"
          />
          <div
            class="col-12 q-pt-md flex flex-center"
            style="margin: auto; width: 100%"
          >
            <q-toggle
              color="positive"
              v-model="article.is_published"
              label="Publish this article?"
            />
          </div>
          <div
            class="col-xs-12 col-md-12 q-px-md q-pt-md flex flex-center"
            style="margin: auto; width: 50%"
          >
            <q-btn
              :label="route.params.slug ? 'Update' : 'Save'"
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
import { apiCall } from "../utils/apiFunctions.js"
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import alert from "../utils/alert";
import { useStore } from "vuex";
import { useMeta } from "quasar";
useMeta({
  title: "Article Create",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Admin page for creating and updating articles"}
  }
});
const store = useStore();
const loading = computed(() => store.getters.loading);
const route = useRoute();
const props = defineProps({
  slug: String,
});
const router = useRouter();
const headerImage = ref(null);
const contentImage = ref(null);
const contentImageSecond = ref(null);

const article = ref({
  title: "",
  category: "",
  content: "",
  content_second: "",
  content_third: "",
  caption: "",
  caption_second: "",
  url1: "",
  url2: "",
  url3: "",
  url4: "",
  is_published: false,
});
const categories = ["news", "event", "seasonal", "information"];
const backenderrors = ref([]);

async function onSubmit() {
  backenderrors.value = [];
  store.commit("setLoading", true);
  const formData = new FormData();
  formData.append("title", article.value.title);
  formData.append(
    "category",
    article.value.category ? article.value.category : ""
  );
  formData.append("caption", article.value.caption);
  formData.append("caption_second", article.value.caption_second);
  if (headerImage.value) {
    formData.append("header_image", headerImage.value);
  }
  formData.append("content", article.value.content);
  if (contentImage.value) {
    formData.append("content_image", contentImage.value);
  }
  formData.append("content_second", article.value.content_second);
  if (contentImageSecond.value) {
    formData.append("content_image_second", contentImageSecond.value);
  }
  formData.append("content_third", article.value.content_third);
  formData.append("url1", article.value.url1);
  formData.append("url2", article.value.url2);
  formData.append("url3", article.value.url3);
  formData.append("url4", article.value.url4);
  formData.append("is_published", article.value.is_published);

  const response = route.params.slug
    ? await apiCall(
        "put",
        "/articles/" + route.params.slug + "/",
        formData,
        true
      )
    : await apiCall("post", "/articles/", formData, true);
  store.commit("setLoading", false);
  const success =
    response.status == 200
      ? "article updated"
      : response.status == 201
      ? "article created"
      : "";
  if (success) {
    alert(success, "positive", "dark");
    router.push("/articles");
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
async function loadData() {
  if (route.params.slug) {
    const response = await apiCall("get", "/articles/" + route.params.slug);
    if (response.status == 200) {
      for (const [key, value] of Object.entries(article.value)) {
        article.value[key] = response.data[key];
      }
    }
  }
}

onMounted(loadData);
</script>
