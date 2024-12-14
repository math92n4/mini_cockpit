<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

import NavBar from './components/NavBar.vue';
import EmailVerification from './components/EmailVerification.vue';
import UserForm from './components/UserForm.vue';
import Cockpit from './components/Cockpit.vue';
import Options from './components/Options.vue';
import Overview from './components/Overview.vue';

const currentSection = ref('Cockpit')

const changeSection = (section) => {
  currentSection.value = section
  console.log(currentSection.value)
}



</script>

<template>
  <div id="app">
    <NavBar v-if="!['/verify', '/register', '/'].includes($route.path)" :currentSection="currentSection" @changeSection="changeSection" />
    <router-view v-if="['/verify', '/register', '/'].includes($route.path)" />
    <div v-else>
      <Transition name="fade" mode="out-in">
        <component :is="currentSection"/>
      </Transition>
    </div>
    
  </div>
</template>

<script>


export default {
  components: {
    NavBar,
    UserForm,
    EmailVerification,
    Cockpit,
    Options,
    Overview,
  },

};


</script>
