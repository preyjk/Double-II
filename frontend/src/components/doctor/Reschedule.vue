<template>
  <div class="p-5 md:overflow-y-auto md:h-screen">
    <div v-if="!created">
      <MultiStepForm :steps="steps" v-model="formData" :submitForm="submitForm" />
      <div v-if="error">{{ error }}</div>
    </div>

    <div v-if="created">
      <AppointmentDetail :appointment="appointmentDetail" />
      <div class="text-green-500 font-bold text-center my-4">
        Your appointment has been successfully rescheduled!
      </div>
    </div>
  </div>

</template>

<script setup>
import { shallowRef, ref, defineProps, watch } from 'vue';
import axios from '@/api/backendApi';

// Import components
import MultiStepForm from '../../components/MultiStepForm.vue';
import SelectSchedule from '../../components/SelectSchedule.vue';
import AppointmentDetail from '../../components/AppointmentDetail.vue';

const props = defineProps(['appointment']);
// Reactive state
const formData = ref({
  appointment: props.appointment,
  doctor: {
    Id: props.appointment.DoctorId,
    Name: props.appointment.DoctorName,
  },
});

const steps = shallowRef([
  { component: SelectSchedule },
  { component: AppointmentDetail },
]);
const error = ref('');
const created = ref(false);
const appointmentDetail = ref(null);
const emit = defineEmits(['rescheduled']);

watch(() => formData.value?.schedule, (val) => {
  if (val) {
    steps.value[1].props = {
      appointment: {
        ...formData.value.appointment,
        Date: formData.value.date,
        StartTime: val.StartTime,
        EndTime: val.EndTime,
      }
    };
  }
});

// Methods
const submitForm = () => {
  console.debug(formData.value);
  postData({
    ScheduleId: formData.value.schedule.Id,
  });
};

const postData = async (data) => {
  try {
    const response = await axios.post(`/doctor/appointments/${props.appointment.Id}/reschedule`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    appointmentDetail.value = response.data;
    created.value = true;
    emit('rescheduled', response.data);
  } catch (err) {
    console.error(err);
    error.value = 'Error booking appointment. Please try again later.';
  }
};
</script>