import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import GameMenu from '../views/GameMenu.vue';
import GamePlay from '../views/GamePlay.vue';
import GameSummary from '../views/GameSummary.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'GameMenu',
        component: GameMenu,
    },
    {
        path: '/play',
        name: 'GamePlay',
        component: GamePlay,
    },
    {
        path: '/summary',
        name: 'GameSummary',
        component: GameSummary,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
