<template>
  <div class="flex flex-col md:flex-row">
    <!-- Clinic List -->
    <div class="md:min-h-96 md:w-1/3 w-full p-4 md:border-r md:border-gray-300">
      <h2 class="text-lg font-semibold mb-4">Clinics</h2>
      <div class="flex mb-4">
        <div class="mr-2 w-2/3 flex flex-col justify-end">
          <el-input v-model="searchQuery" placeholder="Search by name" clearable></el-input>
        </div>
        <div class="w-1/3 flex flex-col justify-end">
          <label class="text-sm text-gray-600">Sort by:</label>
          <el-select v-model="sortBy" placeholder="Sort by">
            <el-option label="Name" value="name"></el-option>
            <el-option label="Distance" value="distance"></el-option>
          </el-select>
        </div>
      </div>
      <ul>
        <li v-for="clinic in sortedClinics" :key="clinic.name" @click="selectClinic(clinic)" :class="['p-2 cursor-pointer hover:bg-gray-300 flex justify-between items-center',
          formData.clinic && formData.clinic.name === clinic.name && 'bg-gray-200'
        ]">
          <div>
            <h3 class="font-medium">{{ clinic.name }}</h3>
            <p class="text-sm text-gray-600">{{ clinic.address }}</p>
          </div>
          <span class="text-sm text-gray-600">{{ clinic.distance ? clinic.distance + ' km' : '' }}</span>
        </li>
      </ul>
    </div>

    <!-- Google Map -->
    <div class="md:w-2/3 w-full p-4">
      <GoogleMap mapId="clinics" class="h-[50vh] md:h-full" :api-key="API_KEY" style="width: 100%"
        :center="mapCenter" :zoom="15">

        <AdvancedMarker v-if="userLocation" :options="{ position: userLocation }"
          :pin-options="{ background: 'blue', borderColor: 'blue', glyphColor: 'blue' }">
          <InfoWindow :options="{ headerDisabled: true }">
            <div>You are here</div>
          </InfoWindow>
        </AdvancedMarker>
        <AdvancedMarker v-for="clinic in clinics" :key="clinic.name"
          :options="{ position: clinic.location, title: clinic.name }" @click="selectClinic(clinic)">
          <InfoWindow ref="infoWindows" :options="{ headerDisabled: true }">
            <div style="padding: 2px">
              <h3>{{ clinic.name }}</h3>
              <p>{{ clinic.address }}</p>
              <p v-if="clinic.distance">Distance: {{ clinic.distance }} km</p>
              <a style="color: blue" :href="`https://www.google.com/maps?q=${clinic.address}`" target="_blank">View on Google Maps</a>
            </div>
          </InfoWindow>
        </AdvancedMarker>
      </GoogleMap>
    </div>
  </div>
</template>

<script>
import axios from '@/api/backendApi';
import { GoogleMap, AdvancedMarker, InfoWindow } from 'vue3-google-map'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default {
  props: ['modelValue'],
  components: {
    GoogleMap,
    AdvancedMarker,
    InfoWindow,
  },
  setup() {
    return {
      API_KEY,
    };
  },
  data() {
    return {
      searchQuery: '',
      sortBy: 'name',
      clinics: [
      ],
      map: null,
      markers: [],
      userLocation: null,
      mapCenter: { lat: -36.8478, lng: 174.7622 },
      selectedInfoWindow: null,
    };
  },
  mounted() {
    this.fetchClinics();
    this.getCurrentLocation();
  },
  computed: {
    filteredClinics() {
      return this.clinics.filter(clinic =>
        clinic.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedClinics() {
      let clinics = this.filteredClinics;
      if (this.sortBy === 'name') {
        return clinics.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortBy === 'distance') {
        return clinics.sort((a, b) => a.distance - b.distance);
      }
      return clinics;
    },
    formData: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    }
  },
  methods: {
    updateDistance() {
      this.clinics.forEach(clinic => {
        if (clinic.location) {
          clinic.distance = this.calculateDistance(clinic.location);
        }
      });
    },
    async geocodeAddress(address) {
      try {
        const response = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json",
          {
            params: {
              address: address,
              key: API_KEY,
            },
          }
        );
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      } catch (error) {
        console.error("Error geocoding address:", error);
        return null;
      }
    },

    async fetchClinics() {
      try {
        const response = await axios.get('/public/clinics');
        this.clinics = response.data.map(clinic => {
          return {
            name: clinic.workplace,
            address: clinic.address
          }
        });
        this.getGeoLocation();
      } catch (error) {
        console.error(error);
      }
    },

    async getGeoLocation() {
      this.clinics.forEach(async clinic => {
        const { lat, lng } = await this.geocodeAddress(clinic.address);
        clinic.location = { lat, lng };
        if (this.userLocation) {
          clinic.distance = this.calculateDistance(clinic.location);
        }
      });
    },

    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.userLocation = { lat: latitude, lng: longitude };
            this.mapCenter = { lat: latitude, lng: longitude };
            console.debug("Location:", this.userLocation);
            this.updateDistance();
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },

    calculateDistance(location) {
      // Placeholder for distance calculation logic
      // You need to implement this method based on your requirements
      const userLocation = this.userLocation;
      const R = 6371; // Radius of the Earth in km
      const dLat = this.deg2rad(location.lat - userLocation.lat);
      const dLng = this.deg2rad(location.lng - userLocation.lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(userLocation.lat)) * Math.cos(this.deg2rad(location.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance.toFixed(2);
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },

    selectClinic(clinic) {
      this.mapCenter = clinic.location;
      // Close previously opened InfoWindow
      if (this.selectedInfoWindow) {
        this.selectedInfoWindow.close();
      }
      // Open the InfoWindow for the selected clinic
      const infoWindowIndex = this.clinics.findIndex(c => c.name === clinic.name);
      this.selectedInfoWindow = this.$refs.infoWindows[infoWindowIndex];
      this.selectedInfoWindow.open();
      this.formData.clinic = clinic;
    },

    validate() {
      if (!this.formData.clinic) {
        alert('Please select a clinic');
        return false;
      }
      return true;
    },
  },
};
</script>