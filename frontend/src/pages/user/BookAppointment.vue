<template>
  <div class="p-5 md:overflow-y-auto md:h-screen">
    <div v-if="!created">
      <MultiStepForm :steps="steps" v-model="formData" :submitForm="submitForm" />
      <div v-if="error">{{ error }}</div>
    </div>

    <div v-if="created">
      <AppointmentDetail :appointment="appointmentDetail" />
      <div class="text-green-500 font-bold text-center my-4">
        Your appointment has been successfully created!
      </div>
    </div>
  </div>

</template>

<script setup>
import { shallowRef, ref } from 'vue';
import axios from '@/api/backendApi';

// Import components
import MultiStepForm from '../../components/MultiStepForm.vue';
import FindClinic from '../../components/FindClinic.vue';
import SelectDoctor from '../../components/SelectDoctor.vue';
import SelectSchedule from '../../components/SelectSchedule.vue';
import AppointmentForm from '../../components/AppointmentForm.vue';
import AppointmentDetail from '../../components/AppointmentDetail.vue';

// Reactive state
const formData = ref({});
const steps = shallowRef([
  { component: FindClinic },
  { component: SelectDoctor },
  { component: SelectSchedule },
  { component: AppointmentForm },
]);
const error = ref('');
const created = ref(false);
const appointmentDetail = ref(null);

// Methods
const submitForm = () => {
  console.debug(formData.value);
  postData({
    FirstName: formData.value.firstName,
    LastName: formData.value.lastName,
    Email: formData.value.email,
    DateOfBirth: formData.value.dob,
    Symptom: formData.value.symptom,
    ScheduleId: formData.value.schedule.Id,
  });
};

const postData = async (data) => {
  try {
    const response = await axios.post('/user/appointments', data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    appointmentDetail.value = response.data;
    created.value = true;
  } catch (err) {
    console.error(err);
    error.value = 'Error booking appointment. Please try again later.';
  }
};
</script>