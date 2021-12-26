<template>
  <q-layout class="bg-primary" view="lhh Lpr lFf"> 
   
    <q-header reveal :reveal-offset=0 class="bg-dark" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; ">
      <q-toolbar>
      <div v-if="$q.screen.lt.md">
         <q-btn @click ="$router.push('/')" dense flat :ripple="true">
         <q-img src="../assets/nvars-logo-light.svg" :ratio="16/9" width="150px" height="40px" alt="home" loading="eager"></q-img>
        </q-btn>
</div>
        <q-space></q-space>
         <div v-if="$q.screen.gt.sm" class="GL__toolbar-link q-ml-xs q-gutter-md text text-weight-bold row items-center no-wrap">
          <router-link to="/about" class="text-accent">About Us</router-link>
               <router-link to="/articles" class="text-accent">Articles</router-link>
               <router-link to="/donate" class="text-accent">Donate</router-link>
            
  
           <q-btn @click ="$router.push('/')" dense flat :ripple="true">
         <q-img src="../assets/nvars-logo-light.svg" :ratio="16/9" width="250px" height="70px" alt="home" loading="eager"></q-img>
        </q-btn>
         <router-link to="/petposts" class="text-accent">Animals</router-link>
         <router-link to="/forms" class="text-accent">Apply</router-link>
           <router-link to="/helpwanted" class="text-accent">Help Wanted</router-link>
          <q-btn v-if="isAuthenticated" dense flat size='18px' color="negative" @click="logout" class="text-accent">Log out</q-btn>
        </div>
        <q-space />
           <div v-if="$q.screen.gt.xs">
         

           </div>
           <div v-if="$q.screen.lt.md">
               <q-btn outline color="positive" label="Menu"  @click="toggleRightDrawer" />
           </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$q.screen.lt.md"
     :width="200"
      dark
      elevated
      orientation-portrait
      v-model="rightDrawerOpen"
      side="right"
      overlay
      bordered
      :breakpoint="1100"
    >
      <q-list class="text-accent">
           <q-item
          clickable
  
          @click="$router.push('/about')"  
  >
    <q-item-section>
      <q-item-label>About Us</q-item-label>
    </q-item-section>
  </q-item>
         <q-item
          clickable
 
          @click="$router.push('/articles')"    
  >
    <q-item-section>
      <q-item-label>Articles</q-item-label>
    </q-item-section>
  </q-item>
         <q-item
          clickable
   
          @click="$router.push('/donate')"    
  >
    <q-item-section>
      <q-item-label>Donate</q-item-label>
    </q-item-section>
  </q-item>
         <q-item
          clickable
     
          @click="$router.push('/petposts')"  
  >
    <q-item-section>
      <q-item-label>Animals</q-item-label>
    </q-item-section>
  </q-item>
         <q-item
          clickable
       
          @click="$router.push('/forms')"    
  >
    <q-item-section>
      <q-item-label>Apply</q-item-label>
    </q-item-section>
  </q-item>
         <q-item
          clickable
    
          @click="$router.push('/helpwanted')"   
  >
    <q-item-section>
      <q-item-label>Help Wanted</q-item-label>
    </q-item-section>
  </q-item>
   <q-item
          v-if="isAuthenticated"
          clickable
          @click="logout"   
  >
    <q-item-section>
      <q-item-label>Log out</q-item-label>
    </q-item-section>
  </q-item>
      </q-list>
    </q-drawer>
    <q-page-container class="" style="padding-bottom: 20rem">
     
      <router-view />
     
    </q-page-container>
    <Footer></Footer>
  </q-layout>
</template>


<script setup>
import { ref, computed } from "vue";
import  Footer  from '../components/Footer'
import { useStore } from 'vuex'
//import { useRouter } from 'vue-router'
import { api } from '../boot/axios'
const store = useStore();
//const router = useRouter();
const isAuthenticated = computed(() => store.getters.isAuthenticated)
const rightDrawerOpen = ref(false);
function toggleRightDrawer(){
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
function onResize(size){
  if(size.width > 1023){
          rightDrawerOpen.value = false;
        }
}
function logout(){
  api.defaults.headers.common["Authorization"]=""

  localStorage.removeItem("token");
  store.commit('removeToken');
  
}
</script>

<style lang="sass">

.header
 border-bottom-radius: 200px

</style>