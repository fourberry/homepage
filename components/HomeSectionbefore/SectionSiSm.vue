<template>
    <section ref="sectionRef" class="panel relative overflow-hidden border-t border-gray-200 bg-white py-12 md:py-16 xl:min-h-dvh xl:py-0">
        <div class="flex-panel-title flex h-auto w-full flex-shrink-0 flex-col justify-center px-4 text-center sm:px-6 lg:px-12 xl:hidden">
            <div class="break-keep">
                <p class="mb-4 text-sm font-bold tracking-widest text-red-300">SERVICE</p>
                <h2 class="md:mb-12md:text-5xl mb-4 text-4xl font-extrabold text-gray-950 lg:text-6xl">System Integration</h2>
                <p class="mx-auto max-w-3xl text-xl font-bold leading-relaxed text-gray-400 sm:text-lg md:text-[16px]">비즈니스에 새로운 가치를 더하는 SI/SM 사업</p>
            </div>
        </div>

        <div class="h-auto xl:h-dvh">
            <div
                ref="flexContainer"
                class="grid w-full grid-cols-1 pb-12 md:grid-cols-2 md:pb-16 lg:grid-cols-3 xl:flex xl:h-full xl:snap-none xl:flex-row xl:flex-nowrap xl:items-center xl:gap-0 xl:overflow-x-visible xl:p-0"
            >
                <div class="flex-panel-title hidden h-auto w-full flex-shrink-0 flex-col justify-center px-4 py-12 text-center sm:px-6 md:py-0 md:text-left lg:px-12 xl:flex xl:h-full xl:w-[30vw]">
                    <div class="break-keep">
                        <div class="inline-block text-center">
                            <p class="mb-8 text-sm font-bold tracking-widest text-red-300">SERVICE</p>
                            <h2 class="mb-8 text-4xl font-extrabold text-gray-950 xl:mb-12 xl:text-[4.5vw]">System</h2>
                            <h2 class="mb-4 text-4xl font-extrabold text-gray-950 md:mb-12 xl:text-[4.5vw]">Integration</h2>
                            <p class="mx-auto max-w-3xl text-xl font-bold leading-relaxed text-gray-400 sm:text-lg md:text-[16px]">비즈니스에 새로운 가치를 더하는 SI/SM 사업</p>
                        </div>
                    </div>
                </div>

                <div class="flex-panel-card _1 relative flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden xl:h-full xl:w-[33vw] xl:items-start xl:pt-10">
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

                <div class="flex-panel-card _2 relative flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden xl:h-full xl:w-[33vw] xl:items-start xl:pt-10">
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

                <div class="flex-panel-card _3 relative flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden xl:h-full xl:w-[33vw] xl:items-start xl:pt-10">
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

                <div class="flex-panel-card _4 relative flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden xl:h-full xl:w-[33vw] xl:items-start xl:pt-10">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/lotto.svg" alt="Lotto Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.10 ~ 2025.10</p>
                            <p class="title">인쇄복권 시스템 통합 및 DB 전환</p>
                        </div>
                        <h3 class="h3 my-0">DONGHANG</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <div class="flex-panel-card _5 relative flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden xl:h-full xl:w-[33vw] xl:items-start xl:pt-10">
                    <div class="portfolio-item-replacement relative h-full w-full overflow-hidden rounded-lg text-center">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/auto_crypt.svg" alt="AutoCrypt Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.06 ~ 2024.10</p>
                            <p class="kind">2025.06 ~ 2025.09</p>
                            <p class="title">자동차 보안 대응 시스템(K-CSMS) 구축</p>
                        </div>
                        <h3 class="h3 my-0">AUTOCRYPT</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>
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
                // [수정] 데스크톱(가로 스크롤) 기준을 1280px로 변경
                isDesktop: '(min-width: 1280px)',
                // [수정] 모바일/태블릿(그리드) 기준을 1279px로 변경
                isMobile: '(max-width: 1279px)',
            },
            context => {
                const { isDesktop } = context.conditions as { isDesktop: boolean }

                // 이 로직은 이제 1280px 이상일 때만 실행됩니다.
                if (isDesktop) {
                    const wrapper = flexContainer.value!
                    const endPadding = 200

                    gsap.to(wrapper, {
                        x: () => -(wrapper.scrollWidth - document.documentElement.clientWidth + endPadding) + 'px',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.value,
                            pin: true,
                            scrub: 1,
                            end: () => '+=' + (wrapper.scrollWidth - document.documentElement.clientWidth + endPadding),
                            invalidateOnRefresh: true,
                            onToggle: self => {
                                if (self.isActive) {
                                    setHeaderTheme('transparent')
                                } else {
                                    setHeaderTheme('dark')
                                }
                            },
                        },
                    })

                    const cards = gsap.utils.toArray(wrapper.querySelectorAll('.flex-panel-card'))
                    const pushAmount = 120

                    cards.forEach((card: any, index: number) => {
                        const cardContent = card.querySelector('.portfolio-item-replacement')
                        const unifiedOverlay = card.querySelector('.unified-overlay')

                        if (cardContent) {
                            card.addEventListener('mouseenter', () => {
                                gsap.to(card, {
                                    scale: 1.2,
                                    zIndex: 10,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                gsap.to(unifiedOverlay, {
                                    opacity: 0,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                gsap.to(cards.slice(index + 1), {
                                    x: pushAmount,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                            })

                            card.addEventListener('mouseleave', () => {
                                gsap.to(card, {
                                    scale: 1.0,
                                    zIndex: 1,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                gsap.to(unifiedOverlay, {
                                    opacity: 0.2,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                gsap.to(cards, {
                                    x: 0,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                            })
                        }
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
    setHeaderTheme('light')
})
</script>

<style scoped>
/* [CSS 수정] 모바일(기본) 스타일과 데스크톱(md) 스타일을 분리 */

.panel {
    /* 모바일용 카드 높이를 30rem (480px) 정도로 설정 */
    --card-height-mobile-default: 30rem;
    /* 데스크톱용 카드 높이 */
    --card-height-desktop-default: 50rem;
}

.flex-panel-card {
    /* [수정] 데스크톱(xl)에서만 transform-origin 적용 */
    @media (min-width: 1280px) {
        transform-origin: top left;
    }
}

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

/* 2-3. 새 카드 레이아웃 스타일 (모바일 기본) */
.portfolio-item-replacement {
    display: flex;
    flex-direction: column;
    padding: 30px 0; /* 상하 패딩 */
    box-sizing: border-box;
    /* [수정] 모바일 높이를 기본값으로 설정 */
    height: var(--card-height-mobile-default);
    position: relative;
    z-index: 1;
}

/* [수정] md: (768px) 이상일 때 데스크톱 높이 적용 (태블릿 포함) */
@media (min-width: 768px) {
    .portfolio-item-replacement {
        height: var(--card-height-desktop-default);
    }
}

/* [이 코드 추가] xl: (1280px) 이상일 때 높이를 다시 100%로 되돌립니다. */
@media (min-width: 1280px) {
    .portfolio-item-replacement {
        height: 100%;
    }
}

/* 2-3-1. 단일 오버레이 스타일 */
.unified-overlay {
    position: absolute;
    inset: 0;
    background-color: #000000;
    opacity: 0.1; /* [수정] 기본값을 0.2에서 0으로 변경 */
    z-index: 2;
    pointer-events: none;
}
/* [이 코드 추가] xl: (1280px) 이상일 때만 오버레이 활성화 */
@media (min-width: 1280px) {
    .unified-overlay {
        opacity: 0.2;
    }
}
/* 2-4. 썸네일 (이미지) */
.thumbnail {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;
    height: 35rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    /* [삭제] height: 35rem; 삭제 */
}
.thumbnail img {
    display: block;
    width: auto;
    max-height: 8rem;
    max-width: 70%;
    object-fit: contain;
    opacity: 0.8;
}
/* [추가] CUCKOO 로고(_1)만 개별 타겟팅 */
.flex-panel-card._1 .thumbnail img {
    /* * 'width: auto' 대신 '100%'를 사용해 강제로
     * 부모 컨테이너 너비를 기준으로 크기를 계산하도록 함.
     */
    width: 100%;
    max-height: 18rem;
}

/* 2-5. 텍스트 설명 (모바일 기본) */
.description {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 20px auto 0;
    padding: 0 1.5rem; /* 모바일 좌우 패딩 */
    box-sizing: border-box;
    color: #000000;
    font-size: 14px; /* 모바일용 폰트 크기 */
    font-weight: 700;
    min-height: 4.5em;
}
/* 데스크톱 텍스트 설명 (태블릿 포함) */
@media (min-width: 768px) {
    .description {
        font-size: 16px;
    }
}

/* 2-6. 메인 타이틀 (h3) (모바일 기본) */
.h3 {
    position: relative;
    z-index: 1;
    font-weight: 900;
    color: #fff;
    /* [수정] 폰트 크기 + 고정 높이 및 정렬 */
    font-size: 2.5rem;
    height: 3.5rem; /* 2.5rem 폰트를 담을 수 있는 고정 높이 */
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    letter-spacing: -1.92px;
    text-align: center;
    margin: 10px auto 0;
}

/* 데스크톱 h3 (태블릿 포함) */
@media (min-width: 768px) {
    .h3 {
        /* [수정] 폰트 크기 + 고정 높이 및 정렬 */
        font-size: 64px;
        height: 80px; /* 64px 폰트를 담을 수 있는 고정 높이 */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* [추가] 긴 텍스트 h3 폰트 크기 조절 (데스크톱) */
    .flex-panel-card._2 .h3,
    .flex-panel-card._4 .h3,
    .flex-panel-card._5 .h3 {
        font-size: 55px; /* 폰트 크기만 줄임 */
        /* height: 80px 는 위에서 상속받음 */
    }
}

/* [삭제] 기존 @media (max-width: 767px) 블록은 모바일 우선 스타일로 변경되어 삭제 */

/* 모바일에서 가로 스크롤바 숨기기 (이 코드는 이제 필요 없지만, 만약을 위해 남겨둡니다) */
.overflow-x-auto::-webkit-scrollbar {
    display: none;
}
.overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
