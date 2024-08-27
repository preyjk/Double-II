<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <div class="container_banner">
      <BannerComponent class="banner"></BannerComponent>
    </div>
    <ChatComponent></ChatComponent>
    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import BannerComponent from "@/components/patients/BannerComponent.vue";
import ChatComponent from "@/components/patients/ChatComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ChatComponent,
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

.container_header,
.container_footer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
</style>
