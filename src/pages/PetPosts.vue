<template>
  <div class="q-pa-md">
    <div style="margin: auto; text-align: center">
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
      width="250px"
      height="230px"
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
          <q-img :src="pet.get_thumbnail_image">
            <q-card-actions align="around" class="absolute-bottom">
              <div dense flat class="text-h6 text-primary">{{ pet.name }}</div>
              <q-btn
                dense
                outline
                text-color="primary"
                @click="displayDetails(pet)"
                class="text-caption q-ml-sm"
                >details</q-btn
              >
            </q-card-actions>
          </q-img>
          <q-card-actions v-if="isAuthenticated">
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
import { api } from "../boot/axios.js";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import alert from "../components/alert";
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
  api
    .get(
      "/api/v1/petposts?is_published=" + (published.value ? "True" : "False")
    )
    .then((response) => {
      pets.value = response.data;
      loader.value = false;
    })
    .catch((error) => {
      alert(error.message, "red-5", "primary");
      loader.value = false;
    });
}
function deletePetPost(slug) {
  $q.dialog({
    title: "Delete",
    message: `Are you sure you want to delete this post?`,
    class: "bg-dark text-primary",
    cancel: true,
  })
    .onOk(() => {
      api
        .delete("/api/v1/petposts/" + slug)
        .then((response) => {
          getPetPosts();
        })
        .catch((error) => {
          alert(error.message, "red-5", "primary");
        });
    })
    .onCancel(() => {});
}
onMounted(getPetPosts);
</script>
