<template>
    <main>
        <n-space vertical align="center">
            <img draggable="false" src="../../public/404.svg" width="256" />
            <h1 class="h404">404</h1>
            <p>Diese Seite wurde nicht gefunden.</p>
        </n-space>
    </main>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'
</script>

<style scoped>
img {
    margin-top: 2rem;
}

.h404 {
    margin: 0 auto 0 auto;
    font-size: 4rem;
}
</style>