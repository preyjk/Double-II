<template>
  <div ref="lottieContainer" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import lottie from "lottie-web";

export default {
  name: "LottieAnimation",
  props: {
    animationData: Object,
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.loadAnimation();
  },
  methods: {
    loadAnimation() {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: "svg",
        loop: this.loop,
        autoplay: this.autoplay,
        animationData: this.animationData,
      });
    },
  },
};
</script>

<style scoped></style>
