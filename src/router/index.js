import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const home = (r) =>
  require.ensure([], () => r(require("@/components/HelloWorld.vue")), "home");
  const index = (r) =>
  require.ensure([], () => r(require("@/view/Home.vue")), "index");
const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
