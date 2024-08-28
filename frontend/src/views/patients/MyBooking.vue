<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <div class="appointments-container">
      <h2>Your Appointments</h2>
      <div v-if="bookings && bookings.length">
        <ul class="appointments-list">
          <li
            v-for="(booking, index) in bookings"
            :key="index"
            class="appointment-item"
          >
            <div class="appointment-details">
              <p><strong>Doctor:</strong> Dr. {{ booking.doctorName }}</p>
              <p><strong>Date:</strong> {{ booking.date }}</p>
              <p>
                <strong>Time:</strong> {{ booking.startTime }} -
                {{ booking.endTime }}
              </p>
              <p><strong>Location:</strong> {{ booking.location }}</p>
              <p><strong>Patient:</strong> {{ booking.patientName }}</p>
              <p><strong>Email:</strong> {{ booking.email }}</p>
              <p><strong>Phone:</strong> {{ booking.phone }}</p>
            </div>
            <button @click="cancelBooking(index)" class="cancel-button">
              Cancel
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>You have no appointments scheduled.</p>
      </div>
    </div>
    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";

export default {
  components: { HeaderComponent, FooterComponent },
  name: "AppointmentList",
  computed: {
    ...mapGetters(["allBookings"]),
    bookings() {
      return this.allBookings;
    },
  },
  methods: {
    ...mapActions(["removeBooking"]),
    cancelBooking(index) {
      this.removeBooking(index);
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

.appointments-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.appointments-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.appointment-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.appointment-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.appointment-details {
  max-width: 75%;
}

.appointment-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.appointment-details strong {
  color: #333;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.cancel-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.cancel-button:active {
  transform: scale(1);
}
</style>
