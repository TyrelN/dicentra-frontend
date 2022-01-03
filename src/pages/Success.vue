<template>
<div
    class="q-pt-xl relative-position"
    style="
      justify-content: center;
      align-items: center;
      max-width: 600px;
      margin: 0 auto;
    "
  >
    <div
      class="q-ma-xl q-pa-xl"
      style="border-radius: 25px"
      :class="`shadow-14`"
    >
   <div class="text-center text q-pa-md flex flex-center q-mb-xl">
   Your application has been submitted! We'll get back to you as soon as we can!
   </div>
    <q-btn
        dense
        size="14px"
        color="dark"
        text-color="primary"
        @click="$router.push('/')"
        class="shadow-12 q-ma-md flex flex-center"
        padding="12px"
        style="border-radius: 10px; max-width: 300px; margin:auto"
        >Return to Home</q-btn
      >
    </div>
</div>
</template>

<script setup>
import { useMeta } from "quasar";
useMeta({
  title: "Success",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Successful applications lead to this page"}
  }
});
</script>