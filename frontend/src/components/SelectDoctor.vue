<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Doctors at {{ formData.clinic.name }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="doctor in doctors" :key="doctor.Id" 
      :class="['p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-300',
        formData.doctor && formData.doctor.Id === doctor.Id ? 'bg-gray-200' : 'bg-white'
      ]" @click="selectDoctor(doctor)">
        <div class="flex items-center mb-4">
          <img :src="doctor.Photo || 'https://via.placeholder.com/400'" alt="Doctor Photo" class="w-16 h-16 rounded-full mr-4">
          <div>
            <h3 class="text-lg font-semibold">{{ `${doctor.FirstName} ${doctor.LastName}` }}</h3>
            <p class="text-sm text-gray-600">{{ doctor.Speciality }}</p>
          </div>
        </div>
        <p class="text-gray-700">{{ doctor.Detail }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineModel, ref, watch, onMounted, defineExpose } from 'vue';
import axios from '@/api/backendApi';

const formData = defineModel();

// Local state for doctors
const doctors = ref([]);

// Fetch doctors
const fetchDoctors = async () => {
  try {
    const response = await axios.get('/public/doctors', {
      params: {
        workplace: formData.value.clinic.name,
      },
    });
    doctors.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

// Watch clinic selection changes and refetch doctors
watch(() => formData.value.clinic.name, fetchDoctors);

// Select doctor method
const selectDoctor = (doctor) => {
  formData.value.doctor = doctor;
};

// Validation (you can customize the logic)
const validate = () => {
  return true;
};

// Fetch doctors when the component is mounted
onMounted(fetchDoctors);

defineExpose({
  validate,
});
</script>