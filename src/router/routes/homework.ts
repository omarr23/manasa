
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/homework/ListGrid.vue"
import Create from "@/views/homework/CreatePage.vue"
import Edit from "@/views/homework/UpdatePage.vue"
import View from "@/views/homework/ViewDetails.vue"


const HomeworkRoutes: Array<RouteRecordRaw> = [
  {
    path: "/homework-list",
    name: "homework-list",
    component: List,
    meta: {
      pageTitle: "homework_list",
      modelName: "homework",
      breadcrumbs: ["homework"],
      resource: "homework",
      action: "list",
    },
  },
  {
    path: "/homework-create",
    name: "homework-create",
    component: Create,
    meta: {
      pageTitle: "create_homework",
      modelName: "homework",
      breadcrumbs: ["homework", "create"],
      resource: "homework",
      action: "create",
    },
  },
  {
    path: "/homework-edit/:id",
    name: "homework-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_homework",
      modelName: "homework",
      breadcrumbs: ["homework", "edit"],
      resource: "homework",
      action: "update",
    },
  },
  {
    path: "/homework-view/:id",
    name: "homework-view",
    component: View,
    meta: {
      pageTitle: "view_homework",
      modelName: "homework",
      breadcrumbs: ["homework", "view"],
      resource: "homework",
      action: "view",
    },
  },
];

export default HomeworkRoutes;

