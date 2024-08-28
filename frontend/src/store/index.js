import { createStore } from "vuex";
import { bookAppointment } from "@/network/netService";

export default createStore({
  state: {
    bookings: [], // Store all bookings here
  },
  mutations: {
    ADD_BOOKING(state, booking) {
      state.bookings.push(booking); // Add booking to the state
    },
    REMOVE_BOOKING(state, index) {
      state.bookings.splice(index, 1); // Remove booking by index
    },
    CLEAR_BOOKINGS(state) {
      state.bookings = []; // Clear all bookings
    },
  },
  actions: {
    // addBooking({ commit }, booking) {
    //   // Perform any async operations if necessary (e.g., API calls)
    //   // Then commit the mutation to add booking
    //   commit("ADD_BOOKING", booking);
    //   localStorage.setItem("lastBooking", JSON.stringify(booking)); // Save to localStorage
    // },
    async addBooking({ commit }, booking) {
      try {
        const response = await bookAppointment(booking);
        commit("ADD_BOOKING", response);
        localStorage.setItem("lastBooking", JSON.stringify(response));
      } catch (err) {
        console.error("Error during booking:", err);
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
  getters: {
    allBookings: (state) => state.bookings,
    getBookingDetails: (state) => {
      return state.bookings.length
        ? state.bookings[state.bookings.length - 1]
        : JSON.parse(localStorage.getItem("lastBooking"));
    },
  },
});
