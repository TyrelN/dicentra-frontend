<template>
  <div
    class="text-dark"
    style="max-width: 900px; margin: 0 auto"
  >
    <div class="q-mx-md q-mt-lg" style="border-radius: 25px">
      <div class="text-h3 text-center q-ma-sm">Donate</div>
      <div class="text q-ma-xl">
        If you would like to support our rescue work at NVARS, you may safely
        donate using one of the following methods:
      </div>
      <div class="shadow-14 q-ma-md q-pa-xl">
        <div class="text-h6 text-center">Interac E-Transfer:</div>
        <div class="q-my-lg text">
          E-transfers will be available to be sent to donate@NVARS.com and are not subject to the
          fees associated with the other methods, meaning we get all of it!
        </div>
        <div class="text-h6 q-mt-xl text-center">Credit Card, Paypal and PAD:</div>
        <div class="flex" style="text-align: center; display:block;">
        <iframe src="https://donorbox.org/embed/animal-rescue-donations" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="900px" width="100%" style="max-width: 430px; min-width: 250px; max-height:none!important"></iframe>
        </div>
  </div>

    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "../boot/axios";
import { ref, onMounted, computed } from "vue";

import { useMeta } from "quasar";
useMeta({
  title: "Donate",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Donate to the cause and help out our animals"}
  }
});
onMounted(()=>{
let donateScript=document.createElement('script');
donateScript.setAttribute('src', "https://donorbox.org/widget.js");
document.head.appendChild(donateScript);
});

</script>