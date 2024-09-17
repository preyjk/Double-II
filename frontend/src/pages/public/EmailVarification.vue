<template>
  <div class="bg-gray-100">
    <div class="max-w-md mx-auto py-8 px-4">
      <h1 class="text-2xl font-bold mb-4">Verify Email Result</h1>
      <p v-if="loading" class="text-gray-500">Loading...</p>
      <p v-else-if="error" class="text-red-500">Invalid Request. Please contact us.</p>
      <p v-else class="text-green-500">{{ data }}</p>
    </div>
  </div>
</template>

<script>
import { usePost } from "@/api/useApi.js";

export default {
  setup() {
    const { data, error, loading, postData } = usePost("/public/auth/verify-email");
    return {
      data,
      error,
      loading,
      postData,
    };
  },
  mounted() {
    const token = this.$route.query.token;
    this.postData({ token: token });
  },
}
</script>