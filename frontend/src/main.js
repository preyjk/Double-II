import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }

app
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBEyVtYfG_ZR7yzXeMhUZkq-3iOlvGx27s",
    },
  })
  .mount("#app");
