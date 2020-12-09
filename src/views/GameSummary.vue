<template>
    <h1 class="is-size-1 has-text-weight-bold has-text-centered">Game Summary</h1>
    <p class="subtitle has-text-centered">{{ message }}</p>

    <div class="box mt-5">
        <table class="table is-bordered is-fullwidth is-striped">
            <tr>
                <td><strong>Number of correct answers:</strong></td>
                <td>{{ noOfCorrectAnswers }}</td>
            </tr>
            <tr>
                <td><strong>Number of incorrect answers:</strong></td>
                <td>{{ noOfIncorrectAnswers }}</td>
            </tr>
            <tr>
                <td><strong>Number of unanswered questions:</strong></td>
                <td>{{ noOfUnansweredQuestions }}</td>
            </tr>
            <tr v-if="shouldDisplayStat(averageTimePerQuestion)">
                <td><strong>Average time per question:</strong></td>
                <td>{{ averageTimePerQuestion }} seconds</td>
            </tr>
            <tr v-if="shouldDisplayStat(quickestAnswer)">
                <td><strong>Quickest answer:</strong></td>
                <td>{{ quickestAnswer }} seconds</td>
            </tr>
            <tr v-if="shouldDisplayStat(slowestAnswer)">
                <td><strong>Slowest answer:</strong></td>
                <td>{{ slowestAnswer }} seconds</td>
            </tr>
        </table>
    </div>

    <div class="container has-text-centered">
        <button class="button is-large" @click="onClick">
            <span class="icon is-medium">
                <i class="fas fa-angle-double-right"></i>
            </span>
            <span>Play again</span>
        </button>
    </div>
</template>

<script>
import useGame from '@/composables/useGame';
import { router, GAME_MENU } from '@/router';
import { getStatistics } from '@/utils/game';
import { computed } from 'vue';
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

        const message = computed(() => {
            const negResult = noOfIncorrectAnswers + noOfUnansweredQuestions;
            return negResult === 0
                ? 'Wow, you aced all the questions!'
                : 'Not bad. Try again and see if you can get them all!';
        });

        return {
            userAnswers,
            message,
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
