<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded-lg px-8 py-6 mb-4 w-96 mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-300">Reset Password</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
        <input v-model="newPassword" type="password" required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
        <input v-model="confirmPassword" type="password" required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset
        Password</button>
    </form>
    <p v-if="errorMessage" class="text-red-500 text-sm mt-4">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-500 text-sm mt-4">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from '@/api/backendApi';

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
    };
  },

  methods: {
    async handleSubmit() {
      // Check if passwords match
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match. Please ensure both passwords are identical.";
        this.successMessage = '';
        return;
      }

      // Proceed with the password reset process
      try {
        const token = this.$route.query.token;
        await axios.post('/public/auth/reset-password', { token, newPassword: this.newPassword });
        alert("Password reset successful. You can now login with your new password.");
        this.errorMessage = '';
        // Automatically redirect to the homepage after a successful reset
        this.$router.push({name: 'login'}); // Assuming '/' is the homepage route
      } catch (error) {
        this.errorMessage = error.response?.data?.message || error.message || "Error occurred while resetting the password";
        this.successMessage = '';
      }
    },
  },

};
</script>

