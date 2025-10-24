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

      <div class="md:hidden">
        <button
            @click="toggleMobileMenu"
            :class="['menu-toggle-button', { 'is-open': isMobileMenuOpen }, hamburgerButtonClasses]"
            aria-label="메뉴 열기/닫기"
            aria-expanded="isMobileMenuOpen"
        >
          <!-- ❗ SVG 아이콘: 2개의 동일한 가로선만 사용 -->
          <svg class="hamburger-icon w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line class="line line1" x1="4" y1="12" x2="20" y2="12"></line>
            <line class="line line2" x1="4" y1="12" x2="20" y2="12"></line>
          </svg>
        </button>
      </div>
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

// --- 모바일 메뉴 로직 ---
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

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

const hamburgerButtonClasses = computed(() => [
  effectiveTheme.value === 'dark'
      ? 'focus:ring-gray-800'
      : 'focus:ring-white'
]);

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

// --- 생명주기 로직 ---
onMounted(() => {
  if (isHomePage.value) {
    isScrolled.value = window.scrollY > 10;
    headerTheme.value = isScrolled.value ? 'dark' : 'light';
    setupScrollTrigger();
  } else {
    isScrolled.value = true;
    headerTheme.value = 'dark';
  }

  watch(() => route.path, (newPath) => {
    isMobileMenuOpen.value = false;

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
/* 모바일 메뉴 토글 버튼 스타일 */
.menu-toggle-button {
  padding: 0.5rem; /* 버튼 영역 확보 */
  border-radius: 9999px; /* 원형 */
  transition: background-color 0.2s ease-in-out;
}
.menu-toggle-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px currentColor; /* 포커스 링 */
}

/* ❗ SVG 아이콘 전체 (컨테이너 회전 불필요) */
.hamburger-icon {
  transform-origin: center center;
}

/* ❗ SVG 아이콘 및 선 스타일 */
.hamburger-icon .line {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform-origin: center center; /* ❗ 회전 중심을 명시적으로 중앙 설정 */
}

/* ❗ 초기 '+' 모양 설정 (2줄 사용) */
.hamburger-icon .line1 {
  transform: rotate(0deg);
  opacity: 1; /* 가로선 */
}
.hamburger-icon .line2 {
  transform: rotate(90deg); /* ❗ line2를 90도 회전시켜 세로선 만듦 */
  opacity: 1;
}

/* ❗ 메뉴 열렸을 때 'X' 모양으로 전환 (2줄 사용) */
.is-open .hamburger-icon .line1 {
  /* ❗ line1을 45도 회전 */
  transform: rotate(45deg);
  opacity: 1;
}
.is-open .hamburger-icon .line2 {
  /* ❗ line2를 -45도 회전 */
  transform: rotate(-45deg);
  opacity: 1;
}

/* 모바일 메뉴 드롭다운 트랜지션 (기존 유지) */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>

