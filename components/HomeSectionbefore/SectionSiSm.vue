<template>
    <section ref="sectionRef" class="panel relative overflow-hidden border-t border-gray-200 bg-white py-8 md:py-12 lg:min-h-dvh lg:py-0">
        <div class="h-auto lg:h-dvh">
            <!-- 타이틀 섹션 -->
            <div class="mb-8 px-4 text-center sm:px-6 lg:mb-0 lg:px-12 lg:text-left">
                <h2 class="mb-4 text-4xl font-extrabold text-gray-950 lg:mb-8 lg:pt-12 lg:text-[80px]">SI & SM</h2>
                <p class="mx-auto max-w-3xl text-lg font-bold leading-relaxed text-gray-700 lg:text-xl">비즈니스에 새로운 가치를 더하는 SI/SM 사업</p>
            </div>

            <!-- 카드 컨테이너 -->
            <div ref="flexContainer" class="cards-container">
                <!-- 카드 1 -->
                <div class="card-wrapper _1">
                    <div class="portfolio-item">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/cuckoo.svg" alt="Cuckoo Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2021.11 ~ 2022.09</p>
                            <p class="title">OMS 및 차세대 영업관리 시스템 구축</p>
                        </div>
                        <h3 class="card-title">CUCKOO</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <!-- 카드 2 -->
                <div class="card-wrapper _2">
                    <div class="portfolio-item">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/hanaro.svg" alt="Hanaro Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.01 ~ 2025.03</p>
                            <p class="title">브랜드몰 (하이브리드 앱) 및 SSO 구축</p>
                        </div>
                        <h3 class="card-title">WITH FRESH</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <!-- 카드 3 -->
                <div class="card-wrapper _3">
                    <div class="portfolio-item">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/kobc.svg" alt="KOBC Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.10 ~ 2025.01</p>
                            <p class="title">게이미피케이션 접목 캠페인 (PC/모바일)</p>
                        </div>
                        <h3 class="card-title">KOBC</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <!-- 카드 4 -->
                <div class="card-wrapper _4">
                    <div class="portfolio-item">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/lotto.svg" alt="Lotto Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.10 ~ 2025.10</p>
                            <p class="title">인쇄복권 시스템 통합 및 DB 전환</p>
                        </div>
                        <h3 class="card-title">DONGHANG</h3>
                    </div>
                    <div class="unified-overlay"></div>
                </div>

                <!-- 카드 5 -->
                <div class="card-wrapper _5">
                    <div class="portfolio-item">
                        <div class="thumbnail">
                            <NuxtImg src="/images/homeSiSm/auto_crypt.svg" alt="AutoCrypt Project" />
                        </div>
                        <div class="description">
                            <p class="kind">2024.06 ~ 2024.10</p>
                            <p class="kind">2025.06 ~ 2025.09</p>
                            <p class="title">자동차 보안 대응 시스템(K-CSMS) 구축</p>
                        </div>
                        <h3 class="card-title">AUTOCRYPT</h3>
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
                // 1280px 이상에서만 가로 스크롤 활성화
                isDesktop: '(min-width: 1280px)',
                isTablet: '(min-width: 768px) and (max-width: 1279px)',
                isMobile: '(max-width: 767px)',
            },
            context => {
                const { isDesktop } = context.conditions as { isDesktop: boolean }

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

                    const cards = gsap.utils.toArray(wrapper.querySelectorAll('.card-wrapper'))
                    const pushAmount = 120

                    cards.forEach((card: any, index: number) => {
                        const cardContent = card.querySelector('.portfolio-item')
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
/* 카드 컨테이너: 반응형 레이아웃 */
.cards-container {
    display: grid;
    /* 모바일: 1열 */
    grid-template-columns: 1fr;

    /* 태블릿 (768px~1023px): 2열 */
    @media (min-width: 768px) and (max-width: 1023px) {
        grid-template-columns: repeat(2, 1fr);
    }

    /* 큰 태블릿 (1024px~1279px): 3열 */
    @media (min-width: 1024px) and (max-width: 1279px) {
        grid-template-columns: repeat(3, 1fr);
    }

    /* 데스크톱 (1280px 이상): 가로 스크롤 */
    @media (min-width: 1280px) {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 0;
        padding: 0;
        height: 100%;
    }
}

/* 카드 래퍼 */
.card-wrapper {
    position: relative;
    overflow: hidden;

    /* 모바일/태블릿: 고정 높이 */
    height: 28rem;

    /* 데스크톱: 가로 스크롤용 설정 */
    @media (min-width: 1280px) {
        flex-shrink: 0;
        width: 33vw;
        height: 100%;
        border-radius: 0;
        transform-origin: top left;
    }
}

/* 그라데이션 배경 */
.card-wrapper._1 {
    background: linear-gradient(135deg, #ffa800, #ff5d17);
}
.card-wrapper._2 {
    background: linear-gradient(135deg, #12d6f0, #12f093);
}
.card-wrapper._3 {
    background: linear-gradient(135deg, #3f1ca0, #a912f0);
}
.card-wrapper._4 {
    background: linear-gradient(135deg, #eb3656, #fea032);
}
.card-wrapper._5 {
    background: linear-gradient(135deg, #fff6a5, #ffb1b1);
}

/* 포트폴리오 아이템 */
.portfolio-item {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem 0;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
}

/* 오버레이 */
.unified-overlay {
    position: absolute;
    inset: 0;
    background-color: #000000;
    opacity: 0.2;
    z-index: 2;
    pointer-events: none;
}

/* 썸네일 */
.thumbnail {
    position: relative;
    z-index: 1;
    width: 100%;
    flex-grow: 1;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    box-sizing: border-box;
}

.thumbnail img {
    display: block;
    width: auto;
    height: 6rem;
    object-fit: contain;
    opacity: 0.8;

    @media (min-width: 768px) {
        height: 8rem;
    }
}

/* 설명 텍스트 */
.description {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    margin: 1.5rem auto 0;
    padding: 0 1.5rem;
    box-sizing: border-box;
    color: #000000;
    font-size: 0.875rem;
    font-weight: 700;

    @media (min-width: 768px) {
        font-size: 1rem;
    }

    /* 데스크톱에서만 수평 레이아웃 */
    @media (min-width: 1280px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        gap: 0;
        padding: 0 2rem;
    }
}

.description .kind {
    text-align: center;

    @media (min-width: 1280px) {
        text-align: left;
    }
}

.description .title {
    text-align: center;

    @media (min-width: 1280px) {
        flex-grow: 1;
        text-align: right;
        padding-left: 1rem;
    }
}

/* 카드 타이틀 */
.card-title {
    position: relative;
    z-index: 1;
    font-weight: 900;
    color: #fff;
    font-size: 2rem;
    letter-spacing: -0.05em;
    text-align: center;
    margin: 1rem auto 0;

    @media (min-width: 768px) {
        font-size: 3rem;
    }

    @media (min-width: 1280px) {
        font-size: 4rem;
    }
}
</style>
