<template>
  <div class="md:h-full mx-4 p-4 border-b md:border-b-0 md:border-r border-gray-300">
    <h2 class="text-lg font-semibold mb-4">Appointments</h2>
    <div class="w-1/3 flex flex-col justify-end">
      <label class="text-sm text-gray-600">Status</label>
      <el-select v-model="filterStatus" placeholder="All">
        <el-option label="All" value=""></el-option>
        <el-option label="Active" value="active"></el-option>
        <el-option label="Cancelled" value="cancelled"></el-option>
        <el-option label="Completed" value="completed"></el-option>
      </el-select>
    </div>
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
          <h3 class="font-medium">Doctor: {{ appointment.DoctorName }}</h3>
          <p class="text-sm text-gray-600">Patient: {{ appointment.FirstName }} {{ appointment.LastName }}</p>
          <p class="text-sm text-gray-600">Date: {{ appointment.Date }}</p>
          <p class="text-sm text-gray-600">Time: {{ appointment.StartTime }} - {{ appointment.EndTime }}</p>
          <p class="text-sm text-gray-600">Status: {{ appointment.Status.charAt(0).toUpperCase() +
            appointment.Status.slice(1) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed, defineProps } from 'vue';

const props = defineProps(['appointments', 'loading']);
const selectedAppointment = ref(null);
const filterStatus = ref('active');
const emit = defineEmits(['selectAppointment']);



const filteredAppointments = computed(() => {
  return props.appointments.filter((appointment) => {
    if (!filterStatus.value) {
      return true;
    }
    return appointment.Status === filterStatus.value;
  }).sort((a, b) => {
    const dateComparison = new Date(a.Date) - new Date(b.Date);

    if (dateComparison === 0) {
      // Compare StartTime if dates are the same
      return a.StartTime.localeCompare(b.StartTime);
    }

    return dateComparison;
  });
});

const selectAppointment = (appointment) => {
  selectedAppointment.value = appointment;
  emit('selectAppointment', appointment);
};

defineExpose({
  selectedAppointment,
});

</script>