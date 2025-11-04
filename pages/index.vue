<template>
    <div class="overflow-x-hidden" ref="mainContainer">
        <div class="relative h-screen overflow-hidden">
            <HomeSectionTop class="absolute inset-0 h-full w-full" />
        </div>
        <HomeSectionInfo />
        <HomeSectionBusiness />
        <HomeSectionValues />
        <HomeSectionCEO />
        <HomeSectionTimeline />
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
