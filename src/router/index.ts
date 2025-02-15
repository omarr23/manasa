import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import { canNavigate } from "@/core/plugins/acl/routeProtection";
import filters from '@/core/helpers/filters'

import CenterRoutes from "./routes/center";
import ExamRoutes from "./routes/exam";
import HomeworkRoutes from "./routes/homework";
import LevelRoutes from "./routes/level";
import StudentRoutes from "./routes/student";
import TeacherRoutes from "./routes/teacher";
import VideoRoutes from "./routes/video";
import attendanceRoutes from "./routes/attendance";
import businessUnitRoutes from "./routes/businessUnit";
import resultRoutes from "./routes/result";
import submissionsRoutes from "./routes/submissions";
import subscriptionRoutes from "./routes/subscription";
import userRoutes from "./routes/user";
import userRoleRoutes from "./routes/userRole";
import eventConfigurationRoutes from "./routes/eventConfiguration";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "dashboard",
          modelName: "dashboard",
          resource: "dashboard",
          breadcrumbs: ["dashboard"],
          action: "get",
        },
      },
      ...CenterRoutes,
      ...ExamRoutes,
      ...HomeworkRoutes,
      ...LevelRoutes,
      ...StudentRoutes,
      ...TeacherRoutes,
      ...VideoRoutes,
      ...attendanceRoutes,
      ...businessUnitRoutes,
      ...resultRoutes,
      ...submissionsRoutes,
      ...subscriptionRoutes,
      ...userRoutes,
      ...eventConfigurationRoutes,
      ...userRoleRoutes
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
          resource: "Auth",
          action: "view",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
          resource: "Auth",
          action: "view",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
          resource: "Auth",
          action: "view",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
          resource: "public",
          action: "view",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
          resource: "public",
          action: "view",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // If the route has a hash, scroll to the section with the specified ID; otherwise, scroll to the top of the page.
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: "smooth",
      };
    } else {
      return {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${filters.ConvertCamelToTitleName(to.meta.pageTitle)}`

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      const { access, redirect } = canNavigate(to);
      access ? next() : next(redirect.route);
    } else  next({ name: "sign-in" });
    
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
