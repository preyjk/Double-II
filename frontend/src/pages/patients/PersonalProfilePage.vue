<template>
  <el-card>
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

      <!-- Trigger to show the password change form modal -->
      <el-button type="primary" @click="showPasswordChangeModal" class="change-password-button">Change Password</el-button>

      <!-- New File Upload Button -->
      <el-upload
        class="file-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleFileUploadSuccess"
        :before-upload="beforeFileUpload"
      >
        <el-button type="primary" class="upload-button">Upload Local File</el-button>
      </el-upload>

      <!-- Display uploaded file name -->
      <div v-if="uploadedFileName" class="uploaded-file">
        <p>Uploaded file: {{ uploadedFileName }}</p>
      </div>
    </div>

    <!-- Full Password Change Form Modal as an Overlay -->
    <div v-if="isPasswordChangeVisible" class="modal-overlay">
      <div class="modal-dialog">
        <h3>Change Password</h3>
        <el-form :model="profileForm" ref="profileFormRef" label-width="100px">
          <el-form-item label="Email">
            <el-input v-model="profileForm.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="Old Password">
            <el-input v-model="profileForm.oldPassword" type="text" placeholder="Enter old password" show-password></el-input>
          </el-form-item>
          <el-form-item label="New Password">
            <el-input v-model="profileForm.newPassword" type="text" placeholder="Enter new password" show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input v-model="profileForm.confirmPassword" type="text" placeholder="Confirm new password" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="resetPassword">Reset Password</el-button>
            <el-button @click="closePasswordChangeModal">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <FooterComponent />
  </el-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { changePassword } from "@/api/modules/user.js";
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    const profileForm = ref({
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      avatarUrl: "", 
    });

    const profileFormRef = ref(null);
    const isPasswordChangeVisible = ref(false); 
    const isDialogVisible = ref(false); 
    const uploadedFileName = ref(""); 

    const resetPassword = () => {
      if (profileForm.value.newPassword === profileForm.value.confirmPassword) {
        changePassword(profileForm.value.email, profileForm.value.oldPassword, profileForm.value.newPassword)
          .then(() => {
            isDialogVisible.value = true;
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

    const closeDialog = () => {
      isDialogVisible.value = false;
    };

    const handleAvatarSuccess = (response, file) => {
      profileForm.value.avatarUrl = URL.createObjectURL(file.raw); 
    };

    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG or PNG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size must be less than 2MB!');
      }
      return isJPG && isLt2M;
    };

    const handleFileUploadSuccess = (response, file) => {
      uploadedFileName.value = file.name; 
    };

    const beforeFileUpload = (file) => {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error('File size must be less than 10MB!');
      }
      return isLt10M;
    };

    onMounted(() => {
      profileForm.value.email = store.state.email || localStorage.getItem("userEmail");
    });

    return {
      profileForm,
      profileFormRef,
      resetPassword,
      isPasswordChangeVisible,
      showPasswordChangeModal,
      closePasswordChangeModal,
      isDialogVisible,
      closeDialog,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleFileUploadSuccess,
      beforeFileUpload,
      uploadedFileName, 
    };
  },
};
</script>

<style scoped>
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(10px); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-dialog {
  background: rgba(255, 255, 255, 0.3); 
  border-radius: 15px;
  padding: 20px;
  text-align: center;
}

.avatar-uploader {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  border-radius: 50%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.upload-button {
  margin-top: 10px;
}

.uploaded-file {
  margin-top: 20px;
}
</style>
