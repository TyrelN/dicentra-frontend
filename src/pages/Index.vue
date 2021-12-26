<template>
  <div>
    <div
      class="relative-position"
      style="bottom: 8vh"
    >
      <video autoplay="" loop="" muted="true" id="myVideo" poster="../assets/cat20re.webp">
        <source
          src="https://res.cloudinary.com/nicola-valley-animal-rescue/video/upload/c_crop,dpr_auto,f_auto,q_auto:good,w_1366/v1639353531/media/spooky1080Optimized_dbcchl.mp4"
          type="video/mp4; codecs=hvc1"
        />
        <source
          src="https://res.cloudinary.com/nicola-valley-animal-rescue/video/upload/c_crop,dpr_auto,f_auto,q_auto:good,w_1366/v1639353531/media/spooky1080Optimized_dbcchl.mp4"
          type="video/webm; codecs=vp9"
        />
      </video>
      <div
        class="bg-info q-pa-md absolute-bottom text-primary text-center"
        style=""
      >
        <div class="text-h3" style="font-size: 3rem">
          Nicola Valley Animal Rescue
        </div>
        <div class="text-subtitle1 q-ma-sm">
          Please spay and neuter your pets!
        </div>
      </div>
    </div>

    <div class="relative-position text-center">
      <object 
        v-if="loader"
        width="250px"
        height="230px"
        type="image/svg+xml"
        data="loadingcatcss.svg"
      ></object>
      <div v-else class="relative-position q-mx-xl q-px-xl" style="bottom: 6vh">
        <div class="row">
          <div class="text-h4" style="opacity: 0.6; width: 100%">
            What's new:
          </div>

          <div class="col-xs-12 col-md-6 text-left q-pl-xl">
            <div class="q-ma-xl text3" style="opacity: 0.6">
              {{ current.message }}
            </div>
          </div>
          <div class="col-xs-12 col-md-6 q-pa-md">
            <q-img
              loading="eager"
              height="40vh"
              style="border-radius: 10px"
              :src="current.get_image"
            />
          </div>
        </div>

        <div style="margin: auto; text-align: center">
          <q-btn
            v-if="isAuthenticated"
            dense
            size="14px"
            color="positive"
            text-color="dark"
            @click="$router.push('/currenteventadmin')"
            class="shadow-12 q-ma-md"
            padding="12px"
            style="border-radius: 10px; width: 300px"
            >Post a current event</q-btn
          >
        </div>
      </div>
      <div class="q-mx-md q-px-xl text-center">
        <div class="text-h2 q-mt-lg" style="opacity: 0.6">
          Make a Difference
        </div>
        <div
          class="row items-center"
          style="
            justify-content: center;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
          "
        >
          <div
            class="col-sm-12 col-md-3 q-pa-md q-mx-md q-my-lg text shadow-14"
            style="
              opacity: 0.6;
              border-radius: 10px;
              max-height: 500px;
              min-height: 390px;
            "
          >
            <h4 class="text-weight-medium">Adopt</h4>
            <div class="q-pa-sm text text-weight-medium">
              Good homes are always in demand. We have plenty of animals that
              are looking for lifelong partners.
            </div>
          </div>
          <div
            class="col-sm-12 col-md-3 q-pa-md q-mx-md q-my-lg text shadow-14"
            style="
              opacity: 0.6;
              border-radius: 10px;
              max-height: 500px;
              min-height: 390px;
            "
          >
            <h4 class="text-weight-medium">Foster</h4>
            <div class="q-pa-sm text-weight-medium text">
              We are always looking for nuturing foster homes that can help us
              land cats into their lifelong homes.
            </div>
          </div>
          <div
            class="col-sm-12 col-md-3 q-pa-md q-mx-md q-my-lg text shadow-14"
            style="
              opacity: 0.6;
              border-radius: 10px;
              max-height: 500px;
              min-height: 390px;
            "
          >
            <h4 class="text-weight-medium">Volunteer</h4>
            <div class="q-pa-sm GL__toolbar-link text-weight-medium text">
              Volunteers are our lifeline for the animals! Check out our
              <router-link to="/helpwanted" class="text-black"
                >help wanted page</router-link
              >
              to see positions we need filled!
            </div>
          </div>
        </div>

        <q-btn
          class="q-ma-xl"
          @click="$router.push('/forms')"
          color="dark"
          style="width: 200px"
        >
          Apply Here
        </q-btn>
      </div>
      <div class="q-mx-xl" style="margin: auto; max-width: 850px">
        <div class="col q-mx-lg q-mt-lg">
          <q-img style="border-radius: 10px" src="../assets/luckyspooky.webp" />
        </div>
      </div>

      <div class="q-ma-lg q-pa-lg text-h2" style="opacity: 0.6">
        Stay Informed
      </div>
      <div
        class="relative-position q-ma-xl q-px-xl center"
        style="border-radius: 25px; font-size: 24px"
      >
        <div class="q-mx-md q-mb-xl" style="opacity: 0.6">
          Our articles section hosts informative posts about animal care,
          upcoming events and more! Stay tuned for plenty of useful tips, tricks
          and opportunities!
        </div>
        <div class="q-mx-md q-mb-xl" style="opacity: 0.6">
          If you notice any stray or feral cats in the Nicola Valley, please
          contact us at info@NVARS.org. The sooner we know the better we can
          help!
        </div>

        <q-btn
          @click="$router.push('/articles')"
          class="q-mb-lg"
          color="dark"
          style="width: 200px"
        >
          View Articles
        </q-btn>
      </div>
      <div class="q-mx-xl" style="margin: auto; max-width: 850px">
        <div class="col q-mx-lg q-mt-lg">
          <q-img style="border-radius: 10px" src="../assets/cat8re.webp" />
        </div>
      </div>
      <div class="center relative-position" style="top: 40px">
        <div class="q-mb-lg text-h2" style="opacity: 0.6">Donate</div>

        <div class="q-mx-xl q-mb-xl text" style="opacity: 0.6; font-size: 24px">
          We are always thankful for any donations contributed to our rescue.
          Every contribution made aids us in saving animals and improving the
          valley.
        </div>

        <q-btn
          @click="$router.push('/donate')"
          color="dark"
          style="width: 200px"
        >
          Donate
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style lang="sass">

#myVideo
  width: 100%
  height: 50vh
  object-fit: cover
</style>

<script setup>
import { useQuasar } from "quasar";
import { api } from "../boot/axios.js";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const $q = useQuasar();
const current = ref({});
const loader = ref(false);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
async function getCurrent() {
  loader.value = true;
  api
    .get("/api/v1/currentevent/")
    .then((response) => {
      loader.value = false;
      current.value = response.data[0];
      console.log(JSON.stringify(current.value))
    })
    .catch((error) => {
      loader.value = false;
      $q.notify({
        color: "red-5",
        textColor: "white",
        message: error.message,
      });
    });
}
onMounted(getCurrent);
</script>
