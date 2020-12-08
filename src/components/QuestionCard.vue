<template>
    <div class="card">
        <div class="card-content">
            <p class="title">
                {{ question }}
            </p>
            <a
                v-for="(answer, index) in answers"
                :key="index"
                class="panel-block"
                @click="onClick(answer)"
            >
                <span class="panel-icon">
                    <i class="fas fa-arrow-alt-circle-right" aria-hidden="true"></i>
                </span>
                {{ answer }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['answered'],
    props: {
        question: String,
        answers: Array,
    },
    setup(_, context) {
        const onClick = (answer) => {
            context.emit('answered', answer);
        };
        return { onClick };
    },
};
</script>

<style></style>
