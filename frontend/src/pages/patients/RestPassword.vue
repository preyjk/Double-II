<template>
    <div>
      <HeaderComponent />
      <h2>Reset Password</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label>Reset Token:</label>
          <input v-model="token" type="text" required />
        </div>
        <div>
          <label>New Password:</label>
          <input v-model="newPassword" type="password" required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
      <p v-if="successMessage" style="color: green">{{ successMessage }}</p>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import HeaderComponent from "@/components/patients/HeaderComponent.vue";
  import FooterComponent from "@/components/patients/FooterComponent.vue";
  import { resetPassword } from "@/api/modules/userApi.js"; 
  
  export default {
    components: {
      HeaderComponent,
      FooterComponent,
    },
    data() {
      return {
        token: '',
        newPassword: '',
        errorMessage: '',
        successMessage: '',
      };
    },
    setup() {
      const route = useRoute(); 
      return { route };
    },
    mounted() {
      const tokenFromURL = this.route.query.token || '';
      if (tokenFromURL) {
        this.token = tokenFromURL;
      }
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await resetPassword(this.token, this.newPassword);
          this.successMessage = 'Password reset successfully';
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = error.response?.data?.message || error.message || "Error occurred while resetting the password";
          this.successMessage = '';
        }
      },
    },
  };
</script>

  