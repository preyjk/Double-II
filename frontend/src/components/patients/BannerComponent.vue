<template>
  <div class="hero-section">
    <div class="left-section">
      <video ref="videoPlayer" @mouseenter="handleMouseEnter" muted>
        <source :src="videoSrc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="right-section">
      <h1 class="hero-title">Book Your Appointment with Ease</h1>
      <div class="play-button-container" @click="goChatbotPage">
        <div class="play-button">
          <img :src="clickImageSrc" alt="Click Icon" class="click-icon" />
        </div>
      </div>
      <p class="subtitle">Try Our Chatbot!</p>
      <img :src="robotImageSrc" alt="Robot Image" class="robot-image" />
    </div>
  </div>
</template>

<script>
import robotImage from "@/assets/robot.png";
import clickImage from "@/assets/click.png"; // Importing the click image
import videoSrc from "@/assets/1.mp4";
export default {
  name: "BannerComponent",
  data() {
    return {
      videoSrc,
      robotImageSrc: robotImage,
      clickImageSrc: clickImage, // Assigning the click image to be used in the play button
      videoReadyToPlay: true,
    };
  },
  methods: {
    handleMouseEnter() {
      if (this.videoReadyToPlay) {
        this.playVideoFromStart();
      }
    },
    playVideoFromStart() {
      const videoElement = this.$refs.videoPlayer;
      this.videoReadyToPlay = false;
      videoElement.play().catch((e) => {
        console.error("Error playing the video:", e);
      });
      videoElement.onended = () => {
        this.videoReadyToPlay = true;
      };
    },
    goChatbotPage() {
      this.$router.push({ name: "Chatbot" });
    },
  },
};
</script>

<style scoped>
.hero-section {
  display: flex;
  height: auto;
  width: 100%;
  padding: 0;
  margin: 0;
}

.left-section {
  width: 65%;
  height: 80vh;
  position: relative;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-section {
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #004d66, #accfd8);
  position: relative;
}

.robot-image {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30%;
  height: auto;
}

.hero-title {
  font-size: 2.5rem;
  color: #e0f7ff;
  margin-top: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-top: 20px;
  /* No background or extra styling */
}

.play-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.play-button {
  background-color: #accfd8;
  border-radius: 50%;
  width: 150px; /* Increased button size */
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  animation: pulse 2s infinite ease-in-out;
  box-shadow: 0 0 20px rgba(172, 207, 216, 0.7), 0 0 40px rgba(172, 207, 216, 0.5);
}

.play-button:hover {
  background-color: #ddeeff;
  box-shadow: 0 0 30px rgba(172, 207, 216, 0.8), 0 0 50px rgba(172, 207, 216, 0.6);
}

.click-icon {
  width: 100px; /* Increased click image size */
  height: 100px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(172, 207, 216, 0.7);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(172, 207, 216, 0.9);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(172, 207, 216, 0.7);
  }
}
</style>








