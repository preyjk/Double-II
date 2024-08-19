<template>
  <div class="gp-select-form">
    <h1>Doctors at {{ clinicName }}</h1>
    <p>Please select a doctor to proceed with the booking:</p>
    <ul class="doctor-list">
      <li v-for="doctor in filteredDoctors" :key="doctor.id" @click="selectDoctor(doctor)" class="doctor-item">
        {{ doctor.Gpname }} - {{ doctor.Speciality }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "GPSelectForm",
  components: {
  },
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
  emits: ['doctorSelected'],
  setup(props, { emit }) {
    const doctors = ref([]);
    const filteredDoctors = ref([]);
    const selectedDoctor = ref(null);

    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_ENDPOINT}/doctors`
        );
        const data = await response.json();
        doctors.value = data;
        filterDoctors();
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const filterDoctors = () => {
      filteredDoctors.value = doctors.value.filter(
        (doctor) => doctor.WorkofPlace === props.clinicName
      );
    };

    const selectDoctor = (doctor) => {
      selectedDoctor.value = doctor;
      emit('doctorSelected', doctor);
    };

    onMounted(fetchDoctors);

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