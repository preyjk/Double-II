<template>
  <div class="admin-container">
    <div class="login-form">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="FRW Logo" />
      </div>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "AdminPage",
  components: {
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const loginResult = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/public/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      if (loginResult.ok) {
        const data = await loginResult.json();
        localStorage.setItem("authToken", data.token);
        this.$router.push({ name: "console" });
      } else {
        alert("Invalid email or password");
      }
    },
  },
};
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  background-color: #f0f8ff;
}

.container_header {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}

.login-form {
  margin-top: 100px;
  border: 2px solid rgb(231, 228, 228);
  padding: 30px;
  width: 350px;
  background-color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-container img {
  width: 200px;
  height: auto;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #357ab8;
}
</style>
