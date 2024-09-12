<template>
  <header class="header">
    <svg
      style="height: 0; width: 0; display: none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
    </svg>
    <div class="logo">
      <span @click="backToHomePage">FRW</span>
    </div>
    <ul class="header-menu">
      <li>
        <span
          :class="['for-patients', { active: activeTab === 'patients' }]"
          @click="goToPatientsPage"
          >Home</span
        >
      </li>
      <li>
        <span
          :class="['for-PatientRegister', { active: activeTab === 'PatientRegister' }]"
          @click="goToPatientRegisterPage"
          >Join Us</span
        >
      </li>
      <li class="providers-btn">
        <span
          :class="['for-about', { active: activeTab === 'about' }]"
          @click="goToAboutPage"
          >About Us</span
        >
      </li>
      <li class="profile-avatar">
        <LoginComponent class="login-component"></LoginComponent>
      </li>
      <li class="booking-btn">
        <button class="online-booking-button" @click="goToBookingPage">
          Online Booking
        </button>
      </li>
    </ul>
  </header>
</template>

<script>
import LoginComponent from "@/components/patients/LoginComponent.vue";
export default {
  name: "HeaderComponent",
  components: {
    LoginComponent,
  },
  data() {
    return {
      activeTab: "patients",
    };
  },
  created() {
    if (this.$route.path === "/about") {
      this.activateTab("about");
    }
  },
  methods: {
    activateTab(tab) {
      this.activeTab = tab;
    },
    backToHomePage() {
      this.$router.push({ name: "Home" });
    },
    goToPatientsPage() {
      this.activateTab("patients");
      this.$router.push("/");
    },
    goToAboutPage() {
      this.activateTab("about");
      this.$router.push("/about");
    },
    goToBookingPage() {
      this.$router.push({ name: "OnlineBooking" });
    },
    goToPatientRegisterPage() {
      this.activateTab("PatientRegister"); // Updated tab activation to match the correct name
      this.$router.push("/Patient"); // Ensures it routes to the correct page
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  box-sizing: border-box;
  background: linear-gradient(135deg, #004d66, #accfd8);
  color: #ffffff;
  border-bottom: 2px solid gray;
  height: 80px;
  align-items: center;
  padding: 0 48px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  font-size: 36px;
  color: white;
  align-items: center;
  flex: 0.2;
  cursor: pointer;
}

.header-menu {
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
}

.header-menu li {
  margin-left: 20px;
  color: #ffffff;
  height: 100%;
  display: flex;
  align-items: center;
}

.header-menu li span {
  cursor: pointer;
  display: inline-block;
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.header-menu li span:hover {
  color: #365a82;
}

.header-menu li .active {
  font-weight: bold;
  color: #365a82;
  border-bottom: 3px solid #365a82;
}

.profile-avatar span {
  cursor: pointer;
}

.profile-avatar span:hover {
  color: #365a82;
}

.booking-btn {
  margin-left: 20px;
}

.online-booking-button {
  background-color: #365a82;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.online-booking-button:hover {
  background-color: #2a4665;
}
</style>
