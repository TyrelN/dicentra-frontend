<template>
  <div>
    <div
      v-if="$q.platform.is.mobile"
      class="relative-position"
      style="bottom: 8vh"
    >
      <q-img src="../assets/spookycrawl.webp" height="40vh" fit="cover" />
      <div class="bg-info q-pa-md absolute-bottom text-primary text-center">
        <div class="text-h3" style="font-size: 1.8rem">
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
        <div class="text-h3 q-py-md" style="font-size:3.5rem">
          Nicola Valley Animal Rescue
        </div>
      </div>
    </div>
    <div class="relative-position text-center">
      <div class="text-h3 q-mb-sm q-px-sm relative-position" style="opacity: 0.6; bottom: 2vh">Make a Difference</div>
      <div class="q-mx-md q-px-lg text-center">
        <div
          class="row items-center relative-position q-gutter-md"
          style="      
            justify-content: center;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
          "
        >
          <div
            class="col-sm-12 col-md-3 q-px-md q-mx-lg text shadow-14"
            style="
              opacity: 0.6;
              border-radius: 10px;
              max-height: 450px;
              min-height: 300px;
            "
          >
            <h4 class="text-weight-medium">Adopt</h4>
            <div class="q-px-md q-pb-md text text-weight-medium">
              Good homes are always in demand. We have plenty of animals that
              are looking for lifelong partners.
            </div>
          </div>
          <div
            class="col-sm-12 col-md-3 q-px-md q-mx-lg text shadow-14"
            style="
              opacity: 0.6;
              border-radius: 10px;
              max-height: 450px;
              min-height: 300px;
            "
          >
            <h4 class="text-weight-medium">Foster</h4>
            <div class="q-px-md q-pb-md text-weight-medium text">
              We are always looking for nuturing foster homes that can help us
              land cats into their lifelong homes.
            </div>
          </div>
          <div
            class="col-sm-12 col-md-3 q-px-md q-mx-lg text shadow-14"
            style="
              opacity: 0.6;
              border-radius: 10px;
              max-height: 450px;
              min-height: 300px;
            "
          >
            <h4 class="text-weight-medium">Volunteer</h4>
            <div class="q-px-md q-pb-md GL__toolbar-link text-weight-medium text">
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

      <div class="q-ma-lg q-pa-lg text-h3" style="opacity: 0.6">
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
      <div class="center relative-position q-py-xl" style="">
        <div class="q-mb-xl text-h3" style="opacity: 0.6">Donate!</div>

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
      <div class="relative-position q-mt-lg">
        <div class="q-mb-xl text-h3" style="opacity: 0.6">Rescue Updates</div>
        <object
        v-if="loader"
        width="150px"
        height="130px"
        type="image/svg+xml"
        data="loadingcatcss.svg"
        class="q-mt-xl"
      ></object>
      <div
        v-else-if="current"
        style="max-width: 1300px; margin: auto;"
      >
      <div class="q-mx-lg shadow-14" style="border-radius: 10px">
        <div class="row">
          <div class="col-xs-12 col-md-6 text-left">
            <div class="q-ma-xl" style="opacity: 0.6; font-size: 1.5rem">
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
      </div>
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
import { useMeta } from "quasar";
useMeta({
  title: "Home",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta: {
    description: {
      name: "description",
      content: "The home page for Nicola Valley Animal Rescue",
    },
  },
});
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
