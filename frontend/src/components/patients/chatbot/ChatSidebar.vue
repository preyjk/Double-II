<template>
  <div :class="['container_body', { dark: isDarkMode, care: isCareMode }]">
    <!-- Left Icons Column -->
    <div class="left-icons">
      <div class="icon" @click="backHome">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <div class="spacer"></div>
      <div class="icon">
        <el-icon><User /></el-icon>
      </div>
    </div>

    <!-- Top Bar with Home Dropdown and Settings -->
    <div class="main-content">
      <div class="top-bar">
        <el-dropdown @command="handleCommand">
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-if="selectedWorkspace !== 'Home'"
                command="Home"
                >Home</el-dropdown-item
              >
              <el-dropdown-item
                v-if="selectedWorkspace !== 'Workspace 1'"
                command="Workspace 1"
                >Workspace 1</el-dropdown-item
              >
              <el-dropdown-item
                v-if="selectedWorkspace !== 'Workspace 2'"
                command="Workspace 2"
                >Workspace 2</el-dropdown-item
              >
              <el-dropdown-item
                v-if="selectedWorkspace !== 'Workspace 3'"
                command="Workspace 3"
                >Workspace 3</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
          <div class="home">
            <el-icon><HomeFilled /></el-icon>
            <span>{{ selectedWorkspace }}</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
        </el-dropdown>

        <!-- Settings Dropdown for Dark and Care Mode -->
        <el-dropdown @command="handleSettingsCommand">
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="Dark Mode">Dark Mode</el-dropdown-item>
              <el-dropdown-item command="Care Mode">Care Mode</el-dropdown-item>
            </el-dropdown-menu>
          </template>
          <div class="settings">
            <el-icon><Setting /></el-icon>
          </div>
        </el-dropdown>
      </div>

      <!-- + New Chat Button -->
      <div class="new-chat">
        <button @click="createNewChat">+ New Chat</button>
      </div>

      <!-- Search Chats Input -->
      <div class="search-chats">
        <input
          type="text"
          placeholder="Search chats..."
          v-model="searchQuery"
        />
      </div>

      <!-- Chats List -->
      <div class="chats-list">
        <p v-if="!chats.length">No Chats</p>
        <ul v-else>
          <li v-for="chat in filteredChats" :key="chat.id">
            {{ chat.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatSidebar",
  data() {
    return {
      searchQuery: "",
      chats: [],
      selectedWorkspace: "Home",
    };
  },
  computed: {
    filteredChats() {
      return this.chats.filter((chat) =>
        chat.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    createNewChat() {
      console.log("New Chat created!");
    },
    handleCommand(command) {
      this.selectedWorkspace = command;
    },
    handleSettingsCommand(command) {
      if (command === "Dark Mode") {
        this.$emit('toggle-dark-mode');
      } else if (command === "Care Mode") {
        this.$emit('toggle-care-mode');
      }
    },
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Common styles */
.container_body {
  display: flex;
  height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease, font-size 0.3s ease;
}

/* Dark Mode styles */
.container_body.dark {
  background-color: #1e1e1e;
  color: #f5f5f5;
}

.left-icons.dark {
  background-color: #333;
}

.icon.dark {
  color: #f5f5f5;
}

/* Care Mode styles */
.container_body.care {
  font-size: 18px;
}

/* Left icons styles */
.left-icons {
  width: 50px;
  background-color: #547a8a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.icon {
  color: white;
  cursor: pointer;
}

.spacer {
  flex-grow: 1;
}

/* Main content styles */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #6999ab;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container_body.dark .main-content {
  background-color: #2c2c2c;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.home {
  display: flex;
  align-items: center;
  background-color: #547a8a;
  padding: 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  outline: none;
}

.container_body.dark .home {
  background-color: #333;
  color: #f5f5f5;
}

.home el-icon {
  margin-right: 12px;
}

.home span {
  padding-left: 4px;
}

.settings {
  background-color: transparent;
  cursor: pointer;
}

.settings el-icon {
  color: white;
}

.new-chat {
  margin-bottom: 20px;
}

.new-chat button {
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-chats {
  margin-bottom: 20px;
}

.search-chats input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.chats-list {
  flex-grow: 1;
}

.chats-list p {
  text-align: center;
  color: #fff;
}

.chats-list ul {
  list-style: none;
  padding: 0;
}

.chats-list li {
  padding: 10px;
  background-color: #80a6b5;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.container_body.dark .chats-list li {
  background-color: #444;
}
</style>
