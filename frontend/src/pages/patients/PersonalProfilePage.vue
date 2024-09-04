<template>
  <div>
    <h2>Appointment Information</h2>
    <el-table :data="appointments" style="width: 100%">
      <el-table-column prop="firstName" label="Patient Name" width="180" />
      <el-table-column prop="dob" label="Appointment Date" width="180" />
      <el-table-column prop="status" label="Status" width="100" />
      <el-table-column label="Operation">
        <template #default="scope">
          <el-button size="mini" @click="viewDetails(scope.row)"
            >Details</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="changeAppointment(scope.row)"
            >Change</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="cancelAppointment(scope.row)"
            >Cancel</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAppointments } from "@/api/modules/appointment.js";

export default {
  name: "AppointmentList",
  data() {
    return {
      appointments: [],
    };
  },
  methods: {
    viewDetails(appointment) {
      console.log("Viewing details for:", appointment);
    },
    changeAppointment(appointment) {
      console.log("Changing appointment:", appointment);
    },
    cancelAppointment(appointment) {
      console.log("Canceling appointment:", appointment);
    },
    async fetchAppointments() {
      try {
        const data = await getAppointments();
        this.appointments = data;
        console.log("Appointments loaded:", this.appointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
      }
    },
  },
  mounted() {
    this.fetchAppointments();
  },
};
</script>
