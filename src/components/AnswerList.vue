<template>
    <a v-for="(answer, index) in answers" :key="index" class="panel-block">
        <span class="panel-icon">
            <i class="fas fa-arrow-alt-circle-right" aria-hidden="true"></i>
        </span>
        bulma
    </a>
    <!-- <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth">
                Reset all filters
            </button>
        </div> -->
</template>

<script>
export default {
    props: {
        answers: Array,
    },
};
</script>

<style></style>
