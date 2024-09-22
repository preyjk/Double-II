<template>
  <div class="schedule-container">
    <el-calendar :disabled-date="disabledDate" @input="handleDatePick">
      <template #date-cell="{ data }">
        <div
          :class="[
            'date-cell',
            isAvailableDate(data.day) ? 'available-date' : '',
            isSelectedDate(data.day) ? 'selected-date' : '',
            isDisabledDate(data.day) ? 'disabled-date' : '',
          ]"
        >
          <p>
            {{ data.day.split("-").slice(1).join("-") }}
          </p>
        </div>
      </template>
    </el-calendar>

    <div class="title-container">
      <h2 class="title">Available Time Slots</h2>
      <p class="subtitle">Dr. {{ doctorName }} on {{ formattedDate }}</p>
    </div>

    <div v-if="loading" class="loading">Loading schedules...</div>
    <div v-if="error" class="error">
      Failed to load schedules. Please try again later.
    </div>

    <div v-if="!loading && !error && groupedSchedules">
      <div
        v-for="(schedules, hour) in groupedSchedules"
        :key="hour"
        class="hour-group"
      >
        <h3>{{ hour }}:00</h3>
        <ul class="schedule-list">
          <li
            v-for="schedule in schedules"
            :key="schedule.Id"
            class="schedule-item"
          >
            <span>Time: {{ schedule.StartTime }} - {{ schedule.EndTime }}</span>
            <button @click="selectTimeSlot(schedule)" class="select-button">
              Book
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="!loading && !error && !groupedSchedules.length">
      No available time slots for the selected date.
    </div>
  </div>
</template>

<script>
import {
  getAvailableDates_public,
  getAvailableTimeslots_public,
} from "@/api/modules/appointment.js";

export default {
  props: {
    doctorId: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      schedules: [],
      availableDates: [],
      loading: false,
      error: false,
      selectedDate: this.formData.date || this.getTodayDate(),
    };
  },
  computed: {
    groupedSchedules() {
      const groups = {};
      this.schedules
        .sort((a, b) => {
          const timeA = new Date(`${this.selectedDate}T${a.StartTime}`);
          const timeB = new Date(`${this.selectedDate}T${b.StartTime}`);
          return timeA - timeB;
        })
        .forEach((schedule) => {
          const hour = parseInt(schedule.StartTime.split(":")[0], 10);
          if (!groups[hour]) {
            groups[hour] = [];
          }
          groups[hour].push(schedule);
        });
      return groups;
    },
    formattedDate() {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(this.selectedDate).toLocaleDateString(undefined, options);
    },
  },
  methods: {
    fetchAvailableDates() {
      const startDate = this.getTodayDate();
      const endDate = this.getEndDate();

      this.loading = true;
      this.error = false;

      getAvailableDates_public(this.doctorId, startDate, endDate)
        .then((data) => {
          this.availableDates = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Failed to fetch available dates:", error);
          this.error = true;
          this.loading = false;
        });
    },

    fetchAvailableTimeslots(date) {
      this.loading = true;
      this.error = false;

      getAvailableTimeslots_public(this.doctorId, date)
        .then((data) => {
          this.schedules = data.filter(
            (schedule) => schedule.Status === "available"
          );
          this.loading = false;
        })
        .catch((error) => {
          console.error("Failed to fetch available timeslots:", error);
          this.error = true;
          this.loading = false;
        });
    },

    getTodayDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },

    getEndDate() {
      const today = new Date();
      today.setDate(today.getDate() + 28);
      return today.toISOString().split("T")[0];
    },

    handleDatePick(date) {
      const todayDate = new Date().getTime();
      const picekDate = date.getTime();
      if (picekDate >= todayDate) {
        const selectedDate = date.toISOString().split("T")[0];
        this.selectedDate = selectedDate;
        this.fetchAvailableTimeslots(selectedDate);
      }
    },

    isAvailableDate(date) {
      return this.availableDates.includes(date);
    },

    isSelectedDate(date) {
      return date === this.selectedDate;
    },

    isDisabledDate(date) {
      const today = new Date(this.getTodayDate());
      const selected = new Date(date);
      return selected <= today;
    },

    disabledDate(date) {
      const today = new Date(this.getTodayDate()).getTime();
      const selected = new Date(date).getTime();
      return selected < today;
    },

    selectTimeSlot(schedule) {
      const selectedSchedule = {
        ...schedule,
        Date: this.selectedDate,
      };
      this.$emit("scheduleSelected", selectedSchedule);
    },
  },

  mounted() {
    this.fetchAvailableDates();
    this.fetchAvailableTimeslots(this.selectedDate);
  },
};
</script>

<style scoped>
.schedule-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}

.title-container {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
}

.title {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 16px;
  color: #34495e;
}

.loading {
  color: #3498db;
  text-align: center;
  font-size: 18px;
  padding: 20px 0;
}

.error {
  color: #e74c3c;
  text-align: center;
  font-size: 18px;
  padding: 20px 0;
}

.hour-group {
  margin-bottom: 20px;
}

.hour-group h3 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 10px;
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 5px;
}

.schedule-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.schedule-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.select-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

::v-deep .el-calendar-table .el-calendar-day {
  padding: 0 !important;
}

.date-cell[data-v-beab77a3] {
  border-radius: 0;
}

.select-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.select-button:active {
  transform: translateY(0);
}

.date-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* padding: 10px; */
  border-radius: 5px;
  box-sizing: border-box;
}

.available-date {
  background-color: #9ed283;
  color: white;
}

.selected-date {
  background-color: #7faeda;
  color: white;
}

.disabled-date {
  background-color: #d3d3d3;
  color: #a0a0a0;
}
</style>
