<template>
  <BaseSection
      class="panel h-dvh bg-white border-t border-gray-200 py-16 md:py-24"
      text-color="#111827"
  >
    <div class="text-center h-full flex flex-col justify-center max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-10 md:mb-16">
        <h2 class="text-4xl md:text-[80px] font-extrabold mb-4 sm:mb-6 text-gray-900">
          SI & SM
        </h2>
<!--        <h3 class="text-xl md:text-[40px] font-bold text-secondary mb-4 sm:mb-6">-->
<!--          Transform, Tomorrow, Together-->
<!--        </h3>-->
        <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          포베리는 AICBM 기술을 중심으로 고객의 비즈니스에 새로운 가치를 더하는 SI/SM 사업을 수행합니다.
        </p>
      </div>

      <div class="flex flex-col gap-2 lg:gap-3">

        <div class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group">
          <NuxtImg src="/images/cuckoo.svg" alt="Cuckoo Project" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"/>
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-white text-left">
            <h3 class="text-lg md:text-xl font-semibold mb-1">CUCKOO</h3>
            <p class="text-xs md:text-sm text-gray-300 leading-tight hidden md:block">Cuckoo Electronics SI/SM Project</p>
          </div>
        </div>

        <div class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group">
          <NuxtImg src="/images/hanaro.svg" alt="Hanaro Project" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"/>
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-white text-left">
            <h3 class="text-lg md:text-xl font-semibold mb-1">HANARO TNS</h3>
            <p class="text-xs md:text-sm text-gray-300 leading-tight hidden md:block">Hanaro TNS SI/SM Project</p>
          </div>
        </div>

        <div class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group">
          <NuxtImg src="/images/kobc.svg" alt="KOBC Project" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"/>
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-white text-left">
            <h3 class="text-lg md:text-xl font-semibold mb-1">KOBC</h3>
            <p class="text-xs md:text-sm text-gray-300 leading-tight hidden md:block">KOBC SI/SM Project</p>
          </div>
        </div>

        <NuxtLink to="/projects" class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-800">
          <div class="text-center">
            <h3 class="text-lg md:text-xl font-semibold mb-1">SEE ALL PROJECTS</h3>
            <p class="text-xs md:text-sm text-gray-600 leading-tight">전체 프로젝트 보러가기 &rarr;</p>
          </div>
        </NuxtLink>

      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
// 기존 로고 변수는 이 디자인에서 직접 사용되지 않으므로 비워둡니다.
</script>

<style scoped>
/* .text-secondary 스타일 (tailwind.config.js에 정의되지 않은 경우) */
.text-secondary {
  color: #6366f1; /* 예시 색상 (Indigo 500) */
}

/* SVG 로고가 기본적으로 흰색일 경우, 어두운 배경에서 보이도록
  filter: invert(1);
  를 적용해야 할 수 있습니다.
  현재는 로고가 색상을 가지고 있다고 가정합니다.
*/
.logo-icon {
  /* 필요하다면 SVG 색상 필터링 */
  /* filter: invert(1) brightness(2); */
}
</style>