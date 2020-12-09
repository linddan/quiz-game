<template>
    <h1 class="is-size-1 has-text-centered has-text-weight-bold	">Quiz Game</h1>
    <p class="subtitle has-text-centered">A trivia game</p>
    <div class="box mt-5"></div>
    <div class="container has-text-centered">
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
