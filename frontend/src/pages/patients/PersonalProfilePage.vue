<template>
  <el-card class="profile-card">
    <!-- Header -->
    <HeaderComponent />

    <div class="profile-header">
      <h2>Patients Profile</h2>

      <!-- Avatar Upload Section -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/" 
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="profileForm.avatarUrl" :src="profileForm.avatarUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <!-- User Information -->
      <div class="profile-info">
        <p><strong>Name:</strong> {{ profileForm.name }}</p>
        <p><strong>Email:</strong> {{ profileForm.email }}</p>
        <p><strong>Phone:</strong> {{ profileForm.phone }}</p>
      </div>

      <!-- Trigger to show the password change form modal -->
      <el-button type="primary" @click="showPasswordChangeModal" class="change-password-button">Change Password</el-button>
    </div>

    <!-- Password Change Modal -->
    <div v-if="isPasswordChangeVisible" class="modal-overlay">
      <div class="modal-dialog">
        <h3>Change Password</h3>
        <el-form :model="profileForm" ref="profileFormRef" label-width="100px">
          <el-form-item label="Old Password">
            <el-input v-model="profileForm.oldPassword" type="password" placeholder="Enter old password" show-password></el-input>
          </el-form-item>
          <el-form-item label="New Password">
            <el-input v-model="profileForm.newPassword" type="password" placeholder="Enter new password" show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input v-model="profileForm.confirmPassword" type="password" placeholder="Confirm new password" show-password></el-input>
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
          <li
            v-for="(booking, index) in bookings"
            :key="index"
            class="appointment-item"
          >
            <div class="appointment-details">
              <p><strong>Doctor:</strong> Dr. {{ booking.DoctorName }}</p>
              <p><strong>Date:</strong> {{ booking.Date }}</p>
              <p><strong>Time:</strong> {{ booking.StartTime }} - {{ booking.EndTime }}</p>
              <p><strong>Patient:</strong> {{ booking.LastName }}</p>
              <p v-if="booking.Status === 'cancelled'" class="cancelled-message">
                <strong>Status:</strong> Appointment Cancelled
              </p>
            </div>
            <button
              @click="cancelBooking(index)"
              class="cancel-button"
              :disabled="booking.Status === 'cancelled'"
            >
              Cancel
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>You have no appointments scheduled.</p>
      </div>
    </div>

    <!-- Medical Records Section (Placeholder for future development) -->
    <div class="medical-records">
      <h2>Your Medical Records</h2>
      <p>No medical records available at this time.</p>
    </div>

    <!-- Footer -->
    <FooterComponent />
  </el-card>
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

    const handleAvatarSuccess = (response, file) => {
      profileForm.value.avatarUrl = URL.createObjectURL(file.raw);
    };

    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        alert('Avatar picture must be JPG or PNG format!');
      }
      if (!isLt2M) {
        alert('Avatar picture size must be less than 2MB!');
      }
      return isJPG && isLt2M;
    };

    const cancelBooking = (index) => {
      const booking = bookings.value[index];
      booking.Status = "cancelled";
    };

    onMounted(() => {
      profileForm.value.email = store.state.email || localStorage.getItem("userEmail");

      // Fetch appointments (mocked data)
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
      handleAvatarSuccess,
      beforeAvatarUpload,
      cancelBooking,
      bookings,
    };
  },
};
</script>

<style scoped>
.profile-card {
  background: linear-gradient(145deg, #f5f7fa, #e1e5ea);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-uploader {
  width: 120px;
  height: 120px;
  margin: 20px auto;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.avatar-uploader-icon {
  font-size: 32px;
  color: #8c939d;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.avatar-uploader-icon:hover {
  background-color: #e1e5ea;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.change-password-button {
  margin-top: 10px;
}

.appointments-container {
  margin-top: 30px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.appointments-list {
  list-style-type: none;
  padding: 0;
}

.appointment-item {
  display: flex;
  justify-content: space-between;
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.appointment-details {
  max-width: 75%;
}

.cancelled-message {
  color: red;
  font-weight: bold;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #c0392b;
}

.medical-records {
  margin-top: 30px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
