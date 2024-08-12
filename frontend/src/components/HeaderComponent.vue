<!-- HeaderComponent.vue -->
<template>
  <header class="header">
    <!-- SVG Sprite -->
    <svg
      style="height: 0; width: 0; display: none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol id="language-change" width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"
        />
        <path
          d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"
        />
      </symbol>
      <symbol id="heart-mode" width="16" height="16" viewBox="0 0 16 16">
        <path
          fill-rule="evenodd"
          d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"
        />
      </symbol>
      <symbol id="heart-mode-fill" width="16" height="16" viewBox="0 0 16 16">
        <path
          fill-rule="evenodd"
          d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386"
        />
      </symbol>
    </svg>
    <div class="logo">
      <!-- <img src="@/assets/logo.png" alt="Logo" @click="backToHomePage" /> -->
      <span @click="backToHomePage">FRW</span>
    </div>
    <ul class="header-menu">
      <li>
        <span
          :class="['for-patients', { active: activeTab === 'patients' }]"
          @click="activateTab('patients')"
          >For Patients</span
        >
      </li>
      <li class="providers-btn">
        <span
         :class="['for-providers', { active: activeTab === 'providers' }]"
      @click="goToAdminPage"
          >For Providers</span
        >
      </li>
      <li class="old-mode">
        <svg class="svg-heart-mode">
          <use xlink:href="#heart-mode" />
        </svg>
        <span> Care </span>
      </li>
      <li class="language-change">
        <svg class="svg-language-change">
          <use xlink:href="#language-change" />
        </svg>
        <span> English </span>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      activeTab: "patients",
    };
  },
  methods: {
    activateTab(tab) {
      this.activeTab = tab;
    },
    backToHomePage() {
      this.$router.push({ name: "Home" });
    },
    goToAdminPage() {
      this.activateTab('providers'); 
      this.$router.push('/admin'); 
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  box-sizing: border-box;
  background-color: white;
  color: #fff;
  border-width: 2px;
  border-color: gray;
  position: relative;
  height: 60px;
  align-items: center;
}

.header::after {
  content: "";
  display: block;
  height: 1px;
  background-color: #191919;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0.1;
}

.logo {
  display: flex;
  font-size: 32px;
  color: gray;
  align-items: center;
  flex: 0.1;
  margin-left: 48px;
}

.logo img {
  height: 48px;
  margin-right: 20px;
  cursor: pointer;
}

.logo span {
  cursor: pointer;
}

.header-menu {
  display: flex;
  flex: 1;
  height: 100%;
}

.header-menu li {
  flex: 1;
  color: gray;
  height: 100%;
  display: flex;
  align-items: center;
}

.header-menu .providers-btn {
  cursor: initial;
  flex: 8;
}

.header-menu .old-mode {
  flex: 0.5;
}

.header-menu li span {
  cursor: pointer;
  display: inline-block;
  height: 100%;
  align-content: center;
}

.header-menu li span:hover {
  color: black;
}

.svg-language-change,
.svg-heart-mode {
  display: inline-block;
  width: 16px;
  height: 16px;
  fill: gray;
  cursor: pointer;
}

.language-change:hover,
.old-mode:hover {
  color: black;
}

.old-mode:hover {
  .svg-heart-mode {
    fill: black;
  }
}

.language-change:hover {
  .svg-language-change {
    fill: black;
  }
}

.header-menu li .active {
  font-weight: bold;
  color: black;
  border-bottom: 2px solid red;
}
</style>
