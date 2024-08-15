<template>
  <div class="confirmation-container">
    <h2>Booking Confirmation</h2>
    <div v-if="bookingDetails">
      <p>
        Thank you, {{ bookingDetails.firstName }} {{ bookingDetails.lastName }}!
      </p>
      <p>
        Your appointment with Dr. {{ bookingDetails.doctorName }} has been
        successfully booked.
      </p>
      <p>Details of your booking:</p>
      <ul>
        <li><strong>Email:</strong> {{ bookingDetails.email }}</li>
        <li><strong>Phone:</strong> {{ bookingDetails.phone }}</li>
        <li><strong>Date of Birth:</strong> {{ bookingDetails.dob }}</li>
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
      // console.log("Booking Details:", details);
      return details;
    },
  },
};
</script>

<style scoped>
.confirmation-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #64b1e8;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.home-link:hover {
  background-color: #4081ea;
}
</style>
