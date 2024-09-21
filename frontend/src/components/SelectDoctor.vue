<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Doctors at {{ formData.clinic.name }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="doctor in doctors" :key="doctor.Id" 
      :class="['bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-300',
        formData.doctor && formData.doctor.Id === doctor.Id && 'bg-gray-200'
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

<script>
import axios from '@/api/backendApi';

export default {
  name: "SelectDoctor",
  components: {},
  props: ['modelValue'],
  data() {
    return {
      doctors: [],
    };
  },
  computed: {
    formData: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    }
  },
  mounted() {
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await axios.get('/public/doctors', {
          params: {
            workplace: this.formData.clinic.name
          },
        });
        this.doctors = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    selectDoctor(doctor) {
      this.formData.doctor = doctor;
    },

    validate() {
      return true;
    },
  },
};
</script>