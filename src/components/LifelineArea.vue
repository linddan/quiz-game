<template>
    <div class="card">
        <footer class="card-footer">
            <a
                href="#"
                v-for="(lifeline, index) in lifelines"
                :class="{
                    'card-footer-item': true,
                    used: lifeline.isUsed,
                    unused: !lifeline.isUsed,
                }"
                :key="index"
                @click="onClick(lifeline)"
                data-cy="lifeline"
            >
                <span class="subtitle has-text-weight-bold">{{ lifeline.name }}</span>
            </a>
        </footer>
    </div>
</template>

<script>
export default {
    emits: ['lifeline'],
    props: {
        lifelines: Array,
    },
    setup(_, context) {
        const onClick = (lifeline) => {
            if (!lifeline.isUsed) {
                context.emit('lifeline', lifeline);
            }
        };
        return { onClick };
    },
};
</script>

<style scoped>
.used {
    opacity: 0.5;
    background-color: #eee;
    cursor: default;
}
.unused:hover {
    background-color: #efe;
}
</style>
