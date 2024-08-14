<template>
  <footer class="footer">
    <div class="footer-content">
      <img src="@/assets/logo.png" alt="FRW Healthcare Logo" class="logo" />
      <div class="footer-links">
        <a href="/privacy">Privacy Policy</a> |
        <a href="/child-protection">Child Protection</a>
      </div>
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
  background-color: #005a8d;
  color: white;
  padding: 20px 10px;
  text-align: center;
  border-top: 3px solid #02b3e4;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.logo {
  height: 80px;
  margin-bottom: 15px;
}

.footer-links {
  font-size: 14px;
  margin: 10px 0;
}

.footer-links a {
  color: #ffffff;
  margin: 0 8px;
  text-decoration: none;
}

.footer-links a:hover {
  color: #0294b5;
}

.copyright {
  font-size: 12px;
  margin-top: 10px;
}
</style>
