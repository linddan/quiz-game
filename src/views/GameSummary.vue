<template>
    <section>
        <div class="container columns is-vcentered">
            <div class="column is-8 is-offset-2">
                <h1 class="is-size-1 has-text-centered">Game Summary</h1>
                <p class="has-text-centered">{{ userAnswers }}</p>
            </div>
        </div>
        <a class="button is-primary" @click="onClick">
            Restart
        </a>
    </section>
</template>

<script>
import useGame from '@/composables/useGame';
import { router, GAME_MENU } from '@/router';
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
        };
    },
};
</script>

<style></style>
