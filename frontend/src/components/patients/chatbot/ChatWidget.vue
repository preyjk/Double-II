<template>
  <div class="chat-container">
    <!-- Chat Icon -->
    <div v-show="!chatOpen" @click="toggleChat" class="chat-icon">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <!-- Chat Window -->
    <transition name="fade">
      <div class="chat-window" v-show="chatOpen" ref="chatWindow">
        <div class="chat-header">
          <span>Customer Support</span>
          <button class="close-btn" @click="toggleChat">×</button>
        </div>
        <div class="chat-body">
          <!-- Deep Chat Component with Intro Panel -->
          <deep-chat
            style="border: none; width: 330px; height: 420px"
            id="chat-element"
            :connect="chatConnect"
          >
            <div style="display: none">
              <div class="custom-button">
                <div class="custom-button-text">"I want to book a doctor"</div>
              </div>
              <div class="custom-button" style="margin-top: 15px">
                <div class="custom-button-text">"Give me clinic list"</div>
              </div>
              <div class="custom-button" style="margin-top: 15px">
                <div class="custom-button-text">"I'm sick"</div>
              </div>
            </div>
          </deep-chat>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { usePost } from "@/utils/useApi";
import "deep-chat";

export default {
  data() {
    return {
      chatOpen: false,
      sessionId: null,
      chatConnect: {
        handler: async (body, signals) => {
          try {
            let headers = {};
            const token = localStorage.getItem("authToken");
            if (this.sessionId)
              headers = { "x-chatbot-session": this.sessionId, ...headers };
            if (token) headers = { "x-access-token": token, ...headers };
            const prompt = body.messages[0]?.text || "";
            const { data, postData } = usePost(
              "https://api.gpbooking.icu/chatbot/"
            );
            await postData({ prompt }, headers);
            console.log("chat widget session id:", data.value.sessionId);
            this.sessionId = data.value.sessionId;
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
  mounted() {
    const chatElementRef = document.getElementById("chat-element");

    chatElementRef.htmlClassUtilities = {
      "custom-button": {
        events: {
          click: (event) => {
            const text = event.target.children[0].innerText;
            chatElementRef.submitUserMessage(
              text.substring(1, text.length - 1)
            );
          },
        },
        styles: {
          default: {
            backgroundColor: "#f2f2f2",
            borderRadius: "10px",
            padding: "10px",
            cursor: "pointer",
            textAlign: "center",
          },
          hover: {
            backgroundColor: "#ebebeb",
          },
          click: {
            backgroundColor: "#e4e4e4",
          },
        },
      },
      "custom-button-text": {
        styles: {
          default: {
            pointerEvents: "none",
          },
        },
      },
    };

    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    toggleChat() {
      this.chatOpen = !this.chatOpen;
    },
    handleOutsideClick(event) {
      if (
        this.chatOpen &&
        !this.$refs.chatWindow.contains(event.target) &&
        !event.target.closest(".chat-icon")
      ) {
        this.chatOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chat-icon {
  width: 60px;
  height: 60px;
  background-color: #004d66;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chat-icon .dot {
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.chat-window {
  width: 350px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  bottom: 80px;
  right: 20px;
}

.chat-header {
  background-color: #4887cb;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chat-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

/* Transition Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
