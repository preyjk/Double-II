<template>
  <div class="avatar-container" @click.stop="toggleDropdown">
    <img :src="avatarSrc" alt="User Avatar" class="avatar" />
    <div v-if="dropdownVisible" class="dropdown-menu" ref="dropdownMenu">
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
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    handleOutsideClick(event) {
      if (
        this.dropdownVisible &&
        !this.$refs.dropdownMenu.contains(event.target) &&
        !event.target.closest(".avatar-container")
      ) {
        this.dropdownVisible = false;
      }
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
      this.dropdownVisible = false;
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
  border: 2px solid #64b1e8;
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
  background-color: #f0f4f8;
  border: 1px solid #64b1e8;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 160px;
  color: #333;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 12px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s;
}

.dropdown-menu li:hover {
  background-color: #e2e8f0;
}
</style>
