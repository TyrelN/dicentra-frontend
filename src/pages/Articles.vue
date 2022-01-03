<template>
  <div class="q-mt-lg">
    <div style="text-align: center;">
      <div class="text-h3 text-center q-ma-sm">Articles</div>
      <q-btn
        v-if="isAuthenticated"
        dense
        size="14px"
        color="positive"
        text-color="dark"
        @click="$router.push('/articleadmin')"
        class="shadow-12 q-ma-md"
        padding="12px"
        style="border-radius: 10px; width: 300px"
        >Create an Article</q-btn
      >
      <q-btn
        v-if="isAuthenticated"
        dense
        size="14px"
        color="dark"
        text-color="primary"
        @click="toggleDrafts"
        class="shadow-12 q-ma-md"
        padding="12px"
        style="border-radius: 10px; width: 300px"
        >{{ published ? "Show drafts" : "Hide drafts" }}</q-btn
      >
    </div>
    <object
      v-if="loader"
      width="250px"
      height="230px"
      type="image/svg+xml"
      data="loadingcatcss.svg"
      class="absolute-center"
    ></object>
    <div v-else style="margin:auto; max-width: 1130px;">
      <div v-if="latestArticle">
        <q-card v-if="$q.screen.gt.sm" class="q-ma-xl" flat>
          <q-card-section horizontal>
            <q-card-section class="col-5">
              <div class="text-h6 text-positive text-center">
                {{ latestArticle.title }}
              </div>
              <q-card-section horizontal style="opacity: 0.6">
                <div class="text-subtitle2 q-mx-sm">
                  {{ latestArticle.created_on }}
                </div>
                <q-space></q-space>
                <div class="text-subtitle2 q-mx-sm">
                  {{ latestArticle.category }}
                </div>
              </q-card-section>
              <q-separator class="q-mb-md"></q-separator>
              <div
                class="relative-position q-ma-sm q-px-md ellipsis-3-lines"
                style="overflow-wrap: break-word"
              >
                {{ latestArticle.content }}
              </div>

              <div>
                <q-card-actions>
                  <q-btn
                    @click="
                      $router.push('/articledetail/' + latestArticle.slug)
                    "
                    outline
                    color="dark q-my-md"
                    style="width: 200px"
                  >
                    Read
                  </q-btn>
                </q-card-actions>
              </div>
              <q-card-section v-if="isAuthenticated">
                <q-card-actions class="text-negative absolute-bottom">
                  <q-btn
                    @click="$router.push('/articleadmin/' + latestArticle.slug)"
                    flat
                    >Update</q-btn
                  >
                  <q-space></q-space>
                  <q-btn q-btn @click="deleteArticle(latestArticle.slug)" flat
                    >Delete</q-btn
                  >
                </q-card-actions>
              </q-card-section>
            </q-card-section>

            <q-img class="col-7" :src="latestArticle.header_image" />
          </q-card-section>
        </q-card>

        <q-card v-else class="q-ma-xl" flat>
          <q-img :src="latestArticle.header_image" />
          <q-card-section horizontal style="opacity: 0.6">
            <div class="text-subtitle2 q-mx-md">
              {{ latestArticle.created_on }}
            </div>
            <q-space></q-space>
            <div class="text-subtitle2 q-mx-md">
              {{ latestArticle.category }}
            </div>
          </q-card-section>
          <q-card-section class="text-center text-h6 q-pa-sm text-positive">
            {{ latestArticle.title }}
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-card-actions>
              <div
                class="col-8 q-px-md ellipsis-3-lines"
                style="overflow-wrap: break-word"
              >
                {{ latestArticle.content }}
              </div>
              <q-space></q-space>
              <q-btn
                @click="$router.push('/articledetail/' + latestArticle.slug)"
                outline
                class="col-4"
                color="dark"
                width="200px"
              >
                Read
              </q-btn>
            </q-card-actions>
          </q-card-section>
          <q-card-section v-if="isAuthenticated">
            <q-card-actions class="text-negative absolute-bottom">
              <q-btn
                @click="$router.push('/articleadmin/' + latestArticle.slug)"
                flat
                >Update</q-btn
              >
              <q-space></q-space>
              <q-btn @click="deleteArticle(latestArticle.slug)" flat
                >Delete</q-btn
              >
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>

      <div class="row justify-center q-gutter-xl">
        <q-intersection
          v-for="article in articles"
          :key="article.slug"
          once
          transition="scale"
          class="card-item"
        >
          <q-card class="q-mx-lg q-my-lg">
            <q-img :src="article.header_image" width="290px" height="290px"/>
            <q-card-section horizontal style="opacity: 0.6">
              <div class="text-subtitle2 q-mx-md">{{ article.created_on }}</div>
              <q-space></q-space>
              <div class="text-subtitle2 q-mx-md">{{ article.category }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-h6 text-center" style="opacity: 0.8">
                {{ article.title }}
              </div>
            </q-card-section>
            <div>
              <q-card-actions>
                <q-btn
                  @click="$router.push('/articledetail/' + article.slug)"
                  outline
                  color="dark"
                  style="width: 200px; margin: auto"
                >
                  Read
                </q-btn>
              </q-card-actions>
            </div>

            <q-card-actions v-if="isAuthenticated" class="text-negative">
              <q-btn @click="$router.push('/articleadmin/' + article.slug)" flat
                >Update</q-btn
              >
              <q-space></q-space>
              <q-btn @click="deleteArticle(article.slug)" flat>Delete</q-btn>
            </q-card-actions>
          </q-card>
        </q-intersection>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "../boot/axios";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import alert from "../utils/alert";
import { useMeta } from "quasar";
useMeta({
  title: "Articles",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Page listing articles about our animal rescue knowledge and activities"}
  }
});
const published = ref(true);
const loader = ref(false);
const store = useStore();
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const $q = useQuasar();
const latestArticle = ref({});
const articles = ref([]);

async function getArticles() {
  loader.value = true;
  api
    .get(
      "/api/v1/articles?is_published=" + (published.value ? "True" : "False")
    )
    .then((response) => {
      latestArticle.value = response.data.shift();
      articles.value = response.data;
      loader.value = false;
    })
    .catch((error) => {
      alert(error.message, "red-5", "primary");
      loader.value = false;
    });
}

async function toggleDrafts() {
  published.value = !published.value;
  getArticles();
}
function deleteArticle(slug) {
  $q.dialog({
    title: "Delete",
    message: `Are you sure you want to delete this article?`,
    class: "bg-dark text-primary",
    cancel: true,
  })
    .onOk(() => {
      api
        .delete("/api/v1/articles/" + slug)
        .then((response) => {
          getArticles();
        })
        .catch((error) => {
          alert(error.message, "red-5", "primary");
        });
    })
    .onCancel(() => {});
}

onMounted(getArticles);
</script>

