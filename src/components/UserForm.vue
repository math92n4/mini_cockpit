<template>

  <div class="logo">
    <img src="../assets/logo.png" alt="Logo">
  </div>

  <form v-if="showForm" class="login" @submit.prevent="submit">
    <h2>{{ isRegister ? 'Registrer dig her!' : 'HEJ, OG VELKOMMEN!' }}</h2>
    <h3>{{ isRegister ? 'Gå tilbage til login, hvis du allerede er registreret...' : 'Du skal logge ind, hvis du vil videre...' }}</h3>
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Kodeord" />

    <p v-if="isRegister">
      <router-link to="/">Tilbage til login</router-link>
    </p>

    <p v-if="!isRegister">
      <router-link to="/register">Register dig her!</router-link>
    </p>

    <p v-if="resMessage"><a href="#">Glemt kodeord?</a></p>

    <button type="submit">
      {{ isRegister ? 'Registrer' : 'Login' }}</button>
  </form>
</template>

<script>
import { onMounted, ref } from 'vue';
import { fetchPost } from '@/stores/util/fetch';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/store';


export default {
  name: 'UserForm',
  props: {
    mode: {
      type: String,
      default: 'Login'
    },
  },
  data() {
    return {
      email: '',
      password: '',
      showForm: false,
    };
  },
  computed: {
    isRegister() {
      return this.mode == 'Register';
    },
  },

  setup() {
    const resMessage = ref('')
    const router = useRouter();
    

    return {
      resMessage,
      router,
    }
  },

  methods: {
    async submit() {
      const store = useStore();

      const user = {
        email: this.email,
        pw: this.password
      }
  

      if(this.isRegister) {
        const res = await fetchPost(user, '/api/user/register')
      } else {
        const res = await store.login(user)
        if(!res.ok) {
          this.resMessage = "nej"
        }
      }

    }
  },
  mounted() {
    this.showForm = true;
  }
  
};

</script>
<style>

.logo {
  display: flex;
  justify-content: center;
  margin: 50px auto;
}

.login {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #1f0e0e;
  border-radius: 8px;
  background: #ffffff;
  
}

.login h2 {
  margin-bottom: 20px;
  text-align: center;
  
}

.login h3 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 15px;
}

.login p {
  margin-bottom: 30px;
  text-align: center;
  color:#000000;
}

input::placeholder, textarea::placeholder {
  color: black;
  text-align: center;
}

.login input {
  width: 90%;
  padding: 8px;
  margin-bottom: 15px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom:  2px solid black;
  text-align: center;
  font-family: inherit;
  font-size: 15px;
}

.login input:focus {
  outline: none;
}

.login input::placeholder {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
}

.login input:focus::placeholder {
  opacity: 0; 
}

.login button {
  width: 100%;
  padding: 2px;  
}




</style>