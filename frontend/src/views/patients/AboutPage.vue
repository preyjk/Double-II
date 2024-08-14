<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <p>This is About page.</p>
    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>

import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
export default {
  components: {
    HeaderComponent,
    FooterComponent,
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
</style>