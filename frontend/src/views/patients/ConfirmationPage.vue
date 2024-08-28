<template>
  <div class="confirmation-container">
    <h2>Booking Confirmation</h2>
    <div v-if="booking" class="detail">
      <p>
        Thank you, {{ booking.FirstName }} {{ booking.LastName }}!
      </p>
      <p>
        Your appointment with Dr. {{ booking.DoctorName }} has been
        successfully booked.
      </p>
      <p class="p-detail">Details of your booking:</p>
      <ul>
        <li><strong>Appointment Date:</strong> {{ booking.Date }}</li>
        <li>
          <strong>Appointment Time:</strong> {{ booking.StartTime }} -
          {{ booking.EndTime }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Booking details are unavailable. Please try again.</p>
    </div>
    <router-link to="/" class="home-link">Back to Home</router-link>
  </div>
</template>

<script>
import { getAppointments } from "@/network/netService";
export default {
  name: "ConfirmationPage",
  data() {
    return {
      booking: null,
    };
  },
  mounted() {
    this.fetchBookingDetails();
  },
  methods: {
    async fetchBookingDetails() {
      try {
        const appointments = await getAppointments();
        if (appointments && appointments.length > 0) {
          this.booking = appointments[appointments.length - 1];
        } else {
          console.error("No bookings found");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    },
  },
};
</script>

<style scoped>
.confirmation-container {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 12px;
  font-size: 16px;
}

li strong {
  color: #34495e;
}

.home-link {
  display: block;
  margin-top: 30px;
  padding: 12px 20px;
  background-color: #64b1e8;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  font-size: 18px;
}

.home-link:hover {
  background-color: #4081ea;
}

.detail p {
  margin-bottom: 10px;
}

.detail .p-detail {
  margin-bottom: 20px;
}
</style>
