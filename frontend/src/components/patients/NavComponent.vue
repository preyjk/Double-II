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
import LoginComponent from "@/components/patients/LoginComponent.vue";

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
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 50vw;
  padding: 28px 52px;
  gap: 20px;
}

.nav-list li {
  list-style: none;
}

.nav-list li span {
  font-size: 20px;
  font-weight: bold;
  color: rgb(62, 62, 62);
  cursor: pointer;
  text-align: center;
}

.nav-list li span:hover {
  color: rgb(246, 137, 137);
}

.login-component {
  font-size: 20px;
  font-weight: bold;
  color: rgb(62, 62, 62);
  cursor: pointer;
  text-align: center;
}

.login-component:hover {
  color: rgb(246, 137, 137);
}
</style>
