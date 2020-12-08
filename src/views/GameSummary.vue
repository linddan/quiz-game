<template>
    <section>
        <div class="container columns is-vcentered">
            <div class="column is-8 is-offset-2">
                <h1 class="is-size-1 has-text-centered">Game Summary</h1>
                <p class="has-text-centered">{{ userAnswers }}</p>
                <p class="has-text-centered">{{ statistics }}</p>
            </div>
        </div>
        <button class="button is-large" @click="onClick">
            <span class="icon is-medium">
                <i class="fas fa-angle-double-right"></i>
            </span>
            <span>Play again</span>
        </button>
    </section>
</template>

<script>
import useGame from '@/composables/useGame';
import { router, GAME_MENU } from '@/router';
import { getStatistics } from '@/utils/game';
export default {
    setup() {
        const { userAnswers, resetGame } = useGame();
        const onClick = () => {
            resetGame();
            router.push({ name: GAME_MENU });
        };

        return {
            userAnswers,
            onClick,
            statistics: getStatistics(userAnswers.value),
        };
    },
};
</script>

<style></style>
