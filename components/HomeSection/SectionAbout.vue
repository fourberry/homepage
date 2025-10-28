<template>
  <BaseSection
      class="panel bg-white border-t border-gray-200 py-16 md:py-24 flex flex-col justify-center min-h-screen" text-color="#111827"
  >
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-6 text-gray-900">
          WHAT WE DO
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          포베리는 <span class="text-secondary font-semibold">사람 중심</span>의 IT 기술 발전을 위해
          <span class="text-secondary font-semibold">AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의</span> 사업에 매진하고 있습니다.
        </p>
      </div>

      <div
          ref="businessAreas"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        <div class="text-left p-6 area-card rounded-lg bg-gray-50 shadow-md">
          <NuxtImg src="/images/whatWeDo_1.jpg" alt="시스템 통합 아이콘" class="h-12 w-12 mb-4" />
          <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">시스템 통합 및 유지보수</h3>
          <p class="text-sm sm:text-base text-gray-600 leading-normal">비즈니스 환경에 최적화된 시스템을 구축하고 안정적으로 운영합니다.</p>
          <NuxtLink to="/projects" class="text-primary font-semibold mt-4 inline-block hover:underline">
            View More &rarr;
          </NuxtLink>
        </div>

        <div class="text-left p-6 area-card rounded-lg bg-gray-50 shadow-md">
          <NuxtImg src="/images/whatWeDo_2.jpg" alt="솔루션 개발 아이콘" class="h-12 w-12 mb-4" />
          <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">자체 솔루션 개발</h3>
          <p class="text-sm sm:text-base text-gray-600 leading-normal">SSO, 웹 자동화 등 고객의 비즈니스에 새로운 가치를 더하는 기술을 개발합니다.</p>
          <NuxtLink to="/services" class="text-primary font-semibold mt-4 inline-block hover:underline">
            View More &rarr;
          </NuxtLink>
        </div>

        <div class="text-left p-6 area-card rounded-lg bg-gray-50 shadow-md">
          <NuxtImg src="/images/whatWeDo_3.jpg" alt="AI/빅데이터 아이콘" class="h-12 w-12 mb-4" />
          <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">AI/빅데이터 R&D</h3>
          <p class="text-sm sm:text-base text-gray-600 leading-normal">AI, 빅데이터 기술을 활용한 산학협력을 통해 혁신적인 솔루션을 연구합니다.</p>
          <NuxtLink to="/services" class="text-primary font-semibold mt-4 inline-block hover:underline">
            View More &rarr;
          </NuxtLink>
        </div>

        <div class="text-left p-6 area-card rounded-lg bg-gray-50 shadow-md">
          <NuxtImg src="/images/whatWeDo_1.jpg" alt="IT 컨설팅 아이콘" class="h-12 w-12 mb-4" />
          <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">IT 컨설팅</h3>
          <p class="text-sm sm:text-base text-gray-600 leading-normal">비즈니스 목표 달성을 위한 최적의 IT 전략과 방향성을 제시합니다.</p>
          <NuxtLink to="/about" class="text-primary font-semibold mt-4 inline-block hover:underline">
            View More &rarr;
          </NuxtLink>
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
// 스크립트 내용은 비워둠 (추후 기능 추가 시 사용)
</script>

<style scoped>
/* 기존 카드 호버 효과 유지 */
.area-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.area-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 필요 시 추가 스타일 */
.text-secondary {
  /* 예시: color: #6366f1; */ /* Indigo 500 */
  color: #6366f1; /* 실제 프로젝트 색상 코드로 변경하세요 */
}
.text-primary {
  /* 예시: color: #3b82f6; */ /* Blue 500 */
  color: #3b82f6; /* 실제 프로젝트 색상 코드로 변경하세요 */
}
</style>