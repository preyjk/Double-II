<template>
  <div class="avatar-container" @click="toggleDropdown">
    <img :src="avatarSrc" alt="User Avatar" class="avatar" />
    <div v-if="dropdownVisible" class="dropdown-menu">
      <ul>
        <!-- <li @click="goToProfile">Profile</li> -->
        <li @click="viewBookings">My Bookings</li>
        <li @click="logout">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
import avatarSrc from "@/assets/default-avatar.png";
export default {
  name: "AvatarComponent",
  data() {
    return {
      dropdownVisible: false,
      avatarSrc: avatarSrc,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    goToProfile() {
      this.$router.push({ name: "PersonalProfile" });
      this.dropdownVisible = false;
    },
    viewBookings() {
      this.$router.push({ name: "MyBooking" });
      this.dropdownVisible = false;
    },
    logout() {
      localStorage.removeItem("authToken");
      this.$emit("logout");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ccc;
  transition: border 0.3s;
}

.avatar:hover {
  border: 2px solid #64b1e8;
}

.dropdown-menu {
  z-index: 999;
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>
