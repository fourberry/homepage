<template>
    <header :class="headerClasses">
        <div class="container-wide relative mx-auto flex items-center justify-between px-4 py-4 md:px-8">
            <NuxtLink
                id="header-logo-text"
                to="/"
                class="flex items-center text-2xl desktop:text-3xl desktop:h-14 font-extrabold no-underline transition-opacity duration-200 ease-in-out hover:opacity-80"
            >
                FOURBERRY
            </NuxtLink>

            <div class="md:flex items-center gap-3 desktop:gap-5 hidden">
                <NuxtLink
                    to="#about"
                    class="group relative min-w-[6rem] text-center text-base font-bold desktop:text-lg no-underline overflow-hidden"
                >
                    <span class="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                        ABOUT
                    </span>
                    <span class="absolute inset-0 block translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-blue-600">
                        소개
                    </span>
                </NuxtLink>

                <NuxtLink
                    to="#projects"
                    class="group relative min-w-[6rem] text-center text-base font-bold desktop:text-lg no-underline overflow-hidden"
                >
                    <span class="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                        SI/SM
                    </span>
                    <span class="absolute inset-0 block translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-blue-600">
                        구축/운영
                    </span>
                </NuxtLink>

                <NuxtLink
                    to="#services"
                    class="group relative min-w-[6rem] text-center text-base font-bold desktop:text-lg no-underline overflow-hidden"
                >
                    <span class="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                        SOLUTION
                    </span>
                    <span class="absolute inset-0 block translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-blue-600">
                        솔루션
                    </span>
                </NuxtLink>

                <NuxtLink
                    to="#contact"
                    class="group relative min-w-[6rem] text-center text-base font-bold desktop:text-lg no-underline overflow-hidden"
                >
                    <span class="block transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                        CONTACT
                    </span>
                    <span class="absolute inset-0 block translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-blue-600">
                        연락처
                    </span>
                </NuxtLink>
            </div>

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
                <NuxtLink @click="isMobileMenuOpen = false" to="#about"    class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">ABOUT</NuxtLink>
                <NuxtLink @click="isMobileMenuOpen = false" to="#projects" class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">SI/SM</NuxtLink>
                <NuxtLink @click="isMobileMenuOpen = false" to="#services" class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">SOLUTION</NuxtLink>
                <NuxtLink @click="isMobileMenuOpen = false" to="#contact"  class="px-6 py-3 font-medium text-gray-800 no-underline hover:bg-gray-50">CONTACT</NuxtLink>
            </nav>
        </transition>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// [수정 1] setHeaderTheme도 가져옵니다.
import { useHeaderTheme } from '~/composables/useHeaderTheme'

gsap.registerPlugin(ScrollTrigger)

// --- 상태 로직 ---
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
let scrollTriggerInstance: ScrollTrigger | null = null

// [수정 2] 'theme'과 'setHeaderTheme'을 올바르게 구조분해합니다.
const { theme, setHeaderTheme } = useHeaderTheme()

// --- 모바일 메뉴 로직 ---
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// [수정 3] 햄버거 버튼 라인 색상 로직
// 'dark' 테마(스크롤 내림)일 때만 'bg-gray-800', 그 외('light', 'transparent')는 'bg-white'
const lineClasses = computed(() => [
    (isMobileMenuOpen.value || theme.value === 'dark') ? 'bg-gray-800' : 'bg-white',
])

// [수정 4] 헤더 클래스 바인딩 로직 (가장 중요)
// effectiveTheme을 제거하고, 'theme' 값을 직접 사용하여 4가지 상태를 처리합니다.
const headerClasses = computed(() => {
    const baseClasses = 'top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out'

    // [신규] 1. 모바일 메뉴가 열렸을 때: 무조건 흰색 배경 + 검은색 텍스트
    // 이렇게 해야 최상단(투명) 상태에서 메뉴를 열어도 헤더가 보입니다.
    if (isMobileMenuOpen.value) {
        return [baseClasses, 'fixed bg-white text-gray-800 shadow-sm']
    }

    // --- (메뉴가 닫혀 있을 때) ---
    // 2. 홈페이지가 아닐 때: 항상 흰색 배경
    if (!isHomePage.value) {
        return [baseClasses, 'fixed bg-white text-gray-800 shadow-sm']
    }

    // 3. 홈페이지일 때: 'theme' 값에 따라 분기
    switch (theme.value) {
        case 'transparent':
            // 3-1. 'transparent' 강제 설정 시 (예: SectionSiSm)
            return [baseClasses, 'fixed bg-transparent text-transparent']
        case 'dark':
            // 3-2. 스크롤이 내려간 상태
            return [baseClasses, 'fixed bg-white/60 backdrop-blur-md shadow-sm text-gray-800']
        case 'light':
        default:
            // 3-3. 홈페이지 최상단 (스크롤 0)
            return [baseClasses, 'absolute bg-transparent text-transparent']
    }
})

// [수정 5] ScrollTrigger 로직 수정
const setupScrollTrigger = () => {
    scrollTriggerInstance?.kill()
    if (isHomePage.value) {
        scrollTriggerInstance = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: '+=10',
            onUpdate: self => {
                const scrolled = self.scroll() > 10
                // [중요] 현재 테마가 'transparent'가 아닐 때만 스크롤에 따라 테마 변경
                if (theme.value !== 'transparent') {
                    setHeaderTheme(scrolled ? 'dark' : 'light')
                }
            },
        })
    }
}

// --- 생명주기 로직 (수정됨) ---
onMounted(() => {
    if (isHomePage.value) {
        const scrolled = window.scrollY > 10
        // [중요] 초기 로드 시에도 'transparent'가 아니어야 테마 설정
        if (theme.value !== 'transparent') {
            setHeaderTheme(scrolled ? 'dark' : 'light')
        }
        setupScrollTrigger()
    } else {
        setHeaderTheme('dark') // 다른 페이지는 항상 'dark'
    }

    watch(
        () => route.path,
        newPath => {
            isMobileMenuOpen.value = false // 페이지 이동 시 메뉴 닫기

            if (newPath === '/') {
                // 홈페이지로 돌아올 땐 테마 리셋
                const scrolled = window.scrollY > 10
                setHeaderTheme(scrolled ? 'dark' : 'light')
                setupScrollTrigger()
            } else {
                // 다른 페이지로 이동 시
                setHeaderTheme('dark')
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
