
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/student/ListGrid.vue"
import Create from "@/views/student/CreatePage.vue"
import Edit from "@/views/student/UpdatePage.vue"
import View from "@/views/student/ViewDetails.vue"


const StudentRoutes: Array<RouteRecordRaw> = [
  {
    path: "/student-list",
    name: "student-list",
    component: List,
    meta: {
      pageTitle: "student_list",
      modelName: "student",
      breadcrumbs: ["student"],
      resource: "student",
      action: "list",
    },
  },
  {
    path: "/student-create",
    name: "student-create",
    component: Create,
    meta: {
      pageTitle: "create_student",
      modelName: "student",
      breadcrumbs: ["student", "create"],
      resource: "student",
      action: "create",
    },
  },
  {
    path: "/student-edit/:id",
    name: "student-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_student",
      modelName: "student",
      breadcrumbs: ["student", "edit"],
      resource: "student",
      action: "update",
    },
  },
  {
    path: "/student-view/:id",
    name: "student-view",
    component: View,
    meta: {
      pageTitle: "view_student",
      modelName: "student",
      breadcrumbs: ["student", "view"],
      resource: "student",
      action: "view",
    },
  },
];

export default StudentRoutes;

