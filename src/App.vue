<template>
  <router-view />
</template>
<script>
import { defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { api } from './boot/axios'
export default defineComponent({
  preFetch({ store }) {
  store.commit('initializeStore');
  store.commit('setLoading', false);
  const token = store.getters.token
  if(token){
    api.defaults.headers.common['Authorization'] = 'Token ' + token;
  } else{
    api.defaults.headers.common['Authorization'] = "";
  }
},
})
</script>
