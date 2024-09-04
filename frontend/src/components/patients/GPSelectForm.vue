<template>
  <div class="gp-select-form">
    <h1>Doctors at {{ clinicName }}</h1>
    <p>Please select a doctor to proceed with the booking:</p>
    <div class="doctor-grid">
      <div
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        @click="selectDoctor(doctor)"
        class="doctor-card"
      >
        <img src="/src/assets/doctor.png" alt="Doctor Image" class="doctor-image">
        <div class="doctor-info">
          <div class="doctor-name">{{ doctor.LastName }}</div>
          <div class="doctor-specialty">{{ doctor.Speciality }}</div>
        </div>
      </div>
    </div>
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
  max-width: 1200px;
  margin: auto;
  background-color: #ffffff;
  text-align: center;
}

.doctor-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 最后一行的卡片向左对齐 */
  gap: 20px; /* 设置卡片之间的间隔 */
}

.doctor-card {
  display: flex;
  align-items: center;
  width: calc(33% - 20px); /* 默认为一行三张卡 */
  height: 250px;
  background-color: #e6e6e6;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border: none;
}

@media (max-width: 800px) {
  .doctor-card {
    width: calc(50% - 20px); /* 当屏幕较小时，一行两张卡 */
  }
}

@media (max-width: 500px) {
  .doctor-card {
    width: calc(100% - 20px); /* 当屏幕更小时，一行一张卡 */
  }
}

.doctor-card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 12px rgba(0,77,102,0.15);
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
  flex: 1;
  color: #004d66;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.doctor-name, .doctor-specialty {
  margin-bottom: 5px;
  font-weight: bold;
}

h1, p {
  color: #004d66;
  margin-bottom: 10px;
}
</style>
