<template>
  <div class="dashboard">
    <el-container class="dashboard-container">
      <el-aside class="dashboard-left">
        <div class="sidebar-header">
          <!-- <img src="logo.png" alt="Logo" class="logo" /> -->
          <h2 class="title">My Dashboard</h2>
        </div>

        <div class="clinic-info">
          <p>诊所名称: <strong>ABC Clinic</strong></p>
          <p>地址: <strong>123 Main St</strong></p>
        </div>

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>导航</span>
            </template>
            <el-menu-item-group title="组 1">
              <el-menu-item index="1-1">项目一</el-menu-item>
              <el-menu-item index="1-2">项目二</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="组 2">
              <el-menu-item index="1-3">项目三</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>更多</span></template>
              <el-menu-item index="1-4-1">项目四</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>其他导航</span>
          </el-menu-item>

          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>禁用项</span>
          </el-menu-item>

          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container class="dashboard-right">
        <el-header class="dashboard-header">
          <el-row>
            <el-col :span="8">
              <div class="grid-content ep-bg-purple"></div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content ep-bg-purple-light"></div>
            </el-col>
            <el-col :span="1">
              <div class="grid-content ep-bg-purple"></div>
            </el-col>
            <el-col :span="1">
              <div class="grid-content ep-bg-purple-light"></div>
            </el-col>
            <el-col :span="1">
              <div class="grid-content ep-bg-purple"></div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content ep-bg-purple-light"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple"></div>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="dashboard-main">
          <el-row>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple"></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ep-bg-purple-light"></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content ep-bg-purple"></div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
}

.dashboard-left {
  background-color: #fafbfd;
  width: auto;
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
  background-color: aqua;
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  flex: 1;
  overflow-y: auto;
}
</style>
