<template>
  <div class="flex flex-col h-screen md:flex-row md:h-full">
    <div class="w-full md:w-1/3 md:overflow-y-auto">
      <AppointmentList ref="appointmentList" @selectAppointment="selectAppointment" :appointments="appointments"
        :loading="loading" />
    </div>
    <div class="h-full w-full md:w-2/3 md:overflow-y-auto">
      <div class="md:p-2 p-4">
        <MultiOptionButton :label="'New'" :options="['Create', 'Link']" @create="goToCreateAppointment"
          @link="goToLinkAppointment" />
      </div>
      <Reschedule v-if="status === 'reschedule'" :appointment="appointmentList.selectedAppointment"
        @rescheduled="refreshAppointments" />
      <div v-if="status === 'detail' && appointmentList?.selectedAppointment">
        <AppointmentDetail :appointment="appointmentList.selectedAppointment" />
        <div v-if="appointmentList.selectedAppointment.Status === 'active'"
          class="w-full flex flex-row space-x-10 justify-center">
          <button @click="rescheduleAppointment"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 w-32">Reschedule</button>
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
import Reschedule from '../../components/user/Reschedule.vue';
import MultiOptionButton from '../../components/MultiOptionButton.vue';
import axios from '@/api/backendApi';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const appointmentList = ref(null);
const appointments = ref([]);
const status = ref('detail');
const router = useRouter();
const loading = ref(true);

const fetchAppointments = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/user/appointments', {
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

const selectAppointment = (appointment) => {
  status.value = 'detail';
};

const rescheduleAppointment = () => {
  console.debug('Reschedule appointment');
  status.value = 'reschedule';
};

const refreshAppointments = async (data) => {
  console.debug('Refresh appointments', data);
  fetchAppointments();
};

const goToCreateAppointment = () => {
  console.debug('Go to create appointment');
  router.push('new-appointment');
};

const goToLinkAppointment = () => {
  console.debug('Go to link appointment');
  router.push('link-appointment');
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