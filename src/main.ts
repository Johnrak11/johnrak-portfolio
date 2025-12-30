import { createApp } from "vue"
import { createPinia } from "pinia"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./style.css"
import { routes } from "./router"

// Reset scroll and hash on refresh/load
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname)
  window.scrollTo(0, 0)
}

const app = createApp(App)
app.use(createPinia())

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth" }
    return { top: 0 }
  }
})

app.use(router)
app.mount("#app")
