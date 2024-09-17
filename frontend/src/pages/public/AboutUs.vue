<template>
  <div class="container mx-auto p-4">
    <div class="block w-full flex flex-col items-center border-b-2 border-gray-300 py-8 md:flex-row">
      <img :src="buildingImage" alt="Building Image" class="w-full h-auto md:w-1/2 md:px-4" />
      <div class="text-lg text-center pt-4 md:w-1/2 md:px-4">
        <div class="flex flex-col items-center h-full">
          <h2 class="text-3xl font-extrabold mb-4 text-blue-600">Our Story</h2>
          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            Founded in the heart of Christchurch in 1992, FRW Healthcare Limited began as a modest medical
            practitioner's office established by Drs. Frond, Reed, and Willow. From the outset, our founders envisioned
            a healthcare system where comprehensive, affordable medical services were accessible to all.
          </p>
          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            Today, FRW Healthcare has grown into a premier healthcare provider with 15 locations across Auckland,
            Wellington, and Christchurch, each dedicated to maintaining the health and well-being of our communities.
          </p>
        </div>
      </div>
    </div>
    <div class="block w-full flex flex-col items-center border-b-2 border-gray-300 py-8 md:flex-row">
      <img :src="missionImage" alt="Mission Image" class="w-full h-auto order-1 md:w-1/2 md:order-2 md:px-4" />
      <div class="text-lg text-center pt-4 order-2 md:w-1/2 md:order-1 md:px-4">
        <div class="flex flex-col items-center">
          <h2 class="text-3xl font-extrabold mb-4 text-blue-600">Our Mission</h2>
          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            <span class="italic text-blue-500">"Excellent Service, Excellent Health"</span> encapsulates our mission at
            FRW Healthcare. We are committed to enabling medical services that align with patient understanding,
            wellbeing, and health. Our approach is patient-centric, focusing on providing care that not only treats but
            also educates and empowers our patients.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-center">
      <div
        class="bg-gradient-to-br from-[#004d66] to-[#accfd8] shadow-md rounded-lg overflow-hidden p-4 flex flex-col md:flex-row items-center">
        <div class="md:w-2/5 p-4 order-2 md:order-1">
          <p class="text-lg text-center md:text-left">
            At FRW Healthcare, we continually enhance patient care through innovative solutions. Our patient management
            system now uses cloud services and AI to improve service delivery and outcomes, ensuring high standards of
            care.
          </p>
        </div>
        <div class="md:w-1/5 p-4 order-1 md:order-2 flex justify-center">
          <div class="bg-white rounded-full p-4">
            <img :src="RobotImage" alt="Robot" class="w-full h-auto rounded-full" />
          </div>
        </div>
        <div class="md:w-2/5 p-4 order-3 md:order-3">
          <p class="text-lg text-center md:text-right">
            Looking ahead, we're developing a chatbot to simplify appointment booking. This technology will make
            scheduling, rescheduling, and cancellations more convenient, improving accessibility and patient
            satisfaction.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-col items-center rounded-lg bg-[#eef3f8] space-y-8 p-8">
      <div class="flex flex-col md:flex-row items-center bg-white rounded-lg">
        <img :src="LImage" alt="Leadership and Structure Image" class="w-full h-auto rounded-lg md:w-1/5" />
        <div class="md:w-1/5"></div>
        <div class="flex flex-col h-full md:w-3/5 p-4">
          <h2 class="text-3xl font-extrabold mb-4 text-blue-600">Leadership and Structure</h2>
          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            Our Riccarton super clinic not only serves as our flagship facility but also houses our headquarters. Under
            the leadership of our CEO and supported by an experienced executive team, we ensure that our operations
            across all sites are efficient and effective. Our board of directors, including founding members and
            independent directors, provides strategic direction and oversight, ensuring that our mission and values are
            at the forefront of all decisions.
          </p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center bg-white rounded-lg">
        <div class="flex flex-col h-full md:w-3/5 p-4 order-2 md:order-1">
          <h2 class="text-3xl font-extrabold mb-4 text-blue-600">Community Engagement</h2>
          <p class="text-lg leading-relaxed text-gray-700 mb-4">
            FRW Healthcare is committed to contributing positively to the communities we serve. We actively participate
            in health fairs, educational workshops, and collaborate with local hospitals and emergency services to
            manage healthcare needs effectively. These initiatives help us stay connected with the community and respond
            to its needs.
          </p>
        </div>
        <div class="md:w-1/5" />
        <img :src="CImage" alt="Community Engagement Image"
          class="w-full h-auto rounded-lg md:w-1/5 order-1 md:order-2" />
      </div>
    </div>
  </div>
</template>

<script>
import buildingImage from '@/assets/AboutUs/building.png';
import missionImage from '@/assets/AboutUs/mission.png';
import GeneralPracticeImage from '@/assets/AboutUs/GeneralPractice.png';
import SpecialistConsultingImage from '@/assets/AboutUs/SpecialistConsulting.png';
import UrgentCareImage from '@/assets/AboutUs/UrgentCare.png';
import PharmacyServicesImage from '@/assets/AboutUs/PharmacyServices.png';
import RobotImage from '@/assets/AboutUs/robot.png';
import LImage from '@/assets/AboutUs/L.png';
import CImage from '@/assets/AboutUs/C.png';

export default {
  data() {
    return {
      buildingImage,
      missionImage,
      GeneralPracticeImage,
      SpecialistConsultingImage,
      UrgentCareImage,
      PharmacyServicesImage,
      RobotImage,
      LImage,
      CImage,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>