<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <div class="main_content">
      <GPSelectForm v-if="!selectedDoctor" :clinicName="clinicName" @doctorSelected="handleDoctorSelected" />
      <BasicBookingInformationCollectingForm :doctor="selectedDoctor" v-if="selectedDoctor" />
      <!-- <InformationCollectingComponent></InformationCollectingComponent>\ -->
    </div>
    <FooterComponent class="container_header"></FooterComponent>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import GPSelectForm from "@/components/GPSelectForm.vue";
import BasicBookingInformationCollectingForm from "@/components/BasicBookingInformationCollectingForm.vue";
// import InformationCollectingComponent from "@/components/InformationCollectingComponent.vue";
export default {
  components: {
    HeaderComponent,
    FooterComponent,
    GPSelectForm,
    BasicBookingInformationCollectingForm
    // InformationCollectingComponent,
  },
  setup() {
    const route = useRoute();
    const clinicId = ref(route.params.clinicId);
    const clinicName = ref(route.params.clinicName);
    const selectedDoctor = ref(null);

    const handleDoctorSelected = (doctor) => {
      selectedDoctor.value = doctor;
      console.log(doctor);
    };
    return {
      clinicName,
      clinicId,
      selectedDoctor,
      handleDoctorSelected,
    };
  },
};
</script>

<style scoped>
.container_body {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container_header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.main_content {
  width: 100%;
  background-color: var(--background-color);
}
</style>
