<template>
  <div class="banner-container">
    <ChatbotComponent class="clinic-search"></ChatbotComponent>
    <div class="img-area">
      <img src="@/assets/docotor.png" alt="docotor img" class="img-docotor" />
    </div>
  </div>
</template>

<script>
import ChatbotComponent from "../patients/ChatbotComponent.vue";
export default {
  name: "BannerComponent",
  components: {
    ChatbotComponent,
  },
  methods: {},
};
</script>

<style scoped>
.banner-container {
  display: flex;
}
.clinic-search {
  flex: 2;
}
.img-area {
  flex: 1;
}
.img-docotor {
  width: 40vw;
  margin-right: 80px;
}
</style>
