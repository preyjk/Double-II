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
              <p><strong>Doctor:</strong> {{ booking.doctorName }}</p>
              <p><strong>Date:</strong> {{ booking.date }}</p>
              <p><strong>Time:</strong> {{ booking.time }}</p>
              <p><strong>Patient:</strong> {{ booking.patientName }}</p>
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
    ...mapGetters(["allBookings"]), // Get all bookings from Vuex store
    bookings() {
      return this.allBookings; // Return the bookings
    },
  },
  methods: {
    ...mapActions(["removeBooking"]), // Map Vuex action to remove a booking
    cancelBooking(index) {
      this.removeBooking(index); // Remove the booking from the store
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
}

.appointments-list {
  list-style-type: none;
  padding: 0;
}

.appointment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.appointment-details {
  max-width: 70%;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #c0392b;
}
</style>
