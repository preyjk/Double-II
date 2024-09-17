import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "@/store";
import './assets/tailwind.css';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBEyVtYfG_ZR7yzXeMhUZkq-3iOlvGx27s",
      libraries: "places",
      v: "3.55",
      async: true,
    },
  })
  .use(ElementPlus)
  .use(store)
  .mount("#app");
