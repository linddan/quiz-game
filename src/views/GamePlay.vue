<template>
    <h1 class="is-size-1 has-text-centered">Question #{{ questionIndex }}</h1>
    <time-bar />
    <question-card
        v-if="nextQuestion"
        :question="nextQuestion.question"
        :answers="answers"
        @answered="onAnswered"
    />
    <lifelines />
</template>

<script>
import { computed } from 'vue';
import router from '@/router';
import useGame from '@/composables/useGame';
import QuestionCard from '../components/QuestionCard.vue';
import TimeBar from '@/components/TimeBar.vue';
import Lifelines from '@/components/Lifelines.vue';
import { getNoOfUnansweredQuestions } from '@/utils/game';

export default {
    components: { QuestionCard, TimeBar, Lifelines },
    setup() {
        const { isNotGameStarted, isGameFinished, nextQuestion, questions } = useGame();

        // Handle case where user is not in playing state
        // (e.g. navigates directly to the routes)
        if (isNotGameStarted.value) {
            router.push({ name: 'GameMenu' });
        } else if (isGameFinished.value) {
            router.push({ name: 'GameSummary' });
        }

        // TODO: Shuffle answers
        const answers = computed(() => [
            nextQuestion.value.correctAnswer,
            ...nextQuestion.value.incorrectAnswers,
        ]);

        const questionIndex = computed(
            () => questions.value.length - getNoOfUnansweredQuestions(questions.value) + 1
        );

        const onAnswered = (userAnswer) => {
            console.log(userAnswer);
        };

        return {
            nextQuestion,
            answers,
            onAnswered,
            questionIndex,
        };
    },
};
</script>

<style></style>
