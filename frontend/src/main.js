import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);

app
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBEyVtYfG_ZR7yzXeMhUZkq-3iOlvGx27s",
    },
  })
  .mount("#app");
