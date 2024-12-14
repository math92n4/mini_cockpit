<template>
    <nav class="navbar">

      <ul v-if="isCockpit || isOptions || isOverview">
        <li :class="['menu-item', { active: isCockpit }]" @click="changeSection('Cockpit')">
          <a href="#">VORES SALG</a>
        </li>

      
        <li :class="['menu-item', { active: isOverview }]" @click="changeSection('Overview')">
          <a href="#">OVERSIGT</a>
        </li>

        <li :class="['menu-item', { active: isOptions }]" @click="changeSection('Options')">
          <a href="#">INDSTILLING</a>
        </li>
      </ul>
    
      <div v-if="isCockpit || isOptions || isOverview" class="my-workspace">
        <p>MY WORKSPACE</p>
      </div>

      <div class="navbar-logo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>

    </nav>
  </template>
  
  <script>

  import { computed, ref } from 'vue';

  export default {
    name: 'Navbar',
    props: {
      currentSection: String
    },

    setup(props, { emit }) {

      const isCockpit = computed(() => props.currentSection === 'Cockpit');
      const isOverview = computed(() => props.currentSection === 'Overview');
      const isOptions = computed(() => props.currentSection === 'Options');

      const changeSection = (section) => {
        emit('changeSection', section)
      }

      return { isCockpit, isOverview, isOptions, changeSection };
    },

  };
  </script>
  
  <style>

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px;
    color: white;
  }

  .navbar ul {
    display: flex;
    gap: 80px;
    padding-right: 20px;
    list-style-type: none
  }

  .menu-item a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .menu-item.active a {
    font-weight: bold;
    color: #003366;
    border-bottom: 3px solid #003366;
}

  .my-workspace {
    margin-left: auto;
    display: flex;
    align-items: center;     
    font-size: 20px;               
    font-weight: bold;
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    margin-left: 20px;           
  }

  @media (max-width: 700px) {
    .navbar ul {
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
  }
  

  </style>