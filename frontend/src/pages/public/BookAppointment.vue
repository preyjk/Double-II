<template>
  <div v-if="!created">
    <MultiStepForm :steps="steps" :formData="formData" @update:formData="formData = $event" :submitForm="submitForm" />
    <div v-if="error">{{ error }}</div>
  </div>

  <div v-if="created">
    <AppointmentDetail :appointment="formData" />
    <div class="text-green-500 font-bold text-center my-4">
      Your appointment has been successfully created!
    </div>
  </div>

</template>

<script>
import MultiStepForm from '../../components/MultiStepForm.vue';
import FindClinic from '../../components/FindClinic.vue';
import SelectDoctor from '../../components/SelectDoctor.vue';
import SelectSchedule from '../../components/SelectSchedule.vue';
import AppointmentForm from '../../components/AppointmentForm.vue';
import AppointmentDetail from '../../components/AppointmentDetail.vue';
import { shallowRef } from 'vue';
import axios from '@/api/backendApi';

export default {
  name: 'BookAppointment',
  components: {
    MultiStepForm,
    AppointmentDetail,
  },
  data() {
    return {
      formData: {},
      steps: shallowRef([
        FindClinic,
        SelectDoctor,
        SelectSchedule,
        AppointmentForm,
      ]),
      error: '',
      created: false,
    };
  },
  methods: {
    submitForm() {
      console.debug(this.formData);
      this.postData({
        FirstName: this.formData.firstName,
        LastName: this.formData.lastName,
        Email: this.formData.email,
        DateOfBirth: this.formData.dob,
        Symptom: this.formData.symptom,
        ScheduleId: this.formData.schedule.Id,
      })
    },
    async postData(data) {
      try {
        await axios.post('/public/appointments', data);
        this.created = true;
      } catch (error) {
        console.error(error);
        this.error = 'Error booking appointment. Please try again later.';
      }
    },

  },
};
</script>