<template>
  <div class="flex flex-col max-w-lg mx-auto p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Search Appointment</h2>
    <div class="space-y-4">
      <el-input class="w-full" placeholder="Booking Reference" v-model="bookingReference" :required="true">
      </el-input>

      <el-input class="w-full" placeholder="Last Name" v-model="lastName">
      </el-input>

      <el-date-picker class="w-full" value-format="YYYY-MM-DD" v-model="dateOfBirth" type="date"
        placeholder="Date of Birth">
      </el-date-picker>

      <button
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        @click="findAppointment">
        Search
      </button>
    </div>

    <div class="mt-2" v-if="error">
      <p class="text-red-500 text-center">{{ error }}</p>
    </div>
    <div class="mt-6">
      <AppointmentDetail v-if="appointment" :appointment="appointment" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineModel } from 'vue';
import AppointmentDetail from '@/components/AppointmentDetail.vue';
import axios from '@/api/backendApi';

const bookingReference = ref('');
const error = ref('');
const lastName = ref('');
const dateOfBirth = ref('');
const appointment = defineModel();

const findAppointment = async (e) => {
  e.preventDefault();
  console.debug('Find appointment', bookingReference.value, lastName.value, dateOfBirth.value);
  try {
    appointment.value = null;
    error.value = '';
    const response = await axios.get('/public/appointments', {
      params: {
        reference: bookingReference.value,
        lastname: lastName.value,
        dob: dateOfBirth.value,
      },
    });
    appointment.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Appointment not found";
  }
};


</script>