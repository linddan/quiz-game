<template>
    <section>
        <div class="columns">
            <div class="column is-6 is-offset-3 mt-4">
                <Suspense>
                    <template #default>
                        <router-view />
                    </template>
                    <template #fallback>
                        <div>Loading...</div>
                    </template>
                </Suspense>
            </div>
        </div>
    </section>
</template>
