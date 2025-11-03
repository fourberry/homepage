<template>
    <section ref="sectionRef" class="panel relative min-h-dvh overflow-hidden border-t border-gray-200 bg-white py-0 md:py-0">
        <div class="h-dvh">
            <div ref="flexContainer" class="flex h-full snap-x snap-mandatory flex-row flex-nowrap items-center overflow-x-auto md:snap-none md:overflow-x-visible">
                <div class="flex-panel-title flex h-full w-[90vw] flex-shrink-0 flex-col justify-center px-4 text-center sm:px-6 md:w-[30vw] md:text-left lg:px-12">
                    <div class="break-keep">
                        <h2 class="mb-4 text-4xl font-extrabold text-gray-950 md:mb-12 md:text-[80px]">SI & SM</h2>
                        <p class="mx-auto max-w-3xl text-xl font-bold leading-relaxed text-gray-700 sm:text-lg md:text-[16px]">비즈니스에 새로운 가치를 더하는 SI/SM 사업</p>
                    </div>
                </div>

                <div class="flex-panel-card _1 flex h-full w-[80vw] flex-shrink-0 items-center justify-center p-3 md:w-[30vw] md:p-4">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/cuckoo.svg" alt="Cuckoo Project" />
                        </div>
                        <div class="description">
                            <p class="kind">CUCKOO</p>
                            <p class="title">OMS 및 차세대 영업관리 시스템 구축</p>
                        </div>
                        <h3 class="h3 my-0">CUCKOO</h3>
                    </div>
                </div>

                <div class="flex-panel-card _2 flex h-full w-[80vw] flex-shrink-0 items-center justify-center p-3 md:w-[30vw] md:p-4">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/hanaro.svg" alt="Hanaro Project" />
                        </div>
                        <div class="description">
                            <p class="kind">WITH FRESH</p>
                            <p class="title">브랜드몰 (하이브리드 앱) 및 SSO 구축</p>
                        </div>
                        <h3 class="h3 my-0">WITH FRESH</h3>
                    </div>
                </div>

                <div class="flex-panel-card _3 flex h-full w-[80vw] flex-shrink-0 items-center justify-center p-3 md:w-[30vw] md:p-4">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/kobc.svg" alt="KOBC Project" />
                        </div>
                        <div class="description">
                            <p class="kind">KOBC</p>
                            <p class="title">게이미피케이션 접목 캠페인 (PC/모바일)</p>
                        </div>
                        <h3 class="h3 my-0">KOBC</h3>
                    </div>
                </div>

                <div class="flex-panel-card _4 flex h-full w-[80vw] flex-shrink-0 items-center justify-center p-3 md:w-[30vw] md:p-4"></div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const flexContainer = ref<HTMLElement | null>(null)
const ctx = ref<gsap.Context | null>(null)

onMounted(() => {
    if (!sectionRef.value || !flexContainer.value) return

    ctx.value = gsap.context(() => {
        gsap.matchMedia().add(
            {
                isDesktop: '(min-width: 768px)',
                isMobile: '(max-width: 767px)',
            },
            context => {
                const { isDesktop } = context.conditions as { isDesktop: boolean }

                if (isDesktop) {
                    const wrapper = flexContainer.value!

                    gsap.to(wrapper, {
                        x: () => -(wrapper.scrollWidth - document.documentElement.clientWidth) + 'px',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.value,
                            pin: true,
                            scrub: 1,
                            end: () => '+=' + (wrapper.scrollWidth - document.documentElement.clientWidth),
                            invalidateOnRefresh: true,
                        },
                    })
                }
            }
        )
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx.value) {
        ctx.value.revert()
    }
})
</script>

<style scoped>
/* [CSS 수정 1] 변수 정의 */
.panel {
    --card-height-mobile-default: 16rem;
    --card-height-desktop-default: 24rem; /* md:h-96 */
}

/* --- [CSS 추가 2] "Target" 예제의 스타일을 복사 및 수정 --- */

/* 2-1. 그라데이션 배경색 (카드 패널에 적용) */
.flex-panel-card._1 {
    background: linear-gradient(135deg, #ffa800, #ff5d17);
}
.flex-panel-card._2 {
    background: linear-gradient(135deg, #12d6f0, #12f093);
}
.flex-panel-card._3 {
    background: linear-gradient(135deg, #3f1ca0, #a912f0);
}
/* 2-2. 'SEE ALL PROJECTS'용 배경 */
.flex-panel-card._4 {
    background: #f3f4f6; /* bg-gray-100 */
}
/* NuxtLink의 기본 배경/그림자 제거 */
.flex-panel-card._4 .flex-card {
    background-color: transparent;
    box-shadow: none;
    border: none;
}

/* 2-3. 새 카드 레이아웃 스타일 */
.portfolio-item-replacement {
    display: flex;
    flex-direction: column;
    padding: 30px 0; /* 상하 패딩 */
    box-sizing: border-box;
    height: var(--card-height-desktop-default);

    /* 호버 시 줌 효과 (선택 사항) */
    transition: transform 0.4s ease-in-out;
}
.portfolio-item-replacement:hover {
    transform: scale(1.02);
}

/* 2-4. 썸네일 (이미지) */
.thumbnail {
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 0 2rem; /* 좌우 패딩 */
    box-sizing: border-box;
    height: 12rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.thumbnail img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain; /* 로고가 잘리지 않게 contain으로 */
    opacity: 0.8; /* 예제와 비슷하게 */
}

/* 2-5. 텍스트 설명 */
.description {
    width: 100%;
    position: relative;
    text-align: left;
    margin: 20px auto 0;
    padding: 0 2rem; /* 좌우 패딩 */
    box-sizing: border-box;
}

/* 텍스트 색상 관리 */
.flex-panel-card._1 .description,
.flex-panel-card._3 .description {
    color: #fff;
}
.flex-panel-card._2 .description {
    color: #000;
}

.description p {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif; /* 폰트 지정 */
}
.description p.kind {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 8px;
}
.description p.title {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;
}

/* 2-6. 메인 타이틀 (h3) */
.h3 {
    font-family: 'Poppins', sans-serif; /* 폰트 지정 */
    font-weight: 900;
    color: #fff;
    font-size: 4rem; /* 폰트 크기 조절 */
    letter-spacing: -1.92px;
    text-align: center;
    margin: 10px auto 0;
    position: relative;
}

/* h3 텍스트 색상 조정 */
.flex-panel-card._2 .h3 {
    color: #000;
}

/* [CSS 수정 3] .flex-card는 NuxtLink에도 쓰이므로 높이/정렬만 설정 */
.flex-card {
    height: var(--card-height-desktop-default);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: none;
}

/* [CSS 수정 4] 모바일 반응형 */
@media (max-width: 767px) {
    /* 기존 3D 플립 스타일(.face1, .face2 등)은 모두 제거 */

    .flex-panel-card {
        height: var(--card-height-mobile-default); /* 모바일 패널 높이 */
    }
    .portfolio-item-replacement,
    .flex-card {
        height: var(--card-height-mobile-default); /* 모바일 카드 높이 */
        padding: 15px 0;
    }
    .h3 {
        font-size: 2.5rem; /* 모바일용 h3 폰트 크기 */
    }
    .description p.kind {
        font-size: 1.2rem;
    }
    .description p.title {
        font-size: 1rem;
    }
}

/* (선택 사항) 모바일에서 가로 스크롤바 숨기기 */
.overflow-x-auto::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
}
.overflow-x-auto {
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
