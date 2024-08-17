
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/result/ListGrid.vue"
import Create from "@/views/result/CreatePage.vue"
import Edit from "@/views/result/UpdatePage.vue"
import View from "@/views/result/ViewDetails.vue"


const resultRoutes: Array<RouteRecordRaw> = [
  {
    path: "/result-list",
    name: "result-list",
    component: List,
    meta: {
      pageTitle: "result_list",
      modelName: "result",
      breadcrumbs: ["result"],
      resource: "result",
      action: "list",
    },
  },
  {
    path: "/result-create",
    name: "result-create",
    component: Create,
    meta: {
      pageTitle: "create_result",
      modelName: "result",
      breadcrumbs: ["result", "create"],
      resource: "result",
      action: "create",
    },
  },
  {
    path: "/result-edit/:id",
    name: "result-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_result",
      modelName: "result",
      breadcrumbs: ["result", "edit"],
      resource: "result",
      action: "update",
    },
  },
  {
    path: "/result-view/:id",
    name: "result-view",
    component: View,
    meta: {
      pageTitle: "view_result",
      modelName: "result",
      breadcrumbs: ["result", "view"],
      resource: "result",
      action: "view",
    },
  },
];

export default resultRoutes;

