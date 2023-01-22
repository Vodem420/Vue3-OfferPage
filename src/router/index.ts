import { createRouter, createWebHistory } from "vue-router";
import OfferPage from "@/pages/OfferPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "OfferPage",
      component: OfferPage,
    },
  ],
});

export default router;
