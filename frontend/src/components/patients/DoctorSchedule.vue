<template>
  <div class="schedule-container">
    <el-calendar @input="handleDatePick">
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
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
      <div v-for="(schedules, hour) in groupedSchedules" :key="hour" class="hour-group">
        <h3>{{ hour }}:00</h3>
        <ul class="schedule-list">
          <li v-for="schedule in schedules" :key="schedule.Id" class="schedule-item">
            <span>Time: {{ schedule.StartTime }} - {{ schedule.EndTime }}</span>
            <button @click="selectTimeSlot(schedule)" class="select-button">
              Book
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="!loading && !error && !filteredSchedules.length">
      No available time slots for the selected date.
    </div>
  </div>
</template>

<script>
import { getSchedules_public } from "@/api/modules/appointment.js";

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
      loading: false,
      error: false,
      selectedDate: this.getTodayDate(),
    };
  },
  computed: {
    filteredSchedules() {
      return this.schedules.filter(
        (schedule) => schedule.Date === this.selectedDate
      );
    },
    groupedSchedules() {
      const groups = {};

      this.filteredSchedules
        .sort((a, b) => {
          const timeA = new Date(`${a.Date}T${a.StartTime}`);
          const timeB = new Date(`${b.Date}T${b.StartTime}`);
          return timeA - timeB;
        })
        .forEach((schedule) => {
          const hour = parseInt(schedule.StartTime.split(":")[0], 10);
          if (!groups[hour]) {
            groups[hour] = [];
          }
          groups[hour].push(schedule);
        });

      const sortedGroups = Object.keys(groups)
        .sort((a, b) => a - b)
        .reduce((acc, key) => {
          acc[key] = groups[key];
          return acc;
        }, {});

      return sortedGroups;
    },
    formattedDate() {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(this.selectedDate).toLocaleDateString(undefined, options);
    },
  },

  methods: {
    fetchSchedules() {
      const startDate = this.getTodayDate();
      const endDate = this.getEndDate();

      this.loading = true;
      this.error = false;

      getSchedules_public(this.doctorId, startDate, endDate)
        .then((data) => {
          this.schedules = data.sort((a, b) => {
            const timeA = new Date(`${a.Date}T${a.StartTime}`);
            const timeB = new Date(`${b.Date}T${b.StartTime}`);
            return timeA - timeB;
          });
          this.loading = false;
        })
        .catch((error) => {
          console.error("Failed to fetch schedules:", error);
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
      this.selectedDate = date.toISOString().split("T")[0];
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
    this.fetchSchedules();
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

.select-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.select-button:active {
  transform: translateY(0);
}

.is-selected {
  color: #3498db;
  font-weight: bold;
}
</style>
