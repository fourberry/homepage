<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, nextTick } from 'vue' // nextTick 추가
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { useHeaderTheme } from '~/composables/useHeaderTheme'
import type SectionAbout from '~/components/HomeSectionbefore/SectionAbout.vue'
import AppHeader from '~/components/AppHeader.vue'
import { Flip } from 'gsap/Flip' // Flip은 사용하지 않으므로 제거해도 됩니다.
import type SectionCta from '~/components/HomeSectionbefore/SectionCta.vue'

// Flip 플러그인은 사용하지 않으므로 등록 제거 가능
gsap.registerPlugin(ScrollTrigger, Observer) // Flip 제거

// 페이지 메타 정의: home 레이아웃 사용
definePageMeta({
    layout: 'home',
})

const mainContainer = ref<HTMLElement | null>(null)

interface SectionAboutExposed {
    businessAreas: Ref<HTMLElement | null>
}
// SectionAbout 컴포넌트 참조 ref
const sectionAboutRef = ref<(InstanceType<typeof SectionAbout> & SectionAboutExposed) | null>(null)

// businessAreas ref (computed로 변경)
const businessAreas = computed(() => sectionAboutRef.value?.businessAreas)

// ✨ [추가] SectionCta 컴포넌트 ref 타입 정의
interface SectionCtaExposed {
    startTyping: () => void
}
// ✨ [추가] SectionCta 컴포넌트 ref 선언
const sectionCtaRef = ref<(InstanceType<typeof SectionCta> & SectionCtaExposed) | null>(null)

const appHeaderRef = ref<InstanceType<typeof AppHeader> | null>(null)
// 💥 Intro 텍스트 ref 제거
// const introTextRef = ref<HTMLElement | null>(null);
const homeHeroRef = ref<HTMLElement | null>(null)

// 헤더 테마 상태 변수 선언
const headerTheme = useHeaderTheme()

// --- GSAP/Observer 관련 변수 ---
let heroTl: gsap.core.Timeline | null = null
let panelTls: (gsap.core.Timeline | null)[] = []
let observer: Observer | null = null
let panels: HTMLElement[] = []
let currentIndex = 0
let animating = false
let numPanels = 0

// 옵저버 토글 함수 정의
const disableObserver = () => observer?.disable()
const enableObserver = () => observer?.enable()

// 모바일 환경 여부 ref
const isMobile = ref(false)
// 💥 인트로 로딩 상태 제거
// const isLoadingIntro = ref(true);

// --- 섹션 전환 함수 (gotoSection) 정의 ---
const gotoSection = (toIndex: number, direction: number) => {
    if (animating) return

    const fromIndex = currentIndex

    if (toIndex < 0 || toIndex >= numPanels) {
        return
    }

    // 헤더 테마 변경
    if (toIndex === 1 || toIndex === 2 || toIndex === 3) {
        headerTheme.value = 'dark'
    } else {
        headerTheme.value = 'light'
    }

    animating = true
    currentIndex = toIndex
    const dFactor = direction

    panelTls[fromIndex]?.seek(0).pause()
    gsap.set(panels[fromIndex], { zIndex: 1 })

    const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: 'power1.inOut' },
        onComplete: async () => {
            // async 추가
            animating = false
            panelTls[toIndex]?.play()

            // ✨ nextTick 추가 (Ref 타이밍 문제 해결 시도)
            await nextTick()
            console.log('onComplete triggered for index:', toIndex)
            console.log('sectionCtaRef value after nextTick:', sectionCtaRef.value)

            // ✨ [추가] CTA 섹션(인덱스 4)으로 전환 완료 시 타이핑 시작
            if (toIndex === 4 && sectionCtaRef.value) {
                console.log('Starting typing animation...')
                sectionCtaRef.value.startTyping()
            } else if (toIndex === 4) {
                console.error('sectionCtaRef is still null even after nextTick!')
            }
        },
    })

    gsap.set(panels[toIndex], { yPercent: 100 * dFactor, autoAlpha: 1, zIndex: 2 })
    tl.to(panels[fromIndex], { yPercent: -100 * dFactor }).to(panels[toIndex], { yPercent: 0 }, 0)
}

// 스크롤 핸들러 (웹/모바일 분리)
const handleWebScrollDown = () => {
    if (currentIndex < numPanels - 1 && !animating) gotoSection(currentIndex + 1, 1)
}
const handleWebScrollUp = () => {
    if (currentIndex > 0 && !animating) gotoSection(currentIndex - 1, -1)
    if (currentIndex === 0 && observer) observer.vars.preventDefault = true
}
const handleMobileScrollDown = () => {
    if (currentIndex > 0 && !animating) gotoSection(currentIndex - 1, -1)
}
const handleMobileScrollUp = () => {
    if (currentIndex < numPanels - 1 && !animating) gotoSection(currentIndex + 1, 1)
}

// ✨ Hero 타임라인 생성 함수
const createHeroTimeline = () => {
    heroTl = gsap.timeline({ paused: true }) // 처음엔 멈춤

    // HomeSectionHero 내부 요소들을 직접 선택
    const heroTitle = mainContainer.value?.querySelector('.home-hero h1')
    const heroSubtitle = mainContainer.value?.querySelector('.home-hero .hero-subtitle')
    const heroBg = mainContainer.value?.querySelector('.home-hero .hero-background-image')
    const heroContent = mainContainer.value?.querySelector('.home-hero .hero-content') // 글자색 변경용

    if (heroTitle) gsap.set(heroTitle, { autoAlpha: 0, y: 40 })
    if (heroSubtitle) gsap.set(heroSubtitle, { autoAlpha: 0, y: 40 })

    // ✨ 애니메이션 시작 시점 조정 (바로 시작하도록)
    if (heroTitle) heroTl.to(heroTitle, { duration: 1.2, y: 0, autoAlpha: 1, ease: 'power3.out' }, 0.2) // 약간의 지연(0.2초) 후 시작
    if (heroSubtitle) heroTl.to(heroSubtitle, { duration: 1.2, y: 0, autoAlpha: 1, ease: 'power3.out' }, '<0.3') // 타이틀 시작 후 0.3초 뒤 시작
    if (heroBg) heroTl.to(heroBg, { duration: 2.5, clipPath: 'ellipse(150% 150% at 50% 100%)', opacity: 1, ease: 'power2.inOut' }, '<0.2')
    if (heroContent) heroTl.to(heroContent, { duration: 2.0, color: '#ffffff', ease: 'power2.inOut' }, '-=2.5') // 글자색 변경
}

// ✨ Observer 설정 함수
const setupObserver = () => {
    if (observer) observer.kill() // 기존 옵저버 제거

    observer = Observer.create({
        target: mainContainer.value,
        type: 'wheel,touch,pointer',
        onDown: isMobile.value ? handleMobileScrollDown : handleWebScrollDown,
        onUp: isMobile.value ? handleMobileScrollUp : handleWebScrollUp,
        tolerance: 10,
        preventDefault: true, // 첫 섹션 이후 스크롤 방지
    })

    // 첫 섹션에서는 위로 스크롤 방지 (웹 전용)
    if (!isMobile.value && currentIndex === 0 && observer) {
        observer.vars.preventDefault = true
    }
}

// ✨ 패널 및 내부 애니메이션 설정 함수
const setupPanelsAndAnimations = () => {
    panels = gsap.utils.toArray<HTMLElement>('.panel')
    numPanels = panels.length
    if (!mainContainer.value || panels.length === 0) return

    // 패널 초기화
    gsap.set(mainContainer.value, { position: 'relative', height: '100dvh', overflow: 'hidden' })
    gsap.set(panels, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', autoAlpha: 0, zIndex: 1 })
    gsap.set(panels[0], { autoAlpha: 1, yPercent: 0, zIndex: 2 })
    gsap.set(panels.slice(1), { yPercent: 100 }) // 나머지 패널은 아래에

    // 내부 애니메이션 타임라인 생성
    panelTls = panels.map((panel, i) => {
        // ... (기존 panelTls 생성 로직과 동일) ...
        if (i === 0) return null // 첫 패널(Hero)은 heroTl로 관리

        const title = panel.querySelector('h2, h3')
        const description = panel.querySelector('.section-description')
        const cards = gsap.utils.toArray(panel.querySelectorAll('.area-card, .card'))
        const buttons = panel.querySelector('.details-button, .contact-button')
        const logos = panel.querySelector('.client-logos')
        const solution = panel.querySelector('.solution-cards')
        const strengthsListItems = gsap.utils.toArray(panel.querySelectorAll('.strengths li'))
        const inquiryTitle = panel.querySelector('.inquiry h2')
        const isCtaSection = i === 4 // CTA 섹션 인덱스 확인
        const isAboutSection = i === 1

        const contentTl = gsap.timeline({ paused: true })
        const elementsToSet = [isAboutSection ? null : title, , description, ...cards, buttons, logos, solution, ...strengthsListItems, inquiryTitle].filter(Boolean)

        if (elementsToSet.length > 0) gsap.set(elementsToSet, { autoAlpha: 0, y: 30 })

        if (isAboutSection && title) {
            gsap.set(title, { autoAlpha: 1, y: 0 })
        }
        // 일반 섹션 요소
        if (title && !isCtaSection && !isAboutSection) contentTl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1)
        if (description) contentTl.to(description, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.1')
        if (cards.length > 0) contentTl.to(cards, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5 }, '<0.2')
        if (logos) contentTl.to(logos, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1')
        if (solution) contentTl.to(solution, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1')

        // CTA 섹션 요소
        if (isCtaSection) {
            if (title) contentTl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1) // Strengths 제목
            if (strengthsListItems.length > 0) contentTl.to(strengthsListItems, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.2 }, '<0.1')
            if (inquiryTitle) contentTl.to(inquiryTitle, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.3')
            if (buttons) contentTl.to(buttons, { autoAlpha: 1, y: 0, duration: 0.4 }, '<0.1') // CTA 버튼
        } else if (buttons) {
            contentTl.to(buttons, { autoAlpha: 1, y: 0, duration: 0.4 }, '<0.1') // 다른 섹션 버튼
        }

        return contentTl
    })
}

// --- Lifecycle Hooks ---
onMounted(async () => {
    isMobile.value = window.innerWidth < 768 // 모바일 감지
    await nextTick() // DOM 요소 확보

    // 💥 인트로 관련 요소 가져오기 및 확인 로직 제거
    const headerEl = appHeaderRef.value?.$el as HTMLElement | undefined
    // const headerLogoEl = headerEl?.querySelector('#header-logo-text');

    // 💥 인트로 애니메이션 로직 제거

    // --- 바로 메인 애니메이션 및 옵저버 설정 ---
    if (mainContainer.value && headerEl) {
        // mainContainer와 headerEl 존재 확인
        headerTheme.value = 'light' // 초기 헤더 테마 설정
        gsap.set(headerEl, { autoAlpha: 1 }) // 헤더 보이기
        gsap.set(mainContainer.value, { autoAlpha: 1 }) // 메인 콘텐츠 보이기
        createHeroTimeline() // Hero 타임라인 생성
        setupPanelsAndAnimations() // 패널 설정
        heroTl?.play() // Hero 애니메이션 시작
        setupObserver() // 스크롤 옵저버 시작
    } else {
        // headerEl이 없는 경우에 대한 대비
        console.warn('Header element not found on mount, proceeding without header animations tied to intro.')
        if (mainContainer.value) {
            headerTheme.value = 'light' // 초기 헤더 테마 설정
            gsap.set(mainContainer.value, { autoAlpha: 1 }) // 메인 콘텐츠 보이기
            createHeroTimeline() // Hero 타임라인 생성
            setupPanelsAndAnimations() // 패널 설정
            heroTl?.play() // Hero 애니메이션 시작
            setupObserver() // 스크롤 옵저버 시작
        } else {
            console.error('Main container element not found on mount!')
        }
    }
})

onUnmounted(() => {
    // 이벤트 리스너 및 GSAP 인스턴스 정리 (변경 없음)
    observer?.kill()
    heroTl?.kill()
    panelTls.forEach(tl => tl?.kill())

    // GSAP으로 설정된 스타일 초기화 (변경 없음)
    if (mainContainer.value) {
        gsap.set(mainContainer.value, { clearProps: 'position,height,overflow' })
    }
    gsap.set(panels, { clearProps: 'position,top,left,width,height,yPercent,autoAlpha' })
    const contentSelectors = '.home-hero h1, .home-hero .hero-subtitle, h2, .section-description, .area-card, .card, .details-button, .contact-button'
    gsap.set(contentSelectors, { clearProps: 'autoAlpha,y,clipPath,opacity,color' })
})
</script>

<template>
    <div>
        <div>
            <AppHeader ref="appHeaderRef" />
            <div class="w-full overflow-hidden" ref="mainContainer">
                <HomeSectionHero ref="homeHeroRef" />
                <!--        <HomeSectionAbout ref="sectionAboutRef" />-->
                <HomeSectionSiSm />
                <!--        <HomeSectionSolutions />-->
                <HomeSectionCta ref="sectionCtaRef" />
            </div>
        </div>
    </div>
</template>

<style>
/* 💥 인트로 관련 스타일 제거 */
/* .intro-overlay { ... } */
/* .intro-text { ... } */

/* AppHeader 관련 주석 처리된 스타일 제거 (이미 GSAP으로 제어) */
/* header { ... } */
</style>
