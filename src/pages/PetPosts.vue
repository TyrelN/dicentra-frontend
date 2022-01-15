<template>
  <div class="q-pa-md">
    <div style="margin: auto; text-align: center">
      <div class="text-h3 text-center q-ma-sm">Our Animals</div>
      <q-btn
        v-if="isAuthenticated"
        dense
        size="14px"
        color="positive"
        text-color="dark"
        @click="$router.push('/petpostadmin')"
        class="shadow-12 q-ma-md"
        padding="12px"
        style="border-radius: 10px; width: 300px"
        >create a pet post</q-btn
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
      width="150px"
      height="130px"
      type="image/svg+xml"
      data="loadingcatcss.svg"
      style="
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -125px;
      "
    ></object>
    <div v-else class="row justify-center q-gutter-xl">
      <q-intersection
        v-for="pet in pets"
        :key="pet.slug"
        once
        transition="scale"
        class="card-item"
      >
        <q-card class="q-mx-lg q-my-xl shadow-14">
          <q-img :src="pet.get_thumbnail_image" class="relative-position">
            <q-card-actions align="around" class="absolute-bottom">
              <q-btn flat stretch class="absolute-top" style="width: 100%; height:100%" @click="displayDetails(pet)"/>
              <div class="text-h6 text-primary">{{ pet.name }}</div>
              <div v-if="pet.available=='adopted'" class="text-h5 text-accent q-mx-md">({{ pet.available }})</div>
            </q-card-actions>
            
          </q-img>
          <q-card-actions v-if="isAuthenticated" class="text-negative">
            <q-btn @click="$router.push('/petpostadmin/' + pet.slug)" flat
              >Update</q-btn
            >
            <q-space></q-space>
            <q-btn @click="deletePetPost(pet.slug)" flat>Delete</q-btn>
          </q-card-actions>
        </q-card>
      </q-intersection>
    </div>

    <q-dialog v-model="card">
      <q-card
        class="bg-dark text-primary relative-position"
        style="width: 600px"
      >
        <q-img :src="detail.get_detail_image" />

        <q-card-section>
          <div class="text-h4 q-mx-md">{{ detail.name }}</div>
          <div class="text-subtitle q-mx-md">{{ detail.color }}</div>
          <div class="absolute-right q-pa-md q-ma-md">
            <div class="text-subtitle">
              <div>{{ detail.age }}</div>
              <div>{{ detail.sex }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-mx-lg">
            <div v-if="detail.description" class="text shadow-15 q-pa-sm">
              {{ detail.description }}
            </div>
          </div>

          <q-card-section> </q-card-section>
        </q-card-section>

        <div class="q-ma-md text-subtitle">Status: {{ detail.available }}</div>
        <q-separator />

        <q-card-actions align="between">
          <q-btn class="" @click="$router.push('/forms')" flat label="Apply" />
          <q-btn class="" v-close-popup flat label="Close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="sass" scoped>
.card-item
  height: 290px
  width: 290px
</style>

<script setup>
import { useQuasar } from "quasar";
import { apiCall } from "../utils/apiFunctions.js";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import alert from "../utils/alert";
import { useMeta } from "quasar";
useMeta({
  title: "Our Animals",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Browse a gallery of the animals that are in our care or have been adopted"}
  }
});
const $q = useQuasar();
const loader = ref(false);
const store = useStore();
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const published = ref(true);
const pets = ref([]); //array of objects from response data
const card = ref(false);
const detail = ref({});
const name = ref("");
const petImage = ref(null);
const age = ref(null);
const color = ref("");
const description = ref("");
const sex = ref("male");
const availability = ref("available");
const availableOptions = ["available", "not available", "adopted"];
const sexTypes = ["male", "female"];

function displayDetails(petDetails) {
  detail.value = petDetails;
  card.value = true;
}

async function toggleDrafts() {
  published.value = !published.value;
  getPetPosts();
}

async function getPetPosts() {
  loader.value = true;
  const response = await apiCall("get", "/petposts?is_published=" + (published.value ? "True" : "False"));
  loader.value = false;
  if(response.status == 200){
  pets.value = response.data;
  }
}
function deletePetPost(slug) {
  $q.dialog({
    title: "Delete",
    message: `Are you sure you want to delete this post?`,
    class: "bg-dark text-primary",
    cancel: true,
  })
    .onOk(async () => {
      const response = await apiCall("delete", "/petposts/" + slug);
      if(response.status == 204){
        getPetPosts();
      }
    })
    .onCancel(() => {});
}
onMounted(getPetPosts);
</script>
