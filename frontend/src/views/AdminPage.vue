<template>
    <div class="admin-container">
      <HeaderComponent class="container_header"></HeaderComponent>
      <div class="login-form">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="FRW Logo">
        </div>
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <button @click="login">Login</button>
      </div>
    </div>
  </template>
  
  <script>
  import HeaderComponent from "@/components/HeaderComponent.vue";
  
  export default {
    name: 'AdminPage',
    components: {
      HeaderComponent
    },
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        console.log('Login Info:', this.username, this.password);
      }
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
    background-color: #f0f8ff; /* Light blue background from homepage */
  }
  
  .container_header {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  
  .login-form {
    margin-top: 100px;
    border: 2px solid rgb(231, 228, 228); /* Lighter blue border from homepage */
    padding: 30px;
    width: 350px;
    background-color: #ffffff; /* Consistent with nav background on homepage */
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
  
  input[type="text"], input[type="password"] {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #4a90e2; /* Button color from homepage */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #357ab8; /* Darker blue on hover from homepage */
  }
  </style>
  
  
  
  
  
  
  
    
  
  
  
  
  


  
  

  
  
  
  
  