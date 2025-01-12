<template>

  <div class="logo">
    <img src="../assets/logo.png" alt="Logo">
  </div>

  <form v-if="showForm" class="login drop-shadow" @submit.prevent="submit">
    <h2>{{ isRegister ? 'Registrer dig her!' : 'HEJ, OG VELKOMMEN!' }}</h2>
    <h3>{{ isRegister ? 'Gå tilbage til login, hvis du allerede er registreret...' : 'Du skal logge ind, hvis du vil videre...' }}</h3>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Kodeord" />

    <p v-if="isRegister">
      <router-link to="/" @click="resetResMessage">Tilbage til login</router-link>
    </p>

    <p v-if="!isRegister">
      <router-link to="/register" @click="resetResMessage">Register dig her!</router-link>
    </p>

    <p v-if="resMessage"> {{ resMessage }} </p>

    <button class="button" type="submit">
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
      this.resetResMessage();

      const store = useStore();

      const user = {
        email: this.email,
        pw: this.password
      }
  

      if(this.isRegister) {
        const res = await fetchPost(user, '/api/mini/user/register')
        
        if(res.status == 403) {
          this.resMessage = "Adgang nægtet..."

        } else if(res.status == 409) {
          this.resMessage = "Du eksisterer allerede i systemet..."
        
        } else if(res.status == 200) {
          this.resMessage = `Email sendt til ${user.email}. Tjek eventuelt din spam mappe, hvis du ikke kan finde den`
        
        } else {
          this.resMessage = "En fejl er opstået..."
        }

      } else {
        const res = await store.login(user)
        
        if(!res.ok) {
          this.resMessage = "Du matcher ikke nogen vi kender..."
        }
      }

    },
    resetResMessage() {
      this.resMessage = '';
    }
  },
  mounted() {
    const store = useStore();
    if(store.isLoggedIn) {
      this.router.push("/cockpit")
    }
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
  border-radius: 5px;
  background: #ffffff;
  align-items: center;
  justify-content: center;
  
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
}





</style>