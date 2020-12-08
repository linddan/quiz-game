<template>
    <h1 class="is-size-1 has-text-centered">New Game</h1>
    <p class="has-text-centered">This is where the player gets to configure the game</p>
    <div class="block field is-grouped is-grouped-centered">
        <p class="control">
            <a class="button is-primary" @click="onClick">
                Let's play!
            </a>
        </p>
    </div>
</template>

<script>
import useQuestions from '../composables/useQuestions';
import useGame from '../composables/useGame';
import { router } from '@/router';
export default {
    setup() {
        const onClick = async () => {
            const { fetchQuestions, questions: fetchedQuestions } = useQuestions();
            const { startGame, addQuestions } = useGame();
            //TODO: Handle error situation, loading state
            await fetchQuestions();
            addQuestions(fetchedQuestions.value);
            startGame();
            router.push({ name: 'GamePlay' });
        };
        return {
            onClick,
        };
    },
};
</script>

<style></style>
