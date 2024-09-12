<template>
  <div class="doctor-list-container">
    <h2>Doctor Information</h2>
    <el-button type="primary" @click="uploadDoctor">upload doctor information</el-button>
    <el-table :data="doctors" style="width: 100%">
      <el-table-column prop="name" label="name" width="180" />
      <el-table-column prop="specialty" label="professionals" width="180" />
      <el-table-column prop="status" label="status" width="100" />
      <el-table-column label="operation">
        <template #default="scope">
          <el-button size="mini" @click="editDoctor(scope.row)">edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DoctorList",
  data() {
    return {
      doctors: [
        {
          id: 1,
          name: "Li Si",
          specialty: "Internal Medicine",
          status: "On Duty",
        },
      ],
    };
  },
  methods: {
    uploadDoctor() {
      console.log("Uploading doctor information");
    },
    editDoctor(doctor) {
      console.log("Editing doctor:", doctor);
    },
  },
};
</script>

<style scoped>
.doctor-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 20px;
}

.el-table {
  width: 100%;
  max-width: 1200px; /* You can adjust this max-width */
}

h2 {
  text-align: center;
  width: 100%;
}
</style>
