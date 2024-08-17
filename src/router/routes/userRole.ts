import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from 'vue-router';
import List from '@/views/userRole/ListGrid.vue';
import Create from '@/views/userRole/CreatePage.vue';
import Edit from '@/views/userRole/UpdatePage.vue';
import View from '@/views/userRole/ViewDetails.vue';

const userRoleRoutes: Array<RouteRecordRaw> = [
    {
        path: '/userRole-list',
        name: 'userRole-list',
        component: List,
        meta: {
            pageTitle: 'userRole_list',
            modelName: 'userRole',
            breadcrumbs: ['userRole'],
            resource: 'permission',
            action: 'list',
        },
    },
    {
        path: '/userRole-create',
        name: 'userRole-create',
        component: Create,
        meta: {
            pageTitle: 'create_userRole',
            modelName: 'userRole',
            breadcrumbs: ['userRole', 'create'],
            resource: 'permission',
            action: 'create',
        },
    },
    {
        path: '/userRole-edit/:id',
        name: 'userRole-edit',
        component: Edit,
        meta: {
            pageTitle: 'edit_userRole',
            modelName: 'userRole',
            breadcrumbs: ['userRole', 'edit'],
            resource: 'permission',
            action: 'update',
        },
    },
    {
        path: '/userRole-view/:id',
        name: 'userRole-view',
        component: View,
        meta: {
            pageTitle: 'view_userRole',
            modelName: 'userRole',
            breadcrumbs: ['userRole', 'view'],
            resource: 'permission',
            action: 'view',
        },
    },
];

export default userRoleRoutes;
