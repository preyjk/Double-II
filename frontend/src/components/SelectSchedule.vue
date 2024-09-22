<template>
  <div class="flex flex-col md:flex-row">
    <el-calendar @input="handleDatePick" class="md:pr-5 w-full md:w-2/3 md:border-r md:border-gray-300">
      <template #date-cell="{ data }">
        <div :class="['w-full h-full p-2',
          isAvailableDate(data.day) && 'bg-green-300',
          isSelectedDate(data.day) && 'bg-blue-300',
          isDisabledDate(data.day) && 'bg-gray-300',
        ]">
          <p>
            {{ data.day.split("-").slice(1).join("-") }}
          </p>
        </div>
      </template>
    </el-calendar>
    <div class="w-full md:w-1/3 flex flex-col p-5">
      <div class="title-container">
        <h2 class="text-2xl font-bold mb-2">Available Time Slots</h2>
        <p class="text-gray-600">Dr. {{ formData.doctor.FirstName }} {{ formData.doctor.LastName }} on {{ selectedDate }}</p>
      </div>
      <div>
        <div v-if="loading" class="text-gray-600">Loading schedules...</div>
        <div v-if="schedules.length > 0">
          <div v-for="schedule in schedules" :key="schedule.Id" 
          :class="['p-2 my-2 border',
            formData.schedule && formData.schedule.Id === schedule.Id
                ? 'cursor-pointer bg-blue-200 hover:bg-blue-300'
                : (schedule.Status === 'available'
                    ? 'cursor-pointer bg-white hover:bg-gray-200 '
                    : 'cursor-not-allowed bg-red-100')]"
          @click="selectTimeSlot(schedule)">
            <span class="text-gray-800">Time: {{ schedule.StartTime }} - {{ schedule.EndTime }}</span>
          </div>
        </div>
        <div v-else class="text-gray-600">
          No available time slots for the selected date.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineModel, defineExpose } from 'vue';
import axios from '@/api/backendApi';

const formData = defineModel();

const getTodayDate = () => {
  const date = new Date();
  return getFormattedDate(date);
};

const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Reactive state
const availableDates = ref([]);
const schedules = ref([]);
const selectedDate = ref(getTodayDate());
const loading = ref(true);

// Helper methods
const isAvailableDate = (date) => availableDates.value.includes(date);

const isSelectedDate = (date) => date === selectedDate.value;

const isDisabledDate = (date) => {
  const today = new Date(getTodayDate());
  const selected = new Date(date);
  return selected < today;
};



// Handle date selection
const handleDatePick = (date) => {
  if (isDisabledDate(date)) {
    return;
  }
  selectedDate.value = getFormattedDate(date);
  formData.value.date = getFormattedDate(date);
  console.debug('Selected date:', selectedDate.value);
};

// Fetch available timeslots
const fetchAvailableTimeslots = async (date) => {
  loading.value = true;
  formData.value.schedule = null;
  try {
    const response = await axios.get('/public/schedules/available-timeslots', {
      params: {
        doctorId: formData.value.doctor.Id,
        date,
      },
    });
    schedules.value = response.data;
  } catch (error) {
    console.error('Failed to fetch available timeslots:', error);
  } finally {
    loading.value = false;
  }
};

// Get the end of the month
const getEndofMonth = () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return getFormattedDate(lastDay);
};

// Fetch available dates
const fetchAvailableDate = async () => {
  try {
    const response = await axios.get('/public/schedules/available-dates', {
      params: {
        doctorId: formData.value.doctor.Id,
        startDate: getTodayDate(),
        endDate: getEndofMonth(),
      },
    });
    availableDates.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

// Select a time slot
const selectTimeSlot = (schedule) => {
  if (schedule.Status !== 'available') {
    return;
  }
  formData.value.schedule = schedule;
};

// Validate form
const validate = () => {
  if (!formData.value.schedule) {
    alert('Please select a time slot');
    return false;
  }
  return true;
};

// Lifecycle hook for fetching data on mount
onMounted(() => {
  fetchAvailableDate();
  fetchAvailableTimeslots(selectedDate.value);
});

// Watch selectedDate to refetch available timeslots
watch(() => selectedDate.value, fetchAvailableTimeslots);

defineExpose({
  validate,
});
</script>


<style scoped>
::v-deep .el-calendar-table .el-calendar-day {
  padding: 0 !important;
}
</style>