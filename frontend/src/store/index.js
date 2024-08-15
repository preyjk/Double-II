import { createStore } from "vuex";

export default createStore({
  state: {
    bookings: [], // Store all bookings here
  },
  mutations: {
    ADD_BOOKING(state, booking) {
      state.bookings.push(booking); // Add booking to the state
    },
    CLEAR_BOOKINGS(state) {
      state.bookings = []; // Clear all bookings
    },
  },
  actions: {
    addBooking({ commit }, booking) {
      // Perform any async operations if necessary (e.g., API calls)
      // Then commit the mutation to add booking
      commit("ADD_BOOKING", booking);
      localStorage.setItem("lastBooking", JSON.stringify(booking)); // Save to localStorage
    },
    clearBookings({ commit }) {
      // Clear bookings, this can also be used when user logs out
      commit("CLEAR_BOOKINGS");
    },
  },
  getters: {
    allBookings: (state) => state.bookings, // Get all bookings
    getBookingDetails: (state) => {
      return state.bookings.length
        ? state.bookings[state.bookings.length - 1]
        : JSON.parse(localStorage.getItem("lastBooking")); // Fallback to localStorage
    },
  },
});
