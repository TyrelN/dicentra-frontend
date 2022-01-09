<template>
  <div>
    <div
      v-if="$q.platform.is.mobile"
      class="relative-position"
      style="bottom: 8vh"
    >
      <q-img src="../assets/spookycrawl.webp" height="40vh" fit="cover" />
      <div class="bg-info q-pa-md absolute-bottom text-primary text-center">
        <div class="text-h3" style="font-size: 2.4rem">
          Nicola Valley Animal Rescue
        </div>
      </div>
    </div>
    <div v-else class="relative-position" style="bottom: 5vh">
      <video
        preload="auto"
        autoplay=""
        loop=""
        muted="true"
        id="myVideo"
        poster="../assets/spookycrawl.webp"
      >
        <source
          src="https://res.cloudinary.com/nicola-valley-animal-rescue/video/upload/c_crop,dpr_auto,f_auto,q_auto:good,w_1700,h_600/v1639353531/media/spooky1080Optimized_dbcchl.mp4"
          type="video/mp4; codecs=hvc1"
        />
        <source
          src="https://res.cloudinary.com/nicola-valley-animal-rescue/video/upload/c_crop,dpr_auto,f_auto,q_auto:good,w_1700,h_600/v1639353531/media/spooky1080Optimized_dbcchl.mp4"
          type="video/webm; codecs=vp9"
        />
      </video>
      <div class="bg-info q-pa-md absolute-bottom text-primary text-center">
        <div class="text-h3" style="max-font-size: 3rem">
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
      <div
        v-else-if="current"
        class="relative-position q-px-lg"
        style="bottom: 4vh; max-width: 1300px; margin: auto"
      >
        <div class="row">
          <div class="col-xs-12 col-md-6 text-left">
            <div class="q-my-xl" style="opacity: 0.6; font-size: 1.5rem">
              {{ current.message }}
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <q-img
              loading="eager"
              height="45vh"
              style="border-radius: 10px"
              :src="current.get_image"
            />
          </div>
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
      <div class="text-h2 q-my-lg" style="opacity: 0.6">Make a Difference</div>
      <div class="q-mx-md q-px-lg text-center">
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
          class="q-my-xl"
          @click="$router.push('/forms')"
          color="dark"
          style="width: 200px"
        >
          Apply Here
        </q-btn>
      </div>
      <div class="q-mx-xl" style="margin: auto; max-width: 850px">
        <div class="col q-mx-md q-mt-lg q-px-md">
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
        <div class="col q-mx-md q-mt-lg q-px-md">
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { apiCall } from "../utils/apiFunctions.js";
const store = useStore();
const current = ref({});
const loader = ref(false);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
async function getCurrent() {
  //loader acts as a loading animation until requested data arrives
  loader.value = true;
  const response = await apiCall("get", "/currentevent/");
  loader.value = false;
  if (response.status == 200) {
    current.value = response.data[0]; //index 0 to ensure we retrieve the one and only data item
  }
}
onMounted(getCurrent);
</script>
