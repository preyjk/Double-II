<template>
  <div class="flex flex-col md:flex-row md:h-full">
    <div class="w-full md:w-1/3 overflow-y-auto">
      <AppointmentList ref="appointmentList" @selectAppointment="selectAppointment" />
    </div>
    <div class="w-full md:w-2/3 overflow-y-auto">
      <Reschedule v-if="status==='reschedule'" :appointment="appointmentList.selectedAppointment" @rescheduled="refreshAppointments"/>
      <div v-if="status==='detail' && appointmentList?.selectedAppointment">
        <AppointmentDetail :appointment="appointmentList.selectedAppointment" />
        <div v-if="appointmentList.selectedAppointment.Status === 'active'" class="w-full flex flex-row space-x-10 justify-center">
          <button @click="rescheduleAppointment" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 w-32">Reschedule</button>
          <button @click="cancelAppointment" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 w-32">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppointmentList from '../../components/AppointmentList.vue';
import AppointmentDetail from '../../components/AppointmentDetail.vue';
import Reschedule from '../../components/user/Reschedule.vue';
import axios from '@/api/backendApi';
import { ref } from 'vue';

const appointmentList = ref(null);
const status = ref('detail');

const selectAppointment = (appointment) => {
  status.value = 'detail';
};

const rescheduleAppointment = () => {
  console.debug('Reschedule appointment');
  status.value = 'reschedule';
};

const refreshAppointments = async (data) => {
  console.debug('Refresh appointments', data);
  appointmentList.value.fetchAppointments();
};

const cancelAppointment = async () => {
  console.debug('Cancel appointment');
  if (confirm('Are you sure you want to cancel this appointment?')) {
    try {
      await axios.post(`/user/appointments/${appointmentList.value.selectedAppointment.Id}/cancel`, null, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      alert('Appointment cancelled');
      appointmentList.value.fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to cancel appointment');
    }
  }
};


</script>