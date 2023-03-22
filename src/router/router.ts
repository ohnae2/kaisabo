import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'login',
        },
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '403',
        },
        component: () => import('../views/error/403.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: {
            title: '404',
        },
        component: () => import('../views/error/404.vue'),
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
                component: () => import('../views/main/Main.vue'),
            },
            { path: '/bs/code', name: 'code', meta: { title: 'code', auth: true, }, component: () => import( '../views/bs/Code.vue'), },
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
