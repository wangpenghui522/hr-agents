/**
 * @description: 路由
 * @author: nowThen
 */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "contacts",
    component: () => import("@/views/contacts"),
    meta: {
      title: "contacts"
    }
  },
  {
    path: "/singleContact/:pageId",
    name: "singleContact",
    component: () => import("@/views/singleContact"),
    meta: {
      title: "singleContact",
      requireAuth: false,
      keepAlive: false,
    }
  },
  {
    path: "/logCall/:pageId",
    name: "logCall",
    component: () => import("@/views/logCall"),
    meta: {
      title: "logCall"
    }
  },
  {
    path: "/page404",
    name: "page404",
    component: () => import("@/views/page404"),
    meta: {
      title: "404页"
    }
  },
  {
    path: "*",
    redirect: "page404",
  },
];

const router = new Router({
  // mode: "history",
  mode: "hash",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }

})

export default router;
