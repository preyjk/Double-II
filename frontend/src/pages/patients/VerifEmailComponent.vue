<template>
  <HeaderComponent />
  <div class="container_body">
    <h1>Verify Email</h1>
    <div v-if="loading" class="loading-spinner"></div>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>{{ data }}</p>
  </div>
  <FooterComponent />
</template>

<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import { usePost } from "@/api/useApi.js";

export default {
  components: {
      HeaderComponent,
      FooterComponent,
  },
  setup() {
      const route = useRoute();
      const { data, error, loading, postData } = usePost("http://localhost:3000/public/auth/verify-email");
      onMounted(() => {
          const token = route.query.token;
          postData({ token: token });
      });
      return {
          data,
          error,
          loading,
      };
  },
}
</script>

<style scoped>

.container_body {
  text-align: center;
  margin-top: 50px;
  opacity: 0;
  animation: fadeIn 1.5s forwards ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


h1 {
  font-size: 2.5em;
  color: #333;
  opacity: 0;
  transform: scale(0.5);
  animation: zoomIn 1s forwards ease-in-out;
  animation-delay: 0.5s; 
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}


p {
  font-size: 18px;
  color: #333;
  opacity: 0;
  transform: translateX(-50px);
  animation: slideIn 1s forwards ease-in-out;
  animation-delay: 1s; 
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}


.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>