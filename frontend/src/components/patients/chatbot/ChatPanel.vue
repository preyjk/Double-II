<template>
  <div class="container_body" :style="isDarkMode ? darkModeStyles : lightModeStyles">
    <deep-chat :textInput="textInput" :submitButtonStyles="submitButtonStyles" :style="chatStyles"
      :textToSpeech="textToSpeechOptions" :speechToText="speechToTextOptions" demo="true" id="chat-element"
      :connect="chatConnect" style="border-radius: 8px" :responseInterceptor="bindButtons"
      :messageStyles="messageStyles" avatars='{"ai": {"src": "@/assets/avar.png"}}'>
    </deep-chat>

    <div class="animation-container">
      <LottieAnimation :animationData="animationData" :loop="true" :autoplay="true" v-show="isRobotAnimationShow"
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
      responses: [],
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
          focus: { border: "2px solid #004d66" },
        },
        placeholder: {
          text: "Ask anything.",
          style: {
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
          },
        },
        characterLimit: 1000,
      },
      messageStyles: {
        "default": {
          "user": { "bubble": { "backgroundColor": "#004d66","fontsize": "50px" } },
          "ai" : { "bubble": { "backgroundColor": " #ffffff","fontsize": "50px" } },
        }
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

      // speech to text setting
      speechToTextOptions: {
        webSpeech: true,
        button: {
          position: "outside-right",
          default: {
            container: {
              default: {
                cursor: "pointer",
                transform: "translateY(-5px)",
                width: "36px",
                height: "36px",
              },
            },
            svg: {
              styles: {
                default: {
                  filter:
                    "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(100%) hue-rotate(90deg) brightness(100%) contrast(100%)",
                  width: "24px",
                  height: "24px",
                },
              },
            },
          },
          active: {
            container: {
              default: {
                cursor: "pointer",
                transform: "translateY(-5px)",
                width: "36px",
                height: "36px",
              },
            },
            svg: {
              styles: {
                default: {
                  filter:
                    "brightness(0) saturate(100%) invert(10%) sepia(97%) saturate(7495%) hue-rotate(0deg) brightness(101%) contrast(107%)",
                  width: "24px",
                  height: "24px",
                },
              },
            },
          },
          commandMode: {
            container: {
              default: {
                cursor: "pointer",
                transform: "translateY(-5px)",
                width: "36px",
                height: "36px",
              },
            },
            svg: {
              styles: {
                default: {
                  filter:
                    "brightness(0) saturate(100%) invert(70%) sepia(70%) saturate(4438%) hue-rotate(170deg) brightness(92%) contrast(98%)",
                  width: "24px",
                  height: "24px",
                },
              },
            },
          },
        },

        translations: {
          hello: "hello",
          Hello: "Hello",
        },
        commands: {
          resume: "resume",
          settings: {
            commandMode: "hello",
          },
        },
        onTranscriptionComplete: this.handleTranscriptionComplete,
      },

      // text to speech setting
      textToSpeechOptions: {
        volume: 0.9,
        enabled: true,
      },

      // chat setting
      chatConnect: {
        handler: async (body, signals) => {
          try {
            this.isRobotAnimationShow = false;
            let headers = {};
            const token = localStorage.getItem("token");
            if (this.sessionId)
              headers = { "x-chatbot-session": this.sessionId, ...headers };
            if (token) headers = { "x-access-token": JSON.parse(token), ...headers };
            const prompt = body.messages[0]?.text || "";
            const { data, postData } = usePost("/public/chatbot/");
            await postData({ prompt }, headers);
            this.sessionId = data.value.sessionId;

            const responseWithFeedback = this.generateResponseWithFeedback(
              data.value.response
            );

            signals.onResponse({
              text: data.value.response,
              html: responseWithFeedback,
            });
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

    generateResponseWithFeedback(responseText) {
      this.htmlResponse = responseText;
      return `
      <div class="deep-chat-temporary-message">
        <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px;  color: black; border: 2px solid #004d66;">Which clinic is closer to me?</button>
        <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px;  color: black; border: 2px solid #004d66;">Can I check my booking?</button>
        <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px;  color: black; border: 2px solid #004d66;">Can I cancel my appointment?</button>
        <button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px;  color: black; border: 2px solid #004d66;">Can I reschedule my appointment?</button>
      </div>`
    




      // return `
      //   <div class="response-container">
      //     <div class="feedback-buttons">
      //       <button id="playText" class="feedback-icon" style="border:none; cursor:pointer">🔊</button>
      //       <button id="copyText" class="feedback-icon" style="border:none; cursor:pointer">📋</button>
      //       <button id="positiveBtn" class="feedback-icon" style="border:none; cursor:pointer">👍</button>
      //       <button id="negativeBtn" class="feedback-icon" style="border:none; cursor:pointer">👎</button>
      //     </div>
      //   </div>`;
    },

    playText(text) {
      console.log("xxx");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = this.textToSpeechOptions.volume;
      window.speechSynthesis.speak(utterance);
    },

    copyText(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Error copying text: ", err);
        });
    },

    handlePositiveFeedback() {
      console.log("User liked the response.");
    },

    handleNegativeFeedback() {
      console.log("User disliked the response.");
    },

    //   bindButtons() {
    //     setTimeout(() => {
    //       console.log("Xxxxxxx");
    //       const playButton = document.getElementById('playText');
    //       const copyButton = document.getElementById('copyText');
    //       const positiveButton = document.getElementById('positiveBtn');
    //       const negativeButton = document.getElementById('negativeBtn');
    //       console.log(playButton);

    //       if (playButton) {
    //         playButton.addEventListener('click', () => this.playText(this.htmlResponse));
    //       }

    //       if (copyButton) {
    //         copyButton.addEventListener('click', () => this.copyText(this.htmlResponse));
    //       }

    //       if (positiveButton) {
    //         positiveButton.addEventListener('click', this.handlePositiveFeedback);
    //       }

    //       if (negativeButton) {
    //         negativeButton.addEventListener('click', this.handleNegativeFeedback);
    //       }
    //     }, 3000);
    //   },

    bindButtons() { },
  },
  

  watch: {},

  computed: {
    chatStyles() {
      return {
        width: "100%",
        height: "100%",
        display: "block",
        backgroundColor: this.isDarkMode ? "#333" : "#99bbc3",
        border: "none",
      };
    },
    darkModeStyles() {
      return { backgroundColor: "#2c2c2c" };
    },

    lightModeStyles() {
      return { backgroundColor: "#ffffff" };
    },
  },

  mounted() { },
};
</script>

<style scoped>
.container_body {
  position: relative;
  display: flex;
  height: 100vh;
  flex-direction: column;
}

@media (min-width: 768px) {
  .container_body {
    flex-direction: row;
  }
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

@media (max-width: 768px) {
  .animation-container {
    top: 40%;
  }

  .robot-animation {
    transform: scale(0.8);
  }
}
</style>
