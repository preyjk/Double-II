<template>
  <div class="md:h-screen flex flex-col md:flex-row">
    <!-- Sidebar for Desktop -->
    <div class="hidden md:flex bg-gradient-to-br from-[#004d66] to-[#accfd8] text-white w-64 flex-shrink-0">
      <!-- Menu Section -->
      <div class="flex flex-col w-full">
        <img src="/logo.png" alt="App Name" class="p-4" />
        <ul class="flex-1">
          <li v-for="item in menuItems" :key="item.name" :class="['p-4 hover:bg-gray-700 cursor-pointer', $route.name === item.pageName && 'bg-gray-600']">
            <!-- Use router-link for navigation if not the sign-out button -->
            <router-link :to="{name: item.pageName}" class="block">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
        <button @click="signOut" class="w-full text-left hover:bg-red-700 p-4">
          Sign Out
        </button>
      </div>
    </div>

    <!-- Navbar for Mobile -->
    <div
      class="md:hidden p-4 bg-gradient-to-br from-[#004d66] to-[#accfd8] text-white flex justify-between items-center">
      <div class="flex-shrink-0">
        <img class="h-12 w-auto" src="/logo.png" alt="FRW" />
      </div>
      <button @click="toggleMobileMenu" class="text-white">
        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

    </div>

    <!-- Mobile Menu Drawer -->
    <div :class="[
      'z-50 fixed inset-0 bg-gradient-to-br from-[#004d66] to-[#accfd8] text-white transition-transform transform md:hidden',
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
    ]" @click.stop>
      <div class="p-4 flex flex-row justify-between">
        <div class="flex-shrink-0">
          <img class="h-12 w-auto" src="/logo.png" alt="FRW" />
        </div>
        <button @click="toggleMobileMenu" class="text-white">
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul class="mt-4">
        <li v-for="item in menuItems" :key="item.name" :class="['p-4 hover:bg-gray-700 cursor-pointer', $route.name === item.pageName && 'bg-gray-600']">
          <!-- Use router-link for navigation if not the sign-out button -->
          <router-link @click="closeMobileMenu" :to="{name: item.pageName}" class="block">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
      <button @click="signOut" class="w-full text-left hover:bg-red-700 p-4 border-t border-gray-500">
        Sign Out
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex-1 bg-gray-100 p-4">
      <!-- Router View for rendering components -->
      <router-view />
    </div>

    <!-- Overlay for mobile menu -->
    <div v-if="isMobileMenuOpen" @click="closeMobileMenu" class="fixed md:hidden"></div>
  </div>
  <Footer />
</template>

<script>
import Footer from '../../components/Footer.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    Footer,
  },
  data() {
    return {
      isMobileMenuOpen: false, // To control the mobile menu visibility
      // Menu items with associated paths
      menuItems: [
        { name: 'Appointments', pageName: 'admin-appointment' },
        { name: 'Working Schedule', pageName: 'admin-schedule' },
        { name: 'E-Chart', pageName: 'admin-analysis' },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    signOut() {
      this.setToken(null);
      this.setRefreshToken(null);
      this.$router.push({ name: 'home' });
    },
    ...mapMutations('localStorage', ['setToken', 'setRefreshToken']),
  },
};
</script>
