<template>
  <div class="bg-dark absolute-bottom">
    <div class="text-primary">
      <div class="q-pa-xs">
        <div class="col q-pa-sm text-center">
          250-315-8709 | info@nvars.com 
        </div>
      <div class= "col q-pa-sm text-center">
          <q-btn
            icon="fab fa-facebook"
            round
            aria-label="facebook"
            type="a"
            href="https://www.facebook.com/Nicola-Valley-Animal-Rescue-Forgotten-Felines-Society-269330899790298/"
            rel="noopener"
            target="_blank"
          />
           <q-btn
            icon="fab fa-youtube"
            round
            aria-label="youtube"
            type="a"
            href="https://www.youtube.com/channel/UCZfNm73eDT_nkG4-GgHSkrg/featured"
            rel="noopener"
            target="_blank"
          />
          <q-btn
          class="absolute-bottom-right"
            icon="fas fa-shield-alt"
            aria-label="admin"
            round
            to="/portal"
          />
          
      </div>
     
      </div>
    <div class="text-center text-weight-light q-pa-sm">
      Nicola Valley Animal Rescue Society is a non-profit society registered in British Columbia, Canada.
    </div>
    <div class="text-center q-px-xl text-weight-thin">
    Nicola Valley Animal Rescue Society © 2022 |  <router-link to="/privacy" class="text-accent">Privacy Policy</router-link> | Website built by Tyrel Narciso
    </div>
    
    </div>
  </div>
</template>

<script setup>
import Donate from "../pages/Donate.vue";
</script>