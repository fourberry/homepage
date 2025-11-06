<template>
    <section class="overflow-hidden bg-background py-24 text-black md:py-36">
        <!-- 상단 헤더 -->
        <header class="mx-auto mb-16 max-w-7xl px-4 text-center md:mb-24 md:px-8 lg:px-12">
            <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-red-300">Strength</p>

            <h2 class="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">최고의 결과를 만드는 포베리의 힘</h2>

            <p class="mx-auto max-w-2xl text-base text-gray-400 md:text-lg">
                기술의 본질과 미래를 탐구하며,
                <br />
                고객의 비즈니스에 가장 확실한 가치를 더합니다.
            </p>
        </header>

        <!-- 카드 그리드 -->
        <div class="grid w-full grid-cols-1 gap-0 md:grid-cols-4">
            <div v-for="(strength, index) in strengthItems" :key="index"
                class="card-container group relative overflow-hidden transition-all duration-500 ease-in-out">
                <!-- 배경 이미지 -->
                <NuxtImg :src="strength.img" :alt="strength.title + ' 이미지'"
                    class="h-auto w-full object-contain object-center opacity-70 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy" />

                <!-- 어둡게 덮는 반투명 레이어 -->
                <div
                    class="absolute inset-0 bg-black bg-opacity-0 transition-colors duration-300 group-hover:bg-opacity-60">
                </div>

                <!-- 텍스트 콘텐츠 (가운데 정렬) -->
                <div
                    class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white md:p-10">
                    <!-- 위에 얇은 라인 -->
                    <span class="mb-6 block h-px w-10 bg-white/50"></span>

                    <!-- 타이틀 -->
                    <h3
                        class="mb-4 text-2xl font-extrabold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] md:text-3xl">
                        {{ strength.title }}
                    </h3>

                    <!-- 설명 -->
                    <div
                        class="whitespace-pre-line text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] md:text-base">
                        {{ strength.desc }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// 카드 데이터
const strengthItems = [
    {
        title: '기술의 본질을 탐구',
        img: '/images/bgcomputer.jpg',
        desc: '변화하는 기술 속에서도 \n' + '우리는 본질을 잃지 않습니다.',
    },
    {
        title: '유연한 사고, 민첩한 실행',
        img: '/images/orange.jpg',
        desc: '아이디어가 있으면 바로 실험!\n' + '신속한 피드백으로 완성도를 높입니다.',
    },
    {
        title: '끊임없는 개선',
        img: '/images/color.jpg',
        desc: '더 나은 오늘을 위해\n' + "우리는 늘 '다음'을 고민합니다.",
    },
    {
        title: '작은 팀, 큰 영향력',
        img: '/images/wave.jpg',
        desc: '작은 팀이지만 큰 목표를 향해.\n' + '우리는 결과로 말합니다.',
    },
]
</script>
