
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/submissions/ListGrid.vue"
import Create from "@/views/submissions/CreatePage.vue"
import Edit from "@/views/submissions/UpdatePage.vue"
import View from "@/views/submissions/ViewDetails.vue"


const submissionsRoutes: Array<RouteRecordRaw> = [
  {
    path: "/submissions-list",
    name: "submissions-list",
    component: List,
    meta: {
      pageTitle: "submissions_list",
      modelName: "submissions",
      breadcrumbs: ["submissions"],
      resource: "submissions",
      action: "list",
    },
  },
  {
    path: "/submissions-create",
    name: "submissions-create",
    component: Create,
    meta: {
      pageTitle: "create_submissions",
      modelName: "submissions",
      breadcrumbs: ["submissions", "create"],
      resource: "submissions",
      action: "create",
    },
  },
  {
    path: "/submissions-edit/:id",
    name: "submissions-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_submissions",
      modelName: "submissions",
      breadcrumbs: ["submissions", "edit"],
      resource: "submissions",
      action: "update",
    },
  },
  {
    path: "/submissions-view/:id",
    name: "submissions-view",
    component: View,
    meta: {
      pageTitle: "view_submissions",
      modelName: "submissions",
      breadcrumbs: ["submissions", "view"],
      resource: "submissions",
      action: "view",
    },
  },
];

export default submissionsRoutes;

