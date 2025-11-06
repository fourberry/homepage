<template>
    <header :class="headerClasses">
        <div class="container-wide relative mx-auto flex items-center justify-between px-4 py-4 md:px-8">
            <NuxtLink
                id="header-logo-text"
                to="/"
                class="flex items-center text-2xl desktop:text-3xl desktop:h-14 font-extrabold no-underline transition-opacity duration-300 ease-in-out hover:opacity-80"
                aria-label="FOURBERRY"
            >
                <div class="h-full flex items-center" :class="logoImageClasses">
                    <img src="/images/logo.png" class="h-full object-contain" />
                </div>
                <span class="logo-word" ref="logoEl">
                    <span v-for="(ch, idx) in logoLetters" :key="idx" class="logo-ch">{{ ch }}</span>
                </span>
            </NuxtLink>

            <!-- 데스크탑 메뉴 -->
            <div class="hidden items-center gap-3 md:flex desktop:gap-5">
                <NuxtLink to="#about" class="menu-link group relative min-w-[6rem] overflow-hidden text-center text-base font-bold no-underline desktop:text-lg">
                    <span class="front block">ABOUT</span>
                    <span class="back absolute inset-0 block">소개</span>
                </NuxtLink>

                <NuxtLink to="#projects" class="menu-link group relative min-w-[6rem] overflow-hidden text-center text-base font-bold no-underline desktop:text-lg">
                    <span class="front block">SI/SM</span>
                    <span class="back absolute inset-0 block">구축/운영</span>
                </NuxtLink>

                <NuxtLink to="#services" class="menu-link group relative min-w-[6rem] overflow-hidden text-center text-base font-bold no-underline desktop:text-lg">
                    <span class="front block">SOLUTION</span>
                    <span class="back absolute inset-0 block">솔루션</span>
                </NuxtLink>

                <NuxtLink to="#contact" class="menu-link group relative min-w-[6rem] overflow-hidden text-center text-base font-bold no-underline desktop:text-lg">
                    <span class="front block">CONTACT</span>
                    <span class="back absolute inset-0 block">연락처</span>
                </NuxtLink>
            </div>

            <!-- 햄버거 버튼 등 기존 그대로 -->
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

        <!-- 모바일 메뉴(이미 hover 효과 없음) -->
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
import { useHeaderTheme } from '~/composables/useHeaderTheme'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
let scrollTriggerInstance: ScrollTrigger | null = null

const { theme, setHeaderTheme } = useHeaderTheme()

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const logoImageClasses = computed(() => {
    // 홈이면서, 'light' 테마(스크롤 전)이고, 모바일 메뉴가 열리지 않았을 때
    if (isHomePage.value && theme.value === 'light' && !isMobileMenuOpen.value) {
        return 'opacity-0' // 이미지를 숨김
    }
    // 그 외 모든 경우 (스크롤 후, 다른 페이지, 모바일 메뉴 열림)
    // 헤더의 transition과 동일하게 맞추기 위해 transition 속성 추가
    return 'opacity-100 transition-opacity duration-300 ease-in-out'
})

const lineClasses = computed(() => [
    (isMobileMenuOpen.value || theme.value === 'dark') ? 'bg-gray-800' : 'bg-white',
])

const headerClasses = computed(() => {
    const baseClasses = 'top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out'
    if (isMobileMenuOpen.value) {
        return [baseClasses, 'fixed bg-white text-gray-800 shadow-sm']
    }
    if (!isHomePage.value) {
        return [baseClasses, 'fixed bg-white text-gray-800 shadow-sm']
    }
    switch (theme.value) {
        case 'transparent':
            return [baseClasses, 'fixed bg-transparent text-transparent']
        case 'dark':
            return [baseClasses, 'fixed bg-white/60 backdrop-blur-md shadow-sm text-gray-800']
        case 'light':
        default:
            return [baseClasses, 'absolute bg-transparent text-transparent']
    }
})

const setupScrollTrigger = () => {
    scrollTriggerInstance?.kill()
    if (isHomePage.value) {
        scrollTriggerInstance = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: '+=10',
            onUpdate: self => {
                const scrolled = self.scroll() > 10
                if (theme.value !== 'transparent') {
                    setHeaderTheme(scrolled ? 'dark' : 'light')
                }
            },
        })
    }
}

/* ---------- [로고 애니메이션 추가] ---------- */
const logoText = 'FOURBERRY'
const logoLetters = logoText.split('')
const logoEl = ref<HTMLElement | null>(null)
let logoTl: gsap.core.Timeline | null = null

const buildLogoTimeline = () => {
    if (!logoEl.value) {
        console.warn('로고 요소를 찾을 수 없습니다.')
        return
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const letters = logoEl.value.querySelectorAll<HTMLElement>('.logo-ch')

    // 기존 타임라인 정리
    logoTl?.kill()

    // 전체 사이클 끝나고 5초 대기 후 반복
    logoTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
    })

    // 초기 상태
    gsap.set(letters, { y: 0 })

    // ✨ 핵심: 한 글자(올라감→내려옴)를 'keyframes'로 묶고, stagger로 겹치게 시작
    logoTl.to(letters, {
        keyframes: [
            { y: -12, duration: 0.22, ease: 'power2.out' },      // 위로 콕
            { y: 0,   duration: 0.28, ease: 'power2.inOut' },     // 자연스럽게 복귀
        ],
        // 다음 글자가 살짝 먼저 시작하게 하여 "연쇄"처럼 보이게 함
        stagger: 0.06, // 더 촘촘: 0.04 ~ 0.05 / 더 느긋: 0.08 ~ 0.1
    }, 0)
}

onMounted(() => {
    if (isHomePage.value) {
        const scrolled = window.scrollY > 10
        if (theme.value !== 'transparent') {
            setHeaderTheme(scrolled ? 'dark' : 'light')
        }
        setupScrollTrigger()
    } else {
        setHeaderTheme('dark')
    }

    // 로고 애니메이션 초기화
    buildLogoTimeline()

    // 라우트 전환 시: 메뉴 정리 + 헤더 테마 처리 + (홈일 때만) 로고 타임라인 재구성
    watch(
        () => route.path,
        newPath => {
            isMobileMenuOpen.value = false

            if (newPath === '/') {
                const scrolled = window.scrollY > 10
                setHeaderTheme(scrolled ? 'dark' : 'light')
                setupScrollTrigger()
                buildLogoTimeline()
            } else {
                setHeaderTheme('dark')
                scrollTriggerInstance?.disable()
                // 다른 페이지에서는 과도한 움직임 방지를 위해 일단 정지
                logoTl?.pause(0)
            }
        }
    )

    // 모바일 메뉴가 열린 동안에는 사용자가 메뉴에 집중할 수 있게 애니메이션 일시정지
    watch(isMobileMenuOpen, (open) => {
        if (open) {
            logoTl?.pause()
        } else {
            logoTl?.resume()
        }
    })
})

onUnmounted(() => {
    scrollTriggerInstance?.kill()
    logoTl?.kill()
})
/* ---------- [로고 애니메이션 추가 끝] ---------- */

defineExpose({})
</script>

<style scoped>
/* 로고 글자 단위 애니메이션을 위한 설정 */
.logo-word {
    display: inline-flex;
    gap: 0.02em;
}

.logo-ch {
    display: inline-block;
    will-change: transform;
    transform: translateZ(0);
}

/* 아래 기존 스타일 그대로 유지 */
.menu-link .front {
    transform: translateY(0);
    opacity: 1;
    transition: none;
}
.menu-link .back {
    transform: translateY(100%);
    opacity: 0;
    transition: none;
}
@media (any-hover: hover) and (any-pointer: fine) {
    .menu-link .front,
    .menu-link .back {
        transition:
            transform 0.3s ease-in-out,
            opacity 0.3s ease-in-out;
    }
    .menu-link .front { transform: translateY(0); opacity: 1; }
    .menu-link .back  { transform: translateY(100%); opacity: 0; }
    .menu-link:hover .front { transform: translateY(-100%); opacity: 0; }
    .menu-link:hover .back  { transform: translateY(0); opacity: 1; color: rgb(37 99 235); }
}
@media (hover: none) and (pointer: coarse) {
    .menu-link .front,
    .menu-link .back { transition: none; }
}
.slide-down-enter-active,
.slide-down-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>

