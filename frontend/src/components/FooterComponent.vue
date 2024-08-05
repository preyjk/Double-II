<!-- FooterComponent.vue -->
<template>
  <footer class="footer">
    <div class="logo">
      <!-- <img src="@/assets/logo.png" alt="Logo" /> -->
      <span>FRW</span>
      <p>@2024 FRW. All Right Reserved. Double II Team.</p>
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
  box-sizing: border-box;
  padding: 20px 10px;
  background-color: rgb(238, 237, 237);
  color: black;
}

.logo {
  display: flex;
  font-size: 14px;
  justify-content: center; /* horizon center */
  align-items: center; /* vertical center */
}

.logo img {
  height: 28px;
  margin-right: 20px;
}
</style>
