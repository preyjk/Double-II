<template>
  <div class="hero-section">
    <h1 class="hero-title">
      <span class="line1">YOUR JOURNEY TO</span><br />
      <span class="line2">WELLNESS BEGINS HERE</span>
    </h1>
    <div class="play-button-container">
      <div class="play-button">
        <span>&#9658;</span>
      </div>
    </div>
    <div class="arrow-down"></div>
    <p class="chatbot-text">Chat with our intelligent chatbot</p>
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
.hero-section {
  background-image: linear-gradient(
      to top,
      white 0%,
      rgba(255, 255, 255, 0) 20%
    ),
    linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0) 20%),
    url("@/assets/hospital-hall.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(55, 55, 59);
  text-align: center;
  filter: saturate(1.2) brightness(1.1);
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 80px;
}

.play-button-container {
  position: relative;
}

.play-button {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation: pulse 2s infinite;
}

.play-button span {
  font-size: 2rem;
  color: white;
}

.arrow-down {
  margin-top: 20px;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid white;
  animation: bounce 2s infinite;
}

.chatbot-text {
  margin-top: 10px;
  font-size: 1.2rem;
  text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 0.7);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
