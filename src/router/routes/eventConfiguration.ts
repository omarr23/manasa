
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import List from "@/views/eventConfiguration/ListGrid.vue"
import Create from "@/views/eventConfiguration/CreatePage.vue"
import Edit from "@/views/eventConfiguration/UpdatePage.vue"
import View from "@/views/eventConfiguration/viewDetails.vue"


const eventConfigurationRoutes: Array<RouteRecordRaw> = [
  {
    path: "/eventConfiguration-list",
    name: "eventConfiguration-list",
    component: List,
    meta: {
      pageTitle: "Workflows_list",
      modelName: "eventConfiguration",
      breadcrumbs: ["eventConfiguration"],
      resource: "eventConfiguration",
      action: "list",
    },
  },
  {
    path: "/eventConfiguration-create",
    name: "eventConfiguration-create",
    component: Create,
    meta: {

      pageTitle: "create_Workflows",
      modelName: "eventConfiguration",
      breadcrumbs: ["eventConfiguration", "create"],
      resource: "eventConfiguration",
      action: "create",
    },
  },
  {
    path: "/eventConfiguration-edit/:id",
    name: "eventConfiguration-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_Workflows",
      modelName: "eventConfiguration",
      breadcrumbs: ["eventConfiguration", "edit"],
      resource: "eventConfiguration",
      action: "update",
    },
  },
  {
    path: "/eventConfiguration-view/:id",
    name: "eventConfiguration-view",
    component: View,
    meta: {
      pageTitle: "view_Workflows",
      modelName: "eventConfiguration",
      breadcrumbs: ["eventConfiguration", "view"],
      resource: "eventConfiguration",
      action: "view",
    },
  },
];

export default eventConfigurationRoutes;

