<template>
  <div class="page-container">
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
    <div
      class="patient-review-section"
      style="background-image: url('@/assets/reviews-bg.jpg')"
    >
      <h2 class="review-title">Real User Experiences with Our Chatbot</h2>
      <div class="reviews-container">
        <div
          v-for="(patient, index) in patients"
          :key="index"
          class="review-card"
        >
          <img
            :src="patient.imageSrc"
            :alt="'Patient ' + (index + 1)"
            class="patient-avatar"
            @error="imageError"
          />
          <p class="patient-quote">{{ patient.quote }}</p>
          <p class="patient-detail">{{ patient.detail }}</p>
          <p class="patient-name">- {{ patient.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import robotImage from "@/assets/robot.png";
import clickImage from "@/assets/click.png";
import videoSrc from "@/assets/1.mp4";
import patient1 from "@/assets/p1.png";
import patient2 from "@/assets/p2.png";
import patient3 from "@/assets/p3.png";
import patient4 from "@/assets/p4.png";
import patient5 from "@/assets/p5.png";
import patient6 from "@/assets/p6.png";
import patient7 from "@/assets/p7.png"; // 新增病人7图片
import patient8 from "@/assets/p8.png"; // 新增病人8图片

export default {
  name: "HomePageComponent",
  data() {
    return {
      videoSrc,
      robotImageSrc: robotImage,
      clickImageSrc: clickImage,
      videoReadyToPlay: true,
      patients: [
        {
          imageSrc: patient2,
          quote: "As a busy worker, I value flexibility.",
          detail:
            "The chatbot lets me book appointments 24/7 and easily cancel or change them anytime, which is incredibly convenient.",
          name: "Mike Lee",
        },
        {
          imageSrc: patient1,
          quote: "Senior-friendly with excellent voice features!",
          detail:
            "The voice functionality is perfect for someone like me who isn't comfortable with typing. It's like talking to a real person.",
          name: "Betty White",
        },
        {
          imageSrc: patient4,
          quote: "Navigating healthcare has never been simpler.",
          detail:
            "I always found it difficult to navigate hospital websites. This chatbot makes everything straightforward and simple.",
          name: "Samantha Chu",
        },
        {
          imageSrc: patient3,
          quote: "Efficiency at its best!",
          detail:
            "I was amazed at how quickly I could schedule an urgent appointment. No waiting, no stress.",
          name: "Carlos Gomez",
        },
        {
          imageSrc: patient6,
          quote: "A game-changer for busy moms! ",
          detail:
            "With three kids, finding time to call during office hours is tough. Now, I book appointments while on the go, anytime.",
          name: "Aisha Rahman",
        },
        {
          imageSrc: patient5,
          quote: "Tech at the service of health, wonderfully executed.",
          detail:
            "The chatbot handles my appointments, sends reminders, and even directs me to health tips. It's like having a personal health assistant.",
          name: "Tommy Nguyen",
        },
        {
          imageSrc: patient7,
          quote: "Highly intuitive and easy to use.",
          detail:
            "The chatbot experience was smooth and intuitive. It made managing my appointments seamless.",
          name: "Jenny Park",
        }, // 新增病人7信息
        {
          imageSrc: patient8,
          quote: "Perfect for someone with a busy schedule.",
          detail:
            "I love how fast I can get everything done with the chatbot. No need to call or wait in line.",
          name: "David Wong",
        }, // 新增病人8信息
      ],
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
    imageError(event) {
      event.target.src = "@/assets/default-avatar.png";
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hero-section {
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
}

.left-section,
.right-section {
  height: 80vh;
}

.left-section {
  width: 65%;
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
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  animation: pulse 2s infinite ease-in-out;
  box-shadow: 0 0 20px rgba(172, 207, 216, 0.7),
    0 0 40px rgba(172, 207, 216, 0.5);
}

.play-button:hover {
  background-color: #ddeeff;
  box-shadow: 0 0 30px rgba(172, 207, 216, 0.8),
    0 0 50px rgba(172, 207, 216, 0.6);
}

.click-icon {
  width: 100px;
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

/* Testimonial Section */
.patient-review-section {
  width: 100%;
  padding: 60px 40px;
  background-color: #6190a1;
  text-align: center;
  color: #e0f7ff;
  border-top: 0px solid white;
}

.review-title {
  color: #e0f7ff;
  margin-bottom: 50px;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.reviews-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.review-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-left: 5px solid #ffd700;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.review-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.patient-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto 15px;
  display: block;
  object-fit: cover;
  border: 3px solid #ffd700;
}

.patient-quote {
  font-size: 1.6rem;
  color: #004d66;
  margin: 15px 0 10px;
}

.patient-detail {
  font-size: 1.2rem;
  color: #333;
  margin: 5px 0 15px;
}

.patient-name {
  font-size: 1.2rem;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .left-section {
    display: none;
  }
  .right-section {
    width: 100%;
  }
}
</style>
