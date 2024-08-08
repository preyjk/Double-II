<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button @click="$emit('close')" class="close-button">&times;</button>
      <div class="modal-header">
        <h2>Find a Medical Center</h2>
      </div>
      <div class="modal-body">
        <div class="sidebar">
          <input type="text" placeholder="Search clinics..." v-model="searchQuery" @input="filterClinics"
            class="search-bar" />
          <ul class="clinic-list">
            <li v-for="clinic in filteredClinics" :key="clinic.id" @click="selectClinic(clinic)" class="clinic-item">
              {{ clinic.name }}
            </li>
          </ul>
        </div>
        <div class="map-container">
          <GMapMap :center="mapCenter" :zoom="13" style="width: 100%; height: 75vh">
            <GMapMarker v-for="clinic in clinics" :key="clinic.id" :position="clinic.location"
              @click="selectClinic(clinic)">
              <!-- Info window for the selected clinic -->
              <GMapInfoWindow v-if="selectedClinic && selectedClinic.id === clinic.id">
                <div class="info-window">
                  <h3>{{ clinic.name }}</h3>
                  <button @click="openBookingModal(clinic)" class="book-button">
                    Booking an Appointment
                  </button>
                </div>
              </GMapInfoWindow>
            </GMapMarker>
          </GMapMap>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div v-if="showBookingModal" class="booking-modal-overlay">
      <div class="booking-modal-content">
        <button @click="closeBookingModal" class="close-button">&times;</button>
        <h2>Book an Appointment at {{ selectedClinic?.name }}</h2>
        <p>Location: {{ selectedClinic?.name }}</p>
        <button class="confirm-book-button" @click="bookAppointment">
          Proceed with Booking
        </button>
        <button class="cancel-button" @click="closeBookingModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "FindMedicalCenterModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const clinics = ref([]);
    const searchQuery = ref("");
    const filteredClinics = ref([]);
    const mapCenter = ref({ lat: -36.8478, lng: 174.7622 });
    const showBookingModal = ref(false);
    const selectedClinic = ref(null);

    const fetchClinics = async () => {
      try {
        const response = await fetch(
          "/api/clinics"
        );
        const data = await response.json();

        clinics.value = data.map((clinic, index) => ({
          id: index + 1,
          name: clinic.workplace,
          location: {
            lat: -36.8485 + index * 0.01,
            lng: 174.7633 + index * 0.01,
          }, // Example coordinates, replace with actual data if available
        }));

        filteredClinics.value = clinics.value;
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    const filterClinics = () => {
      const query = searchQuery.value.toLowerCase();
      filteredClinics.value = clinics.value.filter((clinic) =>
        clinic.name.toLowerCase().includes(query)
      );
    };

    const selectClinic = (clinic) => {
      mapCenter.value = clinic.location;
      selectedClinic.value = clinic;
    };

    const openBookingModal = (clinic) => {
      selectedClinic.value = clinic;
      showBookingModal.value = true;
    };

    const closeBookingModal = () => {
      showBookingModal.value = false;
      selectedClinic.value = null;
    };

    const bookAppointment = () => {
      if (selectedClinic.value) {
        emit("ClinicSelected", selectedClinic.value);
        closeBookingModal();
      }
    };

    onMounted(fetchClinics);

    return {
      clinics,
      searchQuery,
      filteredClinics,
      mapCenter,
      showBookingModal,
      selectedClinic,
      filterClinics,
      selectClinic,
      openBookingModal,
      closeBookingModal,
      bookAppointment,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 10px;
  background-color: #64b1e8;
  color: white;
}

.modal-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 30%;
  padding: 20px;
  background-color: #f8f8f8;
  overflow-y: auto;
}

.map-container {
  flex-grow: 1;
  width: 70%;
  position: relative;
  height: 100%;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.clinic-list {
  list-style-type: none;
  padding: 0;
}

.clinic-item {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clinic-item:hover {
  background-color: #e0e0e0;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
}

.booking-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.booking-modal-content {
  background-color: white;
  width: 50%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: center;
}

.info-window {
  text-align: center;
}

.book-button {
  background-color: #64b1e8;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
}

.book-button:hover {
  background-color: #4081ea;
}

.confirm-book-button {
  background-color: #64b1e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.confirm-book-button:hover {
  background-color: #4081ea;
}

.cancel-button {
  background-color: #e8e8e8;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.cancel-button:hover {
  background-color: #ccc;
}
</style>
