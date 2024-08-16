<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>
    <div class="container_banner">
      <BannerComponent class="banner"></BannerComponent>
    </div>

    <!-- Chat Container -->
    <div class="chat-container">
      <!-- Chat Icon -->
      <div v-show="!chatOpen" @click="toggleChat" class="chat-icon">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>

      <!-- Chat Window -->
      <transition name="fade">
        <div class="chat-window" v-show="chatOpen">
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
                  <div class="custom-button-text">
                    "I want to book a doctor"
                  </div>
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

    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from "@/components/patients/HeaderComponent.vue";
import FooterComponent from "@/components/patients/FooterComponent.vue";
import BannerComponent from "@/components/patients/BannerComponent.vue";
import "deep-chat";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    BannerComponent,
  },
  data() {
    return {
      chatOpen: false, // Controls chat window visibility
      sessionId: null, // Track session ID for the chat
      chatConnect: {
        handler: async (body, signals) => {
          try {
            const prompt = body.messages[0]?.text || "";
            const sessionId = this.sessionId || null;

            const response = await fetch("https://api.gpbooking.icu/chatbot/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-chatbot-session": sessionId,
              },
              body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (response.ok) {
              this.sessionId = data.sessionId;
              signals.onResponse({ text: data.response });
            } else {
              throw new Error(data.error || "Unknown error");
            }
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
  },
  methods: {
    toggleChat() {
      this.chatOpen = !this.chatOpen;
    },
  },
};
</script>

<style scoped>
.container_body {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container_header,
.container_footer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.container_banner {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.container_banner .banner {
  width: 100%;
  background-color: rgb(231, 228, 228);
}

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
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.dot {
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

/* Chat Window */
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
  background-color: #007bff;
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
