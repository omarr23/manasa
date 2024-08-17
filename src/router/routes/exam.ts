
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/exam/ListGrid.vue"
import Create from "@/views/exam/CreatePage.vue"
import Edit from "@/views/exam/UpdatePage.vue"
import View from "@/views/exam/ViewDetails.vue"


const ExamRoutes: Array<RouteRecordRaw> = [
  {
    path: "/exam-list",
    name: "exam-list",
    component: List,
    meta: {
      pageTitle: "exam_list",
      modelName: "exam",
      breadcrumbs: ["exam"],
      resource: "exam",
      action: "list",
    },
  },
  {
    path: "/exam-create",
    name: "exam-create",
    component: Create,
    meta: {
      pageTitle: "create_exam",
      modelName: "exam",
      breadcrumbs: ["exam", "create"],
      resource: "exam",
      action: "create",
    },
  },
  {
    path: "/exam-edit/:id",
    name: "exam-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_exam",
      modelName: "exam",
      breadcrumbs: ["exam", "edit"],
      resource: "exam",
      action: "update",
    },
  },
  {
    path: "/exam-view/:id",
    name: "exam-view",
    component: View,
    meta: {
      pageTitle: "view_exam",
      modelName: "exam",
      breadcrumbs: ["exam", "view"],
      resource: "exam",
      action: "view",
    },
  },
];

export default ExamRoutes;

