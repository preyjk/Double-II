<template>
  <div class="booking-form">
    <h2>Booking Information for {{ `${this.doctor.FirstName} ${this.doctor.LastName}` }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Who is this appointment for?</label>
        <input v-model="form.appointmentFor" type="radio" value="Myself" required />
        Myself
        <input v-model="form.appointmentFor" type="radio" value="Someone Else" required />
        Someone Else
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input v-model="form.firstName" type="text" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input v-model="form.lastName" type="text" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input v-model="form.phone" type="tel" required />
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input v-model="form.dob" type="date" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    doctor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        appointmentFor: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
      },
    };
  },
  methods: {
    // Mapping Vuex actions
    ...mapActions(["addBooking"]),

    // Generate a random time between 8:00 AM and 4:00 PM with 15-minute intervals
    getRandomTime() {
      const startTime = 8 * 60; // 8:00 AM in minutes
      const endTime = 16 * 60; // 4:00 PM in minutes
      const interval = 15; // 15-minute interval

      // Generate a random number of minutes within the range
      const randomMinutes = Math.floor(Math.random() * ((endTime - startTime) / interval)) * interval + startTime;

      // Convert minutes to HH:mm format
      const hours = Math.floor(randomMinutes / 60);
      const minutes = randomMinutes % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    },

    // Generate today's date in YYYY-MM-DD format
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    // Submit form method
    submitForm() {
      // Generate random date and time
      const date = this.getTodayDate();
      const time = this.getRandomTime();
      // Create booking object based on form data
      const booking = {
        doctorName: `${this.doctor.FirstName} ${this.doctor.LastName}`,
        date: date,
        time: time,
        patientName: `${this.form.firstName} ${this.form.lastName}`,
        email: this.form.email,
        phone: this.form.phone,
        dob: this.form.dob,
      };

      // Use Vuex action to add booking to the store
      this.addBooking(booking)
        .then(() => {
          // Redirect to ConfirmationPage after booking is added
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
.booking-form {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #64b1e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4081ea;
}
</style>
