<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <nav class="nav">
      <NavComponent></NavComponent>
    </nav>
    <div class="container_banner">
      <BannerComponent class="banner"></BannerComponent>
    </div>
    <div class="main_content">
      Join us today! Simply choose a clinic near you, we have 66 practices
      across the country to care for you and your family Our medical teams
      including GPs, Nurse Practitioners and Nurses are here to give you the
      best health care and advice, when you need it most. Your wellbeing is our
      focus and we support all Kiwis. As New Zealand's leading and largest
      medical centre networks we're right at the heart of local communities
      supporting over 429,000 enrolled patients around the country. If you're
      looking for a new GP or medical centre, let us know, we're here to help.
      When you enrol with us you'll save money on fees compared with a casual
      consult. If it's hard to get in to see your regular GP we recommend The
      Doctors Online. You can book online anytime in less than 2 mins and have
      the appointment when and where it suits you. Because of what we do,
      everyone is healthier
    </div>
    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import NavComponent from "@/components/NavComponent.vue";
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
