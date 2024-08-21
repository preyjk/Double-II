<template>
    <div class="schedule-container">
        <h2>Available Time Slots for Dr. {{ doctorName }}</h2>
        <div v-if="loading" class="loading">
            Loading schedules...
        </div>
        <div v-if="error" class="error">
            Failed to load schedules. Please try again later.
        </div>
        <ul v-if="!loading && !error">
            <li v-for="schedule in schedules" :key="schedule.Id" class="schedule-item">
                Date: {{ schedule.Date }} | Time: {{ schedule.StartTime }} - {{ schedule.EndTime }}
                <button @click="selectTimeSlot(schedule)">Book This Slot</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { fetchSchedules } from "@/network/netService";

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
        };
    },
    methods: {
        fetchSchedules() {
            const startDate = this.getTodayDate();
            const endDate = this.getEndDate();

            this.loading = true;
            this.error = false;

            fetchSchedules(this.doctorId, startDate, endDate)
                .then((data) => {
                    data = [{ "Id": "1", "DoctorId": "doc123", "DoctorName": "Dr. Emily Johnson", "Date": "2024-08-21", "StartTime": "09:00 AM", "EndTime": "09:15 AM", "Status": "available" }, { "Id": "2", "DoctorId": "doc123", "DoctorName": "Dr. Emily Johnson", "Date": "2024-08-21", "StartTime": "09:15 AM", "EndTime": "09:30 AM", "Status": "available" }, { "Id": "3", "DoctorId": "doc123", "DoctorName": "Dr. Emily Johnson", "Date": "2024-08-22", "StartTime": "10:00 AM", "EndTime": "10:15 AM", "Status": "available" }, { "Id": "4", "DoctorId": "doc456", "DoctorName": "Dr. John Smith", "Date": "2024-08-23", "StartTime": "11:00 AM", "EndTime": "11:15 AM", "Status": "available" }, { "Id": "5", "DoctorId": "doc456", "DoctorName": "Dr. John Smith", "Date": "2024-08-23", "StartTime": "11:15 AM", "EndTime": "11:30 AM", "Status": "available" }]
                    this.schedules = data;
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
            return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        },
        getEndDate() {
            const today = new Date();
            today.setDate(today.getDate() + 7); // Get the date one week from today
            return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        },
        selectTimeSlot(schedule) {
            alert(`You have selected: ${schedule.Date} from ${schedule.StartTime} to ${schedule.EndTime}`);
            this.$emit("scheduleSelected", this.schedules)
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
</style>