<template>
  <div>
    <!-- Top Bar with Navigation -->
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="calendar">Calendar</el-menu-item>
          <el-menu-item index="log-history">Log History</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <!-- Main Content -->
    <el-row>
      <el-col :span="24">
        <div v-if="activeMenu === 'calendar'">
          <!-- Calendar Component -->
          <ReservationCalendar />
        </div>
        <div v-else-if="activeMenu === 'log-history'">
          <!-- Log History Component -->
          <!-- <LogHistory /> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ReservationCalendar from "@/components/admin/ReservationCalendar.vue";
// import LogHistory from "@/components/LogHistory.vue";

export default {
  name: "AdminNavigation",
  components: { ReservationCalendar },
  data() {
    return {
      activeMenu: "calendar", // default view
    };
  },
  methods: {
    handleSelect(key) {
      this.activeMenu = key; // Change the active view based on selected menu item
    },
  },
};
</script>

<style scoped>
.el-menu {
  margin-bottom: 20px;
}

.el-menu-item {
  color: #333;
}

.el-menu-item:hover {
  background-color: #99a9bf;
  color: #fff;
}

.grid-content {
  padding: 20px;
  text-align: center;
}
</style>
