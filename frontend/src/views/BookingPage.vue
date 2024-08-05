<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <div class="main_content">
      <InformationCollectingComponent></InformationCollectingComponent>
    </div>
    <FooterComponent class="container_header"></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import InformationCollectingComponent from "@/components/InformationCollectingComponent.vue";
export default {
  components: {
    HeaderComponent,
    FooterComponent,
    InformationCollectingComponent,
  },
};
</script>

<style scoped>
.container_body {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  /* horizon center */
  align-items: center;
  /* vertical center */
}

.container_header {
  display: flex;
  width: 100%;
  justify-content: center;
  /* horizon center */
  align-items: center;
  /* vertical center */
}

.main_content {
  /* height: 500px; */
  width: 100%;
  background-color: var(--background-color);
}
</style>
