
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/level/ListGrid.vue"
import Create from "@/views/level/CreatePage.vue"
import Edit from "@/views/level/UpdatePage.vue"
import View from "@/views/level/ViewDetails.vue"


const LevelRoutes: Array<RouteRecordRaw> = [
  {
    path: "/level-list",
    name: "level-list",
    component: List,
    meta: {
      pageTitle: "level_list",
      modelName: "level",
      breadcrumbs: ["level"],
      resource: "level",
      action: "list",
    },
  },
  {
    path: "/level-create",
    name: "level-create",
    component: Create,
    meta: {
      pageTitle: "create_level",
      modelName: "level",
      breadcrumbs: ["level", "create"],
      resource: "level",
      action: "create",
    },
  },
  {
    path: "/level-edit/:id",
    name: "level-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_level",
      modelName: "level",
      breadcrumbs: ["level", "edit"],
      resource: "level",
      action: "update",
    },
  },
  {
    path: "/level-view/:id",
    name: "level-view",
    component: View,
    meta: {
      pageTitle: "view_level",
      modelName: "level",
      breadcrumbs: ["level", "view"],
      resource: "level",
      action: "view",
    },
  },
];

export default LevelRoutes;

