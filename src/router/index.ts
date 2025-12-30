import type { RouteRecordRaw } from "vue-router"
import HomePage from "@/pages/HomePage.vue"
import ResetPage from "@/pages/ResetPage.vue"
import NotFound from "@/pages/NotFound.vue"

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomePage },
  { path: "/reset", name: "reset", component: ResetPage },
  { path: "/:pathMatch(.*)*", name: "404", component: NotFound }
]
