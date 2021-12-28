<template>
  <div
    style="justify-content: center; margin: auto; align-items: center; max-width: 900px"
  >
   <object
      v-if="loader"
      width="250px"
      height="230px"
      type="image/svg+xml"
      data="loadingcatcss.svg"
      class="absolute-center"
    ></object>
    <div
      v-else
      class="q-ma-xl q-pa-xl shadow-14 text-center"
      style="border-radius: 25px"
    >
      <div class="text-h3 text-dark q-mb-sm">{{ article.title }}</div>
      <p class="text-subtitle2 text-dark q-mb-xl">{{ article.category }}</p>
      <q-img
        v-if="article.header_image"
        class="col-7"
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
        class="col-7"
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
        class="col-7"
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
      <q-img
        v-if="article.content_image_third"
        class="col-7"
        :src="article.content_image_third"
      >
      </q-img>
      <div v-if="article.caption_third" class="text-subtitle text-center">
        {{ article.caption_third }}
      </div>
      <p
        v-if="article.url1"
        class="text-body text text-dark q-pa-sm"
        style="white-space: pre-wrap"
      >
        links:
      </p>
      <a v-if="article.url1" :href="article.url1" target="_blank">
        {{ article.url1 }}
      </a>
      <a v-if="article.url2" :href="article.url2">
        {{ article.url2 }}
      </a>
      <a v-if="article.url3" :href="article.url3">
        {{ article.url3 }}
      </a>
      <a v-if="article.url4" :href="article.url4">
        {{ article.url4 }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { api } from "../boot/axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const loader = ref(false);
const props = defineProps({
  slug: String,
});
const article = ref({});

async function getArticle() {
  loader.value = true;
  api
    .get("/api/v1/articles/" + route.params.slug)
    .then((response) => {
      article.value = response.data;
      loader.value = false;
    })
    .catch((error) => {
      alert(error.message, "red-5", "primary");
      loader.value = false;
    });
}

onMounted(getArticle);
</script>
