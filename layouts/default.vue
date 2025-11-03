<template>
    <div>
        <div v-if="showPreloader" ref="preloader" class="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center bg-white"></div>

        <div class="flex min-h-screen flex-col">
            <AppHeader />

            <main class="grow">
                <slot />
            </main>

            <AppFooter />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// --- 1. Preloader 로직 ---

// 프리로더 표시 여부 상태
const showPreloader = ref(true)
// 프리로더 DOM 요소를 참조하기 위한 ref
const preloader = ref<HTMLDivElement | null>(null)

onMounted(() => {
    // 컴포넌트 마운트 시 프리로더 애니메이션 실행
    if (preloader.value) {
        // GSAP를 사용하여 0.8초 동안 투명도를 0으로 변경
        gsap.to(preloader.value, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                // 애니메이션 완료 후 DOM에서 제거하기 위해 상태 변경
                showPreloader.value = false
            },
        })
    } else {
        // preloader.value가 없는 예외 상황 처리
        showPreloader.value = false
    }
})

// --- 2. Head (SEO) 설정 ---

// Nuxt 3의 useHead 컴포저블을 사용하여 공통 메타 태그 설정
// useHead({
//   // titleTemplate을 사용하면 각 페이지의 title이 (주)회사이름과 조합됨
//   // 예: "회사 소개 - (주)회사이름"
//   titleTemplate: (titleChunk) => {
//     // ※ 이 부분은 실제 회사명과 슬로건으로 변경하세요.
//     return titleChunk ? `${titleChunk} - (주)포베리` : '(주)포베리 | 사람 중심';
//   },
//   // 공통 메타 태그
//   meta: [
//     // ※ content 내용을 실제 회사 소개 내용으로 변경하세요.
//     { name: 'description', content: '우리 회사의 멋진 서비스를 소개합니다.' },
//     { property: 'og:site_name', content: '(주)포베리' },
//     // { property: 'og:image', content: 'https://example.com/default-og-image.png' }, // 기본 OG 이미지 경로
//   ],
//   // <html> 태그 속성
//   htmlAttrs: {
//     lang: 'ko' // 기본 언어 설정
//   }
// })
</script>
