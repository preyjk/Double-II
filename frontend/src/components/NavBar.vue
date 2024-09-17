<template>
  <nav class="bg-gradient-to-br from-[#004d66] to-[#accfd8] px-8 py-4">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu" :aria-expanded="isOpen">
            <span class="sr-only">Open main menu</span>
            <svg v-if="isOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0">
            <img class="h-12 w-auto" src="/logo.png" alt="FRW" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex items-center space-x-4 h-full">
              <router-link v-for="item in menuItems" :key="item.name" :to="item.path" :class="[
                'text-lg hover:text-[#365a82]',
                $route.path === item.path ? 'text-[#365a82] border-b-2 border-[#365a82] font-bold' : 'text-white'
              ]">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div v-if="token" class="text-white text-lg hover:text-gray-600 hover:cursor-pointer" @click="handleSignOut">
            Log out
          </div>
          <div v-else class="text-white text-lg hover:text-gray-600 hover:cursor-pointer" @click="handleLogin">
            Log in
          </div>
        </div>
      </div>
    </div>

    <div :class="[isOpen ? 'block' : 'hidden', 'sm:hidden']" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
          class="text-lg block px-3 py-2 rounded-md hover:text-[#365a82]">
          <div
            :class="[$route.path === item.path ? 'text-[#365a82] border-b-2 border-[#365a82] font-bold' : 'text-white']">
            {{ item.name }}
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      isOpen: false,
      menuItems: [
        // Add your menu items here
        { name: 'Home', path: '/public' },
        { name: 'About', path: '/public/about' },
        // Add more items as needed
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    handleSignOut() {
      this.setToken(null);
      this.setRefreshToken(null);
    },
    handleLogin() {
      this.$router.push('/login');
    }, 
    ...mapMutations('localStorage', ['setToken', 'setRefreshToken']),
  },
  computed: {
    ...mapState('localStorage', ['token']),
  },
};
</script>
