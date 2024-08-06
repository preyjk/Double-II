<template>
  <nav>
    <ul class="nav-list">
      <li>
        <span>Find a Docotor</span>
      </li>
      <li>
        <span>Locations</span>
      </li>
      <li>
        <span>About Us</span>
      </li>
      <li>
        <LoginComponent class="login-component"></LoginComponent>
      </li>
    </ul>
  </nav>
</template>

<script>
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "NavComponent",
  components: {
    LoginComponent,
  },
  methods: {},
};
</script>

<style scoped>
.nav-list {
  display: flex;
  height: 100%;
  width: 60vw;
  padding: 28px 52px;
}

.nav-list li {
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  align-content: center;
}
.nav-list li span,
.login-component {
  color: rgb(62, 62, 62);
  cursor: pointer;
}
.login-component:hover,
.nav-list li span:hover {
  color: rgb(246, 137, 137);
}
</style>
