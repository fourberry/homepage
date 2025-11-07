<template>
    <div ref="modalOverlayRef" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-2 sm:p-4" @click.self="close">
        <div ref="modalContentRef" class="relative w-full max-w-4xl rounded-lg shadow-xl" :style="{ backgroundColor: projectBgColor }" style="max-height: 90vh">
            <button
                @click="close"
                class="md:h-13 md:w-13 absolute right-1 top-1 z-10 flex h-10 w-10 items-center justify-center text-3xl font-black text-white transition-all duration-200 ease-in-out"
                aria-label="닫기"
            >
                <img :src="closeIconPath" alt="닫기" class="h-6 w-6 brightness-0 invert md:h-10 md:w-10" />
            </button>

            <div v-if="project" class="overflow-y-auto rounded-lg" style="max-height: 90vh">
                <header :class="project.gradientClasses" class="flex flex-col items-center justify-center p-4 pt-10 text-center text-white md:flex-row md:justify-between md:p-8 md:pt-12 md:text-left">
                    <div class="md:w-3/5">
                        <p class="break-keep text-sm font-bold uppercase tracking-widest opacity-80 md:mb-2">
                            {{ project.details.client }}
                        </p>
                        <h2 class="whitespace-pre-line break-keep text-xl font-bold md:mb-2 md:text-4xl">
                            {{ project.details.title }}
                        </h2>
                        <p class="break-keep text-sm font-medium opacity-90 md:text-lg">
                            {{ project.details.period }}
                        </p>
                    </div>
                    <div class="mt-6 aspect-video w-full overflow-hidden rounded-lg md:mt-0 md:w-2/5">
                        <Swiper :modules="swiperModules" :navigation="true" :loop="processedImages.length > 1" class="h-full w-full">
                            <SwiperSlide v-for="(imageSrc, index) in processedImages" :key="index">
                                <img :src="imageSrc" :alt="`${project.details.title} 이미지 ${index + 1}`" class="block h-full w-full object-cover" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </header>

                <section class="bg-white p-4 text-gray-900 md:p-8">
                    <h3 class="mb-4 text-lg font-bold md:text-xl">Project Overview</h3>

                    <div class="text-sm leading-relaxed text-gray-600 md:text-base">
                        <p
                            v-for="(paragraph, index) in project.details.overview.split('\n\n')"
                            :key="index"
                            class="whitespace-pre-line break-keep"
                            :class="{ 'mb-3': index < project.details.overview.split(' ').length - 1 }"
                        >
                            {{ paragraph }}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// ✅ [수정] computed 임포트 추가
import { ref, onMounted, onUnmounted, watchEffect, computed } from 'vue'
import type { Project } from '~/types/project'
import { useScrollLock } from '@vueuse/core'

// Swiper 관련 임포트
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperModules = [Navigation, Pagination]

const isProduction = process.env.NODE_ENV === 'production'
const basePath = isProduction ? '/home' : ''

// ✅ [수정] closeIconPath도 basePath를 사용하도록 리팩토링 (더 깔끔합니다)
const closeIconPath = basePath + '/images/homeSiSm/x.svg'

const props = defineProps<{
    project: Project | null
    projectBgColor: string
}>()

const emit = defineEmits(['close'])

// ✅ [수정] Swiper 이미지 경로를 처리하는 computed 속성
const processedImages = computed(() => {
    // 1. props.project나 하위 속성이 없으면 빈 배열 반환
    if (!props.project || !props.project.details || !props.project.details.images) {
        return []
    }

    // 2. .map()을 사용하여 각 이미지 경로에 basePath를 추가
    return props.project.details.images.map(imagePath => {
        // imagePath는 '/images/...'로 시작합니다.
        // production: '/home' + '/images/...' -> '/home/images/...'
        // development: '' + '/images/...' -> '/images/...'
        return basePath + imagePath
    })
})

const modalOverlayRef = ref<HTMLElement | null>(null)
const modalContentRef = ref<HTMLElement | null>(null)

// --- 스크롤 잠금 로직 ---
const htmlEl = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(htmlEl)

onMounted(() => {
    htmlEl.value = document.documentElement
})

watchEffect(() => {
    isLocked.value = props.project !== null
})

onUnmounted(() => {
    isLocked.value = false
})

const close = () => {
    emit('close')
}

defineExpose({
    modalOverlayRef,
    modalContentRef,
})
</script>

<style scoped>
/* (스타일 태그 내용은 변경 없음) */
[ref='modalContentRef'] .overflow-y-auto::-webkit-scrollbar {
    display: none;
}
[ref='modalContentRef'] .overflow-y-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    color: #ffffff;
    opacity: 0.7;
    transition: opacity 0.2s;
}
:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
    opacity: 1;
}
:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
    font-size: 1.5rem;
}
</style>
