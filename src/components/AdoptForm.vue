<template>
  <div class="row q-mx-xs" style="">
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question1}}</div>
      <q-select
        @blur="localUpdate"
        ref="q1"
        dense
        color="positive"
        outlined
        v-model="questions.question1"
        :options="noiseOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question2}}</div>
      <q-select
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question2"
        :options="housingTypeOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question3}}</div>
      <q-select
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question3"
        :options="housingOwnerOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question4}}</div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question4"
        label="optional"
        hint="if so, please list them"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question5}}</div>
      <q-field
        @blur="localUpdate"
        hide-bottom-space
        v-model="questions.question5"
        borderless
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
            name="accepted_genres"
            v-model="questions.question5"
            :options="yesNoOptions"
            color="positive"
            inline
          />
        </template>
      </q-field>
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question6}}</div>
      <q-field
        @blur="localUpdate"
        hide-bottom-space
        v-model="questions.question6"
        borderless
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
            name="accepted_genres"
            v-model="questions.question6"
            :options="yesNoOptions"
            color="positive"
            inline
          />
        </template>
      </q-field>
    </div>

    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{adoptQuestions.question7}}
      </div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        hint="type no or n/a if not applicable"
        v-model="questions.question7"
        :rules="[
          (val) =>
            !!val ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{adoptQuestions.question8}}</div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question8"
        :rules="[
          (val) =>
            !!val ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{adoptQuestions.question9}}
      </div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        type="number"
        v-model="questions.question9"
       :rules="[
          (val) =>
            !!val ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{adoptQuestions.question10}}</div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question10"
        :rules="[
          (val) =>
            !!val ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{adoptQuestions.question11}}</div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question11"
        hint="Eg: 8, 12, 14 years old | or n/a"
        
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question12}}</div>
      <q-field
        @blur="localUpdate"
        hide-bottom-space
        borderless
        v-model="questions.question12"
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
            name="accepted_genres"
            v-model="questions.question12"
            :options="yesNoOptions2"
            color="positive"
            inline
          />
        </template>
      </q-field>
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{adoptQuestions.question13}}</div>
      <q-field
        @blur="localUpdate"
        hide-bottom-space
        v-model="questions.question13"
        borderless
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
            name="accepted_genres"
            v-model="questions.question13"
            :options="yesNoOptions"
            color="positive"
            inline
          />
        </template>
      </q-field>
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{adoptQuestions.question14}}</div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        v-model="questions.question14"
        hint="include name, species age and personality, or n/a if none"
        
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{adoptQuestions.question15}}
      </div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        hint="if not applicable, type n/a"
        v-model="questions.question15"
        
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{adoptQuestions.question16}}
      </div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        v-model="questions.question16"
        hint="if not applicable, type n/a"
        
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{adoptQuestions.question17}}</div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question17"
        hint="if not applicable, type n/a"
        :rules="[(val) => (val && val.length > 0) || 'Please type something (such as n/a)']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{adoptQuestions.question18}}
      </div>
      <q-field
        @blur="localUpdate"
        hide-bottom-space
        borderless
        v-model="questions.question18"
        hint="if not applicable, type n/a"
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
            name="accepted_genres"
            v-model="questions.question18"
            :options="yesNoOptions"
            color="positive"
            inline
          />
        </template>
      </q-field>
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{adoptQuestions.question19}}
      </div>
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question19"
        hint="eg: I will care for the cat and my wife will cover the costs"
        
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-px-md q-pt-md text-center">
      <div>Please provide the name and phone number of your family vet</div>
    </div>

    <div class="col-xs-12 col-md-6 q-px-md">
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question20Name"
        :label="adoptQuestions.question20Name"
        hint=""
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-px-md">
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question20Phone"
        :label="adoptQuestions.question20Phone"
        hint=""
        mask="(###) ### - ####"
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-px-md q-pt-md text-center">
      <div>
        Please provide two names and phone numbers for NON FAMILY MEMBER
        references
      </div>
    </div>

    <div class="col-xs-12 col-md-6 q-px-md">
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question21Ref"
        label="Reference 1 Name"
        hint=""
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-px-md">
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question21Phone"
        label="Reference 1 Number"
        hint=""
        mask="(###) ### - ####"
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-px-md">
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question21Ref2"
        label="Reference 2 Name"
        hint=""
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-px-md">
      <q-input
        @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question21Phone2"
        label="Reference 2 Number"
        hint=""
        mask="(###) ### - ####"
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-px-md q-pt-md text-center">
      <div>
        By submitting this form, I agree that all information on this
        application is true and complete with a complete understanding of all
        questions. I further understand that any falsified information will
        terminate the adoption process. I understand that I am not guaranteed a
        specific cat, regardless of their availability, and must cooperate with
        NVARS in an arrangement that best suits the animals. I authorize the
        release of any records relating to the above information. NVARS reserves
        the right to refuse any application they deem unsatisfactory. The
        completion of this form does not guarantee that I will be able to adopt
        an animal with NVARS.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {adoptQuestions} from '../utils/questions'
const questions = ref({
  question1: "",
  question2: "",
  question3: "",
  question4: "",
  question5: "",
  question6: "2021/11/11",
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
  question17: "",
  question18: "",
  question19: "",
  question20Name: "",
  question20Phone: "",
  question21Ref: "",
  question21Phone: "",
  question21Ref2: "",
  question21Phone2: "",
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
const yesNoOptions2 = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
  {
    label: "I do not have kids",
    value: "I do not have kids",
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
  if (localStorage.getItem("aquestions")) {
    try {
      const loadedData = JSON.parse(localStorage.getItem("aquestions"));
      Object.assign(questions.value, loadedData);
    } catch (error) {
      localStorage.removeItem("aquestions");
    }
  }
}
function localUpdate() {
  const parsed = JSON.stringify(questions.value);
  localStorage.setItem("aquestions", parsed);
}
onMounted(load);
</script>
