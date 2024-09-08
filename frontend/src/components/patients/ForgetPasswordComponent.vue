<template>
    <div class="modal-overlay">
      <div class="modal">
        <h2>Forgot Password</h2>
        <form @submit.prevent="handleForgetPassword">
          <div class="form-group">
            <label for="email">Enter your email:</label>
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
          this.email = ""; // Clear the email input after submission
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
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
}
  
.form-group {
    margin-bottom: 15px;
}
  
.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
  
.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
  
.success-message {
    color: green;
}
  
.error-message {
    color: red;
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
</style>
  