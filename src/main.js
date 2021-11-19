import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import axios from "axios";
import firebase from "firebase/app";

createApp(App).use(router).mount("#app");

axios.defaults.headers = {
  "X-Auth-Token": process.env.VUE_APP_AIP_KEY,
};

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
