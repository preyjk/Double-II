```vue
<template>
  <HeaderComponent />
  <div class="container_body">
    <div class="verify-email-card">
      <h1>Verify Email Result</h1>
      <p v-if="loading" class="loading">Loading...</p>
      <p v-else-if="error" class="error">Invalid Request. Please contact us. </p>
      <p v-else class="success">{{ data }}</p>
    </div>
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
    const { data, error, loading, postData } = usePost("/public/auth/verify-email");
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f9f9f9;
}

.verify-email-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.loading {
  color: #007bff;
}

.error {
  color: #dc3545;
}

.success {
  color: #28a745;
}
</style>