<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg px-8 py-6 mb-4 w-96 mx-auto">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b">Sign Up</h2>

      <div class="mb-4">
        <label class="block text-gray-700">First Name:</label>
        <input type="text" v-model="firstName"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <p v-if="firstNameError" class="text-red-500 text-sm mt-1">{{ firstNameError }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Last Name:</label>
        <input type="text" v-model="lastName"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <p v-if="lastNameError" class="text-red-500 text-sm mt-1">{{ lastNameError }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Email:</label>
        <input type="email" v-model="email"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Password:</label>
        <input type="password" v-model="password"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <ul v-if="passwordErrors.length > 0" class="text-red-500 text-sm mt-1">
          <li v-for="error in passwordErrors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Confirm Password:</label>
        <input type="password" v-model="confirmPassword"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-1">{{ confirmPasswordError }}</p>
      </div>

      <button @click="handleSubmit"
        class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Create Account
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '@/api/backendApi';

export default {
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const firstNameError = ref('');
    const lastNameError = ref('');
    const emailError = ref('');
    const passwordErrors = ref([]);
    const confirmPasswordError = ref('');

    // Validate email format
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) ? null : 'Invalid email format.';
    };

    // Validate password complexity
    const validatePassword = (password) => {
      const errors = [];

      if (password.length < 8) {
        errors.push('Must be at least 8 characters long.');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Must contain at least one uppercase letter.');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Must contain at least one lowercase letter.');
      }
      if (!/\d/.test(password)) {
        errors.push('Must contain at least one number.');
      }
      return errors;
    };

    // Function to validate input
    const validateInput = () => {
      let isValid = true;

      // Validate first name
      if (!firstName.value) {
        firstNameError.value = 'First name is required.';
        isValid = false;
      } else {
        firstNameError.value = null;
      }

      // Validate last name
      if (!lastName.value) {
        lastNameError.value = 'Last name is required.';
        isValid = false;
      } else {
        lastNameError.value = null;
      }

      // Validate email
      const emailValidationError = validateEmail(email.value);
      if (emailValidationError) {
        emailError.value = emailValidationError;
        isValid = false;
      } else {
        emailError.value = null;
      }

      // Validate password
      const passwordValidationErrors = validatePassword(password.value);
      if (passwordValidationErrors.length > 0) {
        passwordErrors.value = passwordValidationErrors;
        isValid = false;
      } else {
        passwordErrors.value = [];
      }

      // Validate confirm password
      if (password.value !== confirmPassword.value) {
        confirmPasswordError.value = 'Passwords do not match.';
        isValid = false;
      } else {
        confirmPasswordError.value = null;
      }

      return isValid;
    };

    return {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      emailError,
      passwordErrors,
      confirmPasswordError,
      validateInput,
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.validateInput()) {
        return;
      }
      try {
        const result = await axios.post('/public/auth/signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        alert('Account created successfully! Please check your email to active your account.');
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again.');
      }

    }
  }
};

</script>