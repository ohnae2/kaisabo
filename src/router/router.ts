import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'login',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '403',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/error/403.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: {
            title: '404',
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/error/404.vue'),
    },
    {
        path: '/',
        name: '',
        component: Home,
        children: [
            {
                path: '/main',
                name: 'main',
                meta: {
                    title: 'main',
                    auth: true,
                },
                component: () => import(/* webpackChunkName: "main" */ '../views/main/Main.vue'),
            },
            {
                path: '/sub',
                name: 'sub',
                meta: {
                    title: 'sub',
                    auth: true,
                },
                component: () => import(/* webpackChunkName: "sub" */ '../views/main/SubMain.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `kaisa ${to.meta.title}`;
    const isUser = (sessionStorage.getItem('userInfo') && sessionStorage.getItem('codeList') && sessionStorage.getItem('menuList') && sessionStorage.getItem('token'));
    if (!isUser && to.path !== '/login') {
        next('/login');
    } else if (to.meta.auth && !isUser) {
        next('/403');
    } else if (to.path === '/') {
        next('/main');
    } else {
        next();
    }
});

export default router;
