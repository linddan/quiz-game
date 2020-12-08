<template>
    <h1 class="is-size-1 has-text-centered">Game Summary</h1>
    <p class="has-text-centered">Here's some information about your game!</p>

    <div class="box mt-5">
        <ul>
            <li>
                Number of correct answers:
                <span>{{ noOfCorrectAnswers }}</span>
            </li>
            <li>
                Number of incorrect answers:
                <span>{{ noOfIncorrectAnswers }}</span>
            </li>
            <li>
                Number of unanswered questions:
                <span>{{ noOfUnansweredQuestions }}</span>
            </li>
            <li v-if="shouldDisplayStat(averageTimePerQuestion)">
                Average time per question:
                <span>{{ averageTimePerQuestion }} seconds</span>
            </li>
            <li v-if="shouldDisplayStat(quickestAnswer)">
                Quickest answer:
                <span>{{ quickestAnswer }} seconds</span>
            </li>
            <li v-if="shouldDisplayStat(slowestAnswer)">
                Slowest answer:
                <span>{{ slowestAnswer }} seconds</span>
            </li>
        </ul>
    </div>

    <button class="button is-large" @click="onClick">
        <span class="icon is-medium">
            <i class="fas fa-angle-double-right"></i>
        </span>
        <span>Play again</span>
    </button>
</template>

<script>
import useGame from '@/composables/useGame';
import { router, GAME_MENU } from '@/router';
import { getStatistics } from '@/utils/game';
export default {
    setup() {
        const { userAnswers, resetGame, questions } = useGame();
        const onClick = () => {
            resetGame();
            router.push({ name: GAME_MENU });
        };

        const shouldDisplayStat = (state) => state !== -1;

        const {
            noOfCorrectAnswers,
            noOfIncorrectAnswers,
            noOfUnansweredQuestions,
            averageTimePerQuestion,
            quickestAnswer,
            slowestAnswer,
        } = getStatistics(userAnswers.value, questions.value);

        return {
            userAnswers,
            onClick,
            shouldDisplayStat,
            noOfCorrectAnswers,
            noOfIncorrectAnswers,
            noOfUnansweredQuestions,
            averageTimePerQuestion,
            quickestAnswer,
            slowestAnswer,
        };
    },
};
</script>

<style></style>
