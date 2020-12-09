<template>
    <p class="title has-text-centered">{{ timeLeft }}</p>
    <progress class="is-small progress" :value="max - elapsed" :max="max" />
</template>

<script>
import { computed, onUnmounted, ref } from 'vue';
const TIME_INCREMENT_MS = 100;

export default {
    emits: ['timeout', 'tick'],
    props: {
        max: Number,
    },

    setup(props, context) {
        const elapsed = ref(0);
        const timer = setInterval(() => {
            elapsed.value += TIME_INCREMENT_MS;
            if (elapsed.value > props.max) {
                context.emit('timeout');
            }
            context.emit('tick', elapsed.value);
        }, 100);
        const timeLeft = computed(() => Math.ceil((props.max - elapsed.value) / 1000));

        onUnmounted(() => {
            clearInterval(timer);
        });

        return { timeLeft, elapsed };
    },
};
</script>

<style></style>
