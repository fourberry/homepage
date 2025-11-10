<template>
    <div id="projects">
        <section ref="sectionRef" class="panel relative overflow-hidden bg-white py-12 md:py-16 xl:min-h-dvh xl:py-0">
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
                        class="relative flex h-auto w-full flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden xl:h-full xl:w-[33vw] xl:origin-top-left xl:items-start xl:pt-10"
                        @click="openModal(project)"
                    >
                        <div class="portfolio-item-replacement relative z-10 flex h-[50rem] w-full flex-col overflow-hidden py-[30px] sm:h-[50rem] md:h-[50rem] xl:h-full">
                            <div class="thumbnail relative z-10 mx-auto flex h-[30rem] w-full items-center justify-center bg-white sm:h-[35rem] md:h-[30rem]">
                                <NuxtImg :src="project.imageSrc" :alt="project.imageAlt" class="block" :class="getImageClasses(project)" />
                            </div>
                            <div class="description relative z-10 mb-12 flex min-h-[4.5em] w-full items-center justify-between px-4 text-white sm:mb-24 md:mb-24 lg:mb-24 xl:mb-24">
                                <div class="text-left font-sans text-[1rem] font-extrabold tabular-nums sm:text-[1.5rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.5rem]">
                                    <div v-for="(date, index) in project.dates" :key="index" class="kind">
                                        <template v-if="date.includes(' - ')">
                                            <p>{{ date.split(' - ')[0] }}</p>
                                            <p>{{ date.split(' - ')[1] }}</p>
                                        </template>
                                        <template v-else>
                                            <p>{{ date }}</p>
                                        </template>
                                    </div>
                                </div>
                                <p
                                    class="title line-clamp-2 min-w-0 flex-1 whitespace-pre-line break-keep text-right font-notoSans text-[0.9rem] font-bold sm:text-[1.3rem] md:text-[0.9rem] lg:text-[0.9rem] xl:line-clamp-none xl:text-[1.3rem]"
                                >
                                    {{ project.title }}
                                </p>
                            </div>
                            <h3
                                class="h3 relative z-10 flex h-[3.5rem] items-center justify-center whitespace-nowrap text-center font-poppins text-[3rem] font-black tracking-[-1.92px] text-white md:h-[80px] md:text-[2.5rem] xl:text-[4rem]"
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

        <ProjectModal v-if="isModalOpen" :project="selectedProject" :project-bg-color="selectedProject?.bgColor || '#ffffff'" @close="closeModal" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeaderTheme } from '~/composables/useHeaderTheme'
import ProjectModal from '~/components/ProjectModal.vue' // ✅ 모달 컴포넌트 Import
import type { Project } from '~/types/project' // ✅ 공통 타입 Import

gsap.registerPlugin(ScrollTrigger)

const { setHeaderTheme } = useHeaderTheme()

// --- 모달 상태 관리 ---
const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const openModal = (project: Project) => {
    selectedProject.value = project
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    // 애니메이션을 위해 잠시 기다렸다가 null로 설정할 수 있습니다.
    // 여기서는 즉시 닫습니다.
    selectedProject.value = null
}
// ---

// ✅ 프로젝트 데이터 배열 (bgColor 및 details 추가됨)
const siSmProjects: Project[] = [
    {
        id: 'si_1',
        gradientClasses: 'bg-gradient-to-br from-[#ffa800] via-[#ffc94b] to-[#ff5d17]',
        bgColor: '#ff5d17', // 대표 색상 (그라디언트 끝 색)
        imageSrc: '/images/homeSiSm/oms_2.webp',
        imageAlt: 'Cuckoo Project',
        dates: ['2021.11 - 2022.09'],
        title: 'OMS 및 차세대\n영업관리 시스템 구축',
        clientName: 'CUCKOO',
        imageStyle: 'cuckoo',
        smallH3: false,
        details: {
            client: '쿠쿠홀딩스 (CUCKOO)',
            title: 'OMS 및 차세대 영업관리 시스템 구축',
            period: '2021.11 - 2022.09 (OMS) / | 2019.05 - 2019.12 (영업관리)',
            overview: `쿠쿠의 통합 쇼핑몰 관리 시스템(OMS)과 차세대 영업관리 시스템(POS & WEB)을 구축한 프로젝트입니다.
            \n\nOMS는 78개에 달하는 홈쇼핑, 쇼핑몰, 폐쇄몰 등 다양한 영업채널의 주문, 배송, 재고 관리를 통합 관리합니다.
            \n차세대 영업관리 시스템은 업무 중심의 판매 관리(POS/WEB), 정산, 재고, 매출, 영업 분석 및 고객 정보 관리를 포함하는 유통 관점의 실시간 데이터 관리 시스템입니다.`,
            images: ['/images/homeSiSm/oms_2.webp'],
        },
    },
    {
        id: 'si_2',
        gradientClasses: 'bg-gradient-to-br from-[#12d6f0] via-[#50fce0] to-[#12f093]',
        bgColor: '#12f093',
        imageSrc: '/images/homeSiSm/withfresh_9.png',
        imageAlt: 'Hanaro Project',
        dates: ['2024.01 - 2025.03'],
        title: '브랜드몰 (하이브리드 앱) 및 \n SSO 구축',
        clientName: 'WITH FRESH',
        imageStyle: 'withfresh',
        smallH3: true,
        details: {
            client: '영등포농협 (WITH FRESH)',
            title: '온라인 브랜드 쇼핑몰 및 SSO 시스템 구축',
            period: '2024.01 - 2025.03 (쇼핑몰) / | 2024.08 - 2024.12 (SSO)',
            overview: `영등포농협의 자체 브랜드몰 'Always withFresh'를 구축한 프로젝트입니다.
            \nHybrid 모바일 앱, 온라인 쇼핑몰, 관리자 사이트 및 관리자 앱을 포함하며, 상품, 전시, CMS, 프로모션(행사, 쿠폰), 통계 등 약 100여 건의 관리자 메뉴를 구현했습니다.
            \n또한, 2개의 관리 사이트와 신규 브랜드몰의 회원을 통합 관리하기 위한 SSO(Single Sign-On) 시스템을 구축했습니다.
             휴대폰 및 소셜(카카오, 네이버, 애플) 인증을 통한 간편 가입/로그인 기능을 제공합니다.`,
            images: ['/images/homeSiSm/withfresh_9.png', '/images/homeSiSm/withfresh_10.jpg', '/images/homeSiSm/withfresh_12.jpg'],
        },
    },
    {
        id: 'si_3',
        gradientClasses: 'bg-gradient-to-br from-[#3f1ca0] via-[#a912f0] to-[#f012b0]',
        bgColor: '#a912f0',
        imageSrc: '/images/homeSiSm/kobc_1.png',
        imageAlt: 'KOBC Project',
        dates: ['2024.10 - 2025.01'],
        title: '게이미피케이션 접목 캠페인\n (PC/모바일)',
        clientName: 'KOBC',
        imageStyle: 'default',
        smallH3: false,
        details: {
            client: '한국해양공사 (KOBC)',
            title: '매연 저감 게이미피케이션 캠페인|(Green Sailing)',
            period: '2024.10 - 2025.01',
            overview: `한국해양공사(KOBC)의 선박 매연 저감 캠페인을 홍보하기 위해 '부루마블' 형식의 게이미피케이션을 접목한 PC/모바일 웹 게임을 구축했습니다.
            \n주사위를 굴려 전 세계 주요 항구를 순회하며 매연 발생을 최소화하는 것이 목표입니다.
             저사양 모바일 기기에서도 원활하게 구동될 수 있도록 최적화 작업을 진행했습니다.`,
            images: ['/images/homeSiSm/kobc_12.jpg', '/images/homeSiSm/kobc_10.jpg', '/images/homeSiSm/kobc_11.jpg'],
        },
    },
    {
        id: 'si_4',
        gradientClasses: 'bg-gradient-to-br from-[#eb3656] via-[#ff8050] to-[#fea032]',
        bgColor: '#fea032',
        imageSrc: '/images/homeSiSm/migration.png',
        imageAlt: 'Lotto Project',
        dates: ['2024.10 - 2025.10'],
        title: '인쇄복권 시스템 통합 및\n DB 전환',
        clientName: 'DONGHANG',
        imageStyle: 'lotto',
        smallH3: true,
        details: {
            client: '동행복권',
            title: '인쇄복권 시스템 통합 및 DB 전환',
            period: '2024.10 - 2025.10',
            overview: `이원화되어 운영 중인 인쇄복권 시스템(PTMS/PLMS)을 통합하고, 시스템 안정성 확보를 위해 데이터베이스를 전환하는 대규모 프로젝트입니다.
            \n약 200여 개의 시스템 메뉴를 변환하며, 50억 건에 달하는 대용량 데이터를 Mysql에서 Oracle로 안정적으로 이관하는 작업을 포함합니다.`,
            images: ['/images/homeSiSm/migration.png'],
        },
    },
    {
        id: 'si_5',
        gradientClasses: 'bg-gradient-to-br from-[#fff6a5] via-[#ffc090] to-[#ffb1b1]',
        bgColor: '#ffb1b1',
        imageSrc: '/images/homeSiSm/autocrypt_4.jpg',
        imageAlt: 'AutoCrypt Project',
        dates: ['2024.06 - 2024.10'],
        title: '자동차 보안 대응 시스템(K-CSMS)\n 구축',
        clientName: 'AUTOCRYPT',
        imageStyle: 'auto',
        smallH3: true,
        details: {
            client: '아우토크립트 (AUTOCRYPT)',
            title: '자동차 보안 대응 시스템 (K-CSMS) 구축',
            period: '1차: 2024.06 - 2024.10 | 2차: 2025.06 - 2025.09',
            overview: `IT 보안 취약점 중 특히 자동차 보안 분야의 취약점 정보를 공유하고 대응하기 위한 커뮤니티 및 데이터베이스 사이트(K-CSMS)를 구축했습니다.
            \n대시보드를 통해 CVE(보안 취약점) 현황, CWE(보안 약점) 유형, CVSS(위험도) 등을 시각화하여 제공하며, 코드 기반 SW 자동 점검 기능 등을 포함합니다.`,
            images: ['/images/homeSiSm/autocrypt_4.jpg', '/images/homeSiSm/autocrypt_5.png', '/images/homeSiSm/autocrypt_6.png', '/images/homeSiSm/autocrypt_7.png'],
        },
    },
    {
        id: 'si_6',
        gradientClasses: 'bg-gradient-to-br from-[#0072ff] via-[#00a0ff] to-[#00c6ff]',
        bgColor: '#00c6ff',
        imageSrc: '/images/homeSiSm/sports_3.jpg',
        imageAlt: 'KNSU Project',
        dates: ['2022.08 - 2023.02'],
        title: '실시간 승부조작 위험성 경고 시스템 \n구축',
        clientName: 'KNSU',
        imageStyle: 'knsu',
        smallH3: false,
        details: {
            client: '한국체육대학교 (KNSU)',
            title: 'AI 기반 실시간 승부조작 위험성 경고 시스템',
            period: '2022.08 - 2023.02',
            overview: `스포츠 경기의 승부조작을 탐지하기 위한 AI 기반 시스템을 구축했습니다.
            \n실시간으로 다양한 경기 데이터를 수집하고, 5가지 고유의 알고리즘 모델을 구현하여 경기 패턴을 분석합니다.
             이를 통해 비정상적인 경기로 판단될 경우 '주의', '경계' 등의 경고를 표시합니다.`,
            images: ['/images/homeSiSm/sports_3.jpg'],
        },
    },
]

/**
 * 프로젝트의 imageStyle에 따라 적절한 Tailwind 클래스를 반환합니다.
 */
const getImageClasses = (project: (typeof siSmProjects)[0]) => {
    // 모든 이미지에 공통으로 적용될 기본 클래스
    const baseClasses = ''

    let specificClasses = ''

    // imageStyle 값에 따라 스타일 분기
    switch (project.imageStyle) {
        case 'cuckoo':
            specificClasses = 'w-full h-full object-cover'
            break
        case 'lotto':
            // 여기에 'lotto' 스타일에 맞는 클래스를 지정하세요. (예시)
            specificClasses = 'w-full h-full object-cover'
            break
        case 'auto':
            // 여기에 'auto' 스타일에 맞는 클래스를 지정하세요. (예시)
            specificClasses = 'w-full h-full object-cover object-top'
            break
        case 'knsu':
            // 여기에 'auto' 스타일에 맞는 클래스를 지정하세요. (예시)
            specificClasses = 'w-full h-full object-cover '
            break
        case 'withfresh':
            specificClasses = 'w-full h-full object-cover'
            break
        default:
            // 'default' 또는 정의되지 않은 경우
            specificClasses = 'w-full h-full object-cover object-top'
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
                        x: () => -(wrapper.scrollWidth - document.documentElement.clientWidth) + 'px',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.value,
                            pin: true,
                            scrub: 1,
                            end: () => '+=' + (wrapper.scrollWidth - document.documentElement.clientWidth),
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
                    const scaleFactor = 1.2

                    cards.forEach((card: any, index: number) => {
                        const cardContent = card.querySelector('.portfolio-item-replacement')
                        const unifiedOverlay = card.querySelector('.unified-overlay')
                        const isLastCard = index === cards.length - 1
                        const isLastSecondCard = index === cards.length - 2
                        const isLastThirdCard = index === cards.length - 3

                        if (cardContent) {
                            card.addEventListener('mouseenter', () => {
                                // 2. 카드의 현재 너비를 기반으로 pushAmount를 동적으로 계산
                                const cardWidth = card.offsetWidth
                                const pushAmount = cardWidth * (scaleFactor - 1) // (너비 * 0.2)

                                const origin = isLastCard || isLastSecondCard || isLastThirdCard ? 'right top' : 'left top'

                                gsap.to(card, {
                                    scale: scaleFactor, // 3. 상수 사용
                                    transformOrigin: origin,
                                    zIndex: 10,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                gsap.to(unifiedOverlay, {
                                    opacity: 0,
                                    duration: 0.3,
                                    ease: 'power1.out',
                                })
                                if (isLastCard || isLastSecondCard || isLastThirdCard) {
                                    // 마지막 카드: 자신(index)을 제외한 이전 카드들(0 ~ index-1)을 왼쪽으로 민다.
                                    gsap.to(cards.slice(0, index), {
                                        x: -pushAmount, // ✅ 마이너스 값으로 왼쪽으로 이동
                                        duration: 0.3,
                                        ease: 'power1.out',
                                    })
                                } else {
                                    // 마지막 카드가 아님: 자신(index) 다음 카드들(index+1 ~ 끝)을 오른쪽으로 민다.
                                    gsap.to(cards.slice(index + 1), {
                                        x: pushAmount,
                                        duration: 0.3,
                                        ease: 'power1.out',
                                    })
                                }
                            })

                            card.addEventListener('mouseleave', () => {
                                const origin = isLastCard || isLastSecondCard || isLastThirdCard ? 'right top' : 'left top'

                                gsap.to(card, {
                                    scale: 1.0,
                                    transformOrigin: origin,
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
                                start: 'top 50%', // 카드의 상단이 뷰포트 85% 지점에 도달할 때
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
