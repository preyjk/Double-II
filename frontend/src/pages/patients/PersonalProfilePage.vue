<template>
  <HeaderComponent />
  <el-card class="profile-card">

    <div class="profile-header">
      <h2>Patients Profile</h2>

     <!-- Avatar Upload -->
     <div class="avatar-container">
        <label class="avatar-uploader">
          <input type="file" accept="image/*" class="avatar-input" @change="onAvatarChange" />
          <div class="avatar-wrapper">
            <!-- If avatar is uploaded, show the image, otherwise show the upload prompt -->
            <img v-if="profileForm.avatarUrl" :src="profileForm.avatarUrl" class="avatar" />
            <div v-else class="avatar-placeholder">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <span class="avatar-hint">Click to upload</span>
            </div>
          </div>
        </label>
      </div>

      <!-- User Information -->
      <div class="profile-info">
        <p><strong>Name:</strong> {{ profileForm.name }}</p>
        <p><strong>Email:</strong> {{ profileForm.email }}</p>
        <p><strong>Phone:</strong> {{ profileForm.phone }}</p>
      </div>

      <!-- Trigger to show the password change form modal -->
      <el-button type="primary" @click="showPasswordChangeModal" class="change-password-button">Change
        Password</el-button>
    </div>

    <!-- Password Change Modal -->
    <div v-if="isPasswordChangeVisible" class="modal-overlay">
      <div class="modal-dialog">
        <h3>Change Password</h3>
        <el-form :model="profileForm" ref="profileFormRef" label-width="100px">
          <el-form-item label="Old Password">
            <el-input v-model="profileForm.oldPassword" type="password" placeholder="Enter old password"
              show-password></el-input>
          </el-form-item>
          <el-form-item label="New Password">
            <el-input v-model="profileForm.newPassword" type="password" placeholder="Enter new password"
              show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input v-model="profileForm.confirmPassword" type="password" placeholder="Confirm new password"
              show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetPassword">Reset Password</el-button>
            <el-button @click="closePasswordChangeModal">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- My Bookings Section -->
    <div class="appointments-container">
      <h2>Your Appointments</h2>
      <div v-if="bookings && bookings.length">
        <ul class="appointments-list">
          <li v-for="(booking, index) in bookings" :key="index" class="appointment-item">
            <div class="appointment-details">
              <p><strong>Doctor:</strong> Dr. {{ booking.DoctorName }}</p>
              <p><strong>Date:</strong> {{ booking.Date }}</p>
              <p><strong>Time:</strong> {{ booking.StartTime }} - {{ booking.EndTime }}</p>
              <p><strong>Patient:</strong> {{ booking.LastName }}</p>
              <p v-if="booking.Status === 'cancelled'" class="cancelled-message">
                <strong>Status:</strong> Appointment Cancelled
              </p>
            </div>
            <button @click="cancelBooking(index)" class="cancel-button" :disabled="booking.Status === 'cancelled'">
              Cancel
            </button>
            <!-- Reschedule Button -->
            <button @click="showRescheduleModal(index)" class="reschedule-button"
              :disabled="booking.Status === 'cancelled'">
              Reschedule
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>You have no appointments scheduled.</p>
      </div>
    </div>

    <!-- Reschedule Modal -->
    <div v-if="isRescheduleModalVisible" class="modal-overlay">
      <div class="modal-dialog">
        <h3>Reschedule Appointment</h3>
        <el-form :model="rescheduleForm" ref="rescheduleFormRef" label-width="100px">
          <el-form-item label="New Date">
            <el-date-picker v-model="rescheduleForm.newDate" type="date" placeholder="Pick a new date"></el-date-picker>
          </el-form-item>
          <el-form-item label="New Time">
            <el-time-picker v-model="rescheduleForm.newTime" placeholder="Pick a new time"></el-time-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="rescheduleBooking">Reschedule</el-button>
            <el-button @click="closeRescheduleModal">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- Medical Records Section (Placeholder for future development) -->
    <div class="medical-records">
      <h2>Your Medical Records</h2>
      <p>No medical records available at this time.</p>
    </div>
  </el-card>
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import { changePassword } from "@/api/modules/user.js";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    const profileForm = ref({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      avatarUrl: "",
    });

    const profileFormRef = ref(null);
    const isPasswordChangeVisible = ref(false);
    const bookings = ref([]);
    const isRescheduleModalVisible = ref(false);
    const rescheduleForm = ref({
      newDate: "",
      newTime: "",
    });
    const currentBookingIndex = ref(null);

    const resetPassword = () => {
      if (profileForm.value.newPassword === profileForm.value.confirmPassword) {
        changePassword(profileForm.value.email, profileForm.value.oldPassword, profileForm.value.newPassword)
          .then(() => {
            alert("Password successfully changed!");
            closePasswordChangeModal();
          })
          .catch((error) => {
            alert("Failed to reset password: " + error.message);
          });
      } else {
        alert("Passwords do not match!");
      }
    };

    const showPasswordChangeModal = () => {
      isPasswordChangeVisible.value = true;
    };

    const closePasswordChangeModal = () => {
      isPasswordChangeVisible.value = false;
    };

    const onAvatarChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileForm.value.avatarUrl = e.target.result; 
        };
        reader.readAsDataURL(file);
      }
    };

    const cancelBooking = (index) => {
      const booking = bookings.value[index];
      booking.Status = "cancelled";
    };

    const showRescheduleModal = (index) => {
      currentBookingIndex.value = index;
      isRescheduleModalVisible.value = true;
    };

    const closeRescheduleModal = () => {
      isRescheduleModalVisible.value = false;
      rescheduleForm.value.newDate = "";
      rescheduleForm.value.newTime = "";
    };

    const rescheduleBooking = () => {
      if (rescheduleForm.value.newDate && rescheduleForm.value.newTime) {
        const newDetails = {
          date: rescheduleForm.value.newDate,
          startTime: rescheduleForm.value.newTime,
          endTime: "", // Add logic for the end time if needed
        };
        store.dispatch("rescheduleBooking", {
          index: currentBookingIndex.value,
          newDetails,
        });
        alert("Appointment successfully rescheduled!");
        closeRescheduleModal();
      } else {
        alert("Please select a new date and time.");
      }
    };

    onMounted(() => {
      profileForm.value.email = store.state.email || localStorage.getItem("userEmail");
      bookings.value = [
        {
          DoctorName: "Smith",
          Date: "2024-09-15",
          StartTime: "10:00",
          EndTime: "10:30",
          LastName: "Doe",
          Status: "active",
        },
        {
          DoctorName: "Jones",
          Date: "2024-09-16",
          StartTime: "14:00",
          EndTime: "14:30",
          LastName: "Doe",
          Status: "active",
        },
      ];
    });

    return {
      profileForm,
      profileFormRef,
      resetPassword,
      isPasswordChangeVisible,
      showPasswordChangeModal,
      closePasswordChangeModal,
      onAvatarChange,
      cancelBooking,
      bookings,
      isRescheduleModalVisible,
      showRescheduleModal,
      closeRescheduleModal,
      rescheduleForm,
      rescheduleBooking,
    };
  },
};
</script>


<style scoped>

.avatar-container {
  display: flex;
  justify-content: center;
  margin-top: 30px; /* 增加顶部的间距 */
  margin-bottom: 20px;
}

.profile-card {
  background: linear-gradient(145deg, #fff, #f9f9f9);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: all 0.3s ease;
}

.profile-header {
  text-align: center;
  margin-bottom: 25px;
  color: #004d66; 
  margin-bottom: 30px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-uploader {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #3498db;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.avatar-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #3498db;
}

.avatar-uploader:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.avatar-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.avatar-uploader-icon {
  font-size: 34px;
  color: #b0b3c5;
  transition: color 0.3s ease;
}

.avatar-uploader-icon:hover {
  color: #3498db;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-hint {
  margin-top: 8px;
  font-size: 14px;
  color: #3498db;
  transition: color 0.3s ease;
}

.avatar-hint:hover {
  color: #2980b9;
}


.change-password-button {
  margin-top: 15px;
  background-color: #3498db;
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.change-password-button:hover {
  background-color: #2980b9;
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.appointments-container {
  margin-top: 35px;
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.appointments-list {
  list-style-type: none;
  padding: 0;
}

.appointment-item {
  display: flex;
  justify-content: space-between;
  background-color: #f7faff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.appointment-item:hover {
  background-color: #e8f0ff;
  transform: translateY(-3px);
}

.appointment-details {
  max-width: 75%;
  color: #333;
}

.cancelled-message {
  color: #e79d96;
  font-weight: bold;
}

.cancel-button,
.reschedule-button {
  background-color: #9bbfee;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cancel-button:hover,
.reschedule-button:hover {
  background-color: #e79d96;
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.modal-dialog {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  width: 320px;
  max-width: 90%;
  transition: transform 0.3s ease;
}

.medical-records {
  margin-top: 35px;
  background-color: #f9fbfc;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.info-table tr {
  border-bottom: 1px solid #ddd;
}

.info-table td {
  padding: 12px 15px;
  font-size: 16px;
  color: #333;
}

.info-table td:first-child {
  font-weight: bold;
  color: #3498db;
  width: 120px;
}

.info-table td:last-child {
  text-align: left;
}

.info-table tr:hover {
  background-color: #f9fbfc;
}
</style>



