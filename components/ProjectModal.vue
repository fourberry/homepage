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
                        <Swiper :modules="swiperModules" :navigation="true" :loop="project.details.images.length > 1" class="h-full w-full">
                            <SwiperSlide v-for="(imageSrc, index) in project.details.images" :key="index">
                                <NuxtImg :src="imageSrc" :alt="`${project.details.title} 이미지 ${index + 1}`" class="block h-full w-full object-cover" />
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
import { ref, onMounted, onUnmounted, watchEffect } from 'vue' // ✅ onMounted, watchEffect, onUnmounted 임포트 확인
import type { Project } from '~/types/project'
import { useScrollLock } from '@vueuse/core' // ✅ useScrollLock 임포트 확인

// ✅ [추가] Swiper 관련 임포트
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

// ✅ [추가] Swiper CSS 임포트
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// ✅ [추가] Swiper 모듈 등록
const swiperModules = [Navigation, Pagination]

const closeIconPath = process.env.NODE_ENV === 'production' ? '/home/images/homeSiSm/x.svg' : '/images/homeSiSm/x.svg'

const props = defineProps<{
    project: Project | null
    projectBgColor: string
}>()

const emit = defineEmits(['close'])

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

// ✅ getImageClasses 함수는 이제 Swiper 내부에서 사용되지 않으므로
//    여기서 제거하거나, 혹은 다른 곳에서 사용된다면 유지합니다.
//    (Swiper 내부의 NuxtImg는 object-cover로 고정 스타일을 적용했습니다.)

defineExpose({
    modalOverlayRef,
    modalContentRef,
})
</script>

<style scoped>
/* ✅ [수정]
    modalContentRef 내부의 'overflow-y-auto' 클래스를 가진
    실제 스크롤 요소의 스크롤바를 숨깁니다.
*/
[ref='modalContentRef'] .overflow-y-auto::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

/* ✅ [수정]
    Firefox 및 IE/Edge를 위한 설정
*/
[ref='modalContentRef'] .overflow-y-auto {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
/* 네비게이션 버튼 (화살표) 기본 스타일 */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    color: #ffffff; /* 아이콘 색상 (흰색) */
    opacity: 0.7;
    transition: opacity 0.2s;
}
:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
    opacity: 1;
}

/* ⭐️ 네비게이션 "아이콘 크기" 조절 */
:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
    font-size: 1.5rem; /* 👈 이 값을 원하는 크기로 조절하세요 (예: 24px) */
}
</style>
