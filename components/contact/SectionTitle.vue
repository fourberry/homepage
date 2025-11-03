<template>
    <h3 class="highlight-title relative isolate w-fit font-medium md:text-xl">
        <slot />
    </h3>
</template>

<script setup lang="ts"></script>

<style scoped>
.highlight-title::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    left: 0px;
    transition-property: all;
    transition-duration: 0.7s;
    transition-delay: 0.5s;
    transition-timing-function: ease-in;
    background-color: rgba(0, 191, 255, 0.3);
    bottom: 0.3328px;
    height: 5.96875px;
    width: 100%;
}
</style>
