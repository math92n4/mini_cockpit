<template>

  <div class="logo">
    <img src="../assets/logo.png" alt="Logo">
  </div>

    <div class="login drop-shadow">
      <h2>Email Verifikation</h2>
      <p>{{ message }}</p>
      <p>Du bliver nu sendt tilbage til login..</p>

      <div class="spinner-container">
        <img src="/src/assets/spinner.gif">
      </div>

    </div>

  </template>

<script>
import { ref, onMounted } from 'vue';
import { fetchGet } from '@/stores/util/fetch';
import { useRouter } from 'vue-router';


export default {
  name: 'EmailVerification',
  setup() {
    
    const message = ref("");
    const router = useRouter();

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        const res = await fetchGet(`/api/mini/verify?token=${token}`)
        message.value = res.message;
         

      } else {
        message.value = "Ingen token"
      }

      setTimeout(() => {
          router.push('/');
        }, 5000)

    });
    
    return { message };
  }
};
</script>