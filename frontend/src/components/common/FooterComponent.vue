<template>
  <footer class="footer">
    <div class="left-section">
      <div class="logo-and-buttons">
        <img src="@/assets/logo.png" alt="FRW Healthcare Logo" class="logo" />
        <div class="buttons">
          <button @click="aboutUs">About Us</button>
          <button @click="joinGroup">Join The Group</button>
          <button @click="workWithUs">Work With Us</button>
        </div>
        <p class="services">Providing premier health services since 1992 | <a href="/login">Login</a></p>
      </div>
    </div>
    <div class="right-section">
      <div class="social-and-policies">
        <div class="social-icons">
          <a href="https://facebook.com"><img src="@/assets/f.png" alt="Facebook" /></a>
          <a href="https://twitter.com"><img src="@/assets/t.png" alt="Twitter" /></a>
          <a href="https://instagram.com"><img src="@/assets/i.png" alt="Instagram" /></a>
          <a href="https://youtube.com"><img src="@/assets/y.png" alt="YouTube" /></a>
        </div>
        <div class="policies">
          <a v-on:mouseover="hover(true)" v-on:mouseout="hover(false)" :style="{ color: hoverColor }" href="/privacy">Privacy Policy</a>
          <span> | </span>
          <a v-on:mouseover="hover(true)" v-on:mouseout="hover(false)" :style="{ color: hoverColor }" href="/child-protection">Child Protection Policy</a>
        </div>
        <p class="copyright">© 2024 FRW Healthcare. All Rights Reserved. Developed by Double II Team.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      hoverColor: '#FFFFFF'  
    };
  },
  methods: {
    aboutUs() {
    
    },
    joinGroup() {
      
    },
    workWithUs() {
      
    },
    hover(isHovering) {
      this.hoverColor = isHovering ? '#02b3e4' : '#FFFFFF';
    }
  }
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #005a8d;
  color: white;
  padding: 20px;
  border-top: 5px solid #02b3e4;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 45%; 
  padding-left: 40px; 
}

.logo-and-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo {
  height: 150px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.buttons button {
  background-color: #02b3e4;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #0294b5;
}

.services {
  font-size: 16px;
  margin-top: 20px;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 45%; 
}

.social-icons {
  margin-bottom: 10px;
}

.social-icons a img {
  height: 40px;
  margin: 0 10px;
}

.policies {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.policies a {
  font-size: 14px;
  margin: 0 5px;
}

.policies span {
  color: white;
}

.copyright {
  font-size: 14px;
}
</style>




















