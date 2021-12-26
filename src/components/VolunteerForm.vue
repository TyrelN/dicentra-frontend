<template>
  <div class="row q-mx-xs" style="">
     <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question1}}</div>
      <q-input
        dense
        color="positive"
        outlined
        @blur="localUpdate"
        hint="eg. Photographer"
        v-model="questions.question1"
        label="optional"
      />
    </div>
     <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question2}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        hint="eg. Took photos at a wedding"
        v-model="questions.question2"
        label="optional"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question3}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question3"
        label="optional"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question4}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question4"
        label="optional"
      />
    </div>

    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question5}}</div>
      <q-select
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        v-model="questions.question5"
        :options="frequencyOptions"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Field required',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question6}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        v-model="questions.question6"
        mask="####-##-##"
        label="yyyy-mm-dd"
        
        :rules="
          [(v) => /^-?[\d]+[-][0-1]\d[-][0-3]\d$/.test(v)] || 'Date required'
        "
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date color="positive" v-model="questions.question6" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question7}}</div>
 <q-field
 @blur="localUpdate"
      hide-bottom-space
        v-model="questions.question7"
        borderless
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
          <q-option-group
        name="accepted_genres"
        v-model="questions.question7"
        :options="yesNoOptions"
        color="positive"
        inline
      />
        </template>
      </q-field>
     
    </div>
    <div class="col-xs-12 col-md-6 q-pa-md">
      <div class="">{{volunteerQuestions.question8}}</div>
<q-field
@blur="localUpdate"
      hide-bottom-space
        v-model="questions.question8"
        borderless
        
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:control>
        <q-option-group
        name="accepted_genres"
        v-model="questions.question8"
        :options="drivingOptions"
        color="positive"
        inline
      />
        </template>
      </q-field>
     

    </div>

    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{volunteerQuestions.question9}}
      </div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question9"
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{volunteerQuestions.question10}}
      </div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        v-model="questions.question10"
        hint="Eg: Sparkles, cat, 3yrs, male, spayed / not applicable"
        
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Please type n/a if you are not caring for any animals!',
        ]"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{volunteerQuestions.question11}}</div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question11"
        hint="Eg: grew up with dogs and cats"
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{volunteerQuestions.question12}}
      </div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        type="textarea"
        v-model="questions.question12"
        hint="Eg: Volunteered at NVAR, cleaning bedding and feeding cats for two years"
        
        :rules="[(val) => (val && val.length > 0) || 'Field required']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">{{volunteerQuestions.question13}}</div>
      <q-input
     @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question13"
        hint="Eg: skiing, hiking, carpentry"
        
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div class="col-xs-12 col-md-12 q-pa-md">
      <div class="">
        {{volunteerQuestions.question14}}
      </div>
      <q-input
      @blur="localUpdate"
        dense
        color="positive"
        outlined
        autogrow
        v-model="questions.question14"
        label="Optional"
        lazy-rules
      />
    </div>
      <div class="col-xs-12 col-md-12 q-px-md q-pt-md text-center"> 
        <div class="q-mb-lg">By submitting this form I hereby agree to abide by the following policies during the time I am volunteering for NVARS: I understand it is my decision to volunteer for NVARS, and will not hold NVARS, or any of its members, liable for any damage injury or harm caused directly or indirectly through my volunteer activities with NVARS.
          </div>
          <div class="q-pa-sm">1. I will remember that in all my dealings with the public as a volunteer, I am representing NVARS, and that the public will consider my words and actions regarding rescue activities representative of the attitude and position of NVARS as an organization. If I enter into activities of a political or controversial nature, I am doing so as an individual, seperate from NVARS and these activites should not occur at any NVARS event. </div>
           <div class="q-pa-sm">2. I will always remember that I represent a non-profit organization and cannot profit from any activity related to the organization. </div>
           <div class="q-pa-sm">3. I understand that NVARS cannot guarantee or be held responsible for the health, behavior or temperament of any rescue cat I may handle.</div>
          <div class="q-pa-sm">4. I attest that the statements and information in this Application are accurate to the best of my knowledge. I understand by signing below I agree to the policies as set forth in the NVARS Volunteer Application.</div>
          </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {volunteerQuestions} from '../components/questions'
const route = useRoute();
const props = defineProps({
  position: String
});
const questions = ref({
  question1: route.params.position,
  question2: '',
 question3: '',
 question4: '',
 question5: '',
 question6: '',
 question7: '',
 question8: '',
 question9: '',
 question10: '',
 question11: '',
question12: '',
 question13: '',
 question14: '',
});
defineExpose({
 questions
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
    label: `I have a license and vehicle`,
    value: "license&vehicle",
  },
  {
    label: "I have a license but no vehicle",
    value: "license",
  },
  {
    label: "I have a vehicle but no license",
    value: "vehicle",
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
function load(){
  if(localStorage.getItem('vquestions')){
      try{
        const loadedData = JSON.parse(localStorage.getItem('vquestions'))
        Object.assign(questions.value, loadedData);
        if(route.params.position){
          questions.value["question1"] = route.params.position
        }
      }catch(error){
        localStorage.removeItem('vquestions');
      }
  }
}
function localUpdate(){
  const parsed = JSON.stringify(questions.value)
  localStorage.setItem('vquestions', parsed);
}
onMounted(load);
</script>
