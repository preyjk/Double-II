<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-box">
        <div class="text-and-logo">
          <p class="booking-text"><strong>Book now</strong></p>
          <img src="@/assets/logo.png" alt="FRW Healthcare Logo" class="logo" />
        </div>
        <div class="booking-section">
          <span class="small-text">Book online using our easy online booking system.</span>
          <button class="appointment-button">
            <img src="@/assets/time.png" alt="Time Icon" class="time-icon" />APPOINTMENT
          </button>
        </div>
      </div>
      <div class="footer-box">
        <p class="welcome-text"><strong>Welcome to FRW Healthcare</strong></p>
        <span class="description-text">Providing top-tier medical services since 1992 in Auckland, Wellington, and Christchurch.</span>
      </div>
    </div>
    <div class="footer-base">
      <p class="copyright">© 2024 FRW Healthcare. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  background-color: #accfd8;
  color: #002366;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.footer-box {
  flex: 1;
  text-align: left;
  padding-left: 50px;
}

.text-and-logo {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.booking-text {
  font-size: 20px;
  margin-right: 10px;
}

.booking-section {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}

.small-text {
  font-size: 16px;
  margin-bottom: 20px; 
}

.appointment-button {
  background-color: #365a82;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  margin-top: 20px; 
  margin-left: 20px; 
}

.appointment-button:hover {
  background-color: #2a4665;
}

.time-icon {
  height: 24px;
  margin-right: 10px;
}

.logo {
  height: 80px;
}

.welcome-text {
  margin-bottom: 10px;
}

.description-text {
  margin-bottom: 20px;
}

.footer-base {
  width: 100%;
  text-align: right;
  padding-top: 10px;
}

.copyright {
  font-size: 16px;
}
</style>
