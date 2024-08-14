<template>
  <div class="container_body">
    <HeaderComponent class="container_header"></HeaderComponent>

    <div class="main_content">
      <div class="conversation-list">
        <h3>Conversations</h3>
        <ul>
          <li
            v-for="(conversation, index) in conversations"
            :key="index"
            @click="selectConversation(index)"
            :class="{ active: index === selectedConversation }"
          >
            Conversation {{ index + 1 }}
          </li>
        </ul>
        <button @click="startNewConversation">New Conversation</button>
      </div>

      <ChatDialogueComponent
        :messages="currentMessages"
      ></ChatDialogueComponent>
    </div>

    <FooterComponent class="container_footer"></FooterComponent>
  </div>
</template>
<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";
import ChatDialogueComponent from "@/components/patients/ChatDialogueComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    ChatDialogueComponent,
  },
  data() {
    return {
      conversations: [
        {
          messages: [
            { text: "Hello! How can I help you today?", sender: "support" },
          ],
        },
      ],
      selectedConversation: 0,
    };
  },
  computed: {
    currentMessages() {
      return this.conversations[this.selectedConversation].messages;
    },
  },
  methods: {
    startNewConversation() {
      this.conversations.push({
        messages: [{ text: "New conversation started.", sender: "support" }],
      });
      this.selectedConversation = this.conversations.length - 1;
    },
    selectConversation(index) {
      this.selectedConversation = index;
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
}

.main_content {
  display: flex;
  width: 100%;
  justify-content: center;
}

.conversation-list {
  width: 20%;
  background-color: #f7f7f7;
  border-right: 1px solid #ddd;
  padding: 10px;
}

.conversation-list h3 {
  margin-top: 0;
}

.conversation-list ul {
  list-style-type: none;
  padding: 0;
}

.conversation-list li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.conversation-list li.active {
  background-color: #3498db;
  color: white;
}

.conversation-list button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

.conversation-list button:hover {
  background-color: #2980b9;
}

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
</style>
