import { createStore } from "vuex";

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
    addBooking({ commit }, booking) {
      // Perform any async operations if necessary (e.g., API calls)
      // Then commit the mutation to add booking
      commit("ADD_BOOKING", booking);
      localStorage.setItem("lastBooking", JSON.stringify(booking)); // Save to localStorage
    },
    removeBooking({ commit }, index) {
      commit("REMOVE_BOOKING", index); // Call the mutation to remove the booking
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
