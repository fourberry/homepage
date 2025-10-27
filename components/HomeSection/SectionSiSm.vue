<template>
  <BaseSection
      class="panel h-dvh bg-white border-t border-black font-roman-section"
      text-color="#111827" >
    <div class="text-center h-full flex flex-col justify-center py-8 px-4 sm:px-6">
      <h2 class="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 section-title text-gray-900">
        System Integration
      </h2>
      <p class="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-10 leading-relaxed section-description large">
        다년간 축적된 경험과 기술력을 바탕으로 고객의 비즈니스 환경에 최적화된 시스템을
        설계, 구축하고 안정적으로 운영하여 업무 효율을 극대화합니다.
      </p>
      <div class="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 client-logos">
        <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 sm:gap-x-8 sm:gap-y-4 md:gap-x-12 lg:gap-x-16">
          <img src="/images/cuckoo.svg" alt="Cuckoo 로고" class="h-6 sm:h-8 md:h-10 w-auto filter opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
          <img src="/images/hanaro.svg" alt="Hanaro 로고" class="h-6 sm:h-8 md:h-10 w-auto filter opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
          <img src="/images/kobc.svg" alt="KOBC 로고" class="h-6 sm:h-8 md:h-10 w-auto filter opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
          <img src="/images/lotto.svg" alt="Lotto 로고" class="h-6 sm:h-8 md:h-10 w-auto filter opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
          <img src="/images/sport_university.svg" alt="Sport University 로고" class="h-6 sm:h-8 md:h-10 w-auto filter opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
        </div>
      </div>
      <NuxtLink
          to="/projects"
          class="inline-block text-primary border border-primary rounded-lg
                 py-2 px-6 text-base sm:py-3 sm:px-8 sm:text-lg md:py-4 md:px-10
                 no-underline font-bold transition-all duration-200 ease-in-out
                 hover:bg-blue-700 hover:scale-105 details-button">
        SEE ALL PROJECTS
      </NuxtLink>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
// ✨ 5. 배경 이미지 import 제거
// import bgImage2 from '../public/images/2.jpg'
</script>

<style scoped>
</style>