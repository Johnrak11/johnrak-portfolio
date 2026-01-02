import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import NotFound from "@/pages/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomePage },
  { path: "/:pathMatch(.*)*", name: "404", component: NotFound },
];
