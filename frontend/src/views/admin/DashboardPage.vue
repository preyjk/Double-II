<template>
  <div class="dashboard">
    <el-container>
      <!-- Sidebar -->
      <el-aside width="200px" class="sidebar">
        <el-menu default-active="appointments" @select="handleMenuSelect">
          <el-menu-item index="appointments">Appointment</el-menu-item>
          <el-menu-item index="doctors">GP Details</el-menu-item>
          <el-menu-item index="schedule">Docotor Schduling</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Main Content -->
      <el-main class="main-content">
        <component :is="currentComponent" @refreshData="refreshData" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// Import components for each section
import AppointmentList from "@/components/admin/AppointmentList.vue";
import DoctorList from "@/components/admin/DoctorList.vue";
import DoctorSchedule from "@/components/admin/DoctorSchedule.vue";

export default {
  name: "Dashboard",
  components: {
    AppointmentList,
    DoctorList,
    DoctorSchedule,
  },
  data() {
    return {
      currentComponent: "AppointmentList",
    };
  },
  methods: {
    handleMenuSelect(key) {
      if (key === "appointments") {
        this.currentComponent = "AppointmentList";
      } else if (key === "doctors") {
        this.currentComponent = "DoctorList";
      } else if (key === "schedule") {
        this.currentComponent = "DoctorSchedule";
      }
    },
    refreshData() {
      // Add logic here to refresh data from backend
      console.log("Refreshing data...");
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.sidebar {
  background-color: #f5f5f5;
}

.main-content {
  padding: 20px;
  background-color: #ffffff;
}
</style>
