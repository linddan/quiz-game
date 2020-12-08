<template>
    <h1 class="is-size-1 has-text-centered">Question #{{ questionIndex }}</h1>
    <time-bar />
    <question-card
        v-if="currentQuestion"
        :question="currentQuestion.question"
        :answers="answers"
        @answered="onAnswered"
    />
    <lifelines />
</template>

<script>
import { computed } from 'vue';
import { shuffle } from 'lodash';
import router from '@/router';
import useGame from '@/composables/useGame';
import QuestionCard from '../components/QuestionCard.vue';
import TimeBar from '@/components/TimeBar.vue';
import Lifelines from '@/components/Lifelines.vue';
import { getNoOfUnansweredQuestions } from '@/utils/game';

export default {
    components: { QuestionCard, TimeBar, Lifelines },
    setup() {
        const {
            isNotGameStarted,
            isGameFinished,
            currentQuestion,
            questions,
            addUserAnswer,
        } = useGame();

        // Handle case where user is not in playing state
        // (e.g. navigates directly to the routes)
        if (isNotGameStarted.value) {
            router.push({ name: 'GameMenu' });
        } else if (isGameFinished.value) {
            router.push({ name: 'GameSummary' });
        }

        // TODO: Shuffle answers
        const answers = computed(() =>
            shuffle([
                currentQuestion.value.correctAnswer,
                ...currentQuestion.value.incorrectAnswers,
            ])
        );

        const questionIndex = computed(
            () => questions.value.length - getNoOfUnansweredQuestions(questions.value) + 1
        );

        const onAnswered = (userAnswer) => {
            addUserAnswer(userAnswer);
            console.log(userAnswer);
        };

        return {
            currentQuestion,
            answers,
            onAnswered,
            questionIndex,
        };
    },
};
</script>

<style></style>
