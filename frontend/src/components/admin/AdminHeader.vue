<template>
  <el-header class="dashboard-header">
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h2>Reservations</h2>
        </div>
      </el-col>

      <el-col :span="7">
        <div class="grid-content">
          <el-input
            placeholder="Search..."
            :prefix-icon="Search"
            v-model="searchQuery"
            style="width: 70%; margin-right: 10px"
          ></el-input>
          <el-button type="primary" :icon="Upload">Upload</el-button>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="grid-content">
          <el-button :icon="QuestionFilled" circle></el-button>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="grid-content">
          <el-button :icon="Monitor" circle></el-button>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="grid-content">
          <el-button :icon="Setting" circle></el-button>
        </div>
      </el-col>

      <el-col :span="2">
        <div class="grid-content">
          <el-button :icon="StarFilled" circle></el-button>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content">
          <el-select
            v-model="selectedDoctor"
            placeholder="Select Doctor"
            style="width: 100%"
          >
            <el-option
              v-for="doctor in doctors"
              :key="doctor.id"
              :label="doctor.name"
              :value="doctor.id"
            >
              <div class="doctor-option">
                <img :src="doctor.avatar" class="doctor-avatar" alt="Avatar" />
                {{ doctor.name }}
              </div>
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import {
  Search,
  Upload,
  QuestionFilled,
  Monitor,
  Setting,
  StarFilled,
} from "@element-plus/icons-vue";

export default {
  name: "AdminHeader",
  components: {
    Search,
    Upload,
    QuestionFilled,
    Monitor,
    Setting,
    StarFilled,
  },
  data() {
    return {
      searchQuery: "",
      selectedDoctor: null,
      doctors: [
        { id: 1, name: "Dr. Soap Mactavish", avatar: "/avatars/soap.jpg" },
        { id: 2, name: "Dr. Cipeng", avatar: "/avatars/cipeng.jpg" },
        { id: 3, name: "Dr. Putri Larasati", avatar: "/avatars/putri.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h2 {
  margin: 0;
}

.el-button {
  margin-right: 10px;
}

.doctor-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}

.doctor-option {
  display: flex;
  align-items: center;
}
</style>
