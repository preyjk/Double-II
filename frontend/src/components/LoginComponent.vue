<template>
  <div>
    <sign @click="showModal = true">Sign In</sign>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-actions">
            <button type="submit">Submit</button>
            <button type="button" @click="showModal = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal">
        <h2>Login Successful</h2>
        <p>Your token: {{ token }}</p>
        <div class="form-actions">
          <button type="button" @click="closeSuccessModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const login = require("@/network/netService").login;
export default {
  data() {
    return {
      showModal: false,
      showSuccessModal: false,
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      login(this.username, this.password)
        .then((token) => {
          this.token = token; // Store the token
          this.showModal = false;
          this.showSuccessModal = true; // Show success modal
          this.username = "";
          this.password = "";
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("Login failed, please try again."); // Handle login failure
        });
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>
