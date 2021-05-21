import { createRouter, createWebHistory } from "vue-router";
import PremireLeague from "../views/PremireLeague.vue";
import LaLiga from "../views/LaLiga.vue";
import Bundesliga from "../views/Bundesliga.vue";
import SerieA from "../views/SerieA.vue";

const routes = [
  {
    path: "/:id",
    name: "PremireLeauge",
    component: PremireLeague,
  },
  {
    path: "/:id",
    name: "LaLiga",
    component: LaLiga,
  },

  {
    path: "/:id",
    name: "Bundesliga",
    component: Bundesliga,
  },

  {
    path: "/:id",
    name: "SerieA",
    component: SerieA,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
