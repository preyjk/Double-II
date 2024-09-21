<template>
  <div class="dashboard">
    <el-container class="dashboard-container">
      <el-aside class="dashboard-left">
        <div class="sidebar-header">
          <img :src="logoSrc" alt="Logo" class="logo" />
          <h2 class="title">FRW</h2>
        </div>

        <el-menu default-active="/admin/console/dashboard" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
          <el-menu-item index="/admin/console/dashboard" @click="navigate">
            <el-icon>
              <Menu />
            </el-icon>
            <span>Dashboard</span>
          </el-menu-item>

          <h1>Doctors</h1>
          <el-menu-item index="/admin/console/appointments" @click="navigate">
            <el-icon>
              <Calendar />
            </el-icon>
            <span>Reservations</span>
          </el-menu-item>

          <el-menu-item index="/admin/console/schedule" @click="navigate">
            <el-icon>
              <User />
            </el-icon>
            <span>Working Schedule</span>
          </el-menu-item>
          
          <el-menu-item index="/admin/console/analysis" @click="navigate">
            <el-icon>
              <Cahrt />
            </el-icon>
            <span>Echart</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container class="dashboard-right">
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import logoSrc from "@/assets/logo.png";

export default {
  data() {
    return {
      logoSrc,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigate(event) {
      const path = event.index;
      this.$router.push(path);
    },
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
  width: 100%;
  background-color: #fafbfd;
}

.el-menu-vertical:not(.el-menu--collapse) {
  min-height: 400px;
  flex: 1;
  overflow-y: auto;
  width: 100%;
}
</style>