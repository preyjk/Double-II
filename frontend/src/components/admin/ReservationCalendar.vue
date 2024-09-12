<template>
  <div>
    <!-- Top Row with Calendar, Appointment Count, Date Picker, and Doctor Filter -->
    <div class="header-row">
      <div class="left-section">
        <el-icon><i class="el-icon-date"></i></el-icon>
        <span>Appointments: {{ appointments.length }}</span>
      </div>

      <div class="center-section">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="Select Date"
          style="margin-right: 10px"
        ></el-date-picker>
      </div>

      <div class="right-section">
        <el-select v-model="selectedDoctorFilter" placeholder="Select Doctor">
          <el-option label="All GP" value="all"></el-option>
          <el-option
            v-for="doctor in doctors"
            :key="doctor.id"
            :label="doctor.name"
            :value="doctor.id"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="filterAppointments"
          >Filters</el-button
        >
      </div>
    </div>

    <!-- Table for Appointments -->
    <el-table :data="filteredTimeSlots" style="width: 100%" border>
      <el-table-column
        prop="time"
        label="Time"
        width="80"
        class-name="custom-column"
      >
        <template v-slot="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>

      <el-table-column
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        :label="doctor.name"
        width="320"
      >
        <template v-slot="scope">
          <div class="appointment-cell-container">
            <el-card
              v-for="(interval, index) in scope.row.intervals"
              :key="index"
              class="appointment-cell"
              @click="openDialog(interval, doctor)"
            >
              <p>
                {{ getAppointment(interval, doctor.id) || "Available" }}
              </p>
            </el-card>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- Dialog: Add Appointment -->
    <el-dialog
      title="Add Appointment"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="appointmentForm">
        <el-form-item label="Patient Name">
          <el-input v-model="appointmentForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="Reason">
          <el-input v-model="appointmentForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitAppointment">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      appointmentForm: {
        patientName: "",
        reason: "",
      },
      selectedTime: null,
      selectedDoctor: null,
      selectedDate: null, // For date picker
      selectedDoctorFilter: "all", // For doctor filtering
      doctors: [
        { id: 1, name: "Dr. Soap Mactavish" },
        { id: 2, name: "Dr. Cipeng" },
        { id: 3, name: "Dr. Putri Larasati" },
      ],
      appointments: [],
      timeSlots: [
        { time: "8am", intervals: ["8:00", "8:15", "8:30", "8:45"] },
        { time: "9am", intervals: ["9:00", "9:15", "9:30", "9:45"] },
        { time: "10am", intervals: ["10:00", "10:15", "10:30", "10:45"] },
        { time: "11am", intervals: ["11:00", "11:15", "11:30", "11:45"] },
        { time: "12pm", intervals: ["12:00", "12:15", "12:30", "12:45"] },
        { time: "1pm", intervals: ["1:00", "1:15", "1:30", "1:45"] },
        { time: "2pm", intervals: ["2:00", "2:15", "2:30", "2:45"] },
        { time: "3pm", intervals: ["3:00", "3:15", "3:30", "3:45"] },
        { time: "4pm", intervals: ["4:00", "4:15", "4:30", "4:45"] },
        { time: "5pm", intervals: ["5:00", "5:15", "5:30", "5:45"] },
      ],
    };
  },
  computed: {
    // Filtered doctors based on the selected filter
    filteredDoctors() {
      if (this.selectedDoctorFilter === "all") {
        return this.doctors;
      }
      return this.doctors.filter(
        (doctor) => doctor.id === this.selectedDoctorFilter
      );
    },
    // Apply date filter to time slots (assuming your timeSlots might change with the date in future)
    filteredTimeSlots() {
      return this.timeSlots;
    },
  },
  methods: {
    // Open appointment dialog
    openDialog(interval, doctor) {
      this.selectedTime = interval;
      this.selectedDoctor = doctor;
      this.dialogVisible = true;
    },
    // Submit appointment
    submitAppointment() {
      this.appointments.push({
        doctorId: this.selectedDoctor.id,
        time: this.selectedTime,
        patientName: this.appointmentForm.patientName,
        reason: this.appointmentForm.reason,
      });
      this.dialogVisible = false;
      this.clearForm();
    },
    // Get appointment details
    getAppointment(time, doctorId) {
      const appointment = this.appointments.find(
        (a) => a.time === time && a.doctorId === doctorId
      );
      return appointment
        ? `${appointment.patientName} - ${appointment.reason}`
        : null;
    },
    // Clear form
    clearForm() {
      this.appointmentForm.patientName = "";
      this.appointmentForm.reason = "";
    },
    // Filter appointments (future functionality, you can extend it)
    filterAppointments() {
      console.log("Filter applied");
      // Filtering logic will go here if necessary
    },
  },
};
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.left-section,
.center-section,
.right-section {
  display: flex;
  align-items: center;
}

.right-section {
  gap: 10px;
}

.appointment-cell {
  cursor: pointer;
  padding: 10px;
  text-align: center;
  border: 1px solid #ebeef5;
}

.appointment-cell:hover {
  background-color: #f0f9eb;
}
</style>
