<template>

  <div class="flex flex-col h-full overflow-y-auto">
    <SearchAppointment v-model="appointment" />
    <div class="flex items-center justify-center">
      <button v-if="appointment" @click="linkAppointment"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">Link
        to current account</button>
    </div>
  </div>
</template>

<script setup>
import SearchAppointment from '../../components/user/SearchAppointment.vue';
import { ref } from 'vue';
import axios from '@/api/backendApi';
import { useRouter } from 'vue-router';

const appointment = ref(null);
const router = useRouter();

const linkAppointment = async () => {
  console.debug('Link appointment', appointment.value);
  try {
    await axios.post('/user/appointments/link', {
      BookingReference: appointment.value.BookingReference,
      LastName: appointment.value.LastName,
      DateOfBirth: appointment.value.DateOfBirth,
    }, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    alert('Appointment linked to your account');
    router.push('user-appointment');
  } catch (err) {
    console.error(err);
    alert('Failed to link appointment');
  }
};

</script>