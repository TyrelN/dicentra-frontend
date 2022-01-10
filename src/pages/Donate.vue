<template>
  <div
    class="text-dark"
    style="max-width: 900px; margin: 0 auto"
  >
    <div class="q-mx-md q-mt-lg" style="border-radius: 25px">
      <div class="text-h3 text-center q-ma-sm">Donate</div>
      <div class="text q-mx-xl q-my-md">
        If you would like to support our rescue work at NVARS, you may safely
        donate using one of the following methods:
      </div>
      <div class="shadow-14 q-mx-md q-pa-xl">
        <div class="text-h6 text-center">Interac E-Transfer:</div>
        <div class="q-my-lg text">
          E-transfers sent to donate@NVARS.com are not subject to extra fees, meaning we get all of it!
        </div>
        <div class="text-h6 q-my-md text-center">Credit Card, Paypal and PAD:</div>
        <div class="flex q-mb-md" style="text-align: center; display:block;">
        <a style="background: #393946 url(https://donorbox.org/images/red_logo.png) no-repeat 37px;color: #fff;text-decoration: none;font-family: Verdana,sans-serif;display: inline-block;font-size: 16px;padding: 15px 38px;padding-left: 75px;-webkit-border-radius: 2px;-moz-border-radius: 2px;border-radius: 2px;box-shadow: 0 1px 0 0 #1f5a89;text-shadow: 0 1px rgba(0, 0, 0, 0.3);" href="https://donorbox.org/nvars-donate?default_interval=o&amount=30">Donate</a>
        </div>
  </div>

    </div>
  </div>
</template>

<script setup>
import { useMeta } from "quasar";
useMeta({
  title: "Donate",
  titleTemplate: (title) => `${title} - Nicola Valley Animal Rescue`,
  meta:{
    description:{ name: "description", content:"Donate to the cause and help out our animals"}
  }
});
</script>