<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <nav class="nav">
      <NavComponent></NavComponent>
    </nav>
    <div class="container_banner">
      <BannerComponent class="banner"></BannerComponent>
    </div>
    <div class="main_content"></div>
    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
import BannerComponent from "@/components/patients/BannerComponent.vue";
import NavComponent from "@/components/patients/NavComponent.vue";
export default {
  components: {
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    NavComponent,
  },
};
</script>

<style scoped>
.container_body {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container_header {
  display: flex;
  width: 100%;
  align-items: center;
}
.container_footer {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.main_content {
  width: 100%;
  padding: 50px 200px;
}

.nav {
  width: 100%;
  background-color: white;
}

.container_banner {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.container_banner .banner {
  width: 100%;
  background-color: rgb(231, 228, 228);
}

.container_banner .search {
  width: 30%;
  height: 350px;
  background-color: bisque;
}
</style>
