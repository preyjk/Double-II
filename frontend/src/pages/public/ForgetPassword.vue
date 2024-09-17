<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form @submit.prevent="handleForgetPassword" class="bg-white shadow-md rounded-lg px-8 py-6 mb-4 w-96 mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-300">Send Reset Password Email</h1>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" v-model="email" required placeholder="Enter your email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-4">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
        <p v-if="successMessage" class="success-message mt-4 text-green-500">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message mt-4 text-red-500">{{ errorMessage }}</p>
      </form>
  </div>
</template>

<script>
import axios from '@/api/backendApi';

export default {
  data() {
    return {
      email: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleForgetPassword() {
      this.successMessage = "";
      this.errorMessage = "";

      try {
        await axios.post('/public/auth/forgot-password', { email: this.email });
        alert("Password reset email sent successfully. Please check your email inbox.");
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.message || "Failed to send password reset email. Please try again.";
      }
    },
  },
};
</script>
