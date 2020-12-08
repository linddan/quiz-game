import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useGame from '../composables/useGame';
import GameMenu from '../views/GameMenu.vue';
import GamePlay from '../views/GamePlay.vue';
import GameSummary from '../views/GameSummary.vue';

export const GAME_MENU = 'GameMenu';
export const GAME_PLAY = 'GamePlay';
export const GAME_SUMMARY = 'GameSummary';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: GAME_MENU,
        component: GameMenu,
    },
    {
        path: '/play',
        name: GAME_PLAY,
        component: GamePlay,
    },
    {
        path: '/summary',
        name: GAME_SUMMARY,
        component: GameSummary,
    },
];

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Navigation guard
router.beforeEach((to, _, next) => {
    const { isGameFinished, isGamePlaying } = useGame();
    const correctRouteName = isGamePlaying.value
        ? GAME_PLAY
        : isGameFinished.value
        ? GAME_SUMMARY
        : GAME_MENU;

    if (to.name !== correctRouteName) {
        next({ name: correctRouteName });
    } else {
        next();
    }
});
