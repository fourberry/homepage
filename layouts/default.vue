<template>
    <div>
        <div v-if="showPreloader" ref="preloader" class="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center bg-white"></div>

        <div class="flex min-h-screen flex-col">
            <AppHeader />

            <main class="grow">
                <slot />
            </main>

            <!-- <AppFooter /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useSectionTitle } from '@/composables/useSectionTitle';

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

// 반환된 'title'은 'current-section-id' Rl (useState)에 따라 반응형으로 변경됩니다.
const { title } = useSectionTitle()

// 주석 처리된 useHead를 활성화하고, title에 반응형 ref를 연결합니다.
useHead({
    // titleTemplate을 사용하면 각 페이지의 title이 (주)회사이름과 조합됨
    title: title, // useSectionTitle에서 반환된 반응형 title ref를 사용
    titleTemplate: (titleChunk) => {
        // titleChunk가 useSectionTitle에서 반환된 값입니다.
        if (titleChunk === '(주)포베리') {
            return '(주)포베리' // 기본값일 때 (최상단)
        }
        return `${titleChunk} - (주)포베리` // 섹션 제목일 때
    },
    // 공통 메타 태그
    meta: [
        { name: 'description', content: '우리 회사의 멋진 서비스를 소개합니다.' }, // ※ 실제 내용으로 변경
        { property: 'og:site_name', content: '(주)포베리' },
        // { property: 'og:image', content: 'https://example.com/default-og-image.png' },
    ],
    // <html> 태그 속성
    htmlAttrs: {
        lang: 'ko'
    }
})
</script>
