<template>
  <div
    style="
      justify-content: center;
      margin: auto;
      align-items: center;
      max-width: 900px;
    "
  >
    <object
      v-if="loader"
      width="150px"
      height="130px"
      type="image/svg+xml"
      data="../loadingcatcss.svg"
      class="absolute-center"
    ></object>
    <div
      v-else
      class="q-py-xl q-mx-md q-my-xl q-px-xl shadow-14 text-center"
      style="border-radius: 25px"
    >
      <div class="text-h3 text-dark q-mb-sm">{{ article.title }}</div>
      <p class="text-subtitle2 text-dark q-mb-xl">{{ article.category }}</p>
      <q-img
        v-if="article.header_image"
        style="max-height: 500px"
        :src="article.header_image"
      ></q-img>
      <p
        v-if="article.content"
        class="text-body text text-dark q-pa-xl"
        style="white-space: pre-wrap"
      >
        {{ article.content }}
      </p>
      <q-img
        v-if="article.content_image"
        style="max-height: 500px"
        :src="article.content_image"
      >
      </q-img>
      <div v-if="article.caption" class="text-subtitle text-center">
        {{ article.caption }}
      </div>
      <p
        v-if="article.content_second"
        class="text-body text text-dark q-pa-xl"
        style="white-space: pre-wrap"
      >
        {{ article.content_second }}
      </p>
      <q-img
        v-if="article.content_image_second"
        style="max-height: 500px"
        :src="article.content_image_second"
      >
      </q-img>
      <div v-if="article.caption_second" class="text-subtitle text-center">
        {{ article.caption_second }}
      </div>
      <p
        v-if="article.content_third"
        class="text-body text text-dark q-pa-xl"
        style="white-space: pre-wrap"
      >
        {{ article.content_third }}
      </p>
      <p
        v-if="article.url1"
        class="text-body text text-dark q-pa-sm"
        style="white-space: pre-wrap"
      >
        links:
      </p>
      <div>
      <a v-if="article.url1" :href="article.url1" target="_blank">
        {{ article.url1 }}
      </a>
      </div>
      <div>
      <a v-if="article.url2" :href="article.url2">
        {{ article.url2 }}
      </a>
      </div>
      <div>
      <a v-if="article.url3" :href="article.url3">
        {{ article.url3 }}
      </a>
      </div>
      <div>
      <a v-if="article.url4" :href="article.url4">
        {{ article.url4 }}
      </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiCall } from "../utils/apiFunctions.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMeta } from "quasar";
useMeta({
  title: "Article Detail",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta: {
    description: {
      name: "description",
      content: "Page for viewing a specific article",
    },
  },
});
const route = useRoute();
const loader = ref(false);
const props = defineProps({
  slug: String,
});
const article = ref({});

async function getArticle() {
  loader.value = true;
  const response = await apiCall("get", "/articles/" + route.params.slug);
  loader.value = false;
  if (response.status == 200) {
    article.value = response.data;
  }
}

onMounted(getArticle);
</script>
