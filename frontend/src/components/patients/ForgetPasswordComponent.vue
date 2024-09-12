<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Forgot Password</h2>
      <form @submit.prevent="handleForgetPassword">
        <div class="form-group">
          <label for="email"></label>
          <input type="email" v-model="email" required placeholder="Enter your email" />
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-button">Submit</button>
          <button type="button" @click="$emit('close')" class="cancel-button">Cancel</button>
        </div>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { forgetPassword } from "@/api/modules/user.js"; // Import the forgetPassword function

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
        await forgetPassword(this.email); // Call the forgetPassword API function
        this.successMessage = "Password reset email has been sent successfully!";
        this.email = ""; 
      } catch (error) {
        this.errorMessage = error.message || "Failed to send password reset email. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  backdrop-filter: blur(10px); /* Glass-like blur effect */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.form-group input::placeholder {
  color: #e0e0e0;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.success-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}

.submit-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button {
  background-color: #28a745;
  color: white;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}

/* Additional styling for glass effect */
.submit-button,
.cancel-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #64b1e8;
}

.cancel-button:hover {
  background-color: #64b1e8;
}
</style>
