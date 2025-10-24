<script setup lang="ts">
import bgImage4 from '../public/images/4.jpg'
</script>

<template>
  <BaseSection
      class="panel h-dvh cta-section-identifier" :background-image-url="bgImage4" text-color="#ffffff" >
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center cta-section h-full py-8 px-4 sm:px-6">
    <div class="strengths text-left">
      <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
        FOURBERRY STRENGTHS
      </h3>
      <ul class="space-y-3 sm:space-y-4">
        <li>
          <strong class="text-blue-400 text-sm sm:text-base">✓ 사람 중심 철학:</strong><br>
          <span class="text-gray-300 text-xs sm:text-sm md:text-base">사용자를 최우선으로 생각하는 시스템을 구축합니다. </span>
        </li>
        <li>
          <strong class="text-blue-400 text-sm sm:text-base">✓ 미래 기술 선도:</strong><br>
          <span class="text-gray-300 text-xs sm:text-sm md:text-base">AICBM 기반 기술과 R&D 투자로 혁신을 추구합니다. </span>
        </li>
        <li>
          <strong class="text-blue-400 text-sm sm:text-base">✓ 자체 솔루션 보유:</strong><br>
          <span class="text-gray-300 text-xs sm:text-sm md:text-base">Berry-Pass(SSO), Berry-Mine(웹 자동화) 등 검증된 솔루션을 제공합니다.</span>
        </li>
        <li>
          <strong class="text-blue-400 text-sm sm:text-base">✓ 풍부한 프로젝트 경험:</strong><br>
          <span class="text-gray-300 text-xs sm:text-sm md:text-base">다양한 산업 분야의 SI/SM 프로젝트 성공 경험을 보유하고 있습니다. (e.g., 동행복권, 쿠쿠, 농협 등)</span>
        </li>
        <li>
          <strong class="text-blue-400 text-sm sm:text-base">✓ 최고의 팀워크:</strong><br>
          <span class="text-gray-300 text-xs sm:text-sm md:text-base">검증된 역량과 뛰어난 팀워크로 최상의 결과물을 만듭니다. </span>
        </li>
      </ul>
    </div>

    <div class="inquiry text-center md:text-left">
      <h2 class="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6 sm:mb-8">
        함께 성장할<br class="hidden sm:block" />
        프로젝트를<br class="hidden sm:block" />
        기다립니다.
      </h2>
      <NuxtLink
          to="/contact"
          class="inline-block bg-blue-600 text-white rounded-lg
                   py-2 px-6 text-base sm:py-3 sm:px-8 sm:text-lg md:py-4 md:px-10
                   no-underline font-bold transition-transform duration-200
                   ease-in-out hover:scale-105 contact-button">
        프로젝트 문의하기
      </NuxtLink>
    </div>
  </div>
  </BaseSection>
</template>

<style scoped>
/* BaseSection에 배경 이미지가 적용되므로 추가 스타일 불필요할 수 있음 */
</style>