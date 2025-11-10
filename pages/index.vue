<template>
    <div class="overflow-x-hidden" ref="mainContainer">
        <HomeSectionTop @animationComplete="unlockScroll" />
        <HomeSectionInfo />
        <HomeSectionBusiness />
        <HomeSectionValues />
        <HomeSectionCEO />
        <HomeSectionSiSm />
        <HomeSectionSolution />
        <HomeSectionCulture />
        <SectionContact />
        <HomeSectionFact />
    </div>
</template>

<script setup lang="ts">
// ✅ [추가] onMounted, onUnmounted, ScrollTrigger 임포트
import { onMounted, onUnmounted, onBeforeMount, nextTick, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionContact from '@/components/contact/SectionContact.vue'
// ✅ [추가] useHeaderTheme 임포트
import { useHeaderTheme } from '~/composables/useHeaderTheme'

// ✅ [추가] setHeaderTheme 함수 가져오기
const { setHeaderTheme } = useHeaderTheme()

// ✅ [추가] 생성된 ScrollTrigger 인스턴스를 저장할 ref
const themeScrollTrigger = ref<ScrollTrigger | null>(null)

// ✅ [추가] 스크롤 잠금 해제 함수
const unlockScroll = () => {
    document.body.style.overflow = ''
    ScrollTrigger.enable()

    // ✅ [추가] GSAP가 현재 스크롤 위치를 강제로 다시 읽도록 합니다.
    ScrollTrigger.update()

    setHeaderTheme('transparent')

    // 0.1초 뒤 ScrollTrigger들 새로고침
    setTimeout(() => {
        ScrollTrigger.refresh()
    }, 100)
}

// ✅ [추가] 페이지 마운트 시 스크롤 잠금
onMounted(() => {
    // 1. [가장 중요] 스크롤을 (0, 0)으로 강제로 즉시 보냅니다.
    setTimeout(() => {
        setHeaderTheme('transparent')
        window.scrollTo(0, 0)
    }, 0)

    document.body.style.overflow = 'hidden'

    // 2. 스크롤 트리거를 생성합니다. (순서 중요)
    themeScrollTrigger.value = ScrollTrigger.create({
        start: 1,
        end: 'bottom bottom', // 페이지 끝까지
        onEnter: () => {
            console.log('onEnter: DARK')
            setHeaderTheme('dark')
        },
        onLeaveBack: () => {
            console.log('onLeaveBack: TRANSPARENT')
            setHeaderTheme('transparent')
        },
    })

    // 3. ScrollTrigger 기능을 일시정지합니다.
    ScrollTrigger.disable()
})

// ✅ [추가] 페이지 이탈 시 안전장치
onUnmounted(() => {
    unlockScroll()
    // ✅ [추가] 컴포넌트가 사라질 때 생성했던 ScrollTrigger도 제거
    themeScrollTrigger.value?.kill()
})
</script>
