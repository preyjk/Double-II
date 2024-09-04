<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="reg-username">Username:</label>
          <input type="text" id="reg-username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="reg-password">Password:</label>
          <input
            type="password"
            id="reg-password"
            v-model="password"
            required
          />
        </div>
        <!-- Email field is commented out in the UI, uncomment if needed -->
        <!-- <div class="form-group">
          <label for="reg-email">Email:</label>
          <input type="email" id="reg-email" v-model="email" required />
        </div> -->
        <div class="form-actions">
          <button type="submit" class="submit-button">Register</button>
          <button type="button" @click="closeModal" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/modules/user.js";

export default {
  data() {
    return {
      showModal: true,
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    handleRegister() {
      register(this.username, this.password)
        .then((data) => {
          console.log("Registration data received:", data);
          alert("Registration successful!");
          this.closeModal();
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          alert("Registration failed, please try again.");
        });
    },
    closeModal() {
      this.showModal = false;
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

.modal {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.submit-button,
.cancel-button {
  background-color: #64b1e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.submit-button:hover,
.cancel-button:hover {
  background-color: #4081ea;
}
</style>
