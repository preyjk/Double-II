<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "../../components/Footer.vue";

export default {
  components: {
    NavBar,
    Footer,
  },
};
</script>