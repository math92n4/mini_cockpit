<template>
    <div>
      <h1>Email Verification</h1>
      <p>{{ message }}</p>
      <p v-if="backToLogin">Redirecting back to login..</p>
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
    const backToLogin = ref(false);
    const router = useRouter();

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        const res = await fetchGet(`/api/verify?token=${token}`)
        message.value = res.message;
        
        if(res.statusCode == 200) {
            backToLogin.value = true;
            setTimeout(() => {
                router.push('/');
            }, 5000)
        }

      } else {
        message.value = "No token"
      }
    });
    
    return { message, backToLogin };
  }
};
</script>