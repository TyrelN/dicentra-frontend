<template>
  <div class="q-pt-xl text2 text-weight-medium center text-dark">
    <div style="margin: auto; text-align: center">
      <q-btn
        v-if="isAuthenticated"
        size="md"
        color="positive"
        text-color="dark"
        @click="$router.push('/applicationlist')"
        class="shadow-12"
        padding="14px"
        style="border-radius: 10px; width: 300px"
        >View Applications</q-btn
      >
    </div>
    <q-form @submit="onSubmit">
      <div
        style="border-radius: 25px"
        class="shadow-14 q-ma-xl q-px-md q-py-xl q-gutter-xl"
      >
        <div class="text-center text-h4 q-ma-xs">
          APPLY
          <div class="text-subtitle2 q-mt-md">
            All potential adopters, fosters and volunteers may fill out this
            form to apply
          </div>
        </div>
        <div class="row q-mx-xs">
          <div class="col-xs-12 col-sm-6 q-px-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.firstname"
              label="First Name"
              hint=""
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-px-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.lastname"
              label="Last Name"
              lazy-rules="ondemand"
              :rules="[
                (val) => (val && val.length > 0) || 'Field required',
                //val => val > 0 && val < 100 || 'Please type a real age'
              ]"
            />
          </div>
          <div class="col-xs-12 col-sm-8 q-pa-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.address"
              label="Street Address"
              hint=""
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-pa-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              type="number"
              v-model.number="contact.age"
              label="Age"
              hint=""
              lazy-rules="ondemand"
              :rules="[
                (val) => (val !== null && val !== '') || 'Please type your age',
                (val) => (val > 0 && val < 100) || 'Please type a real age',
              ]"
            />
          </div>
          <div class="col-xs-12 col-sm-8 q-pa-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.city"
              label="City"
              hint=""
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-pa-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.zip"
              label="Zip/Postal Code"
              hint=""
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.dayphone"
              label="Phone (day)"
              hint=""
              mask="(###) ### - ####"
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-select
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.dayphonetype"
              :options="phoneTypes"
              label="Phone Type"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.eveningphone"
              mask="(###) ### - ####"
              label="Phone (evening)"
              hint=""
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-select
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              v-model="contact.eveningphonetype"
              :options="phoneTypes"
              label="Phone Type"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-input
              @blur="localUpdate"
              dense
              color="positive"
              outlined
              type="email"
              v-model="contact.email"
              label="Email"
              hint=""
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
          <div class="col-xs-12 col-sm-6 q-pa-md">
            <q-select
              @blur="localUpdate"
              dense
              multiple
              color="positive"
              outlined
              v-model="contact.calltimes"
              :options="callTimeOptions"
              label="Preferred Call Hours"
              lazy-rules="ondemand"
              :rules="[(val) => (val && val.length > 0) || 'Field required']"
            />
          </div>
        </div>
        <div class="text-center q-ma-lg" style="">
          <div>Pick a form to fill out</div>
        </div>

        <q-btn-toggle
          spread
          push
          class="q-mt-lg"
          style="margin: auto; width: 100%"
          v-model="formType"
          toggle-color="positive"
          toggle-text-color="dark"
          :options="[
            { label: 'Adopt', value: AdoptForm },
            { label: 'Foster', value: FosterForm },
            { label: 'Volunteer', value: VolunteerForm },
          ]"
        />

        <component :is="formType" ref="activeForm" />

        <div
          class="col-12 q-pt-md flex flex-center"
          style="margin: auto; width: 100%"
        >
          <q-toggle
            color="positive"
            v-model="accept"
            label="I accept the terms of this form"
          />
        </div>
        <div
          class="col-12 q-pt-md flex flex-center"
          style="margin: auto; width: 50%"
        >
          <q-btn
            label="Submit"
            size="lg"
            :loading="loading"
            padding="0 20%"
            type="submit"
            color="positive"
            push
            text-color="secondary"
          />
          <div class="backend-errors text-negative" v-if="backenderrors.length">
            <p v-for="error in backenderrors" v-bind:key="error">{{ error }}</p>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref, shallowRef, computed, onMounted } from "vue";
import AdoptForm from "../components/AdoptForm.vue";
import FosterForm from "../components/FosterForm.vue";
import VolunteerForm from "../components/VolunteerForm.vue";
import { apiCall } from "../utils/apiFunctions.js";
import alert from "../utils/alert.js";

import { useMeta } from "quasar";
useMeta({
  title: "Apply",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta: {
    description: {
      name: "description",
      content: "Apply to volunteer, adopt or foster with our rescue",
    },
  },
});

const route = useRoute();
const props = defineProps({
  position: String,
});
const router = useRouter();
const store = useStore();
const loading = computed(() => store.getters.loading);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const $q = useQuasar();
const activeForm = ref(null); //allows the parsing of component questions in the submit function
const formType = shallowRef(AdoptForm);
const accept = ref(false);
const backenderrors = ref([]);
const phoneTypes = ["Home", "Cell", "Business"];
const callTimeOptions = ["Morning", "Afternoon", "Evening"];
let formURL = "";
const contact = ref({
  firstname: "",
  lastname: "",
  address: "",
  age: null,
  city: "",
  zip: "",
  dayphone: "",
  eveningphone: "",
  dayphonetype: "Home",
  eveningphonetype: "Home",
  email: "",
  calltimes: [],
});
let activeQuestions = "";

async function onSubmit() {
  if (accept.value !== true) {
    alert("You need to accept the license and terms first", "red-5", "primary");
  } else {
    backenderrors.value = [];
    const questions = JSON.parse(JSON.stringify(activeForm.value)).questions; //retrieves the data from the active question component (deep copy)
    const formData = combineForm(contact.value, questions);
    //now we need to post the form data to the proper url:
    switch (formType.value) {
      case AdoptForm:
        formURL = "adoptforms/";
        activeQuestions = "aquestions";
        break;

      case FosterForm:
        formURL = "fosterforms/";
        activeQuestions = "fquestions";
        break;

      case VolunteerForm:
        formURL = "volunteerforms/";
        activeQuestions = "vquestions";
        break;

      default:
        return;
    }
    store.commit("setLoading", true);
    //submit the form using the given forms questions
    //makeRequest(method, url, data, config,)
    const response = await apiCall("post", formURL, formData);
    store.commit("setLoading", false);
    if (response.status == 201) {
      alert("application created", "primary", "dark");
      //wipe the local storage answers
      localStorage.removeItem("contact");
      localStorage.removeItem(activeQuestions);
      router.push("/success");
    } else if (response.status == 400) {
      handleErrors(response);
    }
  }
}
function handleErrors(error) {
  for (const element in error.data) {
    backenderrors.value.push(`${element}: ${error.data[element]}`);
  }
}
function combineForm(contact, questions) {
  //convert every array value into a string, there is no need for an array datatype in the database
  for (const question in questions) {
    if (Array.isArray(questions[question])) {
      questions[question] = questions[question].toString();
    }
  }
  //use the spread operator to add all form entries to formData
  const combinedForm = {
    ...contact,
    //call times must be string format to match the database field
    calltimes: contact.calltimes.toString().replace(/,/g, ", "), //adds spaces to the created string from the array for readability
    ...questions, //spread operator to append every question here
  };
  return combinedForm;
}
function load() {
  if (route.params.position) {
    formType.value = VolunteerForm;
  }
  if (localStorage.getItem("contact")) {
    try {
      const loadedData = JSON.parse(localStorage.getItem("contact"));
      Object.assign(contact.value, loadedData);
    } catch (error) {
      localStorage.removeItem("contact");
    }
  }
}
function localUpdate() {
  //store contact object each time a value is set
  const parsed = JSON.stringify(contact.value);
  localStorage.setItem("contact", parsed);
}
onMounted(load);
</script>
