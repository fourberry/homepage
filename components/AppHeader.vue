<template>
  <header :class="headerClasses">

    <div class="max-w-screen-xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

      <NuxtLink id="header-logo-text" to="/" class="font-bold text-2xl no-underline">FOURBERRY</NuxtLink>

      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink to="/about" class="text-base no-underline hover:opacity-80 transition-opacity">ABOUT</NuxtLink>
        <NuxtLink to="/projects" class="text-base no-underline hover:opacity-80 transition-opacity">SI/SM</NuxtLink>
        <NuxtLink to="/services" class="text-base no-underline hover:opacity-80 transition-opacity">SOLUTION</NuxtLink>
        <NuxtLink to="/contact" class="text-base no-underline hover:opacity-80 transition-opacity">CONTACT</NuxtLink>
      </nav>

      <button
          @click="toggleMobileMenu"
          class="md:hidden z-50 relative flex justify-center items-center w-8 h-8"
          aria-label="메뉴 토글"
      >
        <span
            ref="lineHorizontal"
            class="block absolute w-6 h-0.5 transition-colors duration-300 ease-in-out"
            :class="lineClasses"
        ></span>
        <span
            ref="lineVertical"
            class="block absolute w-0.5 h-6 transition-colors duration-300 ease-in-out"
            :class="lineClasses"
        ></span>
      </button>

    </div>

    <transition name="slide-down">
      <nav
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col border-t border-gray-200"
      >
        <NuxtLink @click="isMobileMenuOpen = false" to="/about" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">ABOUT</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/projects" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">SI/SM</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/services" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">SOLUTION</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/contact" class="px-6 py-3 text-gray-800 font-medium no-underline hover:bg-gray-50">CONTACT</NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch, defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- 상태 로직 ---
const isScrolled = ref(false)
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
let scrollTriggerInstance: ScrollTrigger | null = null;
const headerTheme = useHeaderTheme()
const shouldApplyScrolledClass = computed(() => isScrolled.value || !isHomePage.value)
const effectiveTheme = computed(() => {
  if (!isHomePage.value) {
    return 'dark';
  }
  if (isScrolled.value) {
    return 'dark';
  }
  return headerTheme.value;
});

// --- 모바일 메뉴 로직 (수정됨) ---
const isMobileMenuOpen = ref(false)
const lineHorizontal = ref<HTMLElement | null>(null) // 가로선 ref
const lineVertical = ref<HTMLElement | null>(null)   // 세로선 ref
const menuTimeline = ref<gsap.core.Timeline | null>(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 버튼 라인 색상
const lineClasses = computed(() => [
  effectiveTheme.value === 'dark' ? 'bg-gray-800' : 'bg-white'
])

// GSAP 애니메이션 Watcher
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    menuTimeline.value?.play()
  } else {
    menuTimeline.value?.reverse()
  }
})

// --- Tailwind 클래스 바인딩 로직 ---
const headerClasses = computed(() => {
  const isInitialTransparentState = isHomePage.value && headerTheme.value === 'light';
  const theme = effectiveTheme.value;
  const backgroundAndPosition = isInitialTransparentState
      ? 'absolute bg-transparent'
      : 'fixed bg-white';
  const textColor = theme === 'dark' ? 'text-gray-800' : 'text-white';
  let borderColor;
  if (isInitialTransparentState) {
    // 투명 상태일 땐 구분선 없음
  } else if (theme === 'dark' && isHomePage.value) {
    borderColor = 'border-b border-gray-800';
  } else {
    borderColor = 'border-b border-gray-200';
  }

  return [
    'top-0', 'left-0', 'w-full', 'z-50',
    'transition-all', 'duration-300', 'ease-in-out',
    backgroundAndPosition,
    textColor,
    borderColor
  ];
});

const setupScrollTrigger = () => {
  scrollTriggerInstance?.kill();
  if (isHomePage.value) {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: '+=10',
      onUpdate: self => {
        isScrolled.value = self.scroll() > 10;
        if (isHomePage.value) {
          headerTheme.value = isScrolled.value ? 'dark' : 'light';
        }
      },
    });
  }
};

// --- 생명주기 로직 (수정됨) ---
onMounted(() => {
  // GSAP +/X 타임라인 초기화 (수정됨)
  if (process.client && lineHorizontal.value && lineVertical.value) {
    menuTimeline.value = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: 'power2.inOut' } })
        // 두 선을 동시에 45도 회전
        .to(lineHorizontal.value, { rotate: 45 }, 0)
        .to(lineVertical.value, { rotate: 45 }, 0);
  }

  // --- (기존 onMounted 로직) ---
  if (isHomePage.value) {
    isScrolled.value = window.scrollY > 10;
    headerTheme.value = isScrolled.value ? 'dark' : 'light';
    setupScrollTrigger();
  } else {
    isScrolled.value = true;
    headerTheme.value = 'dark';
  }

  watch(() => route.path, (newPath) => {
    isMobileMenuOpen.value = false; // 페이지 이동 시 메뉴 닫기

    if (newPath === '/') {
      isScrolled.value = window.scrollY > 10;
      headerTheme.value = isScrolled.value ? 'dark' : 'light';
      setupScrollTrigger();
    } else {
      isScrolled.value = true;
      headerTheme.value = 'dark';
      scrollTriggerInstance?.disable();
    }
  });

})

onUnmounted(() => {
  scrollTriggerInstance?.kill();
})

defineExpose({
  // ref를 직접 노출하기보다 $el 접근을 염두에 둠
})
</script>

<style scoped>
/* 모바일 메뉴 패널 트랜지션 */
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