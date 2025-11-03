<template>
    <section ref="sectionRef" class="panel relative overflow-hidden border-t border-gray-200 bg-white py-0 md:min-h-dvh md:py-0">
        <div class="h-auto md:h-dvh">
            <div ref="flexContainer" class="flex flex-col md:h-full md:snap-none md:flex-row md:flex-nowrap md:items-center md:overflow-x-visible">
                <div class="flex-panel-title flex h-auto w-full flex-shrink-0 flex-col justify-center px-4 py-12 text-center sm:px-6 md:h-full md:w-[30vw] md:py-0 md:text-left lg:px-12">
                    <div class="break-keep">
                        <h2 class="mb-4 text-4xl font-extrabold text-gray-950 md:mb-12 md:text-[80px]">SI & SM</h2>
                        <p class="mx-auto max-w-3xl text-xl font-bold leading-relaxed text-gray-700 sm:text-lg md:text-[16px]">비즈니스에 새로운 가치를 더하는 SI/SM 사업</p>
                    </div>
                </div>

                <div class="flex-panel-card _1 relative mb-8 flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden md:mb-0 md:h-full md:w-[33vw] md:items-start md:pt-10">
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

                <div class="flex-panel-card _2 relative mb-8 flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden md:mb-0 md:h-full md:w-[33vw] md:items-start md:pt-10">
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

                <div class="flex-panel-card _3 relative mb-8 flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden md:mb-0 md:h-full md:w-[33vw] md:items-start md:pt-10">
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

                <div class="flex-panel-card _4 relative mb-8 flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden md:mb-0 md:h-full md:w-[33vw] md:items-start md:pt-10">
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

                <div class="flex-panel-card _5 relative mb-8 flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden md:mb-0 md:h-full md:w-[33vw] md:items-start md:pt-10">
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
// <script> 부분은 변경할 필요가 없습니다.
// gsap.matchMedia()가 768px/767px 기준으로
// 데스크톱 애니메이션을 적용/미적용하기 때문에
// 템플릿의 반응형 분기점(md:)과 일치하여 잘 동작합니다.
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
    /* [수정] 데스크톱에서만 transform-origin 적용 */
    @media (min-width: 768px) {
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

/* [수정] md: (768px) 이상일 때 데스크톱 높이 적용 */
@media (min-width: 768px) {
    .portfolio-item-replacement {
        height: var(--card-height-desktop-default);
    }
}

/* 2-3-1. 단일 오버레이 스타일 */
.unified-overlay {
    position: absolute;
    inset: 0;
    background-color: #000000;
    opacity: 0.2;
    z-index: 2;
    pointer-events: none;
}

/* 2-4. 썸네일 (이미지) */
.thumbnail {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;
    /* [수정] flex-grow를 사용하여 남는 공간을 채우도록 변경 (모바일/데스크톱 공통) */
    flex-grow: 1;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    /* [삭제] height: 35rem; 삭제 */
}
.thumbnail img {
    display: block;
    width: auto;
    height: 8rem;
    object-fit: contain;
    opacity: 0.8;
}

/* 2-5. 텍스트 설명 (모바일 기본) */
.description {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto 0;
    padding: 0 1.5rem; /* 모바일 좌우 패딩 */
    box-sizing: border-box;
    color: #000000;
    font-size: 14px; /* 모바일용 폰트 크기 */
    font-weight: 700;
}
/* 데스크톱 텍스트 설명 (수평 정렬) */
@media (min-width: 768px) {
    .description {
        flex-direction: row; /* 데스크톱: 수평 정렬 */
        justify-content: space-between; /* 데스크톱: 양끝 정렬 */
        align-items: baseline; /* 텍스트 기준선 정렬 */
        gap: 0; /* 간격 리셋 */
        font-size: 16px;
        padding: 0 2rem;
        text-align: left; /* 텍스트 정렬 리셋 */
    }

    /* 데스크톱에서만 title이 늘어나도록 설정 */
    .description .title {
        flex-grow: 1;
        text-align: right; /* 제목을 오른쪽으로 */
        padding-left: 1rem; /* 날짜와 간격 */
    }
}

/* 2-6. 메인 타이틀 (h3) (모바일 기본) */
.h3 {
    position: relative;
    z-index: 1;
    font-weight: 900;
    color: #fff;
    font-size: 2.5rem; /* 모바일용 폰트 크기 */
    letter-spacing: -1.92px;
    text-align: center;
    margin: 10px auto 0;
    position: relative;
}
/* 데스크톱 h3 */
@media (min-width: 768px) {
    .h3 {
        font-size: 64px;
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
