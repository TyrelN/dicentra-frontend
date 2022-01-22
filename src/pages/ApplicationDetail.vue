<template>
  <div class="q-pt-xl center" style="">
    <div
      style="border-radius: 25px"
      class="text-center flex flex-center q-ma-xl q-pa-xl shadow-14"
    >
      <object
        v-if="loader"
        width="150px"
        height="130px"
        type="image/svg+xml"
        data="loadingcatcss.svg"
        class="absolute-center"
      ></object>
      <div v-else class="row q-mx-xs">
        <div class="col-12 q-pa-md">
          <div v-for="[key, value] in Object.entries(answers)" :key="key">
            <div class="text-dark">{{ key }}</div>
            <q-input
              dense
              readonly
              color="positive"
              outlined
              autogrow
              label-color="dark"
              :label="value ? value.toString() : ''"
              hint=""
            />
          </div>
        </div>
      </div>
      <div class="text-subtitle2 q-my-lg">
        You can sort the applications into accepted, rejected and undecided
        here:
      </div>
      <q-btn-toggle
        v-if="isAuthenticated"
        spread
        push
        class="q-my-lg"
        style="margin: auto; width: 100%"
        v-model="status"
        toggle-color="positive"
        toggle-text-color="dark"
        :options="[
          { label: 'Approve', value: 'approved' },
          { label: 'Undecided', value: 'in_process' },
          { label: 'Reject', value: 'rejected' },
        ]"
      />
      <q-btn
        v-if="isAuthenticated"
        dense
        size="14px"
        color="positive"
        text-color="dark"
        :loading="loading"
        @click="approveApplication"
        class="shadow-12 q-ma-md"
        padding="12px"
        style="border-radius: 10px; width: 300px"
        >Update Status</q-btn
      >
    </div>
  </div>
</template>

<script setup>
import { apiCall } from "../utils/apiFunctions.js";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import alert from "../utils/alert";
import {
  adoptQuestions,
  fosterQuestions,
  volunteerQuestions,
} from "../utils/questions";
import { useMeta } from "quasar";
useMeta({
  title: "Application Detail",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"The details of a specific application"}
  }
});
const loader = ref(false);
const store = useStore();
const route = useRoute();
const router = useRouter();
const loading = computed(() => store.getters.loading);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const status = ref("in_process");
const answers = ref({});
const applicationData = ref({ question1: "yes" });
const props = defineProps({
  slug: String,
  formtype: String,
});

let questionsToMap = {};
const tempMap = new Map();

//sets the state of an application (reject, undecided or accepted)
async function approveApplication() {
  store.commit("setLoading", true);
  const formData = new FormData();
  formData.append("status", status.value);
   const response = await apiCall("patch", "/" + route.params.formtype + "/" + route.params.slug + "/", formData);
    store.commit("setLoading", false);
      if(response.status == 200){
      alert("Application status updated", "dark", "primary");
      router.push("/applicationlist");
      }
}


async function loadData() {
  loader.value = true;
  const response = await apiCall("get", "/"+route.params.formtype + "/" + route.params.slug);
  if (response.status == 200) {
    applicationData.value = response.data;
    //determine which set of questions to use when mapping
      switch (route.params.formtype) {
        case "adoptforms":
          questionsToMap = adoptQuestions;
          break;
        case "fosterforms":
          questionsToMap = fosterQuestions;
          break;
        case "volunteerforms":
          questionsToMap = volunteerQuestions;
          break;
      }
      //by giving application data and questions from questions.js the same key name, we can bind each question to each answer
      for (const key in questionsToMap) {
        tempMap.set(`${questionsToMap[key]}`, applicationData.value[key]);
        answers.value = Object.fromEntries(tempMap);
      }
  }
  loader.value = false;
}

onMounted(loadData);
</script>
