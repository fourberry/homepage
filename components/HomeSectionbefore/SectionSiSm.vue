<template>
    <section ref="sectionRef" class="panel relative overflow-hidden border-t border-gray-200 bg-white py-12 md:py-16 xl:min-h-dvh xl:py-0">
        <div class="flex-panel-title flex h-auto w-full flex-shrink-0 flex-col justify-center px-4 text-center sm:px-6 lg:px-12 xl:hidden">
            <div class="mb-4 break-keep">
                <p class="mb-4 text-sm font-semibold tracking-widest text-red-300">SERVICE</p>
                <h2 class="mb-4 text-3xl font-bold text-gray-950 md:mb-8 md:text-3xl lg:text-3xl">System Integration</h2>
                <p class="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-base md:text-lg">비즈니스에 새로운 가치를 더하는 SI/SM 사업</p>
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
                            <p class="mb-4 text-sm font-bold tracking-widest text-red-300">SERVICE</p>
                            <h2 class="mb-4 text-3xl font-bold text-gray-950 md:text-4xl lg:text-5xl">System</h2>
                            <h2 class="mb-4 text-3xl font-bold text-gray-950 md:text-4xl lg:text-5xl">Integration</h2>
                            <p class="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-base md:text-lg">비즈니스에 새로운 가치를 더하는 SI/SM 사업</p>
                        </div>
                    </div>
                </div>

                <div
                    v-for="project in siSmProjects"
                    :key="project.id"
                    :class="['flex-panel-card', project.gradientClasses]"
                    class="relative flex h-auto w-full flex-shrink-0 items-center justify-center overflow-hidden xl:h-full xl:w-[33vw] xl:origin-top-left xl:items-start xl:pt-10"
                >
                    <div class="portfolio-item-replacement relative z-10 flex h-[35rem] w-full flex-col overflow-hidden rounded-lg py-[30px] text-center sm:h-[40rem] md:h-[45rem] xl:h-full">
                        <div class="thumbnail relative z-10 mx-auto flex h-[20rem] w-full items-center justify-center bg-white px-8 sm:h-[30rem] md:h-[30rem]">
                            <NuxtImg :src="project.imageSrc" :alt="project.imageAlt" class="block object-contain opacity-80" :class="getImageClasses(project)" />
                        </div>
                        <div class="description relative z-10 mx-auto mt-5 flex min-h-[4.5em] w-full items-center justify-between px-6 text-[1rem] font-bold text-gray-900 sm:text-[1rem]">
                            <p v-for="(date, index) in project.dates" :key="index" class="kind">
                                {{ date }}
                            </p>
                            <p class="title break-keep">{{ project.title }}</p>
                        </div>
                        <h3
                            class="h3 relative z-10 mx-auto my-0 mt-2.5 flex h-[3.5rem] items-center justify-center whitespace-nowrap text-center text-[2.5rem] font-black tracking-[-1.92px] text-white md:h-[80px] md:text-[2.5rem]"
                            :class="project.smallH3 ? 'md:text-[2.5rem]' : ''"
                        >
                            {{ project.clientName }}
                        </h3>
                    </div>
                    <div class="unified-overlay pointer-events-none absolute inset-0 z-20 bg-black opacity-0 xl:opacity-20"></div>
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

// ✅ 여기에 프로젝트 데이터 배열을 추가합니다.
const siSmProjects = [
    {
        id: 'si_1',
        // 그라데이션 클래스를 직접 저장
        gradientClasses: 'bg-gradient-to-br from-[#ffa800] to-[#ff5d17]',
        imageSrc: '/images/homeSiSm/cuckoo.svg',
        imageAlt: 'Cuckoo Project',
        dates: ['2021.11 ~ 2022.09'], // 날짜가 여러 개인 경우를 대비해 배열로 관리
        title: 'OMS 및 차세대 영업관리 시스템 구축',
        clientName: 'CUCKOO',
        imageStyle: 'cuckoo', // Cuckoo 로고만 특별 스타일 적용
        smallH3: false,
    },
    {
        id: 'si_2',
        gradientClasses: 'bg-gradient-to-br from-[#12d6f0] to-[#12f093]',
        imageSrc: '/images/homeSiSm/hanaro.svg',
        imageAlt: 'Hanaro Project',
        dates: ['2024.01 ~ 2025.03'],
        title: '브랜드몰 (하이브리드 앱) 및 SSO 구축',
        clientName: 'WITH FRESH',
        imageStyle: 'default',
        smallH3: true, // 긴 텍스트용 h3
    },
    {
        id: 'si_3',
        gradientClasses: 'bg-gradient-to-br from-[#3f1ca0] to-[#a912f0]',
        imageSrc: '/images/homeSiSm/kobc.svg',
        imageAlt: 'KOBC Project',
        dates: ['2024.10 ~ 2025.01'],
        title: '게이미피케이션 접목 캠페인 (PC/모바일)',
        clientName: 'KOBC',
        imageStyle: 'default',
        smallH3: false,
    },
    {
        id: 'si_4',
        gradientClasses: 'bg-gradient-to-br from-[#eb3656] to-[#fea032]',
        imageSrc: '/images/homeSiSm/lotto.svg',
        imageAlt: 'Lotto Project',
        dates: ['2024.10 ~ 2025.10'],
        title: '인쇄복권 시스템 통합 및 DB 전환',
        clientName: 'DONGHANG',
        imageStyle: 'lotto',
        smallH3: true, // 긴 텍스트용 h3
    },
    {
        id: 'si_5',
        gradientClasses: 'bg-gradient-to-br from-[#fff6a5] to-[#ffb1b1]',
        imageSrc: '/images/homeSiSm/auto_crypt.svg',
        imageAlt: 'AutoCrypt Project',
        dates: ['2024.06 ~ 2024.10', '2025.06 ~ 2025.09'], // AUTOCRYPT처럼 날짜가 2개인 경우
        title: '자동차 보안 대응 시스템(K-CSMS) 구축',
        clientName: 'AUTOCRYPT',
        imageStyle: 'auto',
        smallH3: true, // 긴 텍스트용 h3
    },
]

/**
 * 프로젝트의 imageStyle에 따라 적절한 Tailwind 클래스를 반환합니다.
 */
const getImageClasses = (project: (typeof siSmProjects)[0]) => {
    // 모든 이미지에 공통으로 적용될 기본 클래스
    const baseClasses = 'block object-contain opacity-80'

    let specificClasses = ''

    // imageStyle 값에 따라 스타일 분기
    switch (project.imageStyle) {
        case 'cuckoo':
            specificClasses = 'max-h-[15rem] w-full'
            break
        case 'lotto':
            // 여기에 'lotto' 스타일에 맞는 클래스를 지정하세요. (예시)
            specificClasses = 'max-h-[6rem] w-auto max-w-[70%]'
            break
        case 'auto':
            // 여기에 'auto' 스타일에 맞는 클래스를 지정하세요. (예시)
            specificClasses = 'max-h-[10rem] w-auto max-w-[60%]'
            break
        default:
            // 'default' 또는 정의되지 않은 경우
            specificClasses = 'max-h-[10rem] w-auto max-w-[65%]'
            break
    }

    // 기본 클래스와 특정 스타일 클래스를 배열로 반환
    return [baseClasses, specificClasses]
}

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
                const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean; isMobile: boolean }
                const wrapper = flexContainer.value!

                // 이 로직은 이제 1280px 이상일 때만 실행됩니다.
                if (isDesktop) {
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

                // --- 2. 모바일 (세로 스크롤) 로직 ---
                if (isMobile) {
                    const cards = gsap.utils.toArray(wrapper.querySelectorAll('.flex-panel-card'))

                    // ✅ [추가] 각 카드의 콘텐츠에 대한 스크롤 애니메이션
                    cards.forEach((card: any) => {
                        const content = card.querySelector('.portfolio-item-replacement')
                        if (!content) return

                        gsap.from(content, {
                            x: 100,
                            opacity: 0, // 투명한 상태에서 시작
                            duration: 0.7, // 애니메이션 지속 시간
                            ease: 'power3.out', // 부드러운 이징
                            scrollTrigger: {
                                trigger: card, // 애니메이션 트리거를 각 'card'로 설정
                                start: 'top 60%', // 카드의 상단이 뷰포트 85% 지점에 도달할 때
                                toggleActions: 'play none none none', // 한 번만 재생
                                once: true, // 스크롤을 올렸다가 내려도 다시 실행되지 않음
                            },
                        })
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

<style scoped></style>
