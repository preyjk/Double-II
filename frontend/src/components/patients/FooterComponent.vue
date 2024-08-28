<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo-box">
        <img src="@/assets/logo.png" alt="FRW Healthcare Logo" class="logo" />
        <p class="welcome-text"><strong>FRW Healthcare</strong></p>
      </div>
      <div class="footer-info-box">
        <span class="description-text">
          Top-tier medical services since 1992 in Auckland, Wellington, and
          Christchurch.
        </span>
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
  align-items: center;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.footer-logo-box {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
  margin-right: 15px;
}

.welcome-text {
  font-size: 18px;
  color: #002366;
}

.footer-info-box {
  flex: 1;
  text-align: center;
}

.description-text {
  font-size: 16px;
  color: #002366;
}

.footer-base {
  width: 100%;
  max-width: 1200px;
  text-align: center;
  padding-top: 10px;
  border-top: 1px solid #c0d6df;
  margin-top: 20px;
}

.copyright {
  font-size: 14px;
  color: #002366;
}
</style>
