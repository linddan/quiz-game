<template>
    <h1 class="is-size-1 has-text-centered">New Game</h1>
    <p class="has-text-centered">This is where the player gets to configure the game</p>
    <div class="box  mt-5">
        <button class="button is-large" @click="onClick">
            <span class="icon is-medium">
                <i class="fas fa-angle-double-right"></i>
            </span>
            <span>Let's play</span>
        </button>
    </div>
</template>

<script>
import useQuestions from '../composables/useQuestions';
import useGame from '../composables/useGame';
import { GAME_PLAY, router } from '@/router';
export default {
    setup() {
        const onClick = async () => {
            const { fetchQuestions, questions: fetchedQuestions } = useQuestions();
            const { startGame, addQuestions } = useGame();
            //TODO: Handle error situation, loading state
            await fetchQuestions();
            addQuestions(fetchedQuestions.value);
            startGame();
            router.push({ name: GAME_PLAY });
        };
        return {
            onClick,
        };
    },
};
</script>

<style></style>
