
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/subscription/ListGrid.vue"
import Create from "@/views/subscription/CreatePage.vue"
import Edit from "@/views/subscription/UpdatePage.vue"
import View from "@/views/subscription/ViewDetails.vue"


const subscriptionRoutes: Array<RouteRecordRaw> = [
  {
    path: "/subscription-list",
    name: "subscription-list",
    component: List,
    meta: {
      pageTitle: "subscription_list",
      modelName: "subscription",
      breadcrumbs: ["subscription"],
      resource: "subscription",
      action: "list",
    },
  },
  {
    path: "/subscription-create",
    name: "subscription-create",
    component: Create,
    meta: {
      pageTitle: "create_subscription",
      modelName: "subscription",
      breadcrumbs: ["subscription", "create"],
      resource: "subscription",
      action: "create",
    },
  },
  {
    path: "/subscription-edit/:id",
    name: "subscription-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_subscription",
      modelName: "subscription",
      breadcrumbs: ["subscription", "edit"],
      resource: "subscription",
      action: "update",
    },
  },
  {
    path: "/subscription-view/:id",
    name: "subscription-view",
    component: View,
    meta: {
      pageTitle: "view_subscription",
      modelName: "subscription",
      breadcrumbs: ["subscription", "view"],
      resource: "subscription",
      action: "view",
    },
  },
];

export default subscriptionRoutes;

