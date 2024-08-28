import { createStore } from "vuex";
import { makeAppointment,getAppointments } from "@/network/netService";

export default createStore({
  state: {
    bookings: [],
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
  },
  actions: {
    async addBooking({ commit }, booking) {
      try {
        const token = localStorage.getItem("authToken");

        const formData = {
          Id: "string",
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
        };
        
        const response = await makeAppointment(formData, token);

        commit("ADD_BOOKING", response);

      } catch (err) {
        console.error("Error during booking:", err);
        throw err;
      }
    },

    async getBookings({ commit }) {
      try {
        const bookings = await getAppointments(); 
        commit("SET_BOOKINGS", bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
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
