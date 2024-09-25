<template>
  <div class="p-2">
  <button @click="toggleDropdown"
    class="inline-flex items-center bg-green-500 text-center justify-between text-white py-2 px-4 rounded w-32">
    {{ label }} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
    </svg>
  </button>
  <ul v-if="isDropdownVisible" class="absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
    <li v-for="option in options" :key="option" @click="handleOption(option)"
      class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      {{ option }}
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref, defineProps, getCurrentInstance } from 'vue';

// Props to pass in the label and options for the dropdown
const props = defineProps(['label', 'options']);
const { emit } = getCurrentInstance();

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const handleOption = (option) => {
  console.debug(option);
  emit(option.toLowerCase());
  isDropdownVisible.value = false;
};
</script>
