
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/businessUnit/ListGrid.vue"
import Create from "@/views/businessUnit/CreatePage.vue"
import Edit from "@/views/businessUnit/UpdatePage.vue"
import View from "@/views/businessUnit/ViewDetails.vue"


const businessUnitRoutes: Array<RouteRecordRaw> = [
  {
    path: "/businessUnit-list",
    name: "businessUnit-list",
    component: List,
    meta: {
      pageTitle: "businessUnit_list",
      modelName: "businessUnit",
      breadcrumbs: ["businessUnit"],
      resource: "businessUnit",
      action: "list",
    },
  },
  {
    path: "/businessUnit-create",
    name: "businessUnit-create",
    component: Create,
    meta: {
      pageTitle: "create_businessUnit",
      modelName: "businessUnit",
      breadcrumbs: ["businessUnit", "create"],
      resource: "businessUnit",
      action: "create",
    },
  },
  {
    path: "/businessUnit-edit/:id",
    name: "businessUnit-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_businessUnit",
      modelName: "businessUnit",
      breadcrumbs: ["businessUnit", "edit"],
      resource: "businessUnit",
      action: "update",
    },
  },
  {
    path: "/businessUnit-view/:id",
    name: "businessUnit-view",
    component: View,
    meta: {
      pageTitle: "view_businessUnit",
      modelName: "businessUnit",
      breadcrumbs: ["businessUnit", "view"],
      resource: "businessUnit",
      action: "view",
    },
  },
];

export default businessUnitRoutes;

