<template>
  <div class="container_body">
    <el-container>
      <el-aside
        class="container_right"
        :class="{ collapsed: isSidebarCollapsed }"
      >
        <chat-sidebar
          @changeDarkMode="changeDarkMode"
          @toggleCollapse="handleSidebarToggle"
        ></chat-sidebar>
      </el-aside>
      <el-main class="container_main" :class="{ expanded: isSidebarCollapsed }">
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
      isSidebarCollapsed: false,
    };
  },
  methods: {
    changeDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    handleSidebarToggle(isCollapsed) {
      this.isSidebarCollapsed = isCollapsed;
    },
  },
};
</script>

<style scoped>
.container_body {
  width: 100%;
  display: flex;
}

.container_right {
  width: 250px;
  transition: width 0.3s;
}

.container_right.collapsed {
  width: 50px;
}

.container_main {
  width: calc(100% - 250px);
  transition: width 0.3s;
  padding: 0;
}

.container_main.expanded {
  width: calc(100% - 50px);
}
</style>
