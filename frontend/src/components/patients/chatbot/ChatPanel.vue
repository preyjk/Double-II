<template>
  <div class="container_body">
    <deep-chat
      :textInput="textInput"
      :inputAreaStyle="inputAreaStyle"
      :submitButtonStyles="submitButtonStyles"
      style="
        width: 100%;
        height: 100%;
        display: block;
        background-color: #99bbc3;
        border: none;
      "
      id="chat-element"
      :connect="chatConnect"
    ></deep-chat>
    <div class="animation-container">
      <LottieAnimation
        :animationData="animationData"
        :loop="true"
        :autoplay="true"
        v-show="isRobotAnimationShow"
        class="robot-animation"
      />
    </div>
  </div>
</template>

<script>
import { usePost } from "@/utils/useApi";
import "deep-chat";
import LottieAnimation from "@/components/patients/animation/LottieAnimation.vue";
import animationData from "@/assets/animation-robot.json";

export default {
  name: "ChatPanel",
  components: {
    LottieAnimation,
  },
  data() {
    return {
      sessionId: null,
      animationData,
      isRobotAnimationShow: true,
      textInput: JSON.parse(`{
        "styles": {
          "text": {"color": "black"},
          "container": {"width":"65%","height": "46px","line-height":"30px", "maxHeight": "60px", "backgroundColor": "#f5f9ff", "borderRadius": "20px", "padding-left": "20px"},
          "focus": {"border": "2px solid #a2a2ff"}
        },
        "placeholder": {"text": "Ask anything.", "style": {"display": "flex", "alignItems": "center", "color": "", "padding-left": "20px"}},
        "characterLimit": 100
      }`),
      submitButtonStyles: JSON.parse(`{
       "submit": {
         "container": {
           "default": {
              "backgroundColor": "",
              "display": "flex",
              "alignItems": "center",
              "justifyContent": "center",
              "width": "46px",
              "height": "46px",
              "borderRadius": "50%"
            },
        "click": {
        "backgroundColor": ""
        }
      },
      "svg": {
        "styles": {
          "default": {
            "filter":
              "brightness(0) saturate(100%) invert(58%) sepia(53%) saturate(6828%) hue-rotate(214deg) brightness(100%) contrast(100%)"
            }
          }
        }
      }
    }`),
      chatConnect: {
        handler: async (body, signals) => {
          try {
            let headers = {};
            const token = localStorage.getItem("authToken");
            this.isRobotAnimationShow = false;
            if (this.sessionId)
              headers = { "x-chatbot-session": this.sessionId, ...headers };
            if (token) headers = { "x-access-token": token, ...headers };
            const prompt = body.messages[0]?.text || "";

            const { data, postData } = usePost(
              "https://api.gpbooking.icu/chatbot/"
            );
            await postData({ prompt }, headers);
            console.log(data);
            this.sessionId = data.value.sessionId;
            console.log("chat panel session id:", data.value.sessionId);
            signals.onResponse({ text: data.value.response });
          } catch (error) {
            console.error("Error during API request:", error);
            signals.onResponse({
              error: "Error communicating with the server",
            });
          }
        },
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.container_body {
  position: relative;
  width: 100%;
  height: 100vh;
}
.animation-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
}
.robot-animation {
  transform: scale(0.3);
}
</style>
