import Vue from "vue";
import VueRouter from "vue-router";
import userApi from "../api/user";
Vue.use(VueRouter);

// 改写 router.push(),可以push自己而不报错
const replaceRoute = VueRouter.prototype.push;

VueRouter.prototype.push = function (position, resolve, reject) {
  if (resolve && reject) {
    replaceRoute.call(this, position, resolve, reject);
  } else {
    replaceRoute.call(
      this,
      position,
      () => {},
      () => {}
    );
  }
};

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/views/Home/index.vue"),
      meta: {
        // 是否显示头部组件
        isheadershow: true,
      },
    },
    {
      name: "ask",
      path: "/ask",
      component: () => import("../views/Ask/index.vue"),
      meta: {
        isheadershow: false,
      },
    },
    {
      name: "detail",
      path: "/detail",
      component: () => import("../views/detail/index.vue"),
      meta: {
        isheadershow: true,
      },
    },
    {
      path: "/login",
      component: () => {
        return import("@/views/login");
      },
      meta: {
        isheadershow: false,
      },
    },
    {
      path: "/register",
      component: () => {
        return import("@/views/register");
      },
      meta: {
        isheadershow: false,
      },
    },
    {
      path: "/user",
      component: () => import("../views/User/index.vue"),
      meta: {
        // 是否显示头部组件
        isheadershow: true,
      },
    },
  ],
  // 滚轮行为
  scrollBehavior(to, from, savedPosition) {
    return {y: 0};
  },
});

// 前置路由守卫
router.beforeEach((to, form, next) => {
  let token = localStorage.getItem("login_token");
  if (token) {
    //验证token是否过期
    userApi
      .getUserInfo()
      .then((res) => {
        //已经登录，不能去登录和注册页面
        if (to.path == "/login" || to.path == "/register") {
          next("/home");
        } else {
          next();
        }
      })
      .catch((err) => {
        localStorage.removeItem("login_token");
        //只要登录后才可以进入该页面
        if (to.path == "/ask" || to.path == "/user") {
          next("/login");
        } else {
          next();
        }
      });
  } else {
    //只有登录后才可以进入该页面
    if (to.path == "/ask" || to.path == "/user") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
