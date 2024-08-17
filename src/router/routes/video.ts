
import type {

   RouteRecordRaw,
} from "vue-router";
import List from "@/views/video/ListGrid.vue"
import Create from "@/views/video/CreatePage.vue"
import Edit from "@/views/video/UpdatePage.vue"
import View from "@/views/video/ViewDetails.vue"


const VideoRoutes: Array<RouteRecordRaw> = [
  {
    path: "/video-list",
    name: "video-list",
    component: List,
    meta: {
      pageTitle: "video_list",
      modelName: "video",
      breadcrumbs: ["video"],
      resource: "video",
      action: "list",
    },
  },
  {
    path: "/video-create",
    name: "video-create",
    component: Create,
    meta: {
      pageTitle: "create_video",
      modelName: "video",
      breadcrumbs: ["video", "create"],
      resource: "video",
      action: "create",
    },
  },
  {
    path: "/video-edit/:id",
    name: "video-edit",
    component: Edit,
    meta: {
      pageTitle: "edit_video",
      modelName: "video",
      breadcrumbs: ["video", "edit"],
      resource: "video",
      action: "update",
    },
  },
  {
    path: "/video-view/:id",
    name: "video-view",
    component: View,
    meta: {
      pageTitle: "view_video",
      modelName: "video",
      breadcrumbs: ["video", "view"],
      resource: "video",
      action: "view",
    },
  },
];

export default VideoRoutes;

