<template>
  <el-card>
    <div class="profile-header">
      <h2>User Profile</h2>
    </div>
    <el-form :model="profileForm" ref="profileFormRef" label-width="100px">
      <el-form-item label="Email">
        <el-input v-model="profileForm.email" disabled></el-input>
      </el-form-item>

      <el-form-item label="Old Password">
        <el-input v-model="profileForm.oldPassword" type="password" placeholder="Enter old password"></el-input>
      </el-form-item>

      <el-form-item label="New Password">
        <el-input v-model="profileForm.newPassword" type="password" placeholder="Enter new password"></el-input>
      </el-form-item>

      <el-form-item label="Confirm Password">
        <el-input v-model="profileForm.confirmPassword" type="password" placeholder="Confirm new password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="resetPassword">Reset Password</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="Success" :visible.sync="isDialogVisible">
      <p>Password reset successfully!</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isDialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { changePassword } from "@/api/modules/user.js";

export default {
  setup() {
    const store = useStore();
    const profileForm = ref({
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const profileFormRef = ref(null);
    const isDialogVisible = ref(false);

    const resetPassword = () => {
      if (profileForm.value.newPassword === profileForm.value.confirmPassword) {
        changePassword(profileForm.value.email, profileForm.value.oldPassword, profileForm.value.newPassword)
          .then(() => {
            isDialogVisible.value = true;
          })
          .catch((error) => {
            alert("Failed to reset password: " + error.message);
          });
      } else {
        alert("Passwords do not match!");
      }
    };

    onMounted(() => {
      profileForm.value.email = store.state.email || localStorage.getItem("userEmail");
    });

    return {
      profileForm,
      profileFormRef,
      resetPassword,
      isDialogVisible,
    };
  },
};
</script>

<style scoped>
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}
</style>
