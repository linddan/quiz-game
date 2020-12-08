<template>
    <p class="subtitle has-text-centered">{{ timeLeft }}</p>
    <progress class="is-small progress" :value="max - value" :max="max" />
</template>

<script>
import { getRoundedTime } from '@/utils/game';
import { computed } from 'vue';

export default {
    props: {
        max: Number,
        value: Number,
    },
    setup(props) {
        const timeLeft = computed(() => getRoundedTime((props.max - props.value) / 1000));
        return { timeLeft };
    },
};
</script>

<style></style>
