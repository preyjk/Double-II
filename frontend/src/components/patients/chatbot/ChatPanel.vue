<template>
  <div class="chat-window"></div>
</template>

<script>
export default {
  name: "ChatPanel",
  components: {},
  data() {
    return {};
  },
  methods: {},
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
</style>
