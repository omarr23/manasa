
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/center/ListGrid.vue"
import Create from "@/views/center/CreatePage.vue"
import Edit from "@/views/center/UpdatePage.vue"
import View from "@/views/center/ViewDetails.vue"


const CenterRoutes: Array<RouteRecordRaw> = [
  {
    path: "/center-list",
    name: "center-list",
    component: List,
    meta: {
      pageTitle: "center_list",
      modelName: "center",
      breadcrumbs: ["center"],
      resource: "center",
      action: "list",
    },
  },
  {
    path: "/center-create",
    name: "center-create",
    component: Create,
    meta: {
      pageTitle: "create_center",
      modelName: "center",
      breadcrumbs: ["center", "create"],
      resource: "center",
      action: "create",
    },
  },
  {
    path: "/center-edit/:id",
    name: "center-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_center",
      modelName: "center",
      breadcrumbs: ["center", "edit"],
      resource: "center",
      action: "update",
    },
  },
  {
    path: "/center-view/:id",
    name: "center-view",
    component: View,
    meta: {
      pageTitle: "view_center",
      modelName: "center",
      breadcrumbs: ["center", "view"],
      resource: "center",
      action: "view",
    },
  },
];

export default CenterRoutes;

