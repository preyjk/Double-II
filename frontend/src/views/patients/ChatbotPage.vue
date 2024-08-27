<template>
  <div class="container_body"></div>
</template>
<script>
import ChatPanel from "@/components/patients/chatbot/ChatPanel.vue";

export default {
  components: {
    ChatPanel,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
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
</style>
