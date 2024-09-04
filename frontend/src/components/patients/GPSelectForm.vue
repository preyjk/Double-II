<template>
  <div class="gp-select-form">
    <h1>Doctors at {{ clinicName }}</h1>
    <p>Please select a doctor to proceed with the booking:</p>
    <ul class="doctor-list">
      <li
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        @click="selectDoctor(doctor)"
        class="doctor-item"
      >
        {{ doctor.LastName }} - {{ doctor.Speciality }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { useGet } from "@/api/useApi";

export default {
  name: "GPSelectForm",
  components: {},
  props: {
    clinicName: {
      type: String,
      required: true,
    },
    clinicId: {
      type: String,
      required: true,
    },
  },
  emits: ["doctorSelected"],
  setup(props, { emit }) {
    const selectedDoctor = ref(null);
    const { data: filteredDoctors } = useGet(
      `${import.meta.env.VITE_API_ENDPOINT}/doctors?workplace=${
        props.clinicName
      }`
    );

    const selectDoctor = (doctor) => {
      selectedDoctor.value = doctor;
      // console.log("xx:", doctor.Id);
      emit("doctorSelected", doctor);
    };

    return {
      filteredDoctors,
      selectedDoctor,
      selectDoctor,
    };
  },
};
</script>

<style scoped>
.gp-select-form {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.doctor-list {
  list-style-type: none;
  padding: 0;
}

.doctor-item {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.doctor-item:hover {
  background-color: #e0e0e0;
}
</style>
