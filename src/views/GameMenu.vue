<template>
    <h1 class="is-size-1 has-text-centered has-text-weight-bold	">Quizzy</h1>
    <p class="is-size-4 has-text-centered">A trivia game</p>
    <p class="has-text-centered mt-4">
        You will be presented with 10 questions in the selected category and you have 15 seconds to
        answer each question. Two lifelines exist on the bottom of the screen; one will give you an
        additional ten seconds of time and the other eliminates two wrong anwsers. But use them
        wisely, you only get to use them once! Good luck!
    </p>
    <div class="box mt-5">
        <p class="subtitle">Choose category</p>
        <div class="columns is-multiline is-mobile">
            <div
                class="column is-one-quarter category"
                v-for="category in categories"
                :key="category.id"
                @click="onClickCategory(category.id)"
                data-cy="category"
            >
                <p v-if="category.isSelected" class="is-size-7 has-text-info has-text-weight-bold">
                    {{ category.name }}
                </p>
                <p v-else class="is-size-7">
                    {{ category.name }}
                </p>
            </div>
        </div>
    </div>

    <div class="container has-text-centered">
        <button class="button is-large" @click="onClickPlay" data-cy="startButton">
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
import { computed, ref } from 'vue';
export default {
    async setup() {
        const selectedCategoryId = ref(-1);
        const {
            fetchQuestions,
            fetchCategories,
            categories: fetchedCategories,
            questions: fetchedQuestions,
        } = useQuestions();

        await fetchCategories();

        const categories = computed(() =>
            fetchedCategories.value.map((category) => ({
                ...category,
                isSelected: category.id === selectedCategoryId.value,
            }))
        );
        const onClickPlay = async () => {
            const { startGame, addQuestions } = useGame();
            //TODO: Handle error situation, loading state
            await fetchQuestions(selectedCategoryId.value);
            addQuestions(fetchedQuestions.value);
            startGame();
            router.push({ name: GAME_PLAY });
        };
        const onClickCategory = (id) => {
            selectedCategoryId.value = id;
        };

        return {
            onClickPlay,
            onClickCategory,
            categories,
            selectedCategoryId,
        };
    },
};
</script>

<style scoped>
.category:hover {
    background-color: #eee;
    cursor: pointer;
}
</style>
