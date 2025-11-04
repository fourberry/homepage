<template>
    <div class="relative h-screen">
        <HomeSectionbeforeSectionHero ref="heroSectionRef" class="absolute inset-0 h-full w-full" />

        <section ref="topSectionRef" class="relative h-screen min-h-[560px] overflow-hidden">
            <div ref="bgImageWrapper" class="absolute inset-0 overflow-hidden">
                <img src="/images/aboutMain.jpg" alt="FOURBERRY background" class="h-full w-full object-cover object-[50%_40%]" />
                <div class="absolute inset-0 bg-black/45"></div>
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
            </div>

            <div ref="textWrapper" class="absolute inset-0 flex items-end justify-start">
                <div class="px-4 pb-16 text-left text-white md:px-16 md:pb-28">
                    <h1 class="h1-custom-font text-[clamp(45px,10vw,150px)] font-black leading-[0.95] tracking-[-0.04em]">
                        WE’RE
                        <br />
                        <span ref="fourberry" class="inline-block min-w-[10ch] text-white"></span>
                    </h1>
                    <p class="mt-4 text-[clamp(16px,2.2vw,28px)] font-semibold text-gray-400">고객 만족을 넘어 고객 감동을 제공하는 IT 최고의 기업이 되겠습니다.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
// ✨ [1. 추가] Hero 컴포넌트를 직접 임포트합니다.
import HomeSectionbeforeSectionHero from '~/components/HomeSectionbefore/SectionHero.vue'

// --- Refs ---
// ✨ [2. 추가] 각 섹션의 루트 DOM을 가리키는 Ref
const heroSectionRef = ref(null) // Hero 컴포넌트
const topSectionRef = ref(null) // Top 섹션 <section> 엘리먼트

// (기존 Top 섹션 내부 요소 Refs)
const bgImageWrapper = ref(null)
const textWrapper = ref(null)
const fourberry = ref(null)
const text = 'FOURBERRY.'

// ... typeAndDelete 함수 (변경 없음) ...
function typeAndDelete(el, text, speed = 250, delay = 3000) {
    let i = 0
    let isDeleting = false
    function typing() {
        if (!el) {
            return
        }
        if (!isDeleting && i < text.length) {
            el.innerHTML += text.charAt(i)
            i++
            setTimeout(typing, speed)
        } else if (!isDeleting && i === text.length) {
            isDeleting = true
            setTimeout(typing, delay)
        } else if (isDeleting && i > 0) {
            el.innerHTML = text.substring(0, i - 1)
            i--
            setTimeout(typing, speed / 1.5)
        } else if (isDeleting && i === 0) {
            isDeleting = false
            setTimeout(typing, 1000)
        }
    }
    typing()
}

// ✨ [3. 수정]
// 이 함수는 'Top 섹션'의 *내부* 애니메이션만 담당합니다.
// 이름 변경: startAnimation -> startTopAnimation
const startTopAnimation = () => {
    console.log('4. Top 섹션 내부 애니메이션(startTopAnimation) 호출됨.')

    if (!bgImageWrapper.value || !textWrapper.value || !fourberry.value) {
        console.error('SectionTop.vue 내부 Ref가 준비되지 않았습니다!', {
            /* ... */
        })
        return
    }

    console.log('5. Top 섹션 내부 애니메이션 타임라인 시작.')
    const tl = gsap.timeline()
    tl.to(bgImageWrapper.value, {
        duration: 1.8,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power4.out',
    })
    tl.to(
        textWrapper.value,
        {
            duration: 1.2,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            onComplete: () => {
                const el = fourberry.value
                typeAndDelete(el, text, 250, 3000)
            },
        },
        '-=1.0'
    )
}

// ✨ [4. 추가]
// Hero 섹션의 애니메이션을 실행하는 함수 (이전 index.vue의 createHeroTimeline 로직)
const startHeroAnimation = () => {
    // heroSectionRef.value는 컴포넌트 인스턴스이므로 .$el로 DOM에 접근
    const heroEl = heroSectionRef.value?.$el
    if (!heroEl) {
        console.error('Hero 엘리먼트($el)를 찾을 수 없습니다.')
        return
    }

    console.log('1. Hero 애니메이션(startHeroAnimation) 타임라인 생성 및 시작...')

    // (index.vue에서 가져온 Hero 애니메이션 로직)
    const heroTitle = heroEl.querySelector('h1')
    const heroSubtitle = heroEl.querySelector('.hero-subtitle')
    const heroBg = heroEl.querySelector('.hero-background-image')
    const heroContent = heroEl.querySelector('.hero-content')

    const heroTl = gsap.timeline({
        onComplete: () => {
            // Hero 애니메이션이 완료되면, Top 섹션으로 전환합니다.
            console.log('2. Hero 타임라인 완료. Top 섹션으로 트랜지션 시작...')
            transitionToTopSection()
        },
    })

    if (heroTitle) gsap.set(heroTitle, { autoAlpha: 0, y: 40 })
    if (heroSubtitle) gsap.set(heroSubtitle, { autoAlpha: 0, y: 40 })

    if (heroTitle) heroTl.to(heroTitle, { duration: 1.2, y: 0, autoAlpha: 1, ease: 'power3.out' }, 0.2)
    if (heroSubtitle) heroTl.to(heroSubtitle, { duration: 1.2, y: 0, autoAlpha: 1, ease: 'power3.out' }, '<0.3')
    if (heroBg) heroTl.to(heroBg, { duration: 2.5, clipPath: 'ellipse(150% 150% at 50% 100%)', opacity: 1, ease: 'power2.inOut' }, '<0.2')
    if (heroContent) heroTl.to(heroContent, { duration: 2.0, color: '#ffffff', ease: 'power2.inOut' }, '-=2.5')

    heroTl.play()
}

// ✨ [5. 추가]
// Hero 섹션에서 Top 섹션으로 '전환'하는 애니메이션
const transitionToTopSection = () => {
    const heroEl = heroSectionRef.value?.$el
    const topEl = topSectionRef.value // <section> DOM 요소

    if (!heroEl || !topEl) {
        console.error('트랜지션 대상 Ref가 없습니다.')
        return
    }

    console.log('3. Hero -> Top 트랜지션 실행 (Hero 페이드아웃)')

    const tl = gsap.timeline({
        onComplete: () => {
            // z-index 정리
            gsap.set(heroEl, { zIndex: 1 })
            gsap.set(topEl, { zIndex: 2 })

            // ✨ Top 섹션의 *내부* 애니메이션을 여기서 호출
            startTopAnimation()
        },
    })

    // Hero 섹션 페이드 아웃
    tl.to(heroEl, {
        duration: 0.5,
        autoAlpha: 0,
        ease: 'power1.inOut',
    })

    // Top 섹션이 즉시 나타나도록 (autoAlpha 0 -> 1)
    // (내부 요소들은 startTopAnimation이 알아서 처리)
    tl.set(topEl, { autoAlpha: 1 }, '<') // 페이드아웃과 동시에 실행
}

// ✨ [6. 수정] onMounted
onMounted(() => {
    // --- 1. 초기 상태 설정 ---
    const heroEl = heroSectionRef.value?.$el
    const topEl = topSectionRef.value

    if (heroEl) {
        // Hero 섹션: 보이게, 맨 위에 (z-index 2)
        gsap.set(heroEl, { autoAlpha: 1, zIndex: 2 })
    }
    if (topEl) {
        // Top 섹션: 안 보이게, 아래에 (z-index 1)
        gsap.set(topEl, { autoAlpha: 0, zIndex: 1 })
    }

    // (기존 Top 섹션 *내부* 요소들 초기화)
    if (textWrapper.value) {
        gsap.set(textWrapper.value, { opacity: 0, y: 20 })
    }
    if (bgImageWrapper.value) {
        gsap.set(bgImageWrapper.value, { clipPath: 'inset(100% 0% 0% 0%)' })
    }

    // --- 2. 애니메이션 시작 ---
    // Hero 애니메이션부터 실행
    startHeroAnimation()
})

// ✨ [7. 제거]
// 더 이상 부모에게 함수를 노출할 필요가 없습니다.
// defineExpose({ startAnimation })
</script>

<style scoped>
/* :root ... */
/* .h1-custom-font ... */
/* span::after ... */
/* @keyframes blink ... */
/* (기존 <style> 내용은 동일하게 유지) */

:root {
    /* 헤더 높이 한번에 관리 */
    --header-h: 80px; /* 실제 헤더 높이에 맞춰 수정 */
}

/* 제목 강조 */
.h1-custom-font {
    font-family: 'Pretendard', 'Noto Sans KR', 'system-ui', sans-serif;
    -webkit-text-stroke: 1.7px white;
    text-stroke: 1.7px white;
    color: white;
}

/* 커서 효과 */
span::after {
    content: '';
    display: inline-block;
    margin-left: 0.05em;
    width: 0.12em;
    height: 0.95em;
    background-color: white;
    vertical-align: middle;
    animation: blink 0.8s steps(1) infinite;
}
@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
