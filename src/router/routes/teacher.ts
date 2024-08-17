
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/teacher/ListGrid.vue"
import Create from "@/views/teacher/CreatePage.vue"
import Edit from "@/views/teacher/UpdatePage.vue"
import View from "@/views/teacher/ViewDetails.vue"


const TeacherRoutes: Array<RouteRecordRaw> = [
  {
    path: "/teacher-list",
    name: "teacher-list",
    component: List,
    meta: {
      pageTitle: "teacher_list",
      modelName: "teacher",
      breadcrumbs: ["teacher"],
      resource: "teacher",
      action: "list",
    },
  },
  {
    path: "/teacher-create",
    name: "teacher-create",
    component: Create,
    meta: {
      pageTitle: "create_teacher",
      modelName: "teacher",
      breadcrumbs: ["teacher", "create"],
      resource: "teacher",
      action: "create",
    },
  },
  {
    path: "/teacher-edit/:id",
    name: "teacher-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_teacher",
      modelName: "teacher",
      breadcrumbs: ["teacher", "edit"],
      resource: "teacher",
      action: "update",
    },
  },
  {
    path: "/teacher-view/:id",
    name: "teacher-view",
    component: View,
    meta: {
      pageTitle: "view_teacher",
      modelName: "teacher",
      breadcrumbs: ["teacher", "view"],
      resource: "teacher",
      action: "view",
    },
  },
];

export default TeacherRoutes;

