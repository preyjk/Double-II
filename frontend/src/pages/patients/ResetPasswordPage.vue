<template>
  <div class="reset-container">
    <HeaderComponent />
    <div class="content">
      <h2 class="fade-in">Reset Password</h2>
      <form @submit.prevent="handleSubmit" class="form-container fade-in">
        <div class="input-group">
          <label>Reset Token:</label>
          <input v-model="token" type="text" required />
        </div>
        <div class="input-group">
          <label>New Password:</label>
          <input v-model="newPassword" type="password" required />
        </div>
        <button type="submit" class="submit-btn">Reset Password</button>
      </form>
      <p v-if="errorMessage" class="error-msg fade-in">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-msg fade-in">{{ successMessage }}</p>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import { resetPassword } from "@/api/modules/user.js"; 

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

<style scoped>
.reset-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
  justify-content: space-between; 
  background-color: #f9f9f9;
  padding: 0 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1; 
  padding: 20px;
  animation: slideIn 1s ease-in-out;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase; 
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; 
  margin: 0 auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.form-container:hover {
  transform: scale(1.02); 
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3); 
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
  transform: translateY(-3px); 
}

.error-msg {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}

.success-msg {
  color: #28a745;
  margin-top: 10px;
  font-weight: bold;
  background-color: #e6f7ee;
  padding: 10px;
  border-radius: 5px;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  h2 {
    font-size: 24px; 
  }

  input[type="text"],
  input[type="password"],
  .submit-btn {
    padding: 12px; 
  }

  .form-container {
    padding: 20px;
  }
}
</style>

