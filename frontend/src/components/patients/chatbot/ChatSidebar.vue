<template>
  <div class="container_body">
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

        <!-- Settings Icon Separate -->
        <div class="settings">
          <el-icon><Setting /></el-icon>
        </div>
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
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.container_body {
  display: flex;
  height: 100vh;
}

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

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #6999ab;
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
</style>
