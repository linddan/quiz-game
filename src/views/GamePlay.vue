<template>
    <section>
        <div class="container columns is-vcentered">
            <div class="column is-8 is-offset-2">
                <h1 class="is-size-1 has-text-centered">Play Screen</h1>
                <p class="has-text-centered">This is where the player answers questions</p>
                <p class="has-text-centered">{{ questions }}</p>
            </div>
        </div>
    </section>
</template>

<script>
import useGame from '@/composables/useGame';
export default {
    setup() {
        const { questions } = useGame();
        return {
            questions,
        };
    },
};
</script>

<style></style>
