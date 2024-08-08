<template>
  <div>
    <p class="slogan">Save Time, Save Life</p>
    <div class="chat-window">
      <div class="chat-header">
        <h3>Customer Support</h3>
      </div>
      <div class="chat-body">
        <div v-for="(message, index) in messages" :key="index" class="chat-message">
          <span :class="message.sender">
            <span v-if="message.isLink">
              If you want original online booking, please click here:
              <a href="#" @click.prevent="onlineBooking">online booking</a>
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
    <FindMedicalCenterModal :show="showModal" @close="showModal = false" @ClinicSelected="handleClinicSelected" />
  </div>
</template>

<script>
import FindMedicalCenterModal from "@/components/FindMedicalCenterModal.vue";

export default {
  name: "ChatbotComponent",
  components: {
    FindMedicalCenterModal,
  },
  data() {
    return {
      messages: [
        {
          text: "Hello! How can I help you today?",
          sender: "support",
          isLink: false,
        },
        {
          text: "",
          sender: "support",
          isLink: true,
        },
      ],
      newMessage: "",
      showModal: false,
      selectedClinic: null,
    };
  },
  methods: {
    onlineBooking() {
      this.showModal = true;
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ text: this.newMessage, sender: "user" });
        this.newMessage = "";
        this.autoReply();
      }
    },
    autoReply() {
      setTimeout(() => {
        this.messages.push({
          text: "Thank you for reaching out!",
          sender: "support",
        });
      }, 1000);
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
.slogan {
  font-size: 48px;
  padding: 70px;
}

.chat-window {
  width: 480px;
  height: 520px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 70px;
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
