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
                    <div>
                        <p class="break-keep text-sm font-bold uppercase tracking-widest opacity-80 md:mb-2">
                            {{ project.details.client }}
                        </p>
                        <h2 class="whitespace-pre-line break-keep text-lg font-bold md:mb-2 md:text-4xl">
                            <template v-if="project.details.title.includes('|')">
                                {{ project.details.title.split('|')[0] }}

                                <span class="block md:ml-1 md:inline">{{ project.details.title.split('|')[1] }}</span>
                            </template>

                            <template v-else>
                                {{ project.details.title }}
                            </template>
                        </h2>
                        <p class="font-pretendard break-keep text-sm font-medium tabular-nums opacity-90 md:text-lg">
                            <template v-if="project.details.period.includes('|')">
                                {{ project.details.period.split('|')[0] }}

                                <span class="block md:ml-1 md:inline">{{ project.details.period.split('|')[1] }}</span>
                            </template>

                            <template v-else>
                                {{ project.details.period }}
                            </template>
                        </p>
                    </div>
                </header>

                <div class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Swiper :modules="swiperModules" :navigation="true" :loop="processedImages.length > 1" class="h-full w-full" @slideChange="onSlideChange" :style="swiperArrowStyle">
                        <SwiperSlide v-for="(imageSrc, index) in processedImages" :key="index">
                            <div class="relative h-full w-full">
                                <div v-if="!imageLoadStatus[imageSrc]" class="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                                    <div class="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-100"></div>
                                </div>

                                <img
                                    :src="imageSrc"
                                    :alt="`${project.details.title} 이미지 ${index + 1}`"
                                    class="relative z-0 block h-full w-full object-cover transition-opacity duration-300"
                                    :class="[
                                        imageLoadStatus[imageSrc] ? 'opacity-100' : 'opacity-0',
                                        getImageObjectFitClass(project.id, index), // ✅ 이 부분을 추가합니다.
                                    ]"
                                    @load="imageLoadStatus[imageSrc] = true"
                                    @error="imageLoadStatus[imageSrc] = true"
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

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
import { ref, onMounted, onUnmounted, watchEffect, computed, watch } from 'vue'
import type { Project } from '~/types/project'
import { useScrollLock } from '@vueuse/core'

// Swiper 관련 임포트
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperModules = [Navigation, Pagination]

// ✅ [수정] basePath를 ref로 변경하고 기본값 '/'로 설정
const basePath = ref('/')

// ✅ [수정] closeIconPath를 computed 속성으로 변경
const closeIconPath = computed(() => basePath.value + '/images/homeSiSm/x.svg')

const props = defineProps<{
    project: Project | null
    projectBgColor: string
}>()

const emit = defineEmits(['close'])

// ✅ [수정] Swiper 이미지 경로를 처리하는 computed 속성
const processedImages = computed(() => {
    if (!props.project || !props.project.details || !props.project.details.images) {
        return []
    }

    // [수정] .map()에서 ref인 basePath.value를 사용하도록 변경
    return props.project.details.images.map(imagePath => {
        return basePath.value + imagePath
    })
})

const modalOverlayRef = ref<HTMLElement | null>(null)
const modalContentRef = ref<HTMLElement | null>(null)

// --- 스크롤 잠금 로직 ---
const htmlEl = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(htmlEl)

/**
 * 브라우저 '뒤로가기' (popstate) 이벤트를 감지하여 모달을 닫습니다.
 */
const handlePopState = (event: PopStateEvent) => {
    // popstate 이벤트가 발생하면 (뒤로가기 버튼 클릭)
    // 부모(HomeSectionSiSm)에게 'close' 이벤트를 전달합니다.
    // 부모는 isModalOpen.value = false로 설정하여
    // 이 모달 컴포넌트를 v-if에 의해 unmount시킬 것입니다.
    emit('close')
}

onMounted(() => {
    // ✅ [신규] 컴포넌트가 마운트(실행)된 브라우저 환경에서
    //      현재 호스트네임을 기준으로 basePath를 설정
    const isProduction = process.env.NODE_ENV === 'production'
    const hostname = window.location.hostname

    // 1. 프로덕션 빌드이면서 (NODE_ENV === 'production')
    // 2. 깃허브 페이지 호스트에서 실행될 때만
    if (isProduction && hostname === 'fourberry.github.io') {
        basePath.value = '/home'
    } else {
        // 로컬(development) 또는 커스텀 도메인(www.fourberry.co.kr)
        basePath.value = ''
    }

    // 기존 스크롤 잠금 로직
    htmlEl.value = document.documentElement

    // --- ✅ [추가] 뒤로가기 버튼 로직 ---
    // 1. 모달이 열릴 때 (마운트될 때), 브라우저 히스토리에 "가짜" 상태를 추가합니다.
    //    (URL은 변경하지 않고, state 객체만 추가)
    history.pushState({ modal: 'projectModalOpen' }, '', window.location.href)

    // 2. 'popstate' 이벤트 (사용자가 '뒤로가기' 버튼을 누름)를 감지하는 리스너를 추가합니다.
    window.addEventListener('popstate', handlePopState)
})
watchEffect(() => {
    isLocked.value = props.project !== null
})

onUnmounted(() => {
    isLocked.value = false

    // --- ✅ [추가] 뒤로가기 버튼 로직 ---
    // 1. 컴포넌트가 사라질 때 (언마운트될 때) 'popstate' 리스너를 깨끗하게 제거합니다.
    window.removeEventListener('popstate', handlePopState)

    // 2. 모달이 닫히는 이유를 확인합니다.
    //    만약 'X' 버튼을 눌러 닫힌 경우(즉, popstate가 아닌 다른 이유),
    //    우리가 추가했던 'projectModalOpen' 상태가 히스토리에 여전히 남아있으므로,
    //    'history.back()'을 수동으로 호출하여 이 "가짜" 히스토리 상태를 제거합니다.
    //
    //    만약 '뒤로가기' 버튼을 눌러 닫힌 경우, handlePopState가 먼저 실행되고
    //    popstate 이벤트가 이미 발생했으므로 history.state.modal 값이 다릅니다.
    if (history.state && history.state.modal === 'projectModalOpen') {
        history.back()
    }
})

// 각 이미지 소스(src)를 key로, 로드 완료 여부(boolean)를 value로 가짐
const imageLoadStatus = ref<Record<string, boolean>>({})

// ✅ project prop이 변경될 때 (즉, 모달이 새로 열릴 때)
// 저장된 로딩 상태를 모두 초기화합니다.
watch(
    () => props.project,
    newProject => {
        if (newProject) {
            imageLoadStatus.value = {}

            activeSlideIndex.value = 0
        }
    }
)

// ✅ [신규] 현재 활성화된 Swiper 슬라이드의 인덱스
const activeSlideIndex = ref(0)

// ✅ [신규] Swiper 슬라이드 변경 시 호출될 함수
const onSlideChange = (swiper: any) => {
    activeSlideIndex.value = swiper.realIndex // loop 모드일 경우 realIndex 사용
}

// ✅ [신규] Swiper 화살표 테마를 위한 computed 속성
const swiperArrowThemeClass = computed(() => {
    if (!props.project) return 'swiper-button-white' // 기본값

    const projectId = props.project.id
    const index = activeSlideIndex.value // 현재 활성화된 인덱스 사용

    if (projectId === 'si_3') {
        // KOBC 프로젝트
        // 2, 3, 4번째 이미지 (인덱스 1, 2, 3)

        if (index >= 1 && index <= 3) {
            console.log('black')
            return 'swiper-button-black' // 검은색 화살표 테마
        }
    }

    return 'swiper-button-white' // 그 외 모든 경우 (기본값)
})

// ✅ [대안] CSS 변수를 사용한 스타일 바인딩
const swiperArrowStyle = computed(() => {
    if (!props.project) {
        return { '--swiper-navigation-color': '#ffffff' } // 기본값 흰색
    }

    const projectId = props.project.id
    const index = activeSlideIndex.value

    if ((projectId === 'si_3' || projectId === 'si_5') && index >= 1 && index <= 3) {
        // KOBC 프로젝트의 특정 이미지
        return { '--swiper-navigation-color': '#0c0a09' } // 어두운 색
    }

    // 그 외 모든 경우
    return { '--swiper-navigation-color': '#ffffff' } // 흰색
})

// ✅ [신규 함수] 이미지 인덱스에 따라 object-fit 클래스를 반환하는 함수
const getImageObjectFitClass = (projectId: string, imageIndex: number) => {
    if (projectId === 'si_3') {
        // KOBC 프로젝트의 ID가 'si_3'일 때
        // 2, 3, 4번째 이미지 (0부터 시작하므로 인덱스는 1, 2, 3)
        if (imageIndex >= 1 && imageIndex <= 3) {
            return 'object-cover object-top'
        }
    }
    if (projectId === 'si_5') {
        // KOBC 프로젝트의 ID가 'si_3'일 때
        // 2, 3, 4번째 이미지 (0부터 시작하므로 인덱스는 1, 2, 3)
        if (imageIndex >= 1 && imageIndex <= 3) {
            return 'object-cover object-top'
        }
    }
    // 기본값 또는 다른 프로젝트의 경우 object-cover
    return 'object-cover'
}

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
/* ✅ 검은색/어두운색 화살표 스타일 (::after에 적용) */
:deep(.swiper-button-black .swiper-button-prev::after),
:deep(.swiper-button-black .swiper-button-next::after) {
    color: #071e2e; /* 어두운 색 */
}

/* ✅ 흰색/밝은색 화살표 스타일 (::after에 적용) */
:deep(.swiper-button-white .swiper-button-prev::after),
:deep(.swiper-button-white .swiper-button-next::after) {
    color: #ffffff; /* 밝은 색 */
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    /* 기본 opacity 및 transition 유지 */
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
