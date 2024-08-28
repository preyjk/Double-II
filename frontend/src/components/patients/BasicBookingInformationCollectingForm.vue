<template>
  <div class="booking-form">
    <h2>
      Booking Information for
      {{ `${this.doctor.FirstName} ${this.doctor.LastName}` }}
    </h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Who is this appointment for?</label>
        <div class="radio-group">
          <input
            v-model="form.appointmentFor"
            type="radio"
            id="myself"
            value="Myself"
            required
          />
          <label for="myself">Myself</label>
          <input
            v-model="form.appointmentFor"
            type="radio"
            id="someoneElse"
            value="Someone Else"
            required
          />
          <label for="someoneElse">Someone Else</label>
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input v-model="form.firstName" type="text" id="firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input v-model="form.lastName" type="text" id="lastName" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input v-model="form.phone" type="tel" id="phone" required />
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input v-model="form.dob" type="date" id="dob" required />
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
    ...mapActions(["addBooking"]),

    getRandomTime() {
      const startTime = 8 * 60;
      const endTime = 16 * 60;
      const interval = 15;

      const randomMinutes =
        Math.floor(Math.random() * ((endTime - startTime) / interval)) *
          interval +
        startTime;

      const hours = Math.floor(randomMinutes / 60);
      const minutes = randomMinutes % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    },

    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    submitForm() {
      const date = this.getTodayDate();
      const time = this.getRandomTime();
      const booking = {
        doctorName: `${this.doctor.FirstName} ${this.doctor.LastName}`,
        date: date,
        time: time,
        patientName: `${this.form.firstName} ${this.form.lastName}`,
        email: this.form.email,
        phone: this.form.phone,
        dob: this.form.dob,
      };

      this.addBooking(booking)
        .then(() => {
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
  background-color: #ffffff;
  border-radius: 12px;
  max-width: 450px;
  margin: 40px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
input[type="date"]:focus {
  outline: none;
  border-color: #64b1e8;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.radio-group input[type="radio"] {
  margin-right: 5px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #64b1e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4081ea;
}
</style>
