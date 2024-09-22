<template>
  <div v-if="!created">
    <MultiStepForm :steps="steps" v-model="formData" :submitForm="submitForm" />
    <div v-if="error">{{ error }}</div>
  </div>

  <div v-if="created">
    <AppointmentDetail :appointment="formData" />
    <div class="text-green-500 font-bold text-center my-4">
      Your appointment has been successfully created!
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
  FindClinic,
  SelectDoctor,
  SelectSchedule,
  AppointmentForm,
]);
const error = ref('');
const created = ref(false);

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
    const response = await axios.post('/public/appointments', data);
    formData.value.bookingReference = response.data.BookingReference;
    created.value = true;
  } catch (err) {
    console.error(err);
    error.value = 'Error booking appointment. Please try again later.';
  }
};
</script>