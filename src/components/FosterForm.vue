<template>
  <div class="row q-mx-xs" id="foster">
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div>{{fosterQuestions.question1}}</div>
      <q-field
     @blur="localUpdate"
      hide-bottom-space
        v-model="questions.question1"
        borderless
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
          
            v-model="questions.question1"
            :options="photoOptions"
            color="positive"
          />
        </template>
      </q-field>
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question2}}</div>
      <q-field
      @blur="localUpdate"
      hide-bottom-space
        v-model="questions.question2"
        borderless
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
            name="accepted_genres"
            v-model="questions.question2"
            :options="drivingOptions"
            color="positive"
          />
        </template>
      </q-field>
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{fosterQuestions.question3}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        v-model="questions.question3"
        hint=""
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'This field is required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{fosterQuestions.question4}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        v-model="questions.question4"
        hint=""
        
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question5}}</div>
      <q-select
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question5"
        :options="housingTypeOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question6}}</div>
      <q-select
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question6"
        :options="housingOwnerOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>

    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question7}}</div>
      <q-select
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question7"
        :options="noiseOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question8}}</div>

      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question8"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question9}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model.number="questions.question9"
        hint="eg. 37 years old"
        :rules="[
          (val) =>
            (val && val.toString().length > 0 ) ||
            'This field is required',
        ]"
      />
    </div>

    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question10}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question10"
        hint="eg: previously raised kittens, currently have dogs"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question11}}</div>

      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question11"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{fosterQuestions.question12}}</div>
      <q-select
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question12"
        :options="frequencyOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{fosterQuestions.question13}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question13"
        hint="eg: An empty guest room, a bathroom"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{fosterQuestions.question14}}
      </div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question14"
        hint="eg: John 6, Carol 8"
        
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'This field is required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{fosterQuestions.question15}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question15"
        hint="If so, please list their ages, sex, personality and whether spayed/neutered"
        
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{fosterQuestions.question16}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        v-model="questions.question16"
        hint="If so, please list name, age, sex, and personality"
        
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-px-lg q-pt-md text-center">
      <div>
        By submitting this form, I agree that all information on this
        application is true and complete with a complete understanding of all
        questions. I further Understand that any falsified information will
        terminate the foster process. I authorize the release of any records
        relating to the above information. NVARS reserves the right to refuse
        any application they deem unsatisfactory. The completion of this form
        does not guarantee that I will be able to foster for NVARS.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {fosterQuestions} from '../utils/questions'
const questions = ref({
  question1: "",
  question2: "",
  question3: "",
  question4: "",
  question5: "",
  question6: "",
  question7: "",
  question8: "",
  question9: "",
  question10: "",
  question11: "",
  question12: "",
  question13: "",
  question14: "",
  question15: "",
  question16: "",
});

defineExpose({
  questions,
});
const yesNoOptions = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];
const drivingOptions = [
  {
    label: `I have a car`,
    value: "I have a car",
  },
  {
    label: "I would take public transit",
    value: "I would take public transit",
  },
  {
    label: "I have no means of transportation",
    value: "I have no means of transportation",
  },
];
const photoOptions = [
  {
    label: `I have a smartphone`,
    value: "phone",
  },
  {
    label: "I have a camera",
    value: "camera",
  },
  {
    label: "I have neither",
    value: "neither",
  },
];

const frequencyOptions = [
  "Very often",
  "Often",
  "Occasionally",
  "Not that often",
];
const noiseOptions = ["Silent", "Quiet", "Noise", "Very Noisy"];
const housingTypeOptions = ["House", "Condo", "Mobile Home", "Apartment"];
const housingOwnerOptions = ["Own", "Rent", "Live with Parents"];

function load() {
  if (localStorage.getItem("fquestions")) {
    try {
      const loadedData = JSON.parse(localStorage.getItem("fquestions"));
      Object.assign(questions.value, loadedData);
    } catch (error) {
      localStorage.removeItem("fquestions");
    }
  }
}
function localUpdate() {
  const parsed = JSON.stringify(questions.value);
  localStorage.setItem("fquestions", parsed);
}
onMounted(load);
</script>
