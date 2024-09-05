<template>
  <div>
    <!-- 表格的横轴是医生，纵轴是时间段 -->
    <el-table :data="timeSlots" style="width: 100%">
      <!-- 表头: 医生 -->
      <el-table-column prop="time" label="Time" width="120">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>

      <el-table-column
        v-for="doctor in doctors"
        :key="doctor.id"
        :label="doctor.name"
      >
        <template slot-scope="scope">
          <el-card
            class="appointment-cell"
            @click="openDialog(scope.row.time, doctor)"
          >
            <p>
              {{ getAppointment(scope.row.time, doctor.id) || "Available" }}
            </p>
          </el-card>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框：添加预约 -->
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
      doctors: [
        { id: 1, name: "Dr. Soap Mactavish" },
        { id: 2, name: "Dr. Cipeng" },
        { id: 3, name: "Dr. Putri Larasati" },
      ],
      appointments: [],
      timeSlots: [
        { time: "09:00 AM" },
        { time: "10:00 AM" },
        { time: "11:00 AM" },
        { time: "12:00 PM" },
        { time: "01:00 PM" },
        { time: "02:00 PM" },
        { time: "03:00 PM" },
        { time: "04:00 PM" },
        { time: "05:00 PM" },
      ],
    };
  },
  methods: {
    // 打开预约对话框
    openDialog(time, doctor) {
      this.selectedTime = time;
      this.selectedDoctor = doctor;
      this.dialogVisible = true;
    },
    // 提交预约信息
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
    // 获取预约信息
    getAppointment(time, doctorId) {
      const appointment = this.appointments.find(
        (a) => a.time === time && a.doctorId === doctorId
      );
      return appointment
        ? `${appointment.patientName} - ${appointment.reason}`
        : null;
    },
    // 清空表单
    clearForm() {
      this.appointmentForm.patientName = "";
      this.appointmentForm.reason = "";
    },
  },
};
</script>

<style scoped>
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
