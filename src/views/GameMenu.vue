<template>
    <h1 class="is-size-1 has-text-centered has-text-weight-bold	">Quizzy</h1>
    <p class="is-size-4 has-text-centered">A trivia game</p>
    <p class="has-text-centered">
        You will be presented with 10 questions in the selected category. You have 15 seconds to
        answer each question.
    </p>
    <p class="has-text-centered">Good luck!</p>
    <div class="box mt-5">
        <p class="subtitle">Choose category</p>
        <div class="columns is-multiline is-mobile">
            <div
                class="column is-one-quarter category"
                v-for="category in categories"
                :key="category.id"
                @click="onClickCategory(category.id)"
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
        <button class="button is-large" @click="onClickPlay">
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
            console.log(selectedCategoryId.value);
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
