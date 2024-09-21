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
      </div>

      <!-- Add Patient Button -->
      <el-button type="primary" @click="goToAddPatient" class="add-patient-button">Add Patient</el-button>

      <!-- Trigger to show the password change form modal -->
      <el-button type="primary" @click="showPasswordChangeModal" class="change-password-button">Change
        Password</el-button>
    </div>

    <div class="patient-list-container">
      <h3>Patients List</h3>
      <div v-if="patients && patients.length">
        <div class="patient-list" v-for="(patient, index) in patients" :key="index">
          <div class="profile-info">
            <p><strong>Name:</strong> {{ patient.name }}</p>
            <p><strong>Email:</strong> {{ patient.email }}</p>
            <p><strong>Phone:</strong> {{ patient.phone }}</p>
            <p><strong>Age:</strong> {{ patient.age }}</p>
            <p><strong>Gender:</strong> {{ patient.gender }}</p>
            <p><strong>Address:</strong> {{ patient.address }}</p>
          </div>

          <div class="action-buttons">
            <button @click="updatePatient(index)" class="update-button" :disabled="patient.Status === 'update'">
              Update
            </button>
            <button @click="deletePatient(index)" class="delete-button" :disabled="patient.Status === 'delete'">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No patients found.</p>
      </div>
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
              <p>
                <strong>Time:</strong> {{ booking.StartTime }} -
                {{ booking.EndTime }}
              </p>
              <p><strong>Patient:</strong> {{ booking.LastName }}</p>
              <p v-if="booking.Status === 'cancelled'" class="cancelled-message">
                <strong>Status:</strong> Appointment Cancelled
              </p>
            </div>
            <div class="appointment-actions">
              <button @click="cancelBooking(index)" class="cancel-button" :disabled="booking.Status === 'cancelled'">
                Cancel
              </button>
              <button @click="showRescheduleModal(index)" class="reschedule-button"
                :disabled="booking.Status === 'rescheduled'"></button>
              <button @click="showRescheduleModal(index)" class="reschedule-button"
                :disabled="booking.Status === 'cancelled'">
                Reschedule
              </button>
            </div>
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
import { getPatientById_user, updatePatientById_user, deletePatientById_user, getPatients_user } from "@/api/modules/patients.js";
import { getUserInfo } from "@/api/modules/user"
import { useRouter } from 'vue-router';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const profileForm = ref({
      name: "",
      email: "",
      phone: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      avatarUrl: "",
    });
    const patientsDetails = ref([]);
    const isPasswordChangeVisible = ref(false);
    const isRescheduleModalVisible = ref(false);
    const rescheduleForm = ref({
      newDate: "",
      newTime: "",
    });
    const currentBookingIndex = ref(null);
    const bookings = ref([]);
    const patients = ref([]);


    // Reset Password
    const resetPassword = () => {
      if (profileForm.value.newPassword === profileForm.value.confirmPassword) {
        changePassword(
          profileForm.value.email,
          profileForm.value.oldPassword,
          profileForm.value.newPassword
        )
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

    // Show password change modal
    const showPasswordChangeModal = () => {
      isPasswordChangeVisible.value = true;
    };

    // Close password change modal
    const closePasswordChangeModal = () => {
      isPasswordChangeVisible.value = false;
    };

    // Handle avatar change
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

    // Show reschedule modal
    const showRescheduleModal = (index) => {
      currentBookingIndex.value = index;
      isRescheduleModalVisible.value = true;
    };

    const closeRescheduleModal = () => {
      isRescheduleModalVisible.value = false;
      rescheduleForm.value.newDate = "";
      rescheduleForm.value.newTime = "";
    };

    // Reschedule booking
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

    const checkLogin = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Authentication required. Please log in.");
        router.push("/login"); // Redirect to login page if not logged in
        return false;
      }
      return true;
    };

    // Fetch Patients Information
    const getPatients = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Authentication required. Please log in.");
        return;
      }

      try {
        const patientsDetails = await getUserInfo(token);
        if (patientsDetails) {
          profileForm.value.name = patientsDetails.data.FirstName + " " + patientsDetails.data.LastName;
          profileForm.value.email = patientsDetails.data.Providers[0].ProviderId;
        } else {
          console.log("No patients found.");
          patients.value = [];
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        alert("Failed to fetch patient data. Please try again.");
      }
    };

    const updatePatient = async (index) => {
      const patient = patients.value[index];
      patient.Status = "update";

      try {
        const formData = {
          Name: patient.name,
          Gender: patient.gender,
          Age: patient.age,
          Phone: patient.phone,
          Email: patient.email,
          Address: patient.address,
        };
        await updatePatientById_user(patient.id, formData);
        console.log("Patient updated successfully");
      } catch (error) {
        console.error("Error updating patient:", error);
      } finally {
        patient.Status = "";
      }
    };

    // Delete a patient
    const deletePatient = async (index) => {
      const patient = patients.value[index];
      patient.Status = "delete"; // Disable the button while deleting

      try {
        await deletePatientById_user(patient.id); // Call API to delete
        console.log("Patient deleted successfully");
        patients.value.splice(index, 1); // Remove the patient from the list
      } catch (error) {
        console.error("Error deleting patient:", error);
      } finally {
        patient.Status = "";
      }
    };



    const cancelBooking = (index) => {
      store.dispatch("cancelBooking", index);
    };

    // Navigate to add patient page
    const goToAddPatient = () => {
      router.push("/patient"); // Navigate to the patient registration page
    };

    // Load data on mount
    onMounted(() => {
      getPatients();
      store.dispatch("getBookings").then(() => {
        bookings.value = store.state.bookings;
      });
    });

    return {
      profileForm,
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
      goToAddPatient,
      patients,
      getPatients,
      updatePatient,
      deletePatient,
    };
  },
};
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
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
  color: #004d66;
  margin-bottom: 30px;
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

.add-patient-button,
.change-password-button {
  width: 180px;
  background-color: #3498db;
  border: 2px solid #2980b9;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.add-patient-button:hover,
.change-password-button:hover {
  background-color: #e79d96;
  border-color: #e67e73;
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.appointments-container {
  margin-top: 35px;
  background-color: #ffffff;
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
  align-items: center;
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
  flex: 1;
  text-align: left;
  color: #333;
}

.appointment-actions {
  display: flex;
  gap: 10px;
}

.cancelled-message {
  color: #e79d96;
  font-weight: bold;
}

.cancel-button,
.reschedule-button {
  width: 100px;
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

.cancel-button:disabled,
.reschedule-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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

.patient-list-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.patient-list {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.patient-list:hover {
  background-color: #e8f0ff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.profile-info p {
  margin: 5px 0;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.update-button,
.delete-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button:hover,
.delete-button:hover {
  background-color: #2980b9;
}

.update-button:disabled,
.delete-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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

@media (max-width: 768px) {
  .profile-card {
    padding: 20px;
    box-shadow: none;
  }

  .profile-header {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .avatar-uploader {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }

  .add-patient-button,
  .change-password-button {
    width: 100%;
    margin-top: 10px;
  }

  .appointments-container {
    padding: 20px;
    margin-top: 20px;
  }

  .appointment-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .appointment-details {
    margin-bottom: 10px;
    text-align: left;
  }

  .appointment-actions {
    width: 100%;
    justify-content: space-between;
  }

  .modal-dialog {
    width: 95%;
  }

  .medical-records {
    padding: 20px;
    margin-top: 20px;
  }

  .info-table td {
    padding: 8px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .profile-header h2 {
    font-size: 16px;
  }

  .avatar-uploader {
    width: 80px;
    height: 80px;
  }

  .appointments-container {
    padding: 15px;
  }

  .add-patient-button,
  .change-password-button {
    padding: 8px;
    font-size: 14px;
  }

  .appointment-item {
    padding: 10px;
  }

  .appointment-details {
    font-size: 14px;
  }

  .cancel-button,
  .reschedule-button {
    width: 80px;
    padding: 5px;
    font-size: 12px;
  }

  .modal-dialog {
    width: 90%;
  }

  .medical-records {
    padding: 15px;
  }

  .info-table td {
    font-size: 12px;
    padding: 6px;
  }
}
</style>
