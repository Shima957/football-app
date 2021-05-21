import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import axios from "axios";

createApp(App).use(router).mount("#app");

axios.defaults.headers = {
  "X-Auth-Token": "ecb58d1f4108435c960799e3696e8e8b",
};
