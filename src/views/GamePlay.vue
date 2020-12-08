<template>
    <h1 class="is-size-1 has-text-centered">Question #{{ questionIndex + 1 }}</h1>
    <time-bar />
    <transition>
        <question-card
            v-if="currentQuestion"
            :question="currentQuestion.question"
            :answers="answers"
            @answered="onAnswered"
        />
    </transition>
    <lifelines />
</template>

<script>
import { computed, ref } from 'vue';
import { shuffle } from 'lodash';
import { router } from '@/router';
import useGame from '@/composables/useGame';
import QuestionCard from '../components/QuestionCard.vue';
import TimeBar from '@/components/TimeBar.vue';
import Lifelines from '@/components/Lifelines.vue';

export default {
    components: { QuestionCard, TimeBar, Lifelines },
    setup() {
        const { questions, addUserAnswer, endGame } = useGame();
        const questionIndex = ref(0);
        const currentQuestion = computed(() => questions.value[questionIndex.value]);

        const advanceToNextQuestion = () => questionIndex.value++;

        const answers = computed(() =>
            shuffle([
                currentQuestion.value.correctAnswer,
                ...currentQuestion.value.incorrectAnswers,
            ])
        );

        const onAnswered = (userChoice) => {
            addUserAnswer({
                questionId: currentQuestion.value.id,
                isCorrect: currentQuestion.value.correctAnswer === userChoice,
                time: 0,
            });

            if (questionIndex.value + 1 < questions.value.length) {
                advanceToNextQuestion();
            } else {
                // All questions answered
                endGame();
                router.push({ name: 'GameSummary' });
            }
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

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
</style>
