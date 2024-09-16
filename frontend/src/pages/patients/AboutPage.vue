<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <div class="about-us-section">
      <img src="@/assets/aboutus.png" alt="About Us" class="about-us-image" />
      <div class="about-us-overlay">About Us</div>
    </div>
    <div class="welcome-section">
      <p class="welcome-text">FRW is a distinguished healthcare provider with 15 sites across New Zealand, supported by a dedicated team of professionals.</p>
      <p class="welcome-text">We operate in key cities including Christchurch, Wellington, and Auckland, offering services like general practice, urgent care, and specialist consulting.</p>
      <p class="welcome-text">We provide healthcare services to both existing patients and the general public through our on-site and online platforms.</p>
      <p class="welcome-text">At FRW, we believe a healthier community begins with outstanding medical care, and we strive to make that a reality. For Everyone.</p>
    </div>
    <!-- Our Story Section -->
    <div class="content-section">
      <img class="section-image" src="@/assets/building.png" alt="FRW Healthcare Building" />
      <div class="story-box cool-card">
        <h2 class="story-title">Our Story</h2>
        <p class="story-text">
          Founded in the heart of Christchurch in 1992, FRW Healthcare Limited began as a modest medical practitioner's office established by Drs. Frond, Reed, and Willow. From the outset, our founders envisioned a healthcare system where comprehensive, affordable medical services were accessible to all.
        </p>
        <br />
        <p class="story-text">
          Today, FRW Healthcare has grown into a premier healthcare provider with 15 locations across Auckland, Wellington, and Christchurch, each dedicated to maintaining the health and well-being of our communities.
        </p>
      </div>
    </div>

    <!-- Separator design for middle space -->
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

    <!-- Separator for Core Services -->
    <div class="separator">
      <div class="separator-line"></div>
    </div>

    <!-- Our Core Services Section -->
    <div class="core-services-section">
      <h2 class="core-services-title">Our Core Services</h2>
      <div class="services-grid">
        <div class="service-item">
          <img class="service-image" src="@/assets/GeneralPractice.png" alt="General Practice" />
          <p class="service-title">General Practice</p>
          <p class="service-description">At the heart of our services, general practice is available at all our locations, providing consistent, comprehensive care.</p>
        </div>
        <div class="service-item">
          <img class="service-image" src="@/assets/UrgentCare.png" alt="Urgent Care" />
          <p class="service-title">Urgent Care</p>
          <p class="service-description">We offer 24/7 emergency services at select sites, equipped to handle acute medical situations promptly and efficiently.</p>
        </div>
        <div class="service-item">
          <img class="service-image" src="@/assets/SpecialistConsulting.png" alt="Specialist Consulting" />
          <p class="service-title">Specialist Consulting</p>
          <p class="service-description">Available at most of our sites, our specialist consulting services offer expert advice across a range of medical specialties.</p>
        </div>
        <div class="service-item">
          <img class="service-image" src="@/assets/PharmacyServices.png" alt="Pharmacy Services" />
          <p class="service-title">Pharmacy Services</p>
          <p class="service-description">Our pharmacies complement our medical services by providing easy access to prescriptions and general health products, both in-store and online.</p>
        </div>
      </div>
    </div>

    <div class="rectangular-card">
  <div class="card-content">
    <div class="left-content">
      <p class="left-text">
        At FRW Healthcare, we continually enhance patient care through innovative solutions. Our patient management system now uses cloud services and AI to improve service delivery and outcomes, ensuring high standards of care.
      </p>
    </div>
    <div class="circle-image">
      <img src="@/assets/r.png" alt="Technology Innovation Image" class="center-image" />
    </div>
    <div class="right-content">
      <p class="right-text">
        Looking ahead, we're developing a chatbot to simplify appointment booking. This technology will make scheduling, rescheduling, and cancellations more convenient, improving accessibility and patient satisfaction.
      </p>
    </div>
  </div>
  <h2 class="image-title">Innovation and Technology</h2>
</div>

 <!-- Leadership and Structure and Community Engagement Section -->
<div class="leadership-community-card custom-leadership-community">
  <div class="custom-leadership-community-content">
    <!-- Leadership and Structure Section -->
    <div class="custom-leadership-section">
      <img class="custom-leadership-image" src="@/assets/L.png" alt="Leadership Image" />
      <div class="custom-leadership-text">
        <h3 class="custom-leadership-title">Leadership and Structure</h3>
        <p class="custom-leadership-description">
          Our Riccarton super clinic not only serves as our flagship facility but also houses our headquarters. Under the leadership of our CEO and supported by an experienced executive team, we ensure that our operations across all sites are efficient and effective. Our board of directors, including founding members and independent directors, provides strategic direction and oversight, ensuring that our mission and values are at the forefront of all decisions.
        </p>
      </div>
    </div>

    <!-- Community Engagement Section -->
    <div class="custom-community-section">
      <div class="custom-community-text">
        <h3 class="custom-community-title">Community Engagement</h3>
        <p class="custom-community-description">
          FRW Healthcare is committed to contributing positively to the communities we serve. We actively participate in health fairs, educational workshops, and collaborate with local hospitals and emergency services to manage healthcare needs effectively. These initiatives help us stay connected with the community and respond to its needs.
        </p>
      </div>
      <img class="custom-community-image" src="@/assets/C.png" alt="Community Engagement Image" />
    </div>
  </div>
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
.about-us-section {
  position: relative;
  width: 100%;
  height: auto;
}

.about-us-image {
  width: 100%;
  height: auto;
  display: block;
}

.about-us-overlay {
  position: absolute;
  top: 50%;
  right: 200px;
  transform: translateY(-50%);
  color: #004d66;
  font-size: 48px;
  font-weight: bold;
}

.container_body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.container_header, .container_footer {
  width: 100%;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%; 
  margin: 50px auto; 
}

.welcome-text {
  font-weight: bold;
  font-size: 24px; 
  color: #004d66;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.4; 
}


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

.story-title, .mission-title, .core-services-title {
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

/* Core Services Section */
.core-services-section {
  width: 90%;
  margin-top: 50px;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.service-item {
  position: relative;
  text-align: center;
  cursor: pointer;
}

.service-item:hover .service-image {
  filter: blur(4px);
}

.service-item:hover .service-title {
  visibility: hidden;
  opacity: 0;
}

.service-item:hover .service-description {
  visibility: visible;
  opacity: 1;
}

.service-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.service-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7); 
}

.service-description {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 16px;
  font-weight: normal;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s ease-in-out;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7)
}

/* Responsive Styles */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

.rectangular-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 100px auto; 
  padding: 10px 20px;
  background: linear-gradient(145deg, #004d66, #accfd8);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 120px;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.left-content, .right-content {
  width: 40%;
}

.left-text, .right-text {
  font-size: 16px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

.circle-image {
  position: relative;
  border-radius: 50%;
  width: 220px;
  height: 220px;
  overflow: hidden;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.center-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-title {
  font-size: 24px;
  color: #003366;
  position: absolute;
  bottom: 10px;
  right: 20px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
  font-weight: bold;
}

@media (max-width: 768px) {
  .rectangular-card {
    flex-direction: column;
    padding: 20px 15px;
  }

  .left-content, .right-content {
    width: 100%;
    margin-bottom: 20px;
  }

  .right-text {
    text-align: left;
  }

  .circle-image {
    width: 180px;
    height: 180px;
  }

  .image-title {
    font-size: 20px;
    bottom: 5px;
    right: 10px;
  }
}


/* Leadership and Community Engagement  */
.custom-leadership-community {
  width: 90%;
  margin-top: 70px;
  padding: 50px;
  background: #eef3f8;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
}

.custom-leadership-community-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.custom-leadership-section, .custom-community-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.custom-leadership-image, .custom-community-image {
  width: 250px;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.4s ease-in-out, filter 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
}

.custom-leadership-image:hover, .custom-community-image:hover {
  transform: scale(1.1) rotate(3deg);
  filter: brightness(1.2) saturate(1.3);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.custom-leadership-text, .custom-community-text {
  width: 60%;
}

.custom-leadership-title, .custom-community-title {
  font-size: 24px;
  font-weight: 700;
  color: #003366;
  margin-bottom: 15px;
}

.custom-leadership-description, .custom-community-description {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  text-align: justify;
}

@media (max-width: 768px) {
  .custom-leadership-section, .custom-community-section {
    flex-direction: column;
    text-align: center;
  }

  .custom-leadership-image, .custom-community-image {
    width: 100%;
    margin-bottom: 20px;
  }

  .custom-leadership-text, .custom-community-text {
    width: 100%;
  }
}
</style>