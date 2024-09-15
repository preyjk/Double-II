<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <!-- First Name Field -->
        <div class="form-group">
          <label for="reg-firstname">First Name <span class="required">*</span></label>
          <input type="text" id="reg-firstname" v-model="firstName" required />
        </div>

        <!-- Last Name Field -->
        <div class="form-group">
          <label for="reg-lastname">Last Name <span class="required">*</span></label>
          <input type="text" id="reg-lastname" v-model="lastName" required />
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="reg-email">Email Address <span class="required">*</span></label>
          <input type="text" id="reg-email" v-model="email" required />
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="reg-password">Create Password <span class="required">*</span></label>
          <input type="password" id="reg-password" v-model="password" required />
        </div>

        <!-- Confirm Password Field -->
        <div class="form-group">
          <label for="confirm-password">Confirm Password <span class="required">*</span></label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-button">Register</button>
          <button type="button" @click="closeModal" class="cancel-button">Cancel</button>
        </div>
        <p class="toggle-text">
          Already Have an Account?
          <a href="#" @click.prevent="switchToLogin">Login</a>
        </p>
      </form>
    </div>
    <transition name="fade" mode="out-in">
      <component :is="loginComponent" v-if="showLoginModal" @close="closeLoginModal" />
    </transition>
  </div>
</template>



<script>
import { register } from "@/api/modules/user.js";
import { defineAsyncComponent } from "vue";

export default {
  data() {
    return {
      showModal: true,
      showLoginModal: false,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    loginComponent() {
      return this.showLoginModal
        ? defineAsyncComponent(() => import("./LoginComponent.vue"))
        : null;
    },
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      register(this.email, this.password, this.firstName, this.lastName)
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
    closeLoginModal() {
      this.showLoginModal = false;
    },
    switchToLogin() {
      this.closeModal();
      this.showLoginModal = true;
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

.required {
  color: #dbcf8f;
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
.cancel-button {
  background-color: #64b1e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.toggle-text {
  margin-top: 15px;
  text-align: center;
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

.submit-button:hover,
.cancel-button:hover {
  background-color: #4081ea;
}
</style>
