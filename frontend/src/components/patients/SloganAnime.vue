<template>
  <div class="slogan-container">
    <div class="slogan">SAVE TIME, SAVE LIFE</div>
  </div>
</template>

<script>
export default {
  name: "AnimatedSlogan",
};
</script>

<style scoped>
.slogan-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  perspective: 1000px;
  background-color: #111;
}

.slogan {
  font-size: 3em;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(90deg, #ff6b6b, #ffcc00, #4ecdc4, #1a535c);
  background-clip: text;
  text-fill-color: transparent;
  animation: rotateScale 10s ease-in-out infinite;
  display: inline-block;
  transform-origin: center;
}

@keyframes rotateScale {
  0% {
    transform: rotateY(0deg) scale(1);
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  25% {
    transform: rotateY(180deg) scale(1.1);
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  50% {
    transform: rotateY(360deg) scale(1);
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  75% {
    transform: rotateY(180deg) scale(1.1);
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  100% {
    transform: rotateY(0deg) scale(1);
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
}
</style>
