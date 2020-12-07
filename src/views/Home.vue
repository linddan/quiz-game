<template>
    <section class="section">
        <div class="container">
            <p class="subtitle">{{ questions }}</p>
        </div>
    </section>
</template>

<script>
import useQuestions from '../composables/useQuestions';
export default {
    setup() {
        const { fetchQuestions, questions, error } = useQuestions();
        fetchQuestions();
        return {
            questions,
        };
    },
};
</script>

<style></style>
