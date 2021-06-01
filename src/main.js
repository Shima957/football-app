import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import axios from "axios";
import firebase from "firebase/app";

createApp(App).use(router).mount("#app");

axios.defaults.headers = {
  "X-Auth-Token": "ecb58d1f4108435c960799e3696e8e8b",
};

const firebaseConfig = {
  apiKey: "AIzaSyDWuDMfZuaEYNVhFuM_e6scvKzS6vw5y-4",
  authDomain: "football-app-b0a1d.firebaseapp.com",
  projectId: "football-app-b0a1d",
  storageBucket: "football-app-b0a1d.appspot.com",
  messagingSenderId: "848410910974",
  appId: "1:848410910974:web:27e6cfff37a49943ad85af",
  measurementId: "G-8B4BYQZJY3",
};

firebase.firebaseConfig(firebaseConfig);
