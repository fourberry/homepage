<template>
    <div ref="modalOverlayRef" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4" @click.self="close">
        <div ref="modalContentRef" class="relative w-full max-w-4xl rounded-lg shadow-xl" :style="{ backgroundColor: projectBgColor }" style="max-height: 90vh">
            <button
                @click="close"
                class="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-transform hover:scale-110"
                aria-label="닫기"
            >
                ✕
            </button>

            <div v-if="project" class="overflow-y-auto rounded-lg" style="max-height: 90vh">
                <header :class="project.gradientClasses" class="flex flex-col items-center justify-center p-8 text-center text-white md:flex-row md:justify-between md:text-left">
                    <div class="md:w-3/5">
                        <p class="mb-2 text-sm font-bold uppercase tracking-widest opacity-80">
                            {{ project.details.client }}
                        </p>
                        <h2 class="mb-2 text-3xl font-bold md:text-4xl">
                            {{ project.details.title }}
                        </h2>
                        <p class="text-lg font-medium opacity-90">
                            {{ project.details.period }}
                        </p>
                    </div>
                    <div class="mt-6 w-1/2 md:mt-0 md:w-2/5">
                        <NuxtImg :src="project.imageSrc" :alt="project.imageAlt" class="block w-full" :class="getImageClasses(project)" />
                    </div>
                </header>

                <section class="bg-white p-8 text-gray-900">
                    <h3 class="mb-4 text-xl font-bold">Project Overview</h3>
                    <p class="whitespace-pre-line text-base leading-relaxed text-gray-600">
                        {{ project.details.overview }}
                    </p>
                </section>

                <section v-if="project.details.images?.length" class="bg-gray-50 p-8">
                    <h3 class="mb-4 text-xl font-bold text-gray-900">Screenshots</h3>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div v-for="(imgSrc, index) in project.details.images" :key="index" class="overflow-hidden rounded-lg border border-gray-200">
                            <img :src="imgSrc" alt="Project screenshot" class="h-full w-full object-cover" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'

// 'Project' 타입을 정의합니다. (기존 siSmProjects 배열의 요소 타입)
interface Project {
    id: string
    gradientClasses: string
    imageSrc: string
    imageAlt: string
    dates: string[]
    title: string
    clientName: string
    imageStyle: string
    smallH3: boolean
    details: {
        client: string
        title: string
        period: string
        overview: string
        images?: string[]
    }
}

const props = defineProps<{
    project: Project | null
    // ✅ 카드에서 전달받을 배경색과 위치/크기 정보
    projectBgColor: string
}>()

const emit = defineEmits(['close'])

const modalOverlayRef = ref<HTMLElement | null>(null)
const modalContentRef = ref<HTMLElement | null>(null)

const close = () => {
    emit('close')
}

const getImageClasses = (project: Project) => {
    switch (project.imageStyle) {
        case 'cuckoo':
            return 'w-full h-full object-cover'
        case 'lotto':
            return 'w-full h-full object-cover'
        case 'auto':
            return 'w-full h-full object-cover object-top'
        case 'knsu':
            return 'w-full h-full object-cover'
        case 'withfresh':
            return 'w-full h-full object-cover'
        default:
            return 'w-full h-full object-cover object-top'
    }
}

// 모달이 마운트될 때 (컴포넌트가 처음 생성될 때) 애니메이션은 부모에서 제어합니다.
// 모달 자체는 기본 상태로 대기합니다.
defineExpose({
    modalOverlayRef,
    modalContentRef,
})
</script>

<style scoped></style>
