<template>
  <div class="flex flex-col md:flex-row md:h-full">
    <div class="w-full md:w-1/3 md:overflow-y-auto">
      <AppointmentList ref="appointmentList" @selectAppointment="selectAppointment" :appointments="appointments" :loading="loading" />
    </div>
    <div class="w-full md:w-2/3 md:overflow-y-auto">
      <div v-if="appointmentList?.selectedAppointment">
        <AppointmentDetail :appointment="appointmentList.selectedAppointment" />
        <div v-if="appointmentList.selectedAppointment.Status === 'active'"
          class="w-full flex flex-row space-x-10 justify-center">
          <button @click="completeAppointment"
            class="bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 w-32">Complete</button>
          <button @click="cancelAppointment"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 w-32">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppointmentList from '../../components/AppointmentList.vue';
import AppointmentDetail from '../../components/AppointmentDetail.vue';
import axios from '@/api/backendApi';
import { ref, onMounted } from 'vue';

const appointmentList = ref(null);
const appointments = ref([]);
const loading = ref(true);

const fetchAppointments = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/admin/appointments', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    appointments.value = response.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

const completeAppointment = async () => {
  console.debug('Complete appointment');
  if (confirm('Are you sure you want to complete this appointment?')) {
    try {
      await axios.post(`/admin/appointments/${appointmentList.value.selectedAppointment.Id}/complete`, null, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      alert('Appointment completed');
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to complete appointment');
    }
  }
};

const cancelAppointment = async () => {
  console.debug('Cancel appointment');
  if (confirm('Are you sure you want to cancel this appointment?')) {
    try {
      await axios.post(`/admin/appointments/${appointmentList.value.selectedAppointment.Id}/cancel`, null, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      alert('Appointment cancelled');
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to cancel appointment');
    }
  }
};

onMounted(() => {
  fetchAppointments();
});


</script>