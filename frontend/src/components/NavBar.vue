<template>
  <nav class="bg-gradient-to-br from-[#004d66] to-[#accfd8] px-8 py-4">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0">
            <img class="h-12 w-auto" src="/logo.png" alt="FRW" />
          </div>
          <div class="sm:flex sm:flex-row hidden w-full sm:ml-6 justify-between">
            <div class="flex items-center space-x-4 h-full">
              <router-link v-for="item in menuItems" :key="item.name" :to="{name: item.pageName}" :class="[
                'text-lg hover:text-[#365a82]',
                $route.name === item.pageName ? 'text-[#365a82] border-b-2 border-[#365a82] font-bold' : 'text-white'
              ]">
                {{ item.name }}
              </router-link>
            </div>
            <div class="flex items-center">
              <router-link key="login" v-if="!token" :to="{name: 'login'}" class="text-white text-lg hover:text-[#365a82] ">
                Log in
              </router-link>
              <router-link key="userPortal" v-else="token" :to="{name: 'user-appointment'}" class="text-white text-lg hover:text-[#365a82]">
                My Portal
              </router-link>
            </div>
          </div>
        </div>

        <div class="flex items-center sm:hidden">
          <button @click="toggleMenu"
            class="inline-flex items-center p-2 text-white"
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
      </div>
    </div>

    <div :class="[isOpen ? 'block' : 'hidden', 'sm:hidden']" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link v-for="item in menuItems" :key="item.name" :to="{name: item.pageName}"
          class="text-lg block px-3 py-2 rounded-md hover:text-[#365a82]">
          <div :class="[$route.name === item.pageName ? 'text-[#365a82] font-bold' : 'text-white']">
            {{ item.name }}
          </div>
        </router-link>
        <div class="border-t border-gray-300">
          <router-link key="login" v-if="!token" :to="{name: 'login'}" class="text-white text-lg block p-3 hover:text-[#365a82] ">
            Log in
          </router-link>
          <router-link key="userPortal" v-else="token" :to="{name: 'user-appointment'}" class="text-white text-lg block p-3 hover:text-[#365a82]">
            My Portal
          </router-link>
        </div>
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
        { name: 'Home', pageName: 'home' },
        { name: 'About', pageName: 'aboutus' },
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
      this.$router.push({name: 'login'});
    },
    ...mapMutations('localStorage', ['setToken', 'setRefreshToken']),
  },
  computed: {
    ...mapState('localStorage', ['token']),
  },
};
</script>
