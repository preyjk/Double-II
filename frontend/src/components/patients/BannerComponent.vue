<template>
  <div class="hero-section">
    <div class="left-section">
      <video ref="videoPlayer" @mouseenter="handleMouseEnter" muted>
        <source :src="videoSrc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="right-section">
      <h1 class="hero-title">YOUR JOURNEY TO WELLNESS BEGINS HERE</h1>
      <div class="play-button-container" @click="goChatbotPage">
        <div class="play-button">
          <span class="triangle"></span>
        </div>
      </div>
      <img :src="robotImageSrc" alt="Robot Image" class="robot-image" />
    </div>
  </div>
</template>

<script>
import robotImage from "@/assets/robot.png";
import videoSrc from "@/assets/1.mp4";
export default {
  name: "BannerComponent",
  data() {
    return {
      videoSrc,
      robotImageSrc: robotImage,
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
  width: 68%;
  height: 80vh;
  position: relative;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-section {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  position: relative;
  background: linear-gradient(135deg, #004d66, #accfd8);
}

.robot-image {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 35%;
  height: auto;
}

.hero-title {
  font-size: 2rem;
  color: #e0f7ff;
  margin-top: 20px;
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
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.play-button:hover {
  background-color: #ddeeff;
}

.play-button .triangle {
  border-left: 25px solid white;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
</style>
