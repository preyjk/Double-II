<template>
  <div>
    <span v-if="showSign" @click="showModal = true" class="sign-in-button">Sign In</span>
    <AvatarComponent v-if="showAvatar" @logout="handleLogout" />
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-button">Submit</button>
            <span v-if="isLoading" class="loading-spinner"></span>
            <button type="button" @click="showModal = false" class="cancel-button">
              Cancel
            </button>

            <!-- New Button (e.g., Help button) -->

          </div>
          <p class="toggle-text">
            <a href="#" @click.prevent="switchToForgetPassword">Forgot Password?</a>
            <a href="#" @click.prevent="switchToRegister">Register here</a>
          </p>
        </form>
        <!-- login with google -->
        <button class="google-login-button" @click="loginWithGoogle">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" class="google-logo" />
          Login with Google
        </button>
      </div>
    </div>

    <!-- Register Component -->
    <transition name="fade" mode="out-in">
      <RegisterComponent v-if="showRegisterModal" @close="showRegisterModal = false" />
    </transition>

    <!-- Forget Password Component -->
    <transition name="fade" mode="out-in">
      <ForgetPasswordComponent v-if="showForgetPasswordModal" @close="showForgetPasswordModal = false" />
    </transition>
  </div>
</template>

<script>
import RegisterComponent from "@/components/patients/RegisterComponent.vue";
import AvatarComponent from "@/components/patients/AvatarComponent.vue";
import ForgetPasswordComponent from "@/components/patients/ForgetPasswordComponent.vue";
import { login } from "@/api/modules/user.js";

export default {
  data() {
    return {
      showModal: false,
      showSign: true,
      showAvatar: false,
      showRegisterModal: false,
      showForgetPasswordModal: false,
      email: "",
      password: "",
      token: "",
      isLoading: false,
    };
  },
  components: {
    AvatarComponent,
    RegisterComponent,
    ForgetPasswordComponent,
  },
  created() {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      this.token = savedToken;
      this.showSign = false;
      this.showAvatar = true;
    }
  },
  methods: {
    handleSubmit() {
      this.isLoading = true;

      setTimeout(() => {
        login(this.email, this.password)
          .then((token) => {
            this.token = token;
            localStorage.setItem("authToken", token);
            this.showModal = false;
            this.showSign = false;
            this.showAvatar = true;
            this.$store.commit('SET_EMAIL', this.email);
            this.email = "";
            this.password = "";
          })
          .catch((error) => {
            console.error("Login failed:", error);
            alert("Login failed, please try again.");
          })
          .finally(() => {
            this.isLoading = false;
          });
      }, 1000);
    },
    switchToRegister() {
      this.showModal = false;
      this.showRegisterModal = true;
    },
    switchToForgetPassword() {
      this.showModal = false;
      this.showForgetPasswordModal = true;
    },
    handleLogout() {
      localStorage.setItem("authToken", "");
      this.showAvatar = false;
      this.showSign = true;
    },
    showHelp() {
      alert("Please contact support for assistance.");
    },
    loginWithGoogle() {
      window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/public/auth/google/login`;
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
  color: #ccc;
  z-index: 999;
}

.modal {
  background: rgba(255, 255, 255, 0.3);
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 4px solid transparent;
  overflow: hidden;
}

.modal::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
  background: none;
  border: 5px solid transparent;
  border-image: repeating-conic-gradient(from var(--a),
      #accfd8 0%,
      #accfd8 10%,
      transparent 10%,
      transparent 80%,
      #accfd8 100%) 1;
  animation: animate 2.5s linear infinite;
  pointer-events: none;
}

@property --a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes animate {
  0% {
    --a: 0deg;
  }

  100% {
    --a: 360deg;
  }
}

.sign-in-button {
  cursor: pointer;
}

.sign-in-button:hover {
  color: #365a82;
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
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
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
  display: flex;
  justify-content: space-between;
  /* Moves links to the edges */
  align-items: center;
}

.toggle-text a {
  color: #ccc;
  text-decoration: none;
  font-weight: bold;
}

.toggle-text a:hover {
  text-decoration: underline;
  text-decoration-color: #accfd8;
}



.loading-spinner {
  border: 6px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.google-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285f4;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  width: 100%;
  padding: 5px;
  margin-top: 10px;
}

.google-login-button:hover {
  background-color: #357ae8;
}

.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>