<template>
  <div>
    <span @click="showModal = true" class="sign-in-button">Sign In</span>
    <span v-if="showAvatar">avatar</span>
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
            <button type="submit" class="submit-button">Submit</button>
            <button
              type="button"
              @click="showModal = false"
              class="cancel-button"
            >
              Cancel
            </button>
          </div>
          <p class="toggle-text">
            Don't have an account?
            <a href="#" @click.prevent="switchToRegister">Register here</a>
          </p>
        </form>
      </div>
    </div>

    <!-- Register Component -->
    <RegisterComponent
      v-if="showRegisterModal"
      @close="showRegisterModal = false"
    />
  </div>
</template>

<script>
import RegisterComponent from "@/components/RegisterComponent.vue";
const login = require("@/network/netService").login;

export default {
  data() {
    return {
      showModal: false,
      showAvatar:false,
      showRegisterModal: false,
      username: "",
      password: "",
      token: "",
    };
  },
  components: {
    RegisterComponent,
  },
  methods: {
    handleSubmit() {
      login(this.username, this.password)
        .then((token) => {
          this.token = token;
          localStorage.setItem("authToken", token);

          this.showModal = false;
          this.username = "";
          this.password = "";
          this.showAvatar=true;
          // alert("Login successful!");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("Login failed, please try again.");
        });
    },
    switchToRegister() {
      this.showModal = false;
      this.showRegisterModal = true;
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
.sign-in-button{
  cursor: pointer;;
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
.cancel-button,
.close-button {
  background-color: #64b1e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.submit-button:hover,
.cancel-button:hover,
.close-button:hover {
  background-color: #4081ea;
}

.toggle-text {
  margin-top: 15px;
  text-align: center;
}

.toggle-text a {
  color: #64b1e8;
  text-decoration: none;
  font-weight: bold;
}

.toggle-text a:hover {
  text-decoration: underline;
}
</style>
