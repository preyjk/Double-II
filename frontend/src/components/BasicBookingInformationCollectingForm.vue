<template>
  <div class="booking-form">
    <h2>Booking Information for {{ doctor.Gpname }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Who is this appointment for?</label>
        <input
          v-model="form.appointmentFor"
          type="radio"
          value="Myself"
          required
        />
        Myself
        <input
          v-model="form.appointmentFor"
          type="radio"
          value="Someone Else"
          required
        />
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
import { bookAppointment } from "@/network/netService";

export default {
  name: "BasicBookingInformationCollectingForm",
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
    submitForm() {
      bookAppointment(this.form)
        .then((data) => {
          console.log("Booking successful:", data);
          alert(
            `Booking submitted for ${this.form.firstName} ${this.form.lastName} with ${this.doctor.Gpname}`
          );
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
