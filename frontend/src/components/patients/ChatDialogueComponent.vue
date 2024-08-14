<template>
  <div class="chat-window">
    <div class="chat-header">
      <h3>Customer Support</h3>
    </div>
    <div class="chat-body">
      <div v-for="(message, index) in messages" :key="index" class="chat-message">
        <span :class="message.sender">
          <span v-if="message.isLink">
          </span>
          <span v-else v-html="message.text"></span>
        </span>
      </div>
    </div>
    <div class="chat-footer">
      <input type="text" v-model="newMessage" placeholder="Type your message..." @keydown.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatDialogueComponent",
  components: {
  },
  data() {
    return {
      messages: [
        {
          text: "Hello! How can I help you today?",
          sender: "support",
          isLink: false,
        },
      ],
      newMessage: "",
      showModal: false,
      selectedClinic: null,
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        // Add user's message to chat
        this.messages.push({ text: this.newMessage, sender: "user" });
        const userMessage = this.newMessage;
        this.newMessage = "";

        try {
          // Make API request with user's message
          const response = await axios.post(
            "https://api.gpbooking.icu/chatbot/",
            {
              prompt: userMessage,
              sessionId: this.sessionId || null,
            }
          );

          // Process the API response
          const responseData = response.data;
          this.sessionId = responseData.sessionId; // Store the session ID
          this.messages.push({
            text: responseData.response,
            sender: "support",
          });
        } catch (error) {
          console.error("Error during API request:", error);
          this.messages.push({
            text: "Sorry, there was an error processing your request. Please try again later.",
            sender: "support",
          });
        }
      }
    },
    onlineBooking() {
      this.showModal = true;
    },
    handleClinicSelected(clinic) {
      if (clinic) {
        this.selectedClinic = clinic;
        this.showModal = false;
        this.$router.push({
          name: "OnlineBooking",
          params: { clinicId: clinic.id, clinicName: clinic.name },
        });
      } else {
        console.warn("No clinic selected");
      }
    },
  },
};
</script>

<style scoped>
.chat-window {
  width: 80%;
  height: 520px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background-color: #3498db;
  color: white;
  padding: 10px;
  text-align: center;
}

.chat-body {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.chat-footer {
  display: flex;
  padding: 10px;
}

.chat-footer input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.chat-footer button {
  padding: 5px 10px;
  margin-left: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-footer button:hover {
  background-color: #2980b9;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-message .support {
  display: block;
  background-color: #e1f5fe;
  padding: 8px;
  border-radius: 5px;
  max-width: 70%;
  word-wrap: break-word;
  text-align: left;
}

.chat-message .user {
  display: block;
  background-color: #dcedc8;
  padding: 8px;
  border-radius: 5px;
  max-width: 70%;
  word-wrap: break-word;
  text-align: right;
  margin-left: auto;
}
</style>
