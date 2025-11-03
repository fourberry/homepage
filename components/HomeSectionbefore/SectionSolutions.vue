<template>
    <BaseSection class="panel font-roman-section h-dvh border-t border-black bg-white" text-color="#111827">
        <div class="flex h-full flex-col justify-center text-center">
            <h2 class="section-title mb-3 text-3xl font-extrabold text-gray-900 sm:mb-6 sm:text-5xl md:text-7xl">SOLUTION PROGRAM</h2>
            <p class="section-description large mb-2 text-base leading-relaxed text-gray-700 sm:text-lg md:mb-10 md:text-xl">고객의 비즈니스에 새로운 가치를 더하는 포베리만의 기술력을 만나보세요.</p>
            <div class="solution-cards mb-8 flex flex-col items-center gap-4 sm:gap-6 md:mb-10 md:flex-row md:justify-center md:gap-8">
                <div class="flex w-full max-w-[300px] flex-col items-center bg-white p-4 text-center sm:max-w-[350px] sm:p-6 md:p-8">
                    <NuxtImg :src="ssoIconUrl" alt="SSO 아이콘" class="mb-2 h-20 w-20 text-primary sm:mb-4 sm:h-24 sm:w-24 md:h-72 md:w-72" />
                    <h3 class="mb-1 text-lg font-semibold text-gray-800 sm:mb-2 sm:text-xl md:text-2xl">베리패스 (Berry-Pass)</h3>
                </div>
                <div class="flex w-full max-w-[300px] flex-col items-center bg-white p-4 text-center sm:max-w-[350px] sm:p-6 md:p-8">
                    <NuxtImg :src="scrapingIconUrl" alt="웹 자동화 아이콘" class="mb-2 h-16 w-16 text-primary sm:mb-4 sm:h-20 sm:w-20 md:h-24 md:w-24" />
                    <h3 class="mb-1 text-lg font-semibold text-gray-800 sm:mb-2 sm:text-xl md:text-2xl">베리마인 (Berry-Mine)</h3>
                </div>
            </div>
            <NuxtLink
                to="/services"
                class="details-button inline-block rounded-lg border border-primary px-6 py-2 text-base font-bold text-primary no-underline transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-700 sm:px-8 sm:py-3 sm:text-lg md:px-10 md:py-4"
            >
                SEE ALL PRODUCT
            </NuxtLink>
        </div>
    </BaseSection>
</template>

<script setup lang="ts">
// ✨ 아이콘 이미지 경로 (실제 파일 경로로 변경 필요)
const ssoIconUrl = '/images/homeSolution/sso_4.png' // '../public/' 제거하고 '/' 로 시작
const scrapingIconUrl = '/images/homeSolution/web_scraper.svg'
</script>

<style scoped>
/* 카드 호버 효과는 유지 */
.solution-cards .card {
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}
.solution-cards .card:hover {
    transform: translateY(-5px);
    /* ✨ tailwind.config.js 에 정의된 shadow-card-hover 같은 것을 사용하거나 직접 정의 */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* ✨ 아이콘 색상 적용 (SVG 파일 자체에 색이 없다면) */
/* .card img {
  filter: invert(15%) sepia(99%) saturate(4511%) hue-rotate(211deg) brightness(96%) contrast(101%);
} */
/* 또는 Tailwind의 text-primary 클래스를 SVG 내부 path에 직접 적용하는 방법도 있습니다. */
</style>
