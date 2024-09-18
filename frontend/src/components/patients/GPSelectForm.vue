<template>
  <div class="gp-select-form">
    <h1>Doctors at {{ clinicName }}</h1>
    <p>Please select a doctor to proceed with the booking:</p>
    <div class="doctor-grid">
      <div
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        class="doctor-card"
        :class="{ 'selected': selectedDoctor === doctor }"
        @click="selectDoctor(doctor)"
      >
        <img
          src="/src/assets/doctor.png"
          alt="Doctor Image"
          class="doctor-image"
        />
        <div class="doctor-info">
          <div class="doctor-name">{{ doctor.FirstName }} {{ doctor.LastName }}</div>
          <div class="doctor-specialty">{{ doctor.Speciality }}</div>
        </div>
       
        <div class="doctor-detail-overlay">
          <div class="doctor-detail">{{ doctor.Detail }}</div>
          <button class="booking-btn" @click="selectDoctor(doctor)">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { filterDoctors_public } from "@/api/modules/doctor.js";

export default {
  name: "GPSelectForm",
  components: {},
  props: {
    clinicName: {
      type: String,
      required: true,
    },
  },
  emits: ["doctorSelected"],
  setup(props, { emit }) {
    const selectedDoctor = ref(null);
    const filteredDoctors = ref([]);

    const selectDoctor = (doctor) => {
      selectedDoctor.value = doctor;
      emit("doctorSelected", doctor);
    };

    const fetchDoctors = async () => {
      try {
        const doctors = await filterDoctors_public({
          workplace: props.clinicName,
        });
        filteredDoctors.value = doctors;
        console.log(filteredDoctors.value);  
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    onMounted(() => {
      fetchDoctors();
    });

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
  max-width: 1200px;
  margin: auto;
  background-color: #ffffff;
  text-align: center;
}

.doctor-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.doctor-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(33% - 20px);
  height: 300px;
  background-color: #e6e6e6;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent; 
}

@media (max-width: 800px) {
  .doctor-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 500px) {
  .doctor-card {
    width: calc(100% - 20px);
  }
}

.doctor-image {
  width: 40%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.doctor-info {
  padding: 10px;
  color: #004d66;
  flex: 1;
}

.doctor-name,
.doctor-specialty {
  margin-bottom: 5px;
  font-weight: bold;
}

.doctor-detail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 77, 102, 0.85);
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 15px;
  padding: 20px;
}

.doctor-card:hover .doctor-detail-overlay {
  opacity: 1;
}

.doctor-detail {
  margin-bottom: 15px;
}

.booking-btn {
  padding: 12px 25px;
  background: linear-gradient(135deg, #004d66, #accfd8);
  color: #ffffff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.4s ease;
  text-transform: uppercase;
}

.booking-btn:hover {
  background: linear-gradient(135deg, #accfd8, #004d66);
}

h1 {
  color: #004d66;
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: 700;
}

p {
  color: #004d66;
  font-size: 1.2em;
  margin-bottom: 40px;
}
</style>




