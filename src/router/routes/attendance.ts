
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/attendance/ListGrid.vue"
import Create from "@/views/attendance/CreatePage.vue"
import Edit from "@/views/attendance/UpdatePage.vue"
import View from "@/views/attendance/ViewDetails.vue"


const attendanceRoutes: Array<RouteRecordRaw> = [
  {
    path: "/attendance-list",
    name: "attendance-list",
    component: List,
    meta: {
      pageTitle: "attendance_list",
      modelName: "attendance",
      breadcrumbs: ["attendance"],
      resource: "attendance",
      action: "list",
    },
  },
  {
    path: "/attendance-create",
    name: "attendance-create",
    component: Create,
    meta: {
      pageTitle: "create_attendance",
      modelName: "attendance",
      breadcrumbs: ["attendance", "create"],
      resource: "attendance",
      action: "create",
    },
  },
  {
    path: "/attendance-edit/:id",
    name: "attendance-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_attendance",
      modelName: "attendance",
      breadcrumbs: ["attendance", "edit"],
      resource: "attendance",
      action: "update",
    },
  },
  {
    path: "/attendance-view/:id",
    name: "attendance-view",
    component: View,
    meta: {
      pageTitle: "view_attendance",
      modelName: "attendance",
      breadcrumbs: ["attendance", "view"],
      resource: "attendance",
      action: "view",
    },
  },
];

export default attendanceRoutes;

