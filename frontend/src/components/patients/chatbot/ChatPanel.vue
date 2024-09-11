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
      style="border-radius: 8px">
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
import { usePost } from "@/api/useApi";
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
      responses: [], // 用于存储每条 AI 回复
      textInput: {
        value: "",
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
            if (this.sessionId)
              headers = { "x-chatbot-session": this.sessionId, ...headers };
            if (token) headers = { "x-access-token": token, ...headers };
            const prompt = body.messages[0]?.text || "";
            const { data, postData } = usePost("/public/chatbot/");
            await postData({ prompt }, headers);
            this.sessionId = data.value.sessionId;

            // 发送回复并添加反馈按钮
            const responseWithFeedback = this.generateResponseWithFeedback(data.value.response);
            signals.onResponse({
              html: responseWithFeedback,
            });

          } catch (error) {
            console.error("Error during API request:", error);
            signals.onResponse({
              error: "Error communicating with the server",
            });
          }
        },
      }
    }
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

    // 生成带反馈按钮的响应 HTML
    generateResponseWithFeedback(responseText) {
      return `
        <div class="response-container">
          <p>${responseText}</p>
          <div class="feedback-buttons">
            <button class="feedback-icon" @click="playText('${responseText}')">🔊</button>
            <button class="feedback-icon" @click="copyText('${responseText}')">📋</button>
            <button class="feedback-icon" @click="handlePositiveFeedback()">👍</button>
            <button class="feedback-icon" @click="handleNegativeFeedback()">👎</button>
          </div>
        </div>`;
    },

    // 播放文字
    playText(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = this.textToSpeechOptions.volume;
      window.speechSynthesis.speak(utterance);
    },

    // 复制文字
    copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Text copied to clipboard");
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    },

    // 处理正面反馈
    handlePositiveFeedback() {
      console.log("User liked the response.");
    },

    // 处理负面反馈
    handleNegativeFeedback() {
      console.log("User disliked the response.");
    },
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

.response-container {
  margin-top: 10px;
}

.feedback-buttons {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.feedback-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.feedback-icon:hover {
  color: #007bff;
}
</style>
