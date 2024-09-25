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
          <InfoWindow ref="userLocationInfoWindow" :options="{ headerDisabled: true }">
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

<script setup>
import { defineModel, defineExpose } from 'vue';
import { ref, computed, onMounted, watch } from 'vue';
import axios from '@/api/backendApi';
import { GoogleMap, AdvancedMarker, InfoWindow } from 'vue3-google-map';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const formData = defineModel();
const searchQuery = ref('');
const sortBy = ref('name');
const clinics = ref([]);
const userLocation = ref(null);
const mapCenter = ref({ lat: -36.8478, lng: 174.7622 });
const selectedInfoWindow = ref(null);
const userLocationInfoWindow = ref(null);

const infoWindows = ref([]);

watch(userLocationInfoWindow, (newValue) => {
  if (newValue) {
    newValue.open();
  }
});

const filteredClinics = computed(() => {
  return clinics.value.filter(clinic =>
    clinic.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const sortedClinics = computed(() => {
  let sorted = filteredClinics.value;
  if (sortBy.value === 'name') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'distance') {
    return sorted.sort((a, b) => a.distance - b.distance);
  }
  return sorted;
});

const updateDistance = () => {
  clinics.value.forEach(clinic => {
    if (clinic.location) {
      clinic.distance = calculateDistance(clinic.location);
    }
  });
};

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
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
    console.error('Error geocoding address:', error);
    return null;
  }
};

const fetchClinics = async () => {
  try {
    const response = await axios.get('/public/clinics');
    clinics.value = response.data.map(clinic => ({
      name: clinic.workplace,
      address: clinic.address,
    }));
    getGeoLocation();
  } catch (error) {
    console.error(error);
  }
};

const getGeoLocation = async () => {
  clinics.value.forEach(async clinic => {
    const { lat, lng } = await geocodeAddress(clinic.address);
    clinic.location = { lat, lng };
    if (userLocation.value) {
      clinic.distance = calculateDistance(clinic.location);
    }
  });
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        userLocation.value = { lat: latitude, lng: longitude };
        mapCenter.value = { lat: latitude, lng: longitude };
        console.debug('Location:', userLocation.value);
        updateDistance();
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

const calculateDistance = (location) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(location.lat - userLocation.value.lat);
  const dLng = deg2rad(location.lng - userLocation.value.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLocation.value.lat)) * Math.cos(deg2rad(location.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Distance in km
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const selectClinic = (clinic) => {
  mapCenter.value = clinic.location;
  if (selectedInfoWindow.value) {
    selectedInfoWindow.value.close();
  }
  const infoWindowIndex = clinics.value.findIndex(c => c.name === clinic.name);
  selectedInfoWindow.value = infoWindows.value[infoWindowIndex];
  selectedInfoWindow.value.open();
  formData.value.clinic = clinic;
};

const validate = () => {
  if (!formData.value.clinic) {
    alert('Please select a clinic');
    return false;
  }
  return true;
};

// Automatically fetch clinics and get user location on component mount
onMounted(() => {
  fetchClinics();
  getCurrentLocation();
});

defineExpose({
  validate,
});
</script>