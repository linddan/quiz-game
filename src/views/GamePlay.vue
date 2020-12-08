<template>
    <h1 class="is-size-1 has-text-centered">Question #{{ questionIndex + 1 }}</h1>
    <countdown-bar :value="elapsedMilliSeconds" :max="maxMilliSeconds" />
    <transition>
        <question-card
            v-if="currentQuestion"
            :question="currentQuestion.question"
            :answers="answers"
            @answered="onAnswered"
        />
    </transition>
    <lifeline-area class="mt-3" :lifelines="lifelines" @lifeline="onLifelineUsed" />
</template>

<script>
import { computed, onUnmounted, ref } from 'vue';
import { shuffle } from 'lodash';
import { GAME_SUMMARY, router } from '@/router';
import useGame from '@/composables/useGame';
import QuestionCard from '../components/QuestionCard.vue';
import CountdownBar from '@/components/CountdownBar.vue';
import LifelineArea from '@/components/LifelineArea.vue';
import { getRoundedTime } from '@/utils/game';

export default {
    components: { QuestionCard, CountdownBar, LifelineArea },
    setup() {
        const { questions, addUserAnswer, endGame, lifelines, consumeLifeline } = useGame();
        const questionIndex = ref(0);
        const elapsedMilliSeconds = ref(0);
        const maxMilliSeconds = ref(15000);
        const currentQuestion = computed(() => questions.value[questionIndex.value]);

        // Advance question or end game
        const proceed = () => {
            if (questionIndex.value + 1 < questions.value.length) {
                questionIndex.value++;
                elapsedMilliSeconds.value = 0;
            } else {
                endGame();
                router.push({ name: GAME_SUMMARY });
            }
        };

        const timer = setInterval(() => {
            if (elapsedMilliSeconds.value < maxMilliSeconds.value) {
                elapsedMilliSeconds.value += 100;
            } else {
                proceed();
            }
        }, 100);

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
                time: getRoundedTime(elapsedMilliSeconds.value / 1000),
            });
            proceed();
        };
        const onLifelineUsed = (lifeline) => {
            if (lifeline.type === 'FIFTY_FIFTY') {
                currentQuestion.value.incorrectAnswers = currentQuestion.value.incorrectAnswers.slice(
                    2
                );
            } else if (lifeline.type === 'PLUS_TEN') {
                // TODO: Handle max correctly
                elapsedMilliSeconds.value -= 10000;
                maxMilliSeconds.value += 10000;
            }
            consumeLifeline(lifeline.id);
        };

        // Lifecycle hooks
        onUnmounted(() => {
            clearInterval(timer);
        });

        return {
            currentQuestion,
            answers,
            onAnswered,
            onLifelineUsed,
            questionIndex,
            elapsedMilliSeconds,
            maxMilliSeconds,
            lifelines,
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
