<template>
    <div class="overflow-x-hidden" ref="mainContainer">
        <HomeSectionTop class="absolute inset-0 h-full w-full" />
        <HomeSectionInfo />
        <HomeSectionBusiness />
        <HomeSectionValues />
        <HomeSectionCEO />
        <HomeSectionbeforeSectionSiSm />
        <HomeSectionSolution />
        <HomeSectionCulture />
        <SectionContact />
        <HomeSectionFact />
    </div>
</template>

<script setup lang="ts">
import SectionContact from '@/components/contact/SectionContact.vue'
</script>
