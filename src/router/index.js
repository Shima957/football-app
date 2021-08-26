import { createRouter, createWebHistory } from "vue-router";
import PremireLeague from "../views/PremireLeague.vue";

const routes = [
  {
    path: "/:id",
    name: "League",
    component: PremireLeague,
  },
  {
    path: "/:id",
    name: "League",
    component: PremireLeague,
  },

  {
    path: "/:id",
    name: "League",
    component: PremireLeague,
  },

  {
    path: "/:id",
    name: "League",
    component: PremireLeague,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
