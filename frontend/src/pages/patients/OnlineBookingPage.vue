<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <FindMedicalCenterModal
      :show="isShowGPS"
      @close="closeGPS"
      @ClinicSelected="handleClinicSelected"
    >
    </FindMedicalCenterModal>

    <div v-if="isShowGPSResponse" class="reopen-modal">
      <p>You must select a clinic location.</p>
      <button @click="reopenGPSModal">Select Clinic</button>
    </div>

    <div class="container_body" v-if="isShowBookingForm">
      <div class="main_content">
        <GPSelectForm
          v-if="!isSelectedDoctor & !isScheduleChosen"
          :clinicName="clinicName"
          @doctorSelected="handleDoctorSelected"
        />
        <DoctorSchedule
          :doctorId="selectedDoctor.Id"
          :doctorName="selectedDoctor.LastName"
          v-if="isSelectedDoctor & !isScheduleChosen"
          @scheduleSelected="handleScheduleSelected"
        />
        <BasicBookingInformationCollectingForm
          :doctor="selectedDoctor"
          v-if="isScheduleChosen"
          @submitForm="handleSubmitForm"
        />
      </div>
    </div>

    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import FindMedicalCenterModal from "@/components/patients/FindMedicalCenterModal.vue";
import GPSelectForm from "@/components/patients/GPSelectForm.vue";
import BasicBookingInformationCollectingForm from "@/components/patients/BasicBookingInformationCollectingForm.vue";
import DoctorSchedule from "@/components/patients/DoctorSchedule.vue";
import { mapActions } from "vuex";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    FindMedicalCenterModal,
    GPSelectForm,
    BasicBookingInformationCollectingForm,
    DoctorSchedule,
  },
  data() {
    return {
      isShowGPS: true,
      isShowGPSResponse: false,
      isShowBookingForm: false,
      clinicName: "",
      isSelectedDoctor: false,
      selectedDoctor: {},
      isScheduleChosen: false,
    };
  },
  methods: {
    ...mapActions(["addBooking"]),

    closeGPS() {
      this.isShowGPS = false;
      this.isShowGPSResponse = true;
    },
    reopenGPSModal() {
      this.isShowGPS = true;
    },
    handleClinicSelected(selectedClinic) {
      this.isShowGPSResponse = false;
      this.isShowGPS = false;
      this.isShowBookingForm = true;
      this.clinicId = selectedClinic.id;
      this.clinicName = selectedClinic.name;
    },
    handleDoctorSelected(doctor) {
      this.selectedDoctor = doctor;
      this.isSelectedDoctor = true;
    },
    handleScheduleSelected(schedule) {
      this.isScheduleChosen = true;
      this.selectedDoctor.DoctorId = schedule.DoctorId;
      this.selectedDoctor.DoctorName = schedule.DoctorName;
      this.selectedDoctor.StartTime = schedule.StartTime;
      this.selectedDoctor.EndTime = schedule.EndTime;
      this.selectedDoctor.Date = schedule.Date;
      this.selectedDoctor.Location = this.clinicName;
      this.selectedDoctor.scheduleId = schedule.Id;
    },
    handleSubmitForm(booking) {
      this.$store.commit("set_tempBooking", booking);
      this.addBooking(booking)
        .then(() => {
          this.$router.push({
            name: "ConfirmationPage",
          });
        })
        .catch((err) => {
          console.error("Error submitting booking:", err);
          alert("Failed to book the appointment. Please try again.");
        });
    },
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
  align-items: center;
}

.container_footer {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.reopen-modal {
  text-align: center;
  margin-top: 20px;
}

.reopen-modal p {
  font-size: 18px;
  color: red;
}

.reopen-modal button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reopen-modal button:hover {
  background-color: #2980b9;
}

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
