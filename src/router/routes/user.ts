
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/user/ListGrid.vue"
import Create from "@/views/user/CreatePage.vue"
import Edit from "@/views/user/UpdatePage.vue"
import View from "@/views/user/ViewDetails.vue"


const userRoutes: Array<RouteRecordRaw> = [
  {
    path: "/user-list",
    name: "user-list",
    component: List,
    meta: {
      pageTitle: "user_list",
      modelName: "user",
      breadcrumbs: ["user"],
      resource: "user",
      action: "list",
    },
  },
  {
    path: "/user-create",
    name: "user-create",
    component: Create,
    meta: {
      pageTitle: "create_user",
      modelName: "user",
      breadcrumbs: ["user", "create"],
      resource: "user",
      action: "create",
    },
  },
  {
    path: "/user-edit/:id",
    name: "user-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_user",
      modelName: "user",
      breadcrumbs: ["user", "edit"],
      resource: "user",
      action: "update",
    },
  },
  {
    path: "/user-view/:id",
    name: "user-view",
    component: View,
    meta: {
      pageTitle: "view_user",
      modelName: "user",
      breadcrumbs: ["user", "view"],
      resource: "user",
      action: "view",
    },
  },
];

export default userRoutes;

