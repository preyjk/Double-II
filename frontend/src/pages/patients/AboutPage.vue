<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <p class="welcome-text">Welcome to FRW Healthcare Limited</p>

    <!-- Our Story Section -->
    <div class="content-section">
      <img class="section-image" src="@/assets/building.png" alt="FRW Healthcare Building" />
      <div class="story-box cool-card">
        <h2 class="story-title">Our Story</h2>
        <p class="story-text">
          Founded in the heart of Christchurch in 1992, FRW Healthcare Limited began as a modest medical practitioner's office established by Drs. Frond, Reed, and Willow. From the outset, our founders envisioned a healthcare system where comprehensive, affordable medical services were accessible to all. This vision was built on an innovative approach to patient administration, integrating every facet of patient information to enable informed, efficient healthcare decisions.
        </p>
        <p class="story-text">
          Today, FRW Healthcare has grown into a premier healthcare provider with 15 locations across Auckland, Wellington, and Christchurch, each dedicated to maintaining the health and well-being of our communities.
        </p>
      </div>
    </div>

    <!-- Vertical separator design for middle space -->
    <div class="separator">
      <div class="separator-line"></div>
    </div>

    <!-- Our Mission Section -->
    <div class="content-section">
      <div class="mission-text-box cool-card">
        <h2 class="mission-title">Our Mission</h2>
        <p class="mission-text">
          <span class="highlight">"Excellent Service, Excellent Health"</span> encapsulates our mission at FRW Healthcare. We are committed to enabling medical services that align with patient understanding, wellbeing, and health. Our approach is patient-centric, focusing on providing care that not only treats but also educates and empowers our patients.
        </p>
      </div>
      <img class="section-image" src="@/assets/mission.png" alt="Our Mission Image" />
    </div>

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
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.container_header, .container_footer {
  width: 100%;
}

.welcome-text {
  font-weight: bold;
  font-size: 28px;
  color: #004d66;
  text-align: center;
  margin-top: 30px;
}

/* Section Layout for Story and Mission */
.content-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  width: 90%;
}

.section-image {
  width: 45%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.story-box, .mission-text-box {
  width: 45%;
  padding: 20px;
  background-color: #f9fafc;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.cool-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(230, 230, 250, 0.9));
  border: 1px solid rgba(0, 170, 255, 0.2);
}

.story-title, .mission-title {
  font-size: 26px;
  font-weight: 600;
  color: #005580;
  margin-bottom: 15px;
  text-align: center;
}

.story-text, .mission-text {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
}

.mission-text .highlight {
  font-style: italic;
  font-size: 18px;
  color: #007cba;
}

/* Separator design for middle space */
.separator {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
}

.separator-line {
  width: 80%;
  height: 3px;
  background-color: #007cba;
  opacity: 0.3;
  border-radius: 2px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .content-section {
    flex-direction: column;
    align-items: center;
  }

  .section-image, .story-box, .mission-text-box {
    width: 90%;
  }

  .story-title, .mission-title {
    font-size: 22px;
  }

  .story-text, .mission-text {
    font-size: 14px;
  }

  .highlight {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .welcome-text {
    font-size: 24px;
  }

  .story-title, .mission-title {
    font-size: 20px;
  }

  .story-text, .mission-text {
    font-size: 13px;
  }

  .highlight {
    font-size: 16px;
  }
}
</style>