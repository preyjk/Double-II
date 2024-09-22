<template>
  <div className="flex flex-col items-center justify-center h-screen">
    <div v-if="loading" className="text-center mt-4">Logging in...</div>
    <div v-if="error" className="text-center text-red-500 mt-4">{{ error }}</div>
  </div>
</template>

<script>
import { usePost } from '@/api/useApi';
import { mapMutations } from 'vuex';


export default {
  name: 'GoogleLogin',
  setup() {
    const { postData, data, loading, error } = usePost('/public/auth/google/token');
    return {
      postData,
      data,
      loading,
      error,
    };
  },
  async mounted() {
    const code = this.$route.query.code;
    await this.postData({ code });
    if (this.data) {
      this.setToken(this.data.token);
      this.setRefreshToken(this.data.refreshToken);
      this.$router.push({ name: 'user-appointment' });
    } else {
      this.error = 'Login failed';
    }
  },
  methods: {
    ...mapMutations('localStorage', ['setToken', 'setRefreshToken']),
  },
};
</script>
