<template>
  <div>
    <div class="text-h6 q-my-lg text-center">Application Filter</div>
    <q-btn-toggle
      v-if="isAuthenticated"
      spread
      push
      class="q-my-lg shadow-12 q-ma-md"
      style=""
      v-model="status"
      @click="refreshFilter"
      color="primary"
      text-color="dark"
      toggle-color="dark"
      toggle-text-color="primary"
      :options="[
        { label: 'Approved', value: 'approved' },
        { label: 'Undecided', value: 'in_process' },
        { label: 'Rejected', value: 'rejected' },
      ]"
    />
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
      class="q-pa-md"
      style="max-width: 500px margin: auto; text-align: center"
    >
      <q-intersection
        v-for="adopt in adoptApps"
        :key="adopt.slug"
        once
        transition="scale"
        class=""
      >
        <q-btn
          @click="
            $router.push('/applicationdetail/' + adopt.slug + '/adoptforms')
          "
          class="shadow-12 bg-primary q-ma-xl"
          style="width: 60%"
        >
          <div class="text-h6 text-center" style="margin: auto">
            {{ adopt.firstname }}'s Adoption Application
          </div>
        </q-btn>
      </q-intersection>
      <q-intersection
        v-for="foster in fosterApps"
        :key="foster.slug"
        once
        transition="scale"
        class=""
      >
        <q-btn
          @click="
            $router.push('/applicationdetail/' + foster.slug + '/fosterforms')
          "
          class="shadow-12 bg-primary q-ma-xl"
          style="width: 60%"
        >
          <div class="text-h6 text-center" style="margin: auto">
            {{ foster.firstname }}'s Foster Application
          </div>
        </q-btn>
      </q-intersection>
      <q-intersection
        v-for="volunteer in volunteerApps"
        :key="volunteer.slug"
        once
        transition="scale"
        class=""
      >
        <q-btn
          @click="
            $router.push(
              '/applicationdetail/' + volunteer.slug + '/volunteerforms'
            )
          "
          class="shadow-12 bg-primary q-ma-xl"
          style="width: 60%"
        >
          <div class="text-h6 text-center" style="margin: auto">
            {{ volunteer.firstname }}'s Volunteer Application
          </div>
        </q-btn>
      </q-intersection>
    </div>
  </div>
</template>

<script setup>
import { apiCall } from "../utils/apiFunctions.js";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useMeta } from "quasar";
useMeta({
  title: "Applications",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"A list of applications submitted to the rescue"}
  }
});
const store = useStore();
const loader = ref(false);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const status = ref("in_process");
const fosterApps = ref([]);
const volunteerApps = ref([]);
const adoptApps = ref([]);

async function refreshFilter() {
  getApplications();
}

async function getApplications() {
  loader.value = true;
  const fosterAnswers = await apiCall("get", "/fosterforms?status=" + status.value);
  const adoptAnswers = await apiCall("get", "/adoptforms?status=" + status.value);
  const volunteerAnswers = await apiCall("get", "/volunteerforms?status=" + status.value);
  loader.value = false;
  fosterApps.value = fosterAnswers.data;
  adoptApps.value = adoptAnswers.data;
  volunteerApps.value = volunteerAnswers.data;
}
onMounted(getApplications);
</script>
