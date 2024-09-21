<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form class="bg-white shadow-md rounded-lg px-8 py-6 mb-4 w-96 mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-300">Login</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email" type="email" v-model="email" required/>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" v-model="password" required />
        <div class="flex flex-row-reverse items-center justify-between">
          <button class="text-blue-500 hover:text-blue-800 font-bold" type="button" @click="handleForgotPassword">
            Forgot Password?
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" @click="handleLogin">
          Login
        </button>
        <button
          class="w-24 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" @click="handleSignUp">
          Sign Up
        </button>
      </div>
      <pre v-if="error" class="text-red-500 text-xs italic pt-4">{{ error }}</pre>
    </form>
    <div class="mt-4">
      <button
        class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        type="button" @click="handleGoogleLogin">
        <img :src="GoogleIcon" alt="Google Logo" class="h-8 bg-white" />
        <p class="pl-8">Login with Google</p>
      </button>
    </div>
  </div>
</template>

<script>
import GoogleIcon from '@/assets/Login/icons-google.svg';
import axios from '@/api/backendApi';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      GoogleIcon,
    };
  },
  
  methods: {
    async handleLogin(e) {
      e.preventDefault();
      this.error = '';
      if (!this.email || !this.password) {
        this.error = 'Please enter email and password';
        return;
      }
      try {
        const response = await axios.post('/public/auth/login', {
          email: this.email,
          password: this.password,
        });
        this.setToken(response.data.token);
        this.setRefreshToken(response.data.refreshToken);
        this.$router.push('/public');
      } catch (err) {
        this.error = "Invalid email or password";
      }
    },
    handleSignUp() {
      this.$router.push('/sign-up');
    },
    handleForgotPassword() {
      this.$router.push('/forgot-password');
    },
    handleGoogleLogin() {
      window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/public/auth/google/login`;
    },
    ...mapMutations('localStorage', ['setToken', 'setRefreshToken']),
  },
};
</script>