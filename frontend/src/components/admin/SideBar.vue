<template>
  <div class="sidebar">
    <el-aside class="dashboard-left">
        <div class="sidebar-header">
          <img :src="logoSrc" alt="Logo" class="logo" />
          <h2 class="title">FRW</h2>
        </div>

        <div class="clinic-info">
          <el-icon>
            <LocationInformation />
          </el-icon>
          <p>ABC Clinic</p>
          <p>123 Main St</p>
        </div>

        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :value="false">expand</el-radio-button>
          <el-radio-button :value="true">collapse</el-radio-button>
        </el-radio-group>

        <el-menu
          default-active="2"
          class="el-menu-vertical"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <el-icon>
              <Menu />
            </el-icon>
            <span>Dashboard</span>
          </el-menu-item>

          <h1>CLINIC</h1>
          <el-menu-item index="2">
            <el-icon>
              <Calendar />
            </el-icon>
            <span>Reservations</span>
          </el-menu-item>

          <el-menu-item index="3">
            <el-icon>
              <User />
            </el-icon>
            <span>Patients</span>
          </el-menu-item>

          <el-menu-item index="4">
            <el-icon>
              <Odometer />
            </el-icon>
            <span>Treatments</span>
          </el-menu-item>

          <el-menu-item index="5">
            <el-icon>
              <Avatar />
            </el-icon>
            <span>Staff List</span>
          </el-menu-item>

          <h1>FINANCE</h1>
          <el-menu-item index="6">
            <el-icon>
              <CreditCard />
            </el-icon>
            <span>Accounts</span>
          </el-menu-item>

          <el-menu-item index="7">
            <el-icon>
              <Histogram />
            </el-icon>
            <span>Sales</span>
          </el-menu-item>

          <el-menu-item index="8">
            <el-icon>
              <Tickets />
            </el-icon>
            <span>Purchases</span>
          </el-menu-item>

          <el-menu-item index="9">
            <el-icon>
              <Wallet />
            </el-icon>
            <span>Payment Method</span>
          </el-menu-item>

          <h1>PHYSICAL ASSET</h1>
          <el-menu-item index="10">
            <el-icon>
              <Goods />
            </el-icon>
            <span>Stocks</span>
          </el-menu-item>

          <el-menu-item index="11">
            <el-icon>
              <MostlyCloudy />
            </el-icon>
            <span>Pheriperals</span>
          </el-menu-item>

          <el-menu-item index="12">
            <el-icon>
              <TrendCharts />
            </el-icon>
            <span>Report</span>
          </el-menu-item>

          <el-menu-item index="13">
            <el-icon>
              <Service />
            </el-icon>
            <span>Customer Support</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
