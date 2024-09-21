<template>
  <header class="p-3 shadow-lg bg-gradient-to-r from-blue-900 to-teal-600" style="background: linear-gradient(135deg, #004d66, #accfd8);">
    <div class="container mx-auto flex justify-between items-center">
      <div class="logo flex-grow">
        <span @click="backToHomePage" class="text-white text-2xl md:text-3xl font-bold cursor-pointer">FRW</span>
      </div>

      <button @click="toggleMenu" class="text-white md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <ul class="hidden md:flex space-x-6 items-center flex-grow justify-end text-white">
        <li>
          <span
            :class="['cursor-pointer p-2 rounded-lg transition-colors duration-300', { 'bg-white text-blue-900': activeTab === 'patients' }]"
            @click="goToPatientsPage"
          >Home</span>
        </li>
        <li>
          <span
            :class="['cursor-pointer p-2 rounded-lg transition-colors duration-300', { 'bg-white text-blue-900': activeTab === 'PatientRegister' }]"
            @click="goToPatientRegisterPage"
          >Join Us</span>
        </li>
        <li>
          <span
            :class="['cursor-pointer p-2 rounded-lg transition-colors duration-300', { 'bg-white text-blue-900': activeTab === 'about' }]"
            @click="goToAboutPage"
          >About Us</span>
        </li>
        <li>
          <LoginComponent class="login-component"></LoginComponent>
        </li>
        <li>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300" @click="goToBookingPage">
            Online Booking
          </button>
        </li>
      </ul>
    </div>
<<<<<<< HEAD
    <ul class="header-menu">
      <li>
        <span
          :class="['for-patients', { active: activeTab === 'patients' }]"
          @click="goToPatientsPage"
          >Home</span
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
=======

    <!-- Drawer for mobile -->
    <el-drawer
      title="Menu"
      v-model="menuOpen"
      direction="ltr"
      size="60%"
      custom-class="mobile-menu-drawer"
    >
      <ul class="flex flex-col space-y-4 text-lg">
        <li>
          <span
            :class="['cursor-pointer p-2 rounded-lg transition-colors duration-300', { 'bg-teal-600 text-white': activeTab === 'patients' }]"
            @click="goToPatientsPage"
          >Home</span>
        </li>
        <li>
          <span
            :class="['cursor-pointer p-2 rounded-lg transition-colors duration-300', { 'bg-teal-600 text-white': activeTab === 'PatientRegister' }]"
            @click="goToPatientRegisterPage"
          >Join Us</span>
        </li>
        <li>
          <span
            :class="['cursor-pointer p-2 rounded-lg transition-colors duration-300', { 'bg-teal-600 text-white': activeTab === 'about' }]"
            @click="goToAboutPage"
          >About Us</span>
        </li>
        <li>
          <LoginComponent class="login-component"></LoginComponent>
        </li>
        <li>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300" @click="goToBookingPage">
            Online Booking
          </button>
        </li>
      </ul>
    </el-drawer>
>>>>>>> 12c2b5525d5a86c7942b60a45656f4555e0fdd16
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
      menuOpen: false, 
    };
  },
  created() {
    if (this.$route.path === "/about") {
      this.activateTab("about");
    } else if (this.$route.path === "/patient") {
      this.activateTab("PatientRegister");
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
<<<<<<< HEAD
=======
    goToPatientRegisterPage() {
      this.activateTab("PatientRegister");
      this.$router.push("/patient");
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
>>>>>>> 12c2b5525d5a86c7942b60a45656f4555e0fdd16
  },
};
</script>

<style scoped>
.mobile-menu-drawer {
  background-color: #accfd8;
}
</style>
