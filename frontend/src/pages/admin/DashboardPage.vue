<template>
  <div class="dashboard">
    <el-container class="dashboard-container">
      <el-container class="dashboard-right">
        <el-main class="dashboard-main">
          <AdminHeader></AdminHeader>
          <AdminNavigation></AdminNavigation>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import logoSrc from "@/assets/logo.png";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";

export default {
  components: {
    AdminHeader,
    AdminNavigation,
  },
  data() {
    return {
      isCollapse: false,
      logoSrc,
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
};
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
}

.dashboard-left {
  background-color: #fafbfd;
  width: auto;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  text-align: center;
  padding: 20px;
  background-color: #fafbfd;
  border-bottom: 1px solid #fafbfd;
}

.logo {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  margin: 0;
}

.clinic-info {
  padding: 15px;
  background-color: #fafbfd;
  border-bottom: 1px solid #fafbfd;
  text-align: center;
}

.dashboard-right {
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  height: auto;
  padding: 0;
}

.dashboard-main {
  padding: 0;
}

.grid-content {
  padding: 20px;
  color: #fff;
  text-align: center;
}

.ep-bg-purple-dark {
  background: #99a9bf;
}

.ep-bg-purple {
  background: #d3dce6;
}

.ep-bg-purple-light {
  background: #e5e9f2;
}

.el-menu-vertical {
  background-color: #fafbfd;
  width: 100%;
}

.el-menu-vertical:not(.el-menu--collapse) {
  min-height: 400px;
  flex: 1;
  overflow-y: auto;
  width: 100%;
}
</style>
