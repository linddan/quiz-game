<template>
    <section>
        <div class="container columns is-vcentered">
            <div class="column is-8 is-offset-2">
                <h1 class="is-size-1 has-text-centered">New Game</h1>
                <p class="has-text-centered">This is where the player gets to configure the game</p>
                <div class="field is-grouped is-grouped-centered mt-6">
                    <p class="control">
                        <a class="button is-primary" @click="onClick">
                            Let's play!
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import useQuestions from '../composables/useQuestions';
import useGame from '../composables/useGame';
import router from '@/router';
export default {
    setup() {
        const onClick = async () => {
            const { fetchQuestions, questions: fetchedQuestions } = useQuestions();
            const { startGame, addQuestions } = useGame();
            //TODO: Handle error situation, loading state
            await fetchQuestions();
            addQuestions(fetchedQuestions);
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
