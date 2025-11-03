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

                <div class="flex-panel-card _1 relative flex h-full w-[80vw] flex-shrink-0 items-center justify-center overflow-hidden pt-10 md:w-[33vw] md:items-start">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/cuckoo.svg" alt="Cuckoo Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2021.11 ~ 2022.09</p>
                            <p class="title">OMS 및 차세대 영업관리 시스템 구축</p>
                        </div>
                        <h3 class="h3 my-0">CUCKOO</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <div class="flex-panel-card _2 relative flex h-full w-[80vw] flex-shrink-0 items-center justify-center overflow-hidden pt-10 md:w-[33vw] md:items-start">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/hanaro.svg" alt="Hanaro Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.01 ~ 2025.03</p>
                            <p class="title">브랜드몰 (하이브리드 앱) 및 SSO 구축</p>
                        </div>
                        <h3 class="h3 my-0">WITH FRESH</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <div class="flex-panel-card _3 relative flex h-full w-[80vw] flex-shrink-0 items-center justify-center overflow-hidden pt-10 md:w-[33vw] md:items-start">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/kobc.svg" alt="KOBC Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.10 ~ 2025.01</p>
                            <p class="title">게이미피케이션 접목 캠페인 (PC/모바일)</p>
                        </div>
                        <h3 class="h3 my-0">KOBC</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <div class="flex-panel-card _4 flex h-full w-[80vw] flex-shrink-0 items-center justify-center p-3 md:w-[30vw] md:p-4"></div>
                <div class="flex-panel-card _5 flex h-full w-[80vw] flex-shrink-0 items-center justify-center p-3 md:w-[30vw] md:p-4"></div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeaderTheme } from '~/composables/useHeaderTheme'

gsap.registerPlugin(ScrollTrigger)

const { setHeaderTheme } = useHeaderTheme()

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
                            // --- [3. 수정/추가] ScrollTrigger 콜백 추가 ---
                            // onToggle을 사용하면 더 간결합니다.
                            onToggle: self => {
                                if (self.isActive) {
                                    // 섹션이 활성화되면(화면에 고정되면)
                                    setHeaderTheme('transparent') //
                                } else {
                                    // 섹션이 비활성화되면(고정이 풀리면)
                                    setHeaderTheme('dark') // 기본 테마(예: 'light')로 복원
                                }
                            },
                        },
                    })

                    // --- [이 부분 수정] ---
                    const cards = gsap.utils.toArray(wrapper.querySelectorAll('.flex-panel-card'))

                    // 카드를 밀어낼 거리(px). 카드의 30vw 너비와 scale(1.2)를 고려한 값.
                    // (30vw * 1.2 = 36vw, 즉 6vw 증가. 절반인 3vw만큼 밀어냄)
                    // 여기서는 뷰포트에 따라 달라지는 vw 대신 고정 픽셀 값을 사용해 보겠습니다.
                    // 1.2 스케일의 절반(0.1) * 30vw 너비 => 3vw
                    // 예: 1920px 화면에서 3vw = 약 57px. 60px 정도로 설정.
                    const pushAmount = 120 // (px 단위, 원하는 만큼 조절하세요)

                    cards.forEach((card: any, index: number) => {
                        // 'index' 매개변수 추가
                        const cardContent = card.querySelector('.portfolio-item-replacement')
                        // [수정] 단일 오버레이만 선택합니다.
                        const unifiedOverlay = card.querySelector('.unified-overlay')

                        if (cardContent) {
                            // mouseenter 이벤트 리스너 추가
                            card.addEventListener('mouseenter', () => {
                                // 1. 현재 카드 확대
                                gsap.to(card, {
                                    scale: 1.2,
                                    zIndex: 10,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                // [수정] 단일 오버레이만 투명하게 만듭니다.
                                gsap.to(unifiedOverlay, {
                                    opacity: 0,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                gsap.to(cards.slice(index + 1), {
                                    x: pushAmount, // 120px
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                // --- [수정 끝] ---
                            })

                            // mouseleave 이벤트 리스너 추가
                            card.addEventListener('mouseleave', () => {
                                // 1. 현재 카드 원래대로
                                gsap.to(card, {
                                    scale: 1.0,
                                    zIndex: 1,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                // [수정] 단일 오버레이를 다시 어둡게(초기값) 만듭니다.
                                gsap.to(unifiedOverlay, {
                                    opacity: 0.2, // CSS에 설정된 초기 불투명도(0.4)
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                // 2. 모든 카드의 x 위치(translateX)를 0으로 리셋
                                gsap.to(cards, {
                                    x: 0,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                            })
                        }
                    })
                    // --- [수정 끝] ---
                }
            }
        )
    }, sectionRef.value)
})

onUnmounted(() => {
    if (ctx.value) {
        ctx.value.revert()
    }
    setHeaderTheme('light')
})
</script>

<style scoped>
/* [CSS 수정 1] 변수 정의 */
.panel {
    --card-height-mobile-default: 16rem;
    --card-height-desktop-default: 50rem; /* md:h-96 */
}

.flex-panel-card {
    transform-origin: top left;
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
.flex-panel-card._4 {
    background: linear-gradient(135deg, #eb3656, #fea032);
}

.flex-panel-card._5 {
    background: linear-gradient(135deg, #fff6a5, #ffb1b1);
}

/* 2-3. 새 카드 레이아웃 스타일 */
.portfolio-item-replacement {
    display: flex;
    flex-direction: column;
    padding: 30px 0; /* 상하 패딩 */
    box-sizing: border-box;
    height: var(--card-height-desktop-default);

    position: relative; /* z-index 스태킹 컨텍스트를 위해 추가 */
    z-index: 1; /* 오버레이보다 위에 있도록 설정 */
}
/* [--- 수정 ---] */
/* 단일 오버레이 스타일 (이전의 .card-overlay와 .content-overlay를 대체) */
.unified-overlay {
    position: absolute;
    /* 부모(.flex-panel-card) 전체를 덮도록 설정 (패딩 영역 포함) */
    inset: 0; /* top: 0; left: 0; right: 0; bottom: 0; */
    background-color: #000000;
    opacity: 0.4; /* 초기 불투명도 */

    /* [수정] z-index: 2 (콘텐츠보다 위) */
    z-index: 2;
    pointer-events: none;
}

/* 2-4. 썸네일 (이미지) */
.thumbnail {
    /* [수정] 콘텐츠 오버레이(z-index: 2)보다 아래에 위치 */
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem; /* 좌우 패딩 */
    box-sizing: border-box;
    height: 35rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.thumbnail img {
    display: block;
    width: auto;
    height: 8rem;
    object-fit: contain; /* 로고가 잘리지 않게 contain으로 */
    opacity: 0.8; /* 예제와 비슷하게 */
}

/* 2-5. 텍스트 설명 */
.description {
    /* [수정] 콘텐츠 오버레이(z-index: 2)보다 아래에 위치 */
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 20px auto 0;
    padding: 0 2rem; /* 좌우 패딩 */
    box-sizing: border-box;
    color: #000000;
    font-size: 16px;
    font-weight: 700;
}

/* 2-6. 메인 타이틀 (h3) */
.h3 {
    /* [수정] 콘텐츠 오버레이(z-index: 2)보다 아래에 위치 */
    position: relative;
    z-index: 1;
    font-weight: 900;
    color: #fff;
    font-size: 64px; /* 폰트 크기 조절 */
    letter-spacing: -1.92px;
    text-align: center;
    margin: 10px auto 0;
    position: relative;
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
