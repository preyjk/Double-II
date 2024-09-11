<template>
  <div class="container_body">
    <el-container>
      <el-aside class="container_right">
        <chat-sidebar @changeDarkMode="changeDarkMode()"></chat-sidebar>
      </el-aside>
      <el-main class="container_main">
        <chat-panel :isDarkMode="isDarkMode"></chat-panel>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ChatPanel from "@/components/patients/chatbot/ChatPanel.vue";
import ChatSidebar from "@/components/patients/chatbot/ChatSidebar.vue";

export default {
  components: {
    ChatPanel,
    ChatSidebar,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    changeDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  },
};
</script>

<style scoped>
.container_body {
  width: 100%;
}

.container_main {
  padding: 0;
}
</style>