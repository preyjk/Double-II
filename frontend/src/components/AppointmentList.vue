<template>
  <div class="md:h-full md:w-1/3 w-full p-4 md:border-r md:border-gray-300">
    <h2 class="text-lg font-semibold mb-4">Appointments</h2>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-if="!loading && filteredAppointments.length === 0">
      <p>No appointments found</p>
    </div>
    <ul v-else>
      <li v-for="appointment in filteredAppointments" :key="appointment.Id" @click="selectAppointment(appointment)"
        :class="['p-2 cursor-pointer hover:bg-gray-300 flex justify-between items-center',
          selectedAppointment && selectedAppointment.Id === appointment.Id && 'bg-gray-200'
        ]">
        <div>
          <h3 class="font-medium">{{ appointment.DoctorName }}</h3>
          <p class="text-sm text-gray-600">{{ appointment.FirstName }} {{ appointment.LastName }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from '@/api/backendApi';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const appointments = ref([]);
const selectedAppointment = ref(null);
const filteredAppointments = ref([]);
const loading = ref(true);

onMounted(async () => {
  const store = useStore();
  const token = store.state.localStorage.token;
  try {
    loading.value = true;
    const response = await axios.get('/user/appointments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    appointments.value = response.data;
    filteredAppointments.value = response.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

</script>