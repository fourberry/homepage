<template>
    <header :class="headerClasses">
        <div class="relative mx-auto flex max-w-9xl items-center justify-between px-4 py-4 md:px-8">
            <NuxtLink id="header-logo-text" to="/" class="text-2xl font-bold no-underline">FOURBERRY</NuxtLink>

            <nav class="hidden items-center space-x-6 md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2">
                <NuxtLink to="/about" class="text-base no-underline transition-opacity hover:opacity-80">ABOUT</NuxtLink>
                <NuxtLink to="/projects" class="text-base no-underline transition-opacity hover:opacity-80">SI/SM</NuxtLink>
                <NuxtLink to="/services" class="text-base no-underline transition-opacity hover:opacity-80">SOLUTION</NuxtLink>
                <NuxtLink to="/contact" class="text-base no-underline transition-opacity hover:opacity-80">CONTACT</NuxtLink>
            </nav>

            <button @click="toggleMobileMenu" class="relative z-50 flex h-8 w-8 items-center justify-center md:hidden" aria-label="메뉴 토글">
                <div class="relative h-4 w-6">
                    <span
                        class="absolute left-0 top-0 block h-0.5 w-full origin-center transition-all duration-300 ease-in-out"
                        :class="[lineClasses, isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : '']"
                    ></span>

                    <span
                        class="absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 transition-all duration-300 ease-in-out"
                        :class="[lineClasses, isMobileMenuOpen ? 'opacity-0' : '']"
                    ></span>

                    <span
                        class="absolute bottom-0 left-0 block h-0.5 w-full origin-center transition-all duration-300 ease-in-out"
                        :class="[lineClasses, isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : '']"
                    ></span>
                </div>
            </button>
        </div>

        <transition name="slide-down">
            <nav v-if="isMobileMenuOpen" class="absolute left-0 top-full flex w-full flex-col border-t border-gray-200 bg-white shadow-lg md:hidden">
                <NuxtLink @click="isMobileMenuOpen = false" to="/about" class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">ABOUT</NuxtLink>
                <NuxtLink @click="isMobileMenuOpen = false" to="/projects" class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">SI/SM</NuxtLink>
                <NuxtLink @click="isMobileMenuOpen = false" to="/services" class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">SOLUTION</NuxtLink>
                <NuxtLink @click="isMobileMenuOpen = false" to="/contact" class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">CONTACT</NuxtLink>
            </nav>
        </transition>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- 상태 로직 ---
const isScrolled = ref(false)
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
let scrollTriggerInstance: ScrollTrigger | null = null
const headerTheme = useHeaderTheme()
const shouldApplyScrolledClass = computed(() => isScrolled.value || !isHomePage.value)
const effectiveTheme = computed(() => {
    if (!isHomePage.value) {
        return 'dark'
    }
    if (isScrolled.value) {
        return 'dark'
    }
    return headerTheme.value
})

// --- 모바일 메뉴 로직 (수정됨) ---
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 버튼 라인 색상
const lineClasses = computed(() => [effectiveTheme.value === 'dark' ? 'bg-gray-800' : 'bg-white'])

// --- Tailwind 클래스 바인딩 로직 ---
const headerClasses = computed(() => {
    const isInitialTransparentState = isHomePage.value && headerTheme.value === 'light'
    const theme = effectiveTheme.value
    const backgroundAndPosition = isInitialTransparentState ? 'absolute bg-transparent' : 'fixed bg-white'
    // 새 로직
    let textColor
    let borderColor

    if (isInitialTransparentState) {
        // 1. 홈페이지 최상단 (스크롤 0)
        // 요청하신대로 글씨를 투명하게 설정합니다.
        textColor = 'text-transparent'
        borderColor = '' // 테두리 없음
    } else {
        // 2. 스크롤을 내렸거나, 다른 페이지일 경우
        // 배경이 흰색이 되므로 글씨를 검은색으로 설정합니다.
        textColor = 'text-gray-800'
    }

    return ['top-0', 'left-0', 'w-full', 'z-50', 'transition-all', 'duration-300', 'ease-in-out', backgroundAndPosition, textColor, borderColor]
})

const setupScrollTrigger = () => {
    scrollTriggerInstance?.kill()
    if (isHomePage.value) {
        scrollTriggerInstance = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: '+=10',
            onUpdate: self => {
                isScrolled.value = self.scroll() > 10
                if (isHomePage.value) {
                    headerTheme.value = isScrolled.value ? 'dark' : 'light'
                }
            },
        })
    }
}

// --- 생명주기 로직 (수정됨) ---
onMounted(() => {
    // --- (기존 onMounted 로직) ---
    if (isHomePage.value) {
        isScrolled.value = window.scrollY > 10
        headerTheme.value = isScrolled.value ? 'dark' : 'light'
        setupScrollTrigger()
    } else {
        isScrolled.value = true
        headerTheme.value = 'dark'
    }

    watch(
        () => route.path,
        newPath => {
            isMobileMenuOpen.value = false // 페이지 이동 시 메뉴 닫기

            if (newPath === '/') {
                isScrolled.value = window.scrollY > 10
                headerTheme.value = isScrolled.value ? 'dark' : 'light'
                setupScrollTrigger()
            } else {
                isScrolled.value = true
                headerTheme.value = 'dark'
                scrollTriggerInstance?.disable()
            }
        }
    )
})

onUnmounted(() => {
    scrollTriggerInstance?.kill()
})

defineExpose({
    // ref를 직접 노출하기보다 $el 접근을 염두에 둠
})
</script>

<style scoped>
/* 모바일 메뉴 패널 트랜지션 */
.slide-down-enter-active,
.slide-down-leave-active {
    transition:
        transform 0.3s ease-in-out,
        opacity 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
