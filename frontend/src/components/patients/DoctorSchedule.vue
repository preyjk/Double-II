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

    <h2>Available Time Slots for Dr. {{ doctorName }} on {{ selectedDate }}</h2>

    <div v-if="loading" class="loading">Loading schedules...</div>
    <div v-if="error" class="error">
      Failed to load schedules. Please try again later.
    </div>

    <ul v-if="!loading && !error && filteredSchedules.length">
      <li
        v-for="schedule in filteredSchedules"
        :key="schedule.Id"
        class="schedule-item"
      >
        Time: {{ schedule.StartTime }} - {{ schedule.EndTime }}
        <button @click="selectTimeSlot(schedule)">Book This Slot</button>
      </li>
    </ul>

    <div v-if="!loading && !error && !filteredSchedules.length">
      No available time slots for the selected date.
    </div>
  </div>
</template>

<script>
import { getSchedules } from "@/network/netService";

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
  },
  methods: {
    fetchSchedules() {
      const startDate = this.getTodayDate();
      const endDate = this.getEndDate();

      this.loading = true;
      this.error = false;

      getSchedules(this.doctorId, startDate, endDate)
        .then((data) => {
          this.schedules = data.sort((a, b) => {
            const timeA = new Date(`${a.Date}T${a.StartTime}`);
            const timeB = new Date(`${b.Date}T${b.StartTime}`);
            return timeA - timeB;
          });
          this.loading = false;
          // console.log(data);
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
      console.log(this.selectedDate);
    },
    selectTimeSlot(schedule) {
      alert(
        `You have selected: ${schedule.Date} from ${schedule.StartTime} to ${schedule.EndTime}`
      );
      this.$emit("scheduleSelected", schedule);
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
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
}

.loading {
  color: #3498db;
}

.error {
  color: red;
}

.schedule-item {
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.schedule-item button {
  margin-left: 20px;
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.schedule-item button:hover {
  background-color: #2980b9;
}

.is-selected {
  color: #1989fa;
}
</style>
