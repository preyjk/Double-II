<template>
  <div class="confirmation-container">
    <h2>Booking Confirmation</h2>
    <div v-if="bookingDetails" class="detail">
      <p>
        Thank you, {{ bookingDetails.firstName }} {{ bookingDetails.lastName }}!
      </p>
      <p>
        Your appointment with Dr. {{ bookingDetails.doctorName }} has been
        successfully booked.
      </p>
      <p class="p-detail">Details of your booking:</p>
      <ul>
        <li><strong>Email:</strong> {{ bookingDetails.email }}</li>
        <li><strong>Phone:</strong> {{ bookingDetails.phone }}</li>
        <li><strong>Date of Birth:</strong> {{ bookingDetails.dob }}</li>
        <li><strong>Appointment Date:</strong> {{ bookingDetails.date }}</li>
        <li>
          <strong>Appointment Time:</strong> {{ bookingDetails.startTime }} -
          {{ bookingDetails.endTime }}
        </li>
        <li><strong>Location:</strong> {{ bookingDetails.location }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Booking details are unavailable. Please try again.</p>
    </div>
    <router-link to="/" class="home-link">Back to Home</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ConfirmationPage",
  computed: {
    ...mapGetters(["getBookingDetails"]),
    bookingDetails() {
      const details = this.getBookingDetails || {};
      return details;
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
