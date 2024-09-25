<template>
  <div className="flex flex-col items-center justify-center md:flex-row items-stretch">
    <div className="flex-col md:w-2/3">
      <video className="w-full h-auto" autoPlay loop muted>
        <source :src="HomeVideo" type="video/mp4" />
      </video>
    </div>
    <div
      class="md:w-1/3 flex flex-col justify-center text-center items-center p-5 bg-gradient-to-br from-[#004d66] to-[#accfd8]">
      <h1 class="hero-title">Book Your Appointment with Ease</h1>
      <div class="play-button-container" @click="goChatbotPage">
        <div class="play-button">
          <img :src="clickImageSrc" alt="Click Icon" class="click-icon" />
        </div>
      </div>
      <p class="subtitle">Try Our Chatbot!</p>
    </div>
    <!-- <ChatWidget /> -->
  </div>
</template>

<script setup>
import HomeVideo from "@/assets/Home/1.mp4";
import ChatWidget from "@/components/patients/chatbot/ChatWidget.vue";
import clickImageSrc from "@/assets/click.png";
import { useRouter } from "vue-router";
import { onMounted } from 'vue';

const router = useRouter();
const goChatbotPage = () => {
  router.push({ name: "Chatbot" });
};

onMounted(() => {
  // Load Amazon Connect script dynamically
  (function (w, d, x, id) {
    let s = d.createElement("script");
    s.src =
      'https://dtn7rvxwwlhud.cloudfront.net/amazon-connect-chat-interface-client.js';
    s.async = 1;
    s.id = id;
    d.getElementsByTagName("head")[0].appendChild(s);
    w[x] =
      w[x] ||
      function () {
        (w[x].ac = w[x].ac || []).push(arguments);
      };
  })(window, document, "amazon_connect", '11a33eb3-0e02-4e85-a725-cf1abeaef613');

  // Configure the Amazon Connect chat interface
  amazon_connect("styles", {
    iconType: "CHAT_VOICE",
    openChat: { color: "#ffffff", backgroundColor: "#123456" },
    closeChat: { color: "#ffffff", backgroundColor: "#123456" },
  });

  amazon_connect("snippetId", 'QVFJREFIaWFZYXRVSlpIekdkUUg5YXhZenVQMktKRXNIWTVFQWpBYVErTEdzRnpvZHdIdVFldmhiLy9rS3hsNWhQYVRFSm4wQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNbGhKQ2NXTHlZY1IyM0thbUFnRVFnQ3ZOOWZFemZDdWhQNVFtbkRiWVpjSENMYWQ3aUR0elZHR25TM1drNElkU0hXM3AzYTZHSExlakR2V2M6Ok43YWM0ZVlzUnJwOWRzOWZCWDE4clpseFdkSmQyNmpBUFVuanBVU2NiNkp1VVdJY2o1VmhaZzZRUUlielZCZ1F3SmlsNGxCK0VKNytic215V3VRb2dHN3Q5aGJmUWFzc3hkWll3VFZuZGRlSmNhVjc1dkMzOEtid3pXNlNNaFZEbGs3ODZOZEF2YnhrWndmYW5yMndwQ0pJc1loVCs4dz0=');

  amazon_connect("supportedMessagingContentTypes", [
    "text/plain",
    "text/markdown",
    "application/vnd.amazonaws.connect.message.interactive",
    "application/vnd.amazonaws.connect.message.interactive.response",
  ]);
});

</script>

<style scoped>
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
</style>