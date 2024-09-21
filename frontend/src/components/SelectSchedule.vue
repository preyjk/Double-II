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
          :class="['p-2 mb-2', schedule.Status === 'available' ? 'cursor-pointer hover:bg-gray-200 bg-white' : 'cursor-not-allowed bg-red-100',
            formData.schedule && formData.schedule.Id === schedule.Id && 'bg-blue-200 hover:bg-blue-300',
          ]"
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

<script>
import axios from '@/api/backendApi';
import { watch } from 'vue';

export default {
  props: ['modelValue'],
  data() {
    return {
      availableDates: [],
      schedules: [],
      selectedDate: this.getTodayDate(),
      loading: true,
    };
  },
  computed: {
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
    isAvailableDate(date) {
      return this.availableDates.includes(date);
    },

    isSelectedDate(date) {
      return date === this.selectedDate;
    },

    isDisabledDate(date) {
      const today = new Date(this.getTodayDate());
      const selected = new Date(date);
      return selected < today;
    },

    getTodayDate() {
      const date = new Date();
      return this.getFormattedDate(date);
    },

    getFormattedDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    handleDatePick(date) {
      if (this.isDisabledDate(date)) {
        return;
      }
      this.selectedDate = this.getFormattedDate(date);
      this.formData.date = this.getFormattedDate(date);
      console.debug('Selected date:', this.selectedDate);
    },

    async fetchAvailableTimeslots(date) {
      this.loading = true;
      this.formData.schedule = null;
      try {
        const response = await axios.get('/public/schedules/available-timeslots', {
          params: {
            doctorId: this.formData.doctor.Id,
            date,
          },
        });
        this.schedules = response.data;
      } catch (error) {
        console.error('Failed to fetch available timeslots:', error);
      } finally {
        this.loading = false;
      }
    },

    getEndofMonth() {
      const date = new Date();
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return this.getFormattedDate(lastDay);
    },

    async fetchAvailableDate() {
      try {
        const response = await axios.get('/public/schedules/available-dates', {
          params: {
            doctorId: this.formData.doctor.Id,
            startDate: this.getTodayDate(),
            endDate: this.getEndofMonth(),
          },
        });
        this.availableDates = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    selectTimeSlot(schedule) {
      if (schedule.Status !== 'available') {
        return;
      }
      this.formData.schedule = schedule;
    },
    validate() {
      if(!this.formData.schedule) {
        alert('Please select a time slot');
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.fetchAvailableDate();
    this.fetchAvailableTimeslots(this.selectedDate);
    watch(() => this.selectedDate, this.fetchAvailableTimeslots);
  },
}
</script>

<style scoped>
::v-deep .el-calendar-table .el-calendar-day {
  padding: 0 !important;
}
</style>