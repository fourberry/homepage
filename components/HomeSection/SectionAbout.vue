<template>
  <BaseSection
      class="panel bg-white border-t border-gray-200 py-16 md:py-24 h-dvh" text-color="#111827"
  >
    <div class="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-[80px] font-extrabold mb-4 sm:mb-6 text-gray-900">
          WHAT WE DO
        </h2>
        <p class="text-xl md:text-[40px] font-bold text-gray-700 leading-relaxed max-w-3xl mx-auto">
          포베리는 <span class="text-primary font-semibold">사람 중심</span>의 IT 기술 발전을 위해
          <span class="text-primary font-semibold">AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의</span> 사업에 매진하고 있습니다.
        </p>
      </div>

      <div
          ref="businessAreas"
          class="flex flex-col gap-2 lg:gap-3"
      >
        <div class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group"> <img src="/images/whatWeDo_1.jpg" alt="시스템 통합 배경" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100"> <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div> <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-white"> <h3 class="text-lg md:text-xl font-semibold mb-1">시스템 통합 및 유지보수</h3>
          <p class="text-xs md:text-sm text-gray-300 leading-tight hidden md:block">비즈니스 환경에 최적화된 시스템 구축 및 운영</p>
        </div>
        </div>

        <div class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group">
          <img src="/images/whatWeDo_2.jpg" alt="솔루션 개발 배경" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-white">
            <h3 class="text-lg md:text-xl font-semibold mb-1">자체 솔루션 개발</h3>
            <p class="text-xs md:text-sm text-gray-300 leading-tight hidden md:block">SSO, 웹 자동화 등 가치를 더하는 기술 개발</p>
          </div>
        </div>

        <div class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group">
          <img src="/images/whatWeDo_3.jpg" alt="AI/빅데이터 배경" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-white">
            <h3 class="text-lg md:text-xl font-semibold mb-1">AI/빅데이터 R&D</h3>
            <p class="text-xs md:text-sm text-gray-300 leading-tight hidden md:block">AI, 빅데이터 기술 활용 혁신 솔루션 연구</p>
          </div>
        </div>

        <div class="relative rounded-lg overflow-hidden shadow-md h-24 md:h-28 group">
          <img src="/images/whatWeDo_5.jpg" alt="IT 컨설팅 배경" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-white">
            <h3 class="text-lg md:text-xl font-semibold mb-1">IT 컨설팅</h3>
            <p class="text-xs md:text-sm text-gray-300 leading-tight hidden md:block">비즈니스 목표 달성을 위한 최적의 IT 전략 제시</p>
          </div>
        </div>

      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
// 스크립트 내용은 변경 없음
</script>

<style scoped>
/* 필요 시 추가 스타일 */
.text-secondary {
  color: #6366f1; /* 실제 프로젝트 색상 코드로 변경하세요 */
}
</style>