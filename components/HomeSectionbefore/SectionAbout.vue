<template>
    <BaseSection class="panel h-dvh border-t border-gray-200 bg-white py-16 md:py-24" text-color="#111827">
        <div class="mx-auto mt-4 flex h-full w-full max-w-8xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div class="mb-10 text-center md:mb-16">
                <h2 class="mb-4 text-4xl font-extrabold text-gray-900 sm:mb-6 md:text-[80px]">WHAT WE DO</h2>
                <p class="section-description mx-auto max-w-3xl break-keep text-xl font-bold leading-relaxed text-gray-700 md:text-[40px]">
                    포베리는
                    <span class="font-semibold text-primary">사람 중심</span>
                    의 IT 기술 발전을 위해
                    <span class="font-semibold text-primary">AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의</span>
                    사업에 매진하고 있습니다.
                </p>
            </div>

            <div ref="businessAreas" class="wide-image-container flex flex-col gap-2 lg:gap-3">
                <div class="area-card group relative h-16 overflow-hidden rounded-lg shadow-md md:h-28">
                    <img
                        src="/images/homeAbout/whatWeDo_1.jpg"
                        alt="시스템 통합 배경"
                        class="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                        style="will-change: transform, opacity"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div class="relative z-10 flex h-full flex-col justify-center p-4 text-white md:p-5">
                        <h3 class="mb-1 text-lg font-semibold md:text-xl">시스템 통합 및 유지보수</h3>
                        <p class="text-white-300 hidden text-xs leading-tight md:block md:text-sm">비즈니스 환경에 최적화된 시스템 구축 및 운영</p>
                    </div>
                </div>

                <div class="area-card group relative h-16 overflow-hidden rounded-lg shadow-md md:h-28">
                    <img
                        src="/images/homeAbout/whatWeDo_2.jpg"
                        alt="솔루션 개발 배경"
                        class="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                        style="object-position: 80% 80%; will-change: transform, opacity"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div class="relative z-10 flex h-full flex-col justify-center p-4 text-white md:p-5">
                        <h3 class="mb-1 text-lg font-semibold md:text-xl">자체 솔루션 개발</h3>
                        <p class="text-white-300 hidden text-xs leading-tight md:block md:text-sm">SSO, 웹 자동화 등 가치를 더하는 기술 개발</p>
                    </div>
                </div>

                <div class="area-card group relative h-16 overflow-hidden rounded-lg shadow-md md:h-28">
                    <img
                        src="/images/homeAbout/whatWeDo_3.jpg"
                        alt="AI/빅데이터 배경"
                        class="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                        style="will-change: transform, opacity"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div class="relative z-10 flex h-full flex-col justify-center p-4 text-white md:p-5">
                        <h3 class="mb-1 text-lg font-semibold md:text-xl">AI/빅데이터 R&D</h3>
                        <p class="text-white-300 hidden text-xs leading-tight md:block md:text-sm">AI, 빅데이터 기술 활용 혁신 솔루션 연구</p>
                    </div>
                </div>

                <div class="area-card group relative h-16 overflow-hidden rounded-lg shadow-md md:h-28">
                    <img
                        src="/images/homeAbout/whatWeDo_5.jpg"
                        alt="IT 컨설팅 배경"
                        class="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                        style="object-position: 20% 30%; will-change: transform, opacity"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    <div class="relative z-10 flex h-full flex-col justify-center p-4 text-white md:p-5">
                        <h3 class="mb-1 text-lg font-semibold md:text-xl">IT 컨설팅</h3>
                        <p class="text-white-300 hidden text-xs leading-tight md:block md:text-sm">비즈니스 목표 달성을 위한 최적의 IT 전략 제시</p>
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
.wide-image-container {
    width: 90vw; /* 뷰포트(화면) 전체 너비 */
    position: relative;
    left: 50%;

    /* left: 50%로 요소의 왼쪽 끝을 화면 중앙으로 민 다음,
    margin-left: -50vw로 뷰포트 너비의 절반만큼 다시 왼쪽으로 당겨
    중앙 정렬된 부모 컨테이너와 관계없이 화면 전체에 걸치도록 만듭니다.
  */
    margin-left: -45vw;
}
</style>
