<template>
  <div
    class="q-mt-lg"
    style="max-width: 500px margin: auto; text-align: center"
  >
  <div class="text-h3 text-center">Help Wanted</div>
      <div class="text q-ma-md">
        Our posts are consistently updated!
      </div>
    <q-btn
      v-if="isAuthenticated"
      dense
      size="14px"
      color="positive"
      text-color="dark"
      @click="$router.push('/helpwantedadmin')"
      class="shadow-12 q-ma-md"
      padding="12px"
      style="border-radius: 10px; width: 300px"
      >create a wanted ad</q-btn
    >
    <object
      v-if="loader"
      width="250px"
      height="230px"
      type="image/svg+xml"
      data="loadingcatcss.svg"
      class="absolute-center"
    ></object>
    <q-intersection
      v-else
      v-for="ad in wantedAds"
      :key="ad.slug"
      once
      transition="scale"
      class="q-py-sm"
      style="margin: auto; max-width: 600px"
    >
      <q-card class="shadow-12 bg-primary q-ma-sm text-dark">
        <q-btn flat stretch style="width: 100%" @click="ad.show = !ad.show">
          <div class="text-h5 text-center" style="margin: auto">
            {{ ad.title }}
          </div>
        </q-btn>

        <q-slide-transition>
          <div v-show="ad.show">
            <q-separator />
            <q-card-section class="text" style="white-space: pre-wrap">
              {{ ad.description }}
            </q-card-section>

            <q-card-actions>
              <q-btn
                @click="$router.push('/forms/' + ad.title)"
                outline
                color="dark"
                label="Apply"
              />
            </q-card-actions>
            <q-card-actions v-if="isAuthenticated" class="text-negative">
              <q-btn @click="$router.push('/helpwantedadmin/' + ad.slug)" flat
                >Update</q-btn
              >
              <q-space></q-space>
              <q-btn @click="deleteWantedPost(ad.slug)" flat>Delete</q-btn>
            </q-card-actions>
          </div>
        </q-slide-transition>
      </q-card>
    </q-intersection>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import alert from "../utils/alert";
import { apiCall } from "../utils/apiFunctions.js";
import { useMeta } from "quasar";
useMeta({
  title: "Help Wanted",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"View the volunteer positions we are currently in need of"}
  }
});
const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const wantedAds = ref([]);
const $q = useQuasar();
const loader = ref(false);
const expanded = ref(false);

async function getWantedAds() {
  loader.value = true;
  const response = await apiCall("get", "/wantedads/");
  loader.value = false;
  if(response.status == 200){
  wantedAds.value = response.data;
  wantedAds.value.forEach((element) => (element.show = false));
  }
  // api
  //   .get("/api/v1/wantedads/")
  //   .then((response) => {
  //     wantedAds.value = response.data;
  //     wantedAds.value.forEach((element) => (element.show = false));
  //     loader.value = false;
  //   })
  //   .catch((error) => {
  //     loader.value = false;
  //     alert(error.message, "red-5", "primary");
  //   });
}
function deleteWantedPost(slug) {
  $q.dialog({
    title: "Delete",
    message: `Are you sure you want to delete this Wanted Post?`,
    class: "bg-dark text-primary",
    cancel: true,
  })
    .onOk(async () => {
      const response = await apiCall("delete", "/wantedads/" + slug);
      if(response.status == 204){
        getWantedAds();
      }
    })
    .onCancel(() => {});
}
onMounted(getWantedAds);
</script>
