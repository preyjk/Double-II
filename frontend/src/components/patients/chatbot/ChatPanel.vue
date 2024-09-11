<template>
  <div class="container_body" :style="isDarkMode ? darkModeStyles : lightModeStyles">
    <deep-chat 
      :textInput="textInput" 
      :inputAreaStyle="inputAreaStyle" 
      :submitButtonStyles="submitButtonStyles"
      :style="chatStyles" 
      :textToSpeech="textToSpeechOptions" 
      :speechToText="speechToTextOptions"
      demo="true"
      id="chat-element" 
      :connect="chatConnect" 
      style="border-radius: 8px"
      audio='{"button": {"position": "dropup-menu"}}' 
      camera='{"button": {"position": "dropup-menu"}}'
      mixedFiles='{"button": {"position": "inside-left"}}'
      microphone='{"button": {"position": "outside-right"}}'>
    </deep-chat>

    <div class="animation-container">
      <LottieAnimation 
        :animationData="animationData" 
        :loop="true" 
        :autoplay="true" 
        v-show="isRobotAnimationShow" 
        class="robot-animation" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LottieAnimation from "@/components/patients/animation/LottieAnimation.vue";
import animationData from "@/assets/animation-robot.json";

export default {
  name: "ChatPanel",
  components: {
    LottieAnimation,
  },
  props: {
    isDarkMode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sessionId: null,
      animationData,
      isRobotAnimationShow: true,
      textInput: {
        value: "", // Added this to store the input text
        styles: {
          text: { color: "black" },
          container: {
            width: "65%",
            height: "46px",
            lineHeight: "30px",
            maxHeight: "60px",
            backgroundColor: "#f5f9ff",
            borderRadius: "20px",
            paddingLeft: "20px",
          },
          focus: { border: "2px solid #a2a2ff" },
        },
        placeholder: {
          text: "Ask anything.",
          style: {
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
          },
        },
        characterLimit: 100,
      },
      submitButtonStyles: {
        submit: {
          container: {
            default: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "46px",
              height: "46px",
              borderRadius: "50%",
            },
          },
          svg: {
            styles: {
              default: {
                filter:
                  "brightness(0) saturate(100%) invert(58%) sepia(53%) saturate(6828%) hue-rotate(214deg) brightness(100%) contrast(100%)",
              },
            },
          },
        },
      },
      speechToTextOptions: {
        webSpeech: true, 
        button: {
          position: "outside-right",
        },
        translations: {
          hello: "goodbye",
          Hello: "Goodbye",
        },
        commands: {
          resume: "resume",
          settings: {
            commandMode: "hello",
          },
        },
        onTranscriptionComplete: this.handleTranscriptionComplete,
      },
      textToSpeechOptions: {
        volume: 0.9,
        enabled: false,
      },
      chatConnect: {
        handler: async (body, signals) => {
          try {
            let headers = {};
            const token = localStorage.getItem("authToken");
            this.isRobotAnimationShow = false;

            if (!Array.isArray(body.messages) || !body.messages.length || !body.messages[0]?.text) {
              throw new Error("Invalid message input. No text found.");
            }

            const prompt = body.messages[0].text;

            if (this.sessionId) {
              headers["x-chatbot-session"] = this.sessionId;
            }
            if (token) {
              headers["x-access-token"] = token;
            }

            const response = await axios.post(
              process.env.VUE_APP_CHATBOT_API || "https://api.gpbooking.icu/public/chatbot/",
              { prompt },
              { headers }
            );

            this.sessionId = response.data.value.sessionId;
            if (this.speechToTextOptions.webSpeech) {
              this.textToSpeechOptions.enabled = true;
            } else {
              this.textToSpeechOptions.enabled = false;
            }

            signals.onResponse({
              text: response.data.value.response,
            });
            
            this.addFeedbackToResponse();

          } catch (error) {
            console.error("Error response from server:", error.response || error.message);
            signals.onResponse({
              error: "Error communicating with the server. Please try again later.",
            });
          }
        },
      },
    };
  },
  methods: {
    handleTranscriptionComplete(transcribedText) {
      console.log("Transcribed text:", transcribedText);
      this.textInput.value = transcribedText;

      this.chatConnect.handler(
        { messages: [{ text: transcribedText }] },
        {
          onResponse: (response) => {
            console.log("Chat response:", response.text);
          },
        }
      );
    },
    addFeedbackToResponse() {
      const feedbackHtml = `<div class="feedback">
        <div class="feedback-text">How do you rate the response?</div>
        <img class="feedback-icon feedback-icon-positive" src="path-to-svg.svg" @click="handlePositiveFeedback" />
        <img class="feedback-icon feedback-icon-negative" src="path-to-svg.svg" @click="handleNegativeFeedback" />
      </div>`;
      
      document.querySelector('#chat-element').insertAdjacentHTML('beforeend', feedbackHtml);
    },
    handlePositiveFeedback() {
      console.log("positive response");
    },
    handleNegativeFeedback() {
      console.log("negative response");
    }
  },
  computed: {
    chatStyles() {
      return {
        width: "100%",
        height: "100%",
        display: "block",
        backgroundColor: this.isDarkMode ? "#333" : "#99bbc3",
        border: "none",
        borderRadius: "8px",
      };
    },
    darkModeStyles() {
      return { backgroundColor: "#2c2c2c" };
    },
    lightModeStyles() {
      return { backgroundColor: "#ffffff" };
    },
  },
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

.feedback {
  display: flex;
  margin-top: 10px;
}

.feedback-text {
  width: calc(100% - 42px);
  padding-top: 2px;
}

.feedback-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.feedback-icon-positive {
  filter: brightness(0) saturate(100%) invert(56%) sepia(68%) saturate(207%) hue-rotate(93deg) brightness(88%) contrast(89%);
}

.feedback-icon-negative {
  filter: brightness(0) saturate(100%) invert(36%) sepia(99%) saturate(2487%) hue-rotate(335deg) brightness(87%) contrast(87%);
  transform: rotate(180deg);
  margin-left: 3px;
}

.feedback-icon:hover {
  background-color: #d1d1d1;
}
</style>
