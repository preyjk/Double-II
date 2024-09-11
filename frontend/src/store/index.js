import { createStore } from "vuex";
import { getAppointments_user, createAppointment_user, cancelAppointment_user } from "@/api/modules/appointment.js";

export default createStore({
  state: {
    bookings: [],
    tempBooking: {},
    email: localStorage.getItem("email") || "",
  },
  mutations: {
    ADD_BOOKING(state, booking) {
      state.bookings.push(booking);
    },
    REMOVE_BOOKING(state, index) {
      state.bookings.splice(index, 1);
    },
    CLEAR_BOOKINGS(state) {
      state.bookings = [];
    },
    SET_BOOKINGS(state, bookings) {
      state.bookings = bookings;
    },
    set_tempBooking(state, tempBooking) {
      state.tempBooking = tempBooking;
    },
    SET_EMAIL(state, email) {
      state.email = email;
      localStorage.setItem("email", email);
    },
    CANCEL_BOOKING(state, index) {
      state.bookings[index].Status = "cancelled";
    }
  },
  actions: {
    async addBooking({ commit }, booking) {
      try {
        const token = localStorage.getItem("authToken");

        const formData = {
          FirstName: booking.firstName,
          LastName: booking.lastName,
          DateOfBirth: booking.dob,
          BookingReference: "string",
          ScheduleId: booking.scheduleId,
          DoctorId: booking.DoctorId,
          DoctorName: booking.doctorName,
          Date: booking.date,
          StartTime: booking.startTime,
          EndTime: booking.endTime,
          Reason: "string",
          Status: "pending",
          Email: booking.email,
          Phone: booking.phone,
          Address: booking.Location,
        };
        console.log("token", token);
        console.log("formData", formData);

        const response = await createAppointment_user(formData, token);

        commit("ADD_BOOKING", response);

      } catch (err) {
        console.error("Error during booking:", err);
        throw err;
      }
    },

    async getBookings({ commit }) {
      try {
        const bookings = await getAppointments_user();
        commit("SET_BOOKINGS", bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        throw err;
      }
    },

    async cancelBooking({ commit, state }, index) {
      try {
        const appointmentId = state.bookings[index].Id;

        await cancelAppointment_user(appointmentId);

        commit("CANCEL_BOOKING", index);
        console.log("Appointment canceled successfully");
      } catch (err) {
        console.error("Error canceling appointment:", err);
        throw err;
      }
    },

    removeBooking({ commit }, index) {
      commit("REMOVE_BOOKING", index);
    },

    clearBookings({ commit }) {
      commit("CLEAR_BOOKINGS");
    },
  },
});
